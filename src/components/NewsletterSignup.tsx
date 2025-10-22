import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Mail, ArrowRight } from 'lucide-react';

export default function NewsletterSignup() {
  // Track multi-step form state
  const [step, setStep] = useState(1);
  
  // Form data state
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle first step submit
  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setStep(2);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API submission
    try {
      // In a real implementation, you would submit to a backend API
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form submitted:', { email, firstName, lastName, phone });
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-12 bg-white border-y border-border/20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold">
              Subscribe to Our SEO Newsletter
            </h2>
          </div>
          
          <p className="text-center text-muted-foreground mb-8 max-w-xl mx-auto">
            Stay updated with the latest SEO tips, tricks, and industry insights delivered straight to your inbox.
          </p>

          {isSubmitted ? (
            // Success message
            <div className="bg-primary/5 p-8 rounded-lg text-center">
              <h3 className="text-xl font-bold mb-2">Thank You for Subscribing!</h3>
              <p className="text-muted-foreground">
                You're all set to receive our best SEO tips and resources. 
                Keep an eye on your inbox for our next newsletter.
              </p>
            </div>
          ) : (
            // Multi-step form
            <div className="bg-muted/30 rounded-lg p-8 border border-border/40 shadow-sm">
              {step === 1 ? (
                // Step 1: Email only
                <form onSubmit={handleNextStep} className="space-y-4">
                  <div>
                    <Label htmlFor="email" className="text-base font-medium">
                      Email Address
                    </Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="your@email.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full"
                  >
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              ) : (
                // Step 2: Name and phone fields
                <form onSubmit={handleSubmit} className="space-y-4">
                  <p className="text-sm text-primary mb-4">
                    <strong>Email:</strong> {email} <Button variant="link" onClick={() => setStep(1)} className="p-0 h-auto">Edit</Button>
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-base font-medium">
                        First Name
                      </Label>
                      <Input 
                        id="firstName" 
                        type="text" 
                        placeholder="First name" 
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-base font-medium">
                        Last Name
                      </Label>
                      <Input 
                        id="lastName" 
                        type="text" 
                        placeholder="Last name" 
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="phone" className="text-base font-medium">
                      Phone Number <span className="text-xs text-muted-foreground">(optional)</span>
                    </Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="Your phone number" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="mt-1"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Helps deliver time-sensitive SEO alerts and personalized tips to improve your rankings.
                    </p>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                    {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}