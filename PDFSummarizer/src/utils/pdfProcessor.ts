import * as pdfjsLib from 'pdfjs-dist';

// Set worker path for PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export async function extractTextFromPDF(file: File): Promise<string> {
  try {
    // Convert file to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    
    // Use PDF.js directly instead of pdf-parse
    const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) });
    const pdf = await loadingTask.promise;
    
    let fullText = '';
    
    // Extract text from each page
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item: any) => item.str).join(' ');
      fullText += pageText + ' ';
    }
    
    return fullText;
  } catch (error) {
    console.error("Error extracting text from PDF:", error);
    throw new Error("Failed to extract text from PDF");
  }
}

export function createSummaryFromText(text: string, length: number = 50): {
  title: string;
  keyPoints: string[];
  paragraphs: { heading: string; content: string }[];
} {
  // Simple keyword extraction (can be replaced with more sophisticated NLP)
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 10);
  const words = text.toLowerCase().split(/\W+/).filter(w => w.length > 3);
  
  // Get word frequency
  const wordFreq: Record<string, number> = {};
  words.forEach(word => {
    wordFreq[word] = (wordFreq[word] || 0) + 1;
  });
  
  // Sort words by frequency
  const sortedWords = Object.entries(wordFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(entry => entry[0]);
  
  // Generate a title based on frequent words
  const title = generateTitle(text, sortedWords);
  
  // Select key sentences based on keyword presence
  const keywordSentences = sentences
    .filter(sentence => 
      sortedWords.some(word => 
        sentence.toLowerCase().includes(word)
      )
    )
    .slice(0, Math.min(10, Math.ceil(sentences.length * length / 100)));
  
  // Generate key points
  const keyPoints = generateKeyPoints(keywordSentences);
  
  // Create paragraphs with headings
  const paragraphs = generateParagraphs(text, keywordSentences);
  
  return {
    title,
    keyPoints,
    paragraphs
  };
}

function generateTitle(text: string, keywords: string[]): string {
  // Try to extract a title from the first page
  const firstPageText = text.split('\n').slice(0, 10).join(' ');
  const possibleTitle = firstPageText.split(/[.!?]/)[0].trim();
  
  if (possibleTitle.length > 10 && possibleTitle.length < 100) {
    return possibleTitle;
  }
  
  // Fall back to using keywords
  return capitalize(keywords.slice(0, 3).join(' '));
}

function generateKeyPoints(sentences: string[]): string[] {
  return sentences.map(sentence => {
    // Clean up and shorten sentences as needed
    let cleanSentence = sentence.trim();
    if (cleanSentence.length > 150) {
      cleanSentence = cleanSentence.substring(0, 147) + '...';
    }
    return capitalize(cleanSentence);
  });
}

function generateParagraphs(text: string, keywordSentences: string[]): { heading: string; content: string }[] {
  // Split text into sections
  const sections = text.split(/\n\n+/);
  const paragraphs: { heading: string; content: string }[] = [];
  
  // Group related sentences into paragraphs
  let currentContent: string[] = [];
  let remainingSentences = [...keywordSentences];
  
  // Create 3-5 paragraphs
  const targetParagraphCount = Math.min(5, Math.ceil(keywordSentences.length / 3));
  
  for (let i = 0; i < targetParagraphCount; i++) {
    if (remainingSentences.length === 0) break;
    
    // Take some sentences for this paragraph
    const sentencesForParagraph = remainingSentences.splice(
      0, 
      Math.ceil(remainingSentences.length / (targetParagraphCount - i))
    );
    
    // Join sentences into a paragraph
    const content = sentencesForParagraph.join(' ');
    
    // Create a heading based on the first sentence
    const firstSentence = sentencesForParagraph[0];
    const words = firstSentence.split(' ').filter(w => w.length > 3);
    const heading = words.slice(0, 3).join(' ');
    
    paragraphs.push({
      heading: capitalize(heading),
      content: capitalize(content)
    });
  }
  
  return paragraphs;
}

function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function generateQuizFromText(text: string): {
  questions: {
    question: string;
    options: string[];
    correctAnswer: number;
  }[];
} {
  // Extract key sentences
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 15);
  
  const questions = [];
  const usedSentences = new Set();
  
  // Try to create 4-6 questions
  for (let i = 0; i < Math.min(6, sentences.length / 5); i++) {
    // Find a sentence with a potential fact to ask about
    let questionSentence = '';
    let attempts = 0;
    
    while (questionSentence === '' && attempts < 20) {
      const randomIndex = Math.floor(Math.random() * sentences.length);
      const sentence = sentences[randomIndex];
      
      if (!usedSentences.has(sentence) && sentence.length > 20 && sentence.length < 200) {
        questionSentence = sentence;
        usedSentences.add(sentence);
      }
      attempts++;
    }
    
    if (questionSentence === '') continue;
    
    // Create a question from the sentence
    const question = createQuestionFromSentence(questionSentence);
    if (question) {
      questions.push(question);
    }
  }
  
  return { questions };
}

function createQuestionFromSentence(sentence: string): {
  question: string;
  options: string[];
  correctAnswer: number;
} | null {
  // Extract key concept from sentence
  const words = sentence.split(' ');
  if (words.length < 5) return null;
  
  // Find a word to ask about (prefer nouns, longer words)
  const potentialWords = words.filter(word => 
    word.length > 4 && 
    !word.toLowerCase().match(/^(and|the|that|this|with|from|their|have|been|will|would|could|should)$/)
  );
  
  if (potentialWords.length === 0) return null;
  
  const targetWord = potentialWords[Math.floor(Math.random() * potentialWords.length)];
  const targetWordIndex = words.indexOf(targetWord);
  
  // Create the question by replacing the target word
  const questionWords = [...words];
  questionWords[targetWordIndex] = "___________";
  const questionText = "What word completes this sentence: " + questionWords.join(' ') + "?";
  
  // Create options (1 correct, 3 distractors)
  const options = [targetWord];
  
  // Generate 3 distractor options
  const distractors = generateDistractorOptions(targetWord);
  options.push(...distractors);
  
  // Shuffle options
  const shuffledOptions = shuffleArray([...options]);
  
  // Find the index of the correct answer in the shuffled array
  const correctAnswerIndex = shuffledOptions.indexOf(targetWord);
  
  return {
    question: questionText,
    options: shuffledOptions,
    correctAnswer: correctAnswerIndex
  };
}

function generateDistractorOptions(correctWord: string): string[] {
  // For simplicity, we're using some common words as distractors
  // In a more advanced implementation, this would use semantic similarity
  const commonWords = [
    "information", "development", "management", "technology", "process",
    "research", "application", "environment", "production", "knowledge",
    "analysis", "implementation", "framework", "structure", "function",
    "organization", "performance", "communication", "experience", "activity"
  ];
  
  // Filter out words too similar to the correct answer
  const filteredWords = commonWords.filter(word => 
    !word.includes(correctWord) && 
    !correctWord.includes(word) &&
    Math.abs(word.length - correctWord.length) < 5
  );
  
  // Select 3 random words
  const selected = [];
  while (selected.length < 3 && filteredWords.length > 0) {
    const randomIndex = Math.floor(Math.random() * filteredWords.length);
    selected.push(filteredWords[randomIndex]);
    filteredWords.splice(randomIndex, 1);
  }
  
  // If we don't have enough words, add some simple alternatives
  while (selected.length < 3) {
    selected.push(correctWord.split('').reverse().join(''));
  }
  
  return selected;
}

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}
