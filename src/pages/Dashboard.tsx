import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import ProgressStats from '@/components/ProgressStats';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/utils/authContext';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase';

interface UserStats {
  challengesSolved: number;
  streak: number;
  total: number;
}

const Dashboard: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<UserStats>({
    challengesSolved: 0,
    streak: 0,
    total: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // useEffect(() => {
  //   const fetchStats = async () => {
  //     if (user) {
  //       const userDoc = await getDoc(doc(db, 'users', user.uid));
  //       if (userDoc.exists()) {
  //         const data = userDoc.data();
  //         setStats({
  //           challengesSolved: data.challengesSolved || 0,
  //           streak: data.streak || 0,
  //           total: data.progress ? data.progress.length : 0,
  //         });
  //       }
  //     }
  //     setLoading(false);
  //   };
  //   fetchStats();
  // }, [user]);

  useEffect(() => {
    if (!user) return;

    const userRef = doc(db, 'users', user.uid);

    const unsubscribe = onSnapshot(userRef, (userDoc) => {
      if (userDoc.exists()) {
        const data = userDoc.data();
        setStats({
          challengesSolved: data.challengesSolved || 0,
          streak: data.streak || 0,
          total: data.progress ? data.progress.length : 0,
        });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);


  if (!isAuthenticated || !user || loading) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold">
              Welcome, {user?.displayName || user?.email?.split('@')[0]} 👋
            </h1>
            <h2 className="text-2xl font-semibold mt-2 text-gray-700">
              Your Dashboard
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium">Challenges Completed</CardTitle>
                <Code className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.challengesSolved}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.total > 0
                    ? `${Math.round((stats.challengesSolved / stats.total) * 100)}% completion rate`
                    : 'No challenges attempted yet'}
                </p>
              </CardContent>
            </Card>

            {/* <Card>
              <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.streak} days</div>
                <p className="text-xs text-muted-foreground">
                  {stats.streak > 0
                    ? 'Keep the momentum going!'
                    : 'Start your streak today'}
                </p>
              </CardContent>
            </Card> */}

            <Card>
              <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium">Time Remaining</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {(() => {
                    const now = new Date();
                    const midnight = new Date();
                    midnight.setHours(24, 0, 0, 0);
                    const diff = midnight.getTime() - now.getTime();
                    const hours = Math.floor(diff / (1000 * 60 * 60));
                    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                    return `${hours}h ${minutes}m`;
                  })()}
                </div>
                <p className="text-xs text-muted-foreground">
                  Until tomorrow's challenge
                </p>
              </CardContent>
            </Card>
          </div>

          <ProgressStats
            solved={stats.challengesSolved}
            unsolved={stats.total - stats.challengesSolved}
            streak={stats.streak}
            total={stats.total}
          />

          <div className="mt-8 flex justify-center">
            <Button
              onClick={() => navigate('/challenge')}
              className="flex items-center"
            >
              <Code className="h-4 w-4 mr-2" />
              Today's Challenge
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;



