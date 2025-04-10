
import { toPng } from 'html-to-image';
import { saveAs } from 'file-saver';

// Platforms for sharing
export enum SharePlatform {
  WhatsApp = 'whatsapp',
  Twitter = 'twitter',
  Instagram = 'instagram',
  Download = 'download'
}

// Function to create image from HTML element
export const generateShareImage = async (element: HTMLElement): Promise<string> => {
  try {
    const dataUrl = await toPng(element, { 
      quality: 0.95,
      backgroundColor: '#ffffff',
      pixelRatio: 2 
    });
    return dataUrl;
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
};

// Function to download the image
export const downloadShareImage = (dataUrl: string, filename: string) => {
  saveAs(dataUrl, `${filename}.png`);
};

// Function to share on different platforms
export const shareOnPlatform = (platform: SharePlatform, imageUrl: string, text: string) => {
  const encodedText = encodeURIComponent(text);
  const encodedImage = encodeURIComponent(imageUrl);
  const appUrl = encodeURIComponent("https://mindstockgaming.com");
  
  switch (platform) {
    case SharePlatform.WhatsApp:
      // WhatsApp doesn't support image sharing via URL, so we'll just share the text
      window.open(`https://api.whatsapp.com/send?text=${encodedText} Join us at: ${appUrl}`, '_blank');
      break;
    case SharePlatform.Twitter:
      window.open(`https://twitter.com/intent/tweet?text=${encodedText}&url=${appUrl}`, '_blank');
      break;
    case SharePlatform.Instagram:
      // Instagram doesn't support direct URL sharing, we need to download the image first
      alert("To share on Instagram: Download the image, then upload it to Instagram.");
      downloadShareImage(imageUrl, 'mindstock-share');
      break;
    case SharePlatform.Download:
      downloadShareImage(imageUrl, 'mindstock-share');
      break;
    default:
      console.error('Unknown platform');
  }
};
