
import { useState } from "react";
import Header from "@/components/Header";
import FileUploader from "@/components/FileUploader";
import SummaryConfig from "@/components/SummaryConfig";
import SummaryResults from "@/components/SummaryResults";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Settings, Wand2 } from "lucide-react";
import { toast } from "sonner";
import { extractTextFromPDF, createSummaryFromText, generateQuizFromText } from "@/utils/pdfProcessor";

const Index = () => {
  const [file, setFile] = useState<File | null>(null);
  const [summaryLength, setSummaryLength] = useState(50);
  const [focusType, setFocusType] = useState("general");
  const [language, setLanguage] = useState("en");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [summary, setSummary] = useState<any>(null);
  const [quiz, setQuiz] = useState<any>(null);
  
  const handleFileUpload = (uploadedFile: File) => {
    setFile(uploadedFile);
    setShowResults(false);
  };

  const generateSummary = async () => {
    if (!file) {
      toast.error("Please upload a file first");
      return;
    }

    setIsGenerating(true);
    try {
      // Extract text from PDF
      const text = await extractTextFromPDF(file);
      
      // Generate summary based on config
      const generatedSummary = createSummaryFromText(text, summaryLength);
      
      // Generate quiz questions
      const generatedQuiz = generateQuizFromText(text);
      
      // Update state with results
      setSummary(generatedSummary);
      setQuiz(generatedQuiz);
      setShowResults(true);
      toast.success("Summary generated successfully!");
    } catch (error) {
      console.error("Error generating summary:", error);
      toast.error("Failed to generate summary. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="container py-8">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-3">
              <h1 className="text-4xl font-bold tracking-tighter">SmartPDF</h1>
              <p className="text-xl text-muted-foreground">
                Upload your document, customize the summary, and get intelligent insights instantly
              </p>
            </div>

            {!showResults ? (
              <div className="space-y-6">
                <Tabs defaultValue="upload" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="upload" className="flex gap-2 items-center">
                      <FileText className="h-4 w-4" />
                      Upload
                    </TabsTrigger>
                    <TabsTrigger value="settings" className="flex gap-2 items-center">
                      <Settings className="h-4 w-4" />
                      Settings
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="upload" className="pt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Upload Document</CardTitle>
                        <CardDescription>
                          Upload a PDF or DOCX file to generate a summary
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <FileUploader onFileUpload={handleFileUpload} />
                      </CardContent>
                      {file && (
                        <CardFooter>
                          <p className="text-sm text-muted-foreground">
                            Selected file: <span className="font-medium">{file.name}</span> ({(file.size / 1024).toFixed(1)} KB)
                          </p>
                        </CardFooter>
                      )}
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="settings" className="pt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Summary Settings</CardTitle>
                        <CardDescription>
                          Customize how your document will be summarized
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <SummaryConfig 
                          length={summaryLength}
                          setLength={setSummaryLength}
                          focusType={focusType}
                          setFocusType={setFocusType}
                          language={language}
                          setLanguage={setLanguage}
                        />
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>

                <div className="flex justify-center">
                  <Button 
                    size="lg" 
                    onClick={generateSummary} 
                    disabled={!file || isGenerating}
                    className="w-full max-w-xs"
                  >
                    {isGenerating ? (
                      <>Generating...</>
                    ) : (
                      <>
                        <Wand2 className="mr-2 h-4 w-4" /> Generate Summary
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-semibold">Results</h2>
                  <Button 
                    variant="outline"
                    onClick={() => setShowResults(false)}
                  >
                    New Summary
                  </Button>
                </div>
                {summary && quiz && (
                  <SummaryResults summary={summary} quiz={quiz} />
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} SmartPDF. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
