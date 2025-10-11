import React from 'react';
import { Dialog, DialogContent } from './ui/dialog';
import { SearchCheck, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

interface SiteAuditFormProps {
  formUrl: string;
}

const SiteAuditForm = ({ formUrl }: SiteAuditFormProps) => {
  return (
    <div className="text-center">
      <div className="flex justify-center mb-6">
        <SearchCheck className="h-16 w-16 text-primary" />
      </div>
      <h2 className="text-2xl font-bold mb-3">Get Your Free SEO Site Audit</h2>
      <p className="mb-6 text-muted-foreground">
        We'll analyze your site and deliver a comprehensive report within the same business day if ordered before 3 PM CST.
      </p>
      <Button className="w-full" onClick={() => window.open(formUrl, '_blank')}>
        Request Your Free Audit <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
      <p className="mt-4 text-sm text-muted-foreground">
        You'll receive a detailed PDF report and book a call with your Search Serpa to review findings.
      </p>
    </div>
  );
};

// Create a global store for the dialog state
type AuditDialogStore = {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
};

// Create a global store for the dialog
let auditDialogStore: AuditDialogStore = {
  isOpen: false,
  setOpen: () => {},
};

// Function to open the dialog from anywhere
export const openAuditDialog = () => {
  auditDialogStore.setOpen(true);
};

export const AuditDialog = () => {
  // Bloom.io form URL
  const formUrl = "https://nxtmt.bloom.io/get-started-23";
  
  // Set up the dialog state
  const [isOpen, setIsOpen] = React.useState(false);
  
  // Update the global store with the setter
  React.useEffect(() => {
    auditDialogStore.setOpen = setIsOpen;
    
    // Optional: Show popup after 15 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 15000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <SiteAuditForm formUrl={formUrl} />
      </DialogContent>
    </Dialog>
  );
};

export default AuditDialog;