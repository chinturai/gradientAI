
import { ThemeToggle } from "./ThemeToggle";
import { FileText } from "lucide-react";
import { Badge } from "./ui/badge";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-2 font-semibold">
          <FileText className="h-5 w-5 text-primary" />
          <span>SmartPDF</span>
          <Badge variant="secondary" className="ml-2">AI Powered</Badge>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
