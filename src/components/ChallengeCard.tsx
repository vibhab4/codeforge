
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Challenge } from '@/utils/challengeData';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import CodeEditor from './CodeEditor';
import TestResults from './TestResults';
import { executeCode, TestResult } from '@/utils/codeExecutor';
import { useToast } from '@/hooks/use-toast';

interface ChallengeCardProps {
  challenge: Challenge;
  status: 'solved' | 'unsolved' | 'skipped';
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge, status }) => {
  const [showTestCases, setShowTestCases] = useState(false);
  const [testResults, setTestResults] = useState<TestResult[] | null>(null);
  const { toast } = useToast();

  // Determine badge color based on difficulty
  const difficultyColor = {
    'Easy': 'bg-success text-success-foreground',
    'Medium': 'bg-warning text-warning-foreground',
    'Hard': 'bg-danger text-danger-foreground',
  }[challenge.difficulty];

  // Determine status label and color
  const statusDetails = {
    'solved': { label: 'Solved', color: 'bg-success/20 text-success border-success' },
    'unsolved': { label: 'Unsolved', color: 'bg-danger/20 text-danger border-danger' },
    'skipped': { label: 'Skipped', color: 'bg-muted text-muted-foreground border-muted-foreground' },
  }[status];

  const handleRunCode = (code: string) => {
    try {
      const results = executeCode(code, challenge.testCases);
      setTestResults(results);
      
      const passedCount = results.filter(r => r.passed).length;
      const totalCount = results.length;
      
      if (passedCount === totalCount) {
        toast({
          title: "All tests passed! 🎉",
          description: `${passedCount}/${totalCount} test cases passed successfully.`,
        });
      } else {
        toast({
          title: "Some tests failed",
          description: `${passedCount}/${totalCount} test cases passed.`,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Execution error",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-2xl challenge-card">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-bold">{challenge.title}</CardTitle>
          <Badge className={difficultyColor}>{challenge.difficulty}</Badge>
        </div>
        <div className="text-sm text-muted-foreground">
          {new Date(challenge.datePosted).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm">{challenge.description}</p>
        
        <div className="mt-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowTestCases(!showTestCases)}
            className="flex items-center w-full justify-between"
          >
            <span>Test Cases</span>
            {showTestCases ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
          
          {showTestCases && (
            <div className="mt-2 border rounded-md p-2 bg-muted/30">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Input</TableHead>
                    <TableHead>Expected Output</TableHead>
                    <TableHead>Explanation</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {challenge.testCases.map((testCase, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-mono text-xs">{testCase.input}</TableCell>
                      <TableCell className="font-mono text-xs">{testCase.expectedOutput}</TableCell>
                      <TableCell className="text-xs">{testCase.explanation || '-'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
        
        <CodeEditor 
          initialCode={challenge.code}
          testCases={challenge.testCases}
          onRunCode={handleRunCode}
        />
        
        {testResults && (
          <div className="mt-4">
            <TestResults results={testResults} />
          </div>
        )}
      </CardContent>
      
      <CardFooter className="border-t pt-4 flex justify-between items-center">
        <div className={`px-3 py-1 rounded-full text-sm border ${statusDetails.color}`}>
          {statusDetails.label}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ChallengeCard;
