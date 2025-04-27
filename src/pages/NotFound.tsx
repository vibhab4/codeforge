
import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Code } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="mb-6">
        <Code className="h-16 w-16 text-primary" />
      </div>
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-6">Oops! Challenge not found</p>
      <p className="text-gray-500 mb-8 text-center max-w-md">
        The coding challenge you're looking for doesn't exist or has been moved.
      </p>
      <Button 
        onClick={() => navigate("/")}
        className="flex items-center gap-2"
      >
        Return to Home
      </Button>
    </div>
  );
};

export default NotFound;
