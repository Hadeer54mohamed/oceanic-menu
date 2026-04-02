"use client";

import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { Download, Share2, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  translations: any;
}

const QRCodeModal = ({ isOpen, onClose, translations }: QRCodeModalProps) => {
  const menuUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleDownload = () => {
    const svg = document.getElementById('qr-code-svg');
    if (!svg) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const svgData = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    
    canvas.width = 512;
    canvas.height = 512;
    
    img.onload = () => {
      if (ctx) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        const link = document.createElement('a');
        link.download = 'online-menu-qr.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      }
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: translations.brand.name,
          text: translations.qr.shareText,
          url: menuUrl,
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(menuUrl);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden bg-card border-border/50 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="p-6"
        >
          <DialogHeader className="mb-6">
            <DialogTitle className="text-2xl font-bold text-foreground text-center font-arabic">
              {translations.qr.title}
            </DialogTitle>
          </DialogHeader>

          {/* QR Code */}
          <motion.div
            className="flex justify-center mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            <div className="p-4 bg-white rounded-2xl shadow-lg">
              <QRCodeSVG
                id="qr-code-svg"
                value={menuUrl}
                size={200}
                level="H"
                includeMargin={true}
                fgColor="#0d4f6e"
                bgColor="#ffffff"
              />
            </div>
          </motion.div>

          {/* Instructions */}
          <p className="text-center text-muted-foreground text-sm mb-6 font-arabic">
            {translations.qr.instructions}
          </p>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              onClick={handleDownload}
              className="flex-1 ocean-gradient text-primary-foreground"
            >
              <Download className="w-4 h-4 me-2" />
              {translations.qr.download}
            </Button>
            <Button
              onClick={handleShare}
              variant="outline"
              className="flex-1 border-primary/30 hover:bg-primary/10"
            >
              <Share2 className="w-4 h-4 me-2" />
              {translations.qr.share}
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default QRCodeModal;
