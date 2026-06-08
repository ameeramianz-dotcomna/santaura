import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-black border-t border-white/5 text-muted pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Upper footer columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 items-start text-left">
          
          {/* Logo & Brand Column */}
          <div className="lg:col-span-5 space-y-6">
            <a href="#home" className="flex items-center gap-3 group">
              <img
                src="/logo/logo1.png"
                alt="SENTAURA Logo"
                className="h-10 w-auto object-contain"
              />
              <div className="flex flex-col">
                <span className="text-sm font-serif tracking-[0.25em] text-cream uppercase transition-colors duration-300 group-hover:text-primary">
                  SENTAURA
                </span>
                <span className="text-[7px] tracking-[0.2em] text-accent uppercase font-sans">
                  Haute Parfumerie
                </span>
              </div>
            </a>
            
            <p className="text-xs font-light leading-relaxed max-w-sm">
              An olfactory tribute to classic authority and timeless sillage. Blend concentration Extrait de Parfum, crafted with precious hand-blended ingredients.
            </p>
            
            <div className="space-y-1">
              <p className="text-[10px] text-cream uppercase font-bold tracking-widest font-sans">
                Founder Credit
              </p>
              <p className="text-xs text-primary font-serif italic">
                Built by Ameer Ashiq
              </p>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="text-[10px] font-sans font-bold tracking-widest uppercase text-cream">
              Navigation
            </h4>
            <ul className="space-y-3 text-xs font-light">
              <li>
                <a href="#home" className="hover:text-primary transition-colors">Home</a>
              </li>
              <li>
                <a href="#collection" className="hover:text-primary transition-colors">Featured Scent</a>
              </li>
              <li>
                <a href="#showcase" className="hover:text-primary transition-colors">Story Details</a>
              </li>
              <li>
                <a href="#notes" className="hover:text-primary transition-colors">Olfactory Pyramid</a>
              </li>
              <li>
                <a href="#values" className="hover:text-primary transition-colors">Brand Values</a>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-4 space-y-6">
            <h4 className="text-[10px] font-sans font-bold tracking-widest uppercase text-cream">
              Atelier Newsletter
            </h4>
            <p className="text-xs font-light leading-relaxed">
              Subscribe to receive private notification of private vintage barrel releases and brand events.
            </p>

            <form onSubmit={handleSubscribe} className="relative flex items-center">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={subscribed ? "Subscription Confirmed" : "Enter email address"}
                disabled={subscribed}
                className="w-full bg-black border-b border-white/10 focus:border-primary text-cream py-3 pr-10 text-xs font-sans outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={subscribed}
                className="absolute right-0 text-muted hover:text-primary transition-colors p-2 cursor-pointer"
                aria-label="Submit newsletter subscription"
              >
                {subscribed ? (
                  <span className="text-primary text-xs">✓</span>
                ) : (
                  <ArrowRight size={14} />
                )}
              </button>
            </form>
          </div>

        </div>

        {/* Lower footer copyright */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] uppercase tracking-widest font-sans">
          <div>
            &copy; {new Date().getFullYear()} SENTAURA. All rights reserved.
          </div>
          
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Atelier Access</a>
          </div>

          <div className="text-primary font-bold">
            Built by Ameer Ashiq
          </div>
        </div>

      </div>
    </footer>
  );
}
