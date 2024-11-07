"use client";

export const handleFileInput = (e) => {
  if (typeof window === 'undefined') return null;
  return e.target.files;
} 