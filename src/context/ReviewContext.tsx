"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

interface ReviewState {
  fullName: string;
  setFullName: (name: string) => void;
  contactMethod: string;
  setContactMethod: (method: string) => void;
  contactInfo: string;
  setContactInfo: (info: string) => void;
  experience: string;
  setExperience: (exp: string) => void;
}

const ReviewContext = createContext<ReviewState | undefined>(undefined);

export const ReviewProvider = ({ children }: { children: ReactNode }) => {
  const [fullName, setFullName] = useState("");
  const [contactMethod, setContactMethod] = useState("linkedin");
  const [contactInfo, setContactInfo] = useState("");
  const [experience, setExperience] = useState("");

  return (
    <ReviewContext.Provider value={{ fullName, setFullName, contactMethod, setContactMethod, contactInfo, setContactInfo, experience, setExperience }}>
      {children}
    </ReviewContext.Provider>
  );
};

export const useReview = () => {
  const context = useContext(ReviewContext);
  if (context === undefined) {
    throw new Error('useReview must be used within a ReviewProvider');
  }
  return context;
};
