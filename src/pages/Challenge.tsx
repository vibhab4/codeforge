import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/utils/authContext';
import { getTodayChallenge, getTodayChallengeStatus, ChallengeStatus, Challenge } from '@/utils/challengeData';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import StatusButtons from '@/components/StatusButtons';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { updateUserProgress } from '@/utils/firestoreHelpers';
import Confetti from 'react-confetti'; // npm install react-confetti
import { useWindowSize } from '@react-hook/window-size'; // npm install @react-hook/window-size
import { useResizeDetector } from 'react-resize-detector';


// Pyodide global
declare global {
  interface Window {
    loadPyodide: any;
  }
}

const ChallengePage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [todayChallenge, setTodayChallenge] = useState<Challenge | null>(null);
  const [currentStatus, setCurrentStatus] = useState<ChallengeStatus>('unsolved');
  const [code, setCode] = useState<string>('');
  const [output, setOutput] = useState('');
  const [pyodide, setPyodide] = useState<any>(null);
  const [loadingChallenge, setLoadingChallenge] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);

  const [width] = useWindowSize();
  const { height: editorHeight = 300, ref } = useResizeDetector({
    handleHeight: true,
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const loadChallenge = async () => {
      const challenge = await getTodayChallenge();
      setTodayChallenge(challenge);
      if (challenge) {
        setCode(challenge.code);
      }
      setLoadingChallenge(false);
    };

    loadChallenge();

    const loadPyodideAndPackages = async () => {
      console.log('Loading Pyodide...');
      const py = await window.loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.21.3/full/' });
      console.log('Pyodide loaded.');
      setPyodide(py);
    };

    if (!pyodide) loadPyodideAndPackages();
  }, [pyodide]);

  useEffect(() => {
    const loadStatus = async () => {
      if (user && todayChallenge) {
        const status = await getTodayChallengeStatus(user.uid, todayChallenge.id);
        setCurrentStatus(status);
      }
    };
    loadStatus();
  }, [user, todayChallenge]);

  const runCode = async () => {
    if (!pyodide) {
      setOutput('⚠️ Pyodide not loaded yet...');
      return;
    }

    if (!todayChallenge) {
      setOutput('⚠️ No challenge loaded.');
      return;
    }

    let result = '';
    let allPassed = true;

    try {
      pyodide.runPython(code);
    } catch (err: any) {
      setOutput(`❌ Error in your code definition: ${err.message}`);
      return;
    }

    for (const test of todayChallenge.testCases) {
      try {
        if (!test.input) {
          result += `⚠️ Skipped a test with missing input.\n`;
          continue;
        }
        const res = pyodide.runPython(`str(${test.input})`);
        if (res === test.expectedOutput) {
          result += `✅ Passed: ${test.input} → ${res}\n`;
        } else {
          result += `❌ Failed: ${test.input} → Got ${res}, expected ${test.expectedOutput}\n`;
          allPassed = false;
        }
      } catch (err: any) {
        result += `❌ Error while testing: ${test.input || 'undefined'}\n${err.message}\n`;
        allPassed = false;
      }
    }

    setOutput(result);
    // if (allPassed && todayChallenge.testCases.length > 0) {
    //   setShowConfetti(true);
    //   setTimeout(() => setShowConfetti(false), 10000);
    // }

    setOutput(result);

    if (todayChallenge && user) {
      if (allPassed && todayChallenge.testCases.length > 0) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false),10000);

        // Update Firestore to "solved"
        await updateUserProgress(user.uid, todayChallenge.id, 'solved');
        setCurrentStatus('solved');
        toast({ title: "Challenge Solved 🎉" });
      } else {
        // Update Firestore to "unsolved"
        await updateUserProgress(user.uid, todayChallenge.id, 'unsolved');
        setCurrentStatus('unsolved');
        toast({ title: "Some tests failed. Keep trying!" });
      }
    }



  };

  const getTimeRemaining = () => {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    const diff = midnight.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m left`;
  };

  if (loadingChallenge) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading today's challenge...</p>
      </div>
    );
  }

  if (!todayChallenge) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>⚠️ No challenge available today.</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      {showConfetti && (
        <Confetti
          width={width}
          height={document.documentElement.scrollHeight}
          recycle={false}
          numberOfPieces={400}
        />
      )}
      <Navbar />

      <div className="pt-24 p-6 max-w-5xl mx-auto">
        {/* Hero Section */}
        {/* <div className="text-center mb-8">
          <h1 className="text-4xl font-bold">✨ Today's Challenge</h1>
          <h2 className="text-2xl mt-4">{todayChallenge.title}</h2>
          <div className="mt-2 flex justify-center items-center gap-4">

            <Badge>{todayChallenge.difficulty}</Badge>
            <span className="text-gray-600">{getTimeRemaining()}</span>
          </div>
          <p className="mt-4 text-gray-700">{todayChallenge.description}</p>
        </div> */}

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold flex items-center justify-center gap-4">
            ✨ Today's Challenge ✨
          </h1>

          <div className="flex items-center justify-center gap-2 mt-4">
            <h2 className="text-2xl font-semibold">{todayChallenge.title}</h2>

            {/* Colored Badge */}
            <span
              className={`px-2 py-1 rounded-full text-sm font-medium
        ${todayChallenge.difficulty === 'Easy' ? 'bg-green-100 text-green-700' : ''}
        ${todayChallenge.difficulty === 'Medium' ? 'bg-orange-100 text-orange-700' : ''}
        ${todayChallenge.difficulty === 'Hard' ? 'bg-red-100 text-red-700' : ''}
      `}
            >
              {todayChallenge.difficulty}
            </span>
          </div>

          <div className="mt-2 flex justify-center items-center gap-4">
            <span className="text-gray-600">{getTimeRemaining()}</span>
          </div>

          <p className="mt-4 text-gray-700">{todayChallenge.description}</p>
        </div>


        {/* Code Editor */}
        <Card className="mb-4">
          <CardContent>
            <div className="mb-4" ref={ref}>
              <CodeMirror
                value={code}
                height={`${editorHeight}px`}
                extensions={[python()]}
                onChange={(val) => setCode(val)}
              />
            </div>
            <div className="flex gap-4">
              <Button onClick={runCode}>Run Code</Button>
            </div>
            {output && (
              <pre className="bg-gray-100 dark:bg-gray-800 mt-4 p-4 rounded text-sm whitespace-pre-wrap">
                {output}
              </pre>

            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChallengePage;
