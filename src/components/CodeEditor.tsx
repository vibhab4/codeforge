
import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { PlayIcon, RotateCcwIcon } from 'lucide-react';
import { TestCase } from '@/utils/challengeData';

interface CodeEditorProps {
  initialCode: string;
  testCases: TestCase[];
  onRunCode: (code: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  initialCode,
  testCases,
  onRunCode
}) => {
  const [code, setCode] = useState(initialCode);

  const resetCode = () => {
    setCode(initialCode);
  };

  const handleRunCode = () => {
    onRunCode(code);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="text-sm font-medium text-gray-900 dark:text-white">
          Solution
        </div>

        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={resetCode}
            className="flex items-center gap-1"
          >
            <RotateCcwIcon className="h-3.5 w-3.5" />
            <span>Reset</span>
          </Button>
          <Button
            size="sm"
            onClick={handleRunCode}
            className="flex items-center gap-1"
          >
            <PlayIcon className="h-3.5 w-3.5" />
            <span>Run Code</span>
          </Button>
        </div>
      </div>

      <Textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="font-mono text-sm h-64 bg-code text-code-foreground"
        spellCheck={false}
      />
    </div>
  );
};

export default CodeEditor;
