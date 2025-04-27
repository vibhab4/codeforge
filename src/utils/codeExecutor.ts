
import { TestCase } from './challengeData';

export interface TestResult {
  testCase: TestCase;
  passed: boolean;
  output: string;
}

// Helper function to safely convert the expected output string to the appropriate type
const normalizeValue = (value: string): any => {
  try {
    // Try to parse as JSON first
    return JSON.parse(value);
  } catch (e) {
    // If not valid JSON, return as is
    return value;
  }
};

// Helper function to safely stringify any value for comparison
const safeStringify = (value: any): string => {
  if (typeof value === 'undefined') return 'undefined';
  if (value === null) return 'null';
  if (typeof value === 'function') return value.toString();
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
};

// Compare expected and actual values
const compareResults = (expected: string, actual: any): boolean => {
  const normalizedExpected = normalizeValue(expected);
  
  // Handle array comparison
  if (Array.isArray(normalizedExpected) && Array.isArray(actual)) {
    if (normalizedExpected.length !== actual.length) return false;
    return JSON.stringify(normalizedExpected) === JSON.stringify(actual);
  }
  
  // Handle object comparison
  if (
    typeof normalizedExpected === 'object' && 
    normalizedExpected !== null &&
    typeof actual === 'object' &&
    actual !== null
  ) {
    return JSON.stringify(normalizedExpected) === JSON.stringify(actual);
  }
  
  // Simple equality for primitives
  return normalizedExpected == actual; // Using == for type coercion
};

export const executeCode = (userCode: string, testCases: TestCase[]): TestResult[] => {
  const results: TestResult[] = [];
  
  for (const testCase of testCases) {
    try {
      // Create a function from the user's code
      const userFunction = new Function(
        'return ' + userCode
      )();
      
      // Parse the input 
      const inputStr = testCase.input;
      const matches = inputStr.match(/([a-zA-Z0-9_]+)\s*=\s*([^,]+)(?:,|$)/g);
      
      if (!matches) {
        throw new Error(`Could not parse input: ${inputStr}`);
      }
      
      // Extract and convert arguments
      const args: any[] = [];
      matches.forEach(match => {
        const [_, value] = match.split('=').map(s => s.trim());
        try {
          // Try to evaluate the value as JavaScript
          args.push(eval(`(${value})`));
        } catch (e) {
          // If that fails, just use the string
          args.push(value);
        }
      });
      
      // Execute the user's function with the extracted arguments
      const output = userFunction(...args);
      const outputStr = safeStringify(output);
      
      // Compare with expected output
      const passed = compareResults(testCase.expectedOutput, output);
      
      results.push({
        testCase,
        passed,
        output: outputStr
      });
    } catch (error) {
      results.push({
        testCase,
        passed: false,
        output: `Error: ${(error as Error).message}`
      });
    }
  }
  
  return results;
};
