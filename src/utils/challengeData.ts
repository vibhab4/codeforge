// export interface Challenge {
//   id: string;
//   title: string;
//   description: string;
//   difficulty: 'Easy' | 'Medium' | 'Hard';
//   datePosted: string;
//   code: string;
//   testCases: TestCase[];
// }

// export interface TestCase {
//   input: string;
//   expectedOutput: string;
//   explanation?: string;
// }

// export type ChallengeStatus = 'solved' | 'unsolved' | 'skipped';

// export interface UserProgress {
//   userId: string;
//   challengeId: string;
//   status: ChallengeStatus;
//   date: string;
// }

// // Mock challenges data
// const challenges: Challenge[] = [
//   {
//     id: '6',
//     title: 'Add Two Numbers',
//     description: 'Given two numbers, return their sum.',
//     difficulty: 'Easy',
//     datePosted: '2025-04-16',
//     code: `def add(a, b):\n    return a + b`,
//     testCases: [
//       { input: 'add(5, 3)', expectedOutput: '8', explanation: 'Simple addition' },
//       { input: 'add(-2, 7)', expectedOutput: '5' },
//       { input: 'add(0, 0)', expectedOutput: '0' }
//     ]
//   },
//   {
//     id: '1',
//     title: 'Check Palindrome',
//     description: 'Return True if the input string is a palindrome.',
//     difficulty: 'Easy',
//     datePosted: '2025-04-15',
//     code: `def is_palindrome(s):\n    return s == s[::-1]`,
//     testCases: [
//       { input: 'is_palindrome("racecar")', expectedOutput: 'True' },
//       { input: 'is_palindrome("hello")', expectedOutput: 'False' }
//     ]
//   }
// ];

// // Return today’s challenge
// export const getTodayChallenge = (): Challenge => {
//   const today = new Date();
//   const dayIndex = today.getDate() % challenges.length;
//   return challenges[dayIndex];
// };


// // Get user progress from local storage
// export const getUserProgress = (userId: string): UserProgress[] => {
//   const stored = localStorage.getItem(`progress_${userId}`);
//   return stored ? JSON.parse(stored) : [];
// };

// // Save user progress to local storage
// export const saveUserProgress = (progress: UserProgress): void => {
//   const existing = getUserProgress(progress.userId);
//   const index = existing.findIndex(p => p.challengeId === progress.challengeId);

//   if (index >= 0) existing[index] = progress;
//   else existing.push(progress);

//   localStorage.setItem(`progress_${progress.userId}`, JSON.stringify(existing));
// };

// // Get challenge status
// export const getTodayChallengeStatus = (userId: string): ChallengeStatus => {
//   const today = getTodayChallenge();
//   const progress = getUserProgress(userId);
//   const match = progress.find(p => p.challengeId === today.id);
//   return match ? match.status : 'unsolved';
// };

// // Basic stats
// export const getUserStats = (userId: string) => {
//   const progress = getUserProgress(userId);
//   const solved = progress.filter(p => p.status === 'solved').length;
//   const unsolved = progress.filter(p => p.status === 'unsolved').length;
//   const skipped = progress.filter(p => p.status === 'skipped').length;

//   return {
//     solved,
//     unsolved,
//     skipped,
//     total: progress.length
//   };
// };


import { db } from '@/firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  datePosted: string;
  code: string;
  testCases: TestCase[];
}

export interface TestCase {
  input: string;
  expectedOutput: string;
  explanation?: string;
}

export type ChallengeStatus = 'solved' | 'unsolved' | 'skipped';

export interface UserProgress {
  userId: string;
  challengeId: string;
  status: ChallengeStatus;
  date: string;
}

// 🔥 Fetch all challenges from Firestore
export const fetchChallenges = async (): Promise<Challenge[]> => {
  const querySnapshot = await getDocs(collection(db, 'challenges'));
  const challenges: Challenge[] = [];
  querySnapshot.forEach((docSnap) => {
    challenges.push({ id: docSnap.id, ...(docSnap.data() as Challenge) });
  });
  return challenges;
};

// 🔥 Return today’s challenge dynamically
export const getTodayChallenge = async (): Promise<Challenge | null> => {
  const challenges = await fetchChallenges();
  if (challenges.length === 0) return null;
  const today = new Date();
  const dayIndex = today.getDate() % challenges.length;
  return challenges[dayIndex];
};


// 🔥 New: get today's challenge status from Firestore
export const getTodayChallengeStatus = async (userId: string, todayChallengeId: string): Promise<ChallengeStatus> => {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    console.warn('User not found in Firestore');
    return 'unsolved';
  }

  const userData = userSnap.data();
  const progress = userData?.progress || [];

  const todayDate = new Date().toISOString().split('T')[0];
  const todayProgress = progress.find((p: any) => p.date === todayDate);

  return todayProgress ? todayProgress.status : 'unsolved';
};

