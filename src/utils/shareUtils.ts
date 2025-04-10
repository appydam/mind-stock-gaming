
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
      // WhatsApp doesn't support direct image sharing via URL, so we'll download the image first
      // and share the text with a link to the app
      window.open(`https://api.whatsapp.com/send?text=${encodedText} Join us at: ${appUrl}`, '_blank');
      setTimeout(() => {
        downloadShareImage(imageUrl, 'mindstock-share'); // Download image for manual sharing
      }, 100);
      break;
    case SharePlatform.Twitter:
      // For Twitter, we'll use the Web Intent API with the image as a separate URL
      // This will create a draft tweet with text and image for user to review and post
      const blob = dataURLToBlob(imageUrl);
      const filesToAttach = new File([blob], 'mindstock-share.png', { type: 'image/png' });
      
      // Create form data to upload the image directly
      const formData = new FormData();
      formData.append('media', filesToAttach);
      
      // Since direct image upload isn't possible with just a URL,
      // we'll open a new window with the text and prompt to attach the downloaded image
      window.open(`https://twitter.com/intent/tweet?text=${encodedText}`, '_blank');
      
      // Also download the image for manual attachment
      setTimeout(() => {
        downloadShareImage(imageUrl, 'mindstock-share');
      }, 100);
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

// Helper function to convert data URL to Blob
const dataURLToBlob = (dataURL: string): Blob => {
  const parts = dataURL.split(';base64,');
  const contentType = parts[0].split(':')[1];
  const raw = window.atob(parts[1]);
  const rawLength = raw.length;
  const uInt8Array = new Uint8Array(rawLength);

  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], { type: contentType });
};
