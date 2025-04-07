
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import LanguageSelector from "./LanguageSelector";

interface SummaryConfigProps {
  length: number;
  setLength: (value: number) => void;
  focusType: string; 
  setFocusType: (value: string) => void;
  language: string;
  setLanguage: (value: string) => void;
}

export default function SummaryConfig({
  length,
  setLength,
  focusType,
  setFocusType,
  language,
  setLanguage,
}: SummaryConfigProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label>Summary Length</Label>
        <div className="flex items-center gap-4">
          <Slider
            defaultValue={[length]}
            max={100}
            step={1}
            className="flex-1"
            onValueChange={(values) => setLength(values[0])}
          />
          <span className="w-12 text-center">{length}%</span>
        </div>
        <p className="text-xs text-muted-foreground">
          {length < 30 
            ? "Concise key points only" 
            : length < 70 
              ? "Balanced summary with important details" 
              : "Comprehensive summary with most details preserved"}
        </p>
      </div>

      <div className="space-y-3">
        <Label>Focus Area</Label>
        <RadioGroup value={focusType} onValueChange={setFocusType} className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="general" id="general" />
            <Label htmlFor="general" className="cursor-pointer">General overview</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="key_concepts" id="key_concepts" />
            <Label htmlFor="key_concepts" className="cursor-pointer">Key concepts</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="actionable" id="actionable" />
            <Label htmlFor="actionable" className="cursor-pointer">Actionable insights</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="technical" id="technical" />
            <Label htmlFor="technical" className="cursor-pointer">Technical details</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-3">
        <Label>Output Language</Label>
        <LanguageSelector value={language} onChange={setLanguage} />
      </div>
    </div>
  );
}
