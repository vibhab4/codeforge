import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, Flame } from 'lucide-react';

interface ProgressStatsProps {
  solved: number;
  unsolved: number;
  streak: number;
  total: number;
}

const ProgressStats: React.FC<ProgressStatsProps> = ({ 
  solved, 
  unsolved, 
  streak, 
  total 
}) => {
  // Calculate percentages
  const solvedPercent = total > 0 ? Math.round((solved / total) * 100) : 0;
  const unsolvedPercent = total > 0 ? Math.round((unsolved / total) * 100) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Challenge Stats</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-success mr-2" />
                <span>Solved</span>
              </div>
              <span className="font-medium">{solved}</span>
            </div>
            <Progress value={solvedPercent} className="h-2 bg-gray-200" />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <XCircle className="h-5 w-5 text-danger mr-2" />
                <span>Unsolved</span>
              </div>
              <span className="font-medium">{unsolved}</span>
            </div>
            <Progress value={unsolvedPercent} className="h-2 bg-gray-200" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Current Streak</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center h-full py-6">
            <div className="flex items-center mb-2">
              <Flame className="h-8 w-8 text-warning mr-2 animate-pulse-subtle" />
              <span className="text-3xl font-bold">{streak}</span>
            </div>
            <p className="text-center text-muted-foreground">
              {streak === 0 
                ? "Start your streak by solving today's challenge!" 
                : `${streak} day${streak !== 1 ? 's' : ''} streak - keep it going!`
              }
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressStats;
