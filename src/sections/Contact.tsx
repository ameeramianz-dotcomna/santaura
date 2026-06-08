import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Bespoke Order Inquiry',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate luxury API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setFormData({ name: '', email: '', subject: 'Bespoke Order Inquiry', message: '' });
      setTimeout(() => setIsSent(false), 5000);
    }, 1800);
  };

  return (
    <section id="contact" className="py-32 bg-black relative">
      
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute bottom-[10%] right-[10%] w-[30vw] h-[30vw] rounded-full bg-primary/3 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-xl mx-auto mb-20">
          <span className="text-xs uppercase tracking-[0.3em] text-primary font-bold">
            The Inquiries
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-cream uppercase tracking-wide">
            Connect With Us
          </h2>
          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">
          
          {/* Left: Contact Info details */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-12 text-left">
            <div className="space-y-6">
              <span className="text-xs uppercase tracking-[0.25em] text-primary font-bold">
                Private Consultation
              </span>
              <h3 className="text-2xl font-serif text-cream uppercase tracking-wider">
                SCENTAURA Atelier
              </h3>
              <p className="text-body text-xs md:text-sm font-light leading-relaxed max-w-md">
                For retail placements, press requests, or bespoke blend queries, our house is open to assist. You can reach out directly or schedule an appointment.
              </p>
            </div>

            {/* Info Items */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-white/10 rounded flex items-center justify-center text-primary bg-black/30">
                  <Mail size={16} />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-muted font-bold font-sans">Email</h4>
                  <p className="text-cream text-sm font-serif">atelier@scentaura.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-white/10 rounded flex items-center justify-center text-primary bg-black/30">
                  <Phone size={16} />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-muted font-bold font-sans">Concierge</h4>
                  <p className="text-cream text-sm font-serif">+1 (800) SCENTAURA</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-white/10 rounded flex items-center justify-center text-primary bg-black/30">
                  <MapPin size={16} />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-muted font-bold font-sans">Atelier Address</h4>
                  <p className="text-cream text-sm font-serif">Place Vendôme, Paris, France</p>
                </div>
              </div>
            </div>

            <div className="text-[10px] text-muted tracking-widest uppercase font-sans">
              Built by Ameer Ashiq
            </div>
          </div>

          {/* Right: Glassmorphic Contact Form */}
          <div className="lg:col-span-7 bg-black/30 backdrop-blur-md border border-white/5 p-8 md:p-12 rounded-lg relative overflow-hidden">
            <form onSubmit={handleSubmit} className="space-y-6 text-left">
              
              {/* Name field */}
              <div className="flex flex-col space-y-2">
                <label className="text-[10px] font-sans uppercase tracking-widest text-muted font-bold">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Alexander Mercer"
                  className="bg-black/40 border border-white/10 focus:border-primary/50 text-cream px-4 py-3 rounded outline-none font-sans text-xs md:text-sm tracking-wide transition-all duration-300 w-full"
                />
              </div>

              {/* Email field */}
              <div className="flex flex-col space-y-2">
                <label className="text-[10px] font-sans uppercase tracking-widest text-muted font-bold">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="alexander@luxury.com"
                  className="bg-black/40 border border-white/10 focus:border-primary/50 text-cream px-4 py-3 rounded outline-none font-sans text-xs md:text-sm tracking-wide transition-all duration-300 w-full"
                />
              </div>

              {/* Subject dropdown */}
              <div className="flex flex-col space-y-2">
                <label className="text-[10px] font-sans uppercase tracking-widest text-muted font-bold">
                  Inquiry Type
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="bg-black/40 border border-white/10 focus:border-primary/50 text-cream px-4 py-3 rounded outline-none font-sans text-xs md:text-sm tracking-wide transition-all duration-300 w-full appearance-none cursor-pointer"
                >
                  <option value="Bespoke Order Inquiry" className="bg-black">Bespoke Order Inquiry</option>
                  <option value="Retail Partnership" className="bg-black">Retail Partnership</option>
                  <option value="Press Inquiries" className="bg-black">Press Inquiries</option>
                  <option value="General Question" className="bg-black">General Question</option>
                </select>
              </div>

              {/* Message field */}
              <div className="flex flex-col space-y-2">
                <label className="text-[10px] font-sans uppercase tracking-widest text-muted font-bold">
                  Your Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Please detail your request or bespoke composition query..."
                  className="bg-black/40 border border-white/10 focus:border-primary/50 text-cream px-4 py-3 rounded outline-none font-sans text-xs md:text-sm tracking-wide transition-all duration-300 w-full resize-none"
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting || isSent}
                className="w-full py-4 bg-primary text-black font-sans font-bold text-xs uppercase tracking-widest hover:bg-accent disabled:bg-primary/50 transition-colors duration-300 border border-primary flex items-center justify-center gap-3 cursor-pointer"
              >
                {isSubmitting ? (
                  <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : isSent ? (
                  <span>Message Sent Successfully</span>
                ) : (
                  <>
                    <Send size={12} />
                    <span>Send Inquiry</span>
                  </>
                )}
              </button>

            </form>

            {/* Success toast */}
            <AnimatePresence>
              {isSent && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center text-center p-8 space-y-4"
                >
                  <span className="text-5xl">✓</span>
                  <h4 className="text-xl font-serif text-cream uppercase tracking-wide">
                    Thank You
                  </h4>
                  <p className="text-body text-xs md:text-sm font-light max-w-sm leading-relaxed">
                    Your inquiry has been routed to the SCENTAURA concierge. A house representative will connect with you via email within 24 hours.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
