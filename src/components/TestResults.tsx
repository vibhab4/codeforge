
import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { TestCase } from '@/utils/challengeData';

interface TestResult {
  testCase: TestCase;
  passed: boolean;
  output: string;
}

interface TestResultsProps {
  results: TestResult[];
}

const TestResults: React.FC<TestResultsProps> = ({ results }) => {
  const passedCount = results.filter(result => result.passed).length;
  const totalCount = results.length;
  
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <div className="text-sm font-medium">Test Results</div>
        <div className="text-sm">
          Passed: <span className="font-medium">{passedCount}/{totalCount}</span>
        </div>
      </div>
      
      <div className="space-y-2">
        {results.map((result, index) => (
          <div 
            key={index} 
            className={`border rounded-md p-3 ${
              result.passed 
                ? 'bg-success/10 border-success/30' 
                : 'bg-danger/10 border-danger/30'
            }`}
          >
            <div className="flex items-start gap-2">
              {result.passed ? (
                <CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" />
              ) : (
                <XCircle className="h-5 w-5 text-danger shrink-0 mt-0.5" />
              )}
              <div className="space-y-1.5 w-full">
                <div className="flex justify-between">
                  <div className="text-sm font-medium">
                    Test Case {index + 1}
                  </div>
                  <div className="text-sm">
                    {result.passed ? 'Passed' : 'Failed'}
                  </div>
                </div>
                
                <div className="space-y-1 text-xs">
                  <div>
                    <span className="font-medium">Input:</span> {result.testCase.input}
                  </div>
                  <div>
                    <span className="font-medium">Expected:</span> {result.testCase.expectedOutput}
                  </div>
                  <div>
                    <span className="font-medium">Your Output:</span> {result.output}
                  </div>
                  {result.testCase.explanation && (
                    <div>
                      <span className="font-medium">Explanation:</span> {result.testCase.explanation}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestResults;
