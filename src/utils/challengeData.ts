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

