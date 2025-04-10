
import React, { useRef, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { generateShareImage, shareOnPlatform, SharePlatform } from '@/utils/shareUtils';
import { Twitter, Download, Share2, MessageCircle } from 'lucide-react';

interface ShareModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
  shareText: string;
}

const ShareModal = ({ open, onOpenChange, title, children, shareText }: ShareModalProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleShareOnPlatform = async (platform: SharePlatform) => {
    try {
      // Always generate a fresh image to ensure latest data
      if (contentRef.current) {
        setIsGenerating(true);
        const generatedImageUrl = await generateShareImage(contentRef.current);
        setImageUrl(generatedImageUrl);
        setIsGenerating(false);
        
        // Share immediately after generating
        shareOnPlatform(platform, generatedImageUrl, shareText);
      }
    } catch (error) {
      setIsGenerating(false);
      console.error('Error sharing:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Share your achievement on social media
          </DialogDescription>
        </DialogHeader>
        
        <div className="my-4 max-w-sm mx-auto" ref={contentRef}>
          {children}
        </div>
        
        <div className="grid grid-cols-4 gap-2">
          <Button 
            variant="outline" 
            className="flex flex-col items-center" 
            onClick={() => handleShareOnPlatform(SharePlatform.Twitter)}
            disabled={isGenerating}
          >
            <Twitter className="h-5 w-5 mb-1 text-blue-400" />
            <span className="text-xs">Twitter</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex flex-col items-center"
            onClick={() => handleShareOnPlatform(SharePlatform.WhatsApp)}
            disabled={isGenerating}
          >
            <MessageCircle className="h-5 w-5 mb-1 text-green-500" />
            <span className="text-xs">WhatsApp</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex flex-col items-center"
            onClick={() => handleShareOnPlatform(SharePlatform.Instagram)}
            disabled={isGenerating}
          >
            <div className="bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-500 rounded-md p-1 mb-1">
              <Share2 className="h-3 w-3 text-white" />
            </div>
            <span className="text-xs">Instagram</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex flex-col items-center"
            onClick={() => handleShareOnPlatform(SharePlatform.Download)}
            disabled={isGenerating}
          >
            <Download className="h-5 w-5 mb-1" />
            <span className="text-xs">Download</span>
          </Button>
        </div>
        
        {isGenerating && (
          <div className="flex justify-center my-2">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary"></div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
