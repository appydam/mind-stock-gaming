
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { format } from "date-fns";

interface GeoQuestProgressProps {
  startTime: string;
  endTime: string;
  status: "active" | "upcoming" | "completed";
}

const GeoQuestProgress = ({ startTime, endTime, status }: GeoQuestProgressProps) => {
  if (status !== "active") return null;

  const calculateProgress = (start: string, end: string): number => {
    const startDate = new Date(start).getTime();
    const endDate = new Date(end).getTime();
    const now = new Date().getTime();
    
    if (now <= startDate) return 0;
    if (now >= endDate) return 100;
    
    const total = endDate - startDate;
    const elapsed = now - startDate;
    
    return Math.round((elapsed / total) * 100);
  };

  return (
    <div className="mb-4">
      <Progress 
        value={calculateProgress(startTime, endTime)} 
        className="h-1.5"
      />
      <div className="flex justify-between text-xs text-muted-foreground mt-1">
        <span>{format(new Date(startTime), "MMM d")}</span>
        <span>{format(new Date(endTime), "MMM d")}</span>
      </div>
    </div>
  );
};

export default GeoQuestProgress;
