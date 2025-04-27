import { db } from '@/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export const updateUserProgress = async (userId: string, todayChallengeId: string, status: 'solved' | 'unsolved' | 'skipped') => {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    const userData = userSnap.data();
    const progress = userData.progress || [];

    // Check if today's challenge already has an entry
    const todayDate = new Date().toISOString().split('T')[0]; // "2025-04-25"
    const existingIndex = progress.findIndex((p: any) => p.date === todayDate);

    if (existingIndex !== -1) {
      // Update existing
      progress[existingIndex] = { date: todayDate, status };
    } else {
      // Add new
      progress.push({ date: todayDate, status });
    }

    // Recalculate streak
    let streak = 0;
    const solvedDates = progress
      .filter((p: any) => p.status === 'solved')
      .map((p: any) => new Date(p.date))
      .sort((a: Date, b: Date) => b.getTime() - a.getTime());

    if (solvedDates.length > 0) {
      streak = 1;
      for (let i = 1; i < solvedDates.length; i++) {
        const diff = (solvedDates[i - 1].getTime() - solvedDates[i].getTime()) / (1000 * 60 * 60 * 24);
        if (diff === 1) {
          streak++;
        } else {
          break;
        }
      }
    }

    const challengesSolved = progress.filter((p: any) => p.status === 'solved').length;

    await updateDoc(userRef, {
      progress,
      challengesSolved,
      streak
    });
  }
};
