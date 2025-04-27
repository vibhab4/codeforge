// import { useEffect, useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent } from '@/components/ui/card';
// import CodeMirror from '@uiw/react-codemirror';
// import { python } from '@codemirror/lang-python';

// // Add global declaration for Pyodide
// declare global {
//   interface Window {
//     loadPyodide: any;
//   }
// }

// const challenges = [
//   {
//     id: 1,
//     title: "Add Two Numbers",
//     description: "Write a function `add(a, b)` that returns the sum of two numbers.",
//     starterCode: "def add(a, b):\n    return a + b",
//     testCases: [
//       { input: "add(1, 2)", expected: "3" },
//       { input: "add(-1, 5)", expected: "4" }
//     ]
//   },
//   {
//     id: 2,
//     title: "Check Palindrome",
//     description: "Write a function `is_palindrome(s)` that returns True if `s` is a palindrome.",
//     starterCode: "def is_palindrome(s):\n    return s == s[::-1]",
//     testCases: [
//       { input: "is_palindrome('racecar')", expected: "true" },
//       { input: "is_palindrome('hello')", expected: "false" }
//     ]
//   }
// ];

// export default function ChallengePage() {
//   const [pyodide, setPyodide] = useState<any>(null);
//   const [result, setResult] = useState<string>('');
//   const [currentChallenge, setCurrentChallenge] = useState(challenges[0]);
//   const [code, setCode] = useState(currentChallenge.starterCode);

//   useEffect(() => {
//     const loadPyodide = async () => {
//       const pyodideModule = await window.loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/' });
//       setPyodide(pyodideModule);
//     };
//     loadPyodide();
//   }, []);

//   useEffect(() => {
//     setCode(currentChallenge.starterCode);
//     setResult('');
//   }, [currentChallenge]);

//   const runTests = async () => {
//     if (!pyodide) return;
//     try {
//       await pyodide.runPythonAsync(code);
//       let output = '';
//       for (const test of currentChallenge.testCases) {
//         const result = pyodide.runPython(`${test.input}`);
//         const resultStr = result.toString();
//         output += `${test.input} => ${resultStr} | Expected: ${test.expected} => ${resultStr === test.expected ? '✅' : '❌'}\n`;

//       }
//       setResult(output);
//     } catch (err: any) {
//       setResult('Error:\n' + err);
//     }
//   };

//   return (
//     <div className="p-4 max-w-3xl mx-auto">
//       <h1 className="text-2xl font-bold mb-2">{currentChallenge.title}</h1>
//       <p className="mb-4 text-gray-700 whitespace-pre-wrap">{currentChallenge.description}</p>
//       <Card>
//         <CardContent className="p-4">
//           <CodeMirror
//             value={code}
//             height="200px"
//             extensions={[python()]}
//             onChange={(value) => setCode(value)}
//           />
//           <Button className="mt-4" onClick={runTests}>Run Code</Button>
//           <pre className="mt-4 bg-gray-100 p-4 rounded text-sm whitespace-pre-wrap">{result}</pre>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';

const challenges = [
  {
    id: 1,
    title: "Add Two Numbers",
    description: "Implement a function `add(a, b)` that returns the sum of two numbers.",
    starterCode: "def add(a, b):\n    # Write your code here\n    return a + b",
    testCases: [
      { input: 'add(1, 2)', expected: '3' },
      { input: 'add(-1, 5)', expected: '4' },
    ],
  },
  {
    id: 2,
    title: "Check Palindrome",
    description: "Implement a function `is_palindrome(s)` that returns True if the string is a palindrome.",
    starterCode: "def is_palindrome(s):\n    # Write your code here\n    return s == s[::-1]",
    testCases: [
      { input: 'is_palindrome("racecar")', expected: 'True' },
      { input: 'is_palindrome("hello")', expected: 'False' },
    ],
  },
];

export default function LeetCodeSimulator() {
  const [pyodide, setPyodide] = useState<any>(null);
  const [currentChallenge, setCurrentChallenge] = useState(challenges[0]);
  const [code, setCode] = useState(currentChallenge.starterCode);
  const [result, setResult] = useState<string>('');

  useEffect(() => {
    const loadPyodide = async () => {
      const pyodideModule = await (window as any).loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/' });
      setPyodide(pyodideModule);
    };
    loadPyodide();
  }, []);

  useEffect(() => {
    setCode(currentChallenge.starterCode);
    setResult('');
  }, [currentChallenge]);

  const runTests = async () => {
    if (!pyodide) return;
    try {
      await pyodide.runPythonAsync(code);
      let output = '';
      for (const test of currentChallenge.testCases) {
        const result = pyodide.runPython(`${test.input}`);
        const resultStr = result.toString();
        output += `${test.input} => ${resultStr} | Expected: ${test.expected} => ${resultStr === test.expected ? '✅' : '❌'}\n`;
      }
      setResult(output);
    } catch (err: any) {
      setResult('Error:\n' + err);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold mb-2">{currentChallenge.title}</h1>
      <p className="text-muted-foreground mb-4 text-sm leading-6">{currentChallenge.description}</p>
      <Card>
        <CardContent className="p-4">
          <CodeMirror
            value={code}
            height="200px"
            extensions={[python()]}
            onChange={(value) => setCode(value)}
          />
          <Button className="mt-4" onClick={runTests}>Run Code</Button>
          <pre className="mt-4 bg-gray-100 p-4 rounded text-sm whitespace-pre-wrap">{result}</pre>
        </CardContent>
      </Card>
    </div>
  );
}

