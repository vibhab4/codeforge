
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Code, BarChart, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/utils/authContext';
import DarkModeToggle from '@/components/DarkModeToggle';



const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2.5 fixed w-full top-0 left-0 z-50">
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <Code className="h-6 w-6 text-primary mr-2" />
            <span className="self-center text-xl font-semibold whitespace-nowrap">CodeForge</span>
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <Link 
            to="/challenge" 
            className={`flex items-center px-3 py-2 rounded-md ${
              location.pathname === '/challenge' 
                ? 'text-white bg-primary' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Code className="h-5 w-5 mr-1" />
            <span>Challenge</span>
          </Link>
          
          <Link 
            to="/dashboard" 
            className={`flex items-center px-3 py-2 rounded-md ${
              location.pathname === '/dashboard' 
                ? 'text-white bg-primary' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <BarChart className="h-5 w-5 mr-1" />
            <span>Dashboard</span>
          </Link>

          {/* <DarkModeToggle /> */}
          
          <Button variant="ghost" size="sm" onClick={logout} className="text-gray-700 hover:bg-gray-100">
            <LogOut className="h-4 w-4 mr-1" />
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
