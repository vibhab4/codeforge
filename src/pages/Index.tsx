
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/utils/authContext';
import { Code, CheckCircle, Calendar, BarChart } from 'lucide-react';

const Index: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If user is already logged in, redirect to challenge page
    if (isAuthenticated) {
      navigate('/challenge');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto mb-6">
            <Code className="h-16 w-16 inline-block" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">CodeForge</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            One coding challenge every day to improve your skills and maintain your streak.
          </p>
          <Button 
            size="lg"
            onClick={() => navigate('/login')}
            className="bg-white text-primary hover:bg-gray-100"
          >
            Get Started
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="mx-auto mb-4 bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center">
                <Code className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Daily Challenges</h3>
              <p className="text-gray-600">
                Get a new coding problem every day to solve and practice your skills.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="mx-auto mb-4 bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
              <p className="text-gray-600">
                Mark challenges as solved, unsolved, or skipped to track your journey.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="mx-auto mb-4 bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Build Streaks</h3>
              <p className="text-gray-600">
                Maintain your streak by solving problems daily and watch your skills grow.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to start coding?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join today and start improving your coding skills one challenge at a time.
          </p>
          <Button 
            size="lg"
            onClick={() => navigate('/login')}
          >
            Sign In
          </Button>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="py-8 bg-gray-900 text-white mt-auto">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-4">
            <Code className="h-6 w-6 text-white opacity-80" />
          </div>
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} CodeForge. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
