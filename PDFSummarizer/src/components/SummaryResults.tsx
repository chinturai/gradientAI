
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, MessageSquare, CheckCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

interface SummaryResultsProps {
  summary: {
    title: string;
    keyPoints: string[];
    paragraphs: { heading: string; content: string }[];
  };
  quiz: {
    questions: {
      question: string;
      options: string[];
      correctAnswer: number;
    }[];
  };
}

export default function SummaryResults({ summary, quiz }: SummaryResultsProps) {
  const [activeTab, setActiveTab] = useState("summary");
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(Array(quiz.questions.length).fill(-1));
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    if (isQuizSubmitted) return;
    
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[questionIndex] = answerIndex;
    setSelectedAnswers(newSelectedAnswers);
  };

  const calculateScore = () => {
    let correctCount = 0;
    quiz.questions.forEach((q, i) => {
      if (selectedAnswers[i] === q.correctAnswer) {
        correctCount++;
      }
    });
    return {
      correct: correctCount,
      total: quiz.questions.length,
      percentage: Math.round((correctCount / quiz.questions.length) * 100)
    };
  };

  const handleQuizSubmit = () => {
    setIsQuizSubmitted(true);
    const score = calculateScore();
    toast(`Your score: ${score.correct}/${score.total} (${score.percentage}%)`, {
      description: "Great job testing your understanding!",
    });
  };

  const handleDownload = () => {
    let content = `# ${summary.title}\n\n`;
    content += "## Key Points\n";
    summary.keyPoints.forEach((point, i) => {
      content += `${i + 1}. ${point}\n`;
    });
    content += "\n## Summary\n";
    summary.paragraphs.forEach(para => {
      content += `### ${para.heading}\n${para.content}\n\n`;
    });

    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${summary.title}-summary.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast("Summary downloaded successfully!", {
      description: "Your summary has been downloaded as a markdown file.",
    });
  };

  return (
    <div className="w-full space-y-6 animate-fade-in">
      <Tabs defaultValue="summary" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="summary" className="flex gap-2 items-center">
            <FileText className="h-4 w-4" />
            Summary
          </TabsTrigger>
          <TabsTrigger value="quiz" className="flex gap-2 items-center">
            <MessageSquare className="h-4 w-4" />
            Quiz
          </TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="pt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{summary.title}</CardTitle>
              <CardDescription>Key points from the document</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {summary.keyPoints.map((point, i) => (
                  <Card key={i} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4 flex gap-3">
                      <div className="rounded-full bg-primary/10 h-6 w-6 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-semibold text-primary">{i + 1}</span>
                      </div>
                      <p className="text-sm">{point}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {summary.paragraphs.map((para, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{para.heading}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{para.content}</p>
              </CardContent>
            </Card>
          ))}

          <Card className="bg-primary/5">
            <CardFooter className="flex justify-between items-center p-4">
              <p className="text-sm text-muted-foreground">Save this summary for later reference</p>
              <Button onClick={handleDownload} className="flex items-center gap-2">
                <Download className="h-4 w-4" /> Download
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="quiz" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Test Your Understanding</CardTitle>
              <CardDescription>Answer these questions to check your comprehension</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {quiz.questions.map((q, qIndex) => (
                <div key={qIndex} className="space-y-3">
                  <h4 className="font-medium">
                    Question {qIndex + 1}: {q.question}
                  </h4>
                  <RadioGroup
                    value={selectedAnswers[qIndex].toString()}
                    onValueChange={(value) => handleAnswerSelect(qIndex, parseInt(value))}
                    className="space-y-2"
                  >
                    {q.options.map((option, oIndex) => (
                      <div 
                        key={oIndex} 
                        className={`flex items-center space-x-2 p-2 rounded-md border ${
                          isQuizSubmitted && oIndex === q.correctAnswer 
                            ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900' 
                            : isQuizSubmitted && selectedAnswers[qIndex] === oIndex && oIndex !== q.correctAnswer 
                              ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-900' 
                              : ''
                        }`}
                      >
                        <RadioGroupItem 
                          value={oIndex.toString()} 
                          id={`q${qIndex}-o${oIndex}`} 
                          disabled={isQuizSubmitted}
                        />
                        <Label 
                          htmlFor={`q${qIndex}-o${oIndex}`}
                          className="flex-1 cursor-pointer"
                        >
                          {option}
                        </Label>
                        {isQuizSubmitted && oIndex === q.correctAnswer && (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        )}
                      </div>
                    ))}
                  </RadioGroup>
                  {qIndex < quiz.questions.length - 1 && <Separator className="my-4" />}
                </div>
              ))}
            </CardContent>
            <CardFooter>
              {!isQuizSubmitted ? (
                <Button 
                  onClick={handleQuizSubmit} 
                  disabled={selectedAnswers.some(a => a === -1)} 
                  className="w-full"
                >
                  Submit Answers
                </Button>
              ) : (
                <div className="w-full text-center">
                  <p className="font-medium">
                    Your score: {calculateScore().correct}/{calculateScore().total} ({calculateScore().percentage}%)
                  </p>
                </div>
              )}
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
