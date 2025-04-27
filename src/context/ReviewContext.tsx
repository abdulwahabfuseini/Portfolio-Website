"use client";

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { Comment } from "@/utils/Types";
import toast from "react-hot-toast";

interface ReviewContextType {
  reviews: Comment[];
  isLoading: boolean;
  fetchReviews: () => Promise<void>;
}

// Create the context with a default value (can be undefined or null initially)
const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

interface ReviewProviderProps {
  children: ReactNode;
}

export const ReviewProvider: React.FC<ReviewProviderProps> = ({ children }) => {
  const [reviews, setReviews] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchReviews = useCallback(async () => {
    setIsLoading(true);
    console.log("Context: Fetching reviews...");
    try {
      const response = await fetch("/api/comment");

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error(
          "Context: Failed to fetch reviews:",
          response.status,
          errorData
        );
        toast.error(
          `Failed to load reviews: ${errorData.message || response.statusText}`
        );
        setReviews([]); // Clear reviews on error
      } else {
        const result = await response.json();
        console.log("Context: Reviews fetched:", result);

        if (result.success && Array.isArray(result.data)) {
          setReviews(result.data as Comment[]);
        } else {
          console.error("Context: Invalid data structure received:", result);
          toast.error("Received invalid data format for reviews.");
          setReviews([]);
        }
      }
    } catch (error: any) {
      console.error("Context: Error fetching reviews:", error);
      toast.error(`Error loading reviews: ${error.message}`);
      setReviews([]);
    } finally {
      setIsLoading(false);
      console.log("Context: Fetching finished.");
    }
  }, []);

  // Fetch reviews when the provider mounts
  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const value = {
    reviews,
    isLoading,
    fetchReviews,
  };

  return (
    <ReviewContext.Provider value={value}>{children}</ReviewContext.Provider>
  );
};

// Custom hook to use the Review context
export const useReviews = (): ReviewContextType => {
  const context = useContext(ReviewContext);
  if (context === undefined) {
    throw new Error("useReviews must be used within a ReviewProvider");
  }
  return context;
};
