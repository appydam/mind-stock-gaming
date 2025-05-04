
import React from 'react';
import { Badge } from "@/components/ui/badge";

interface GeoQuestImageProps {
  imageUrl: string;
  title: string;
  status: "active" | "upcoming" | "completed";
  theme: string;
}

const GeoQuestImage = ({ imageUrl, title, status, theme }: GeoQuestImageProps) => {
  const getStatusBadgeVariant = () => {
    switch (status) {
      case 'active': return "default";
      case 'upcoming': return "secondary";
      case 'completed': return "outline";
    }
  };

  return (
    <div className="relative w-full h-40 mb-4 overflow-hidden rounded-md">
      <img 
        src={imageUrl || "https://images.unsplash.com/photo-1516302350523-4c29d47b89e9"} 
        alt={title} 
        className="w-full h-full object-cover" 
      />
      <div className="absolute top-2 right-2 flex gap-2">
        <Badge variant={getStatusBadgeVariant()} className="capitalize">
          {status}
        </Badge>
        <Badge variant="outline" className="bg-white/80">
          {theme}
        </Badge>
      </div>
    </div>
  );
};

export default GeoQuestImage;
