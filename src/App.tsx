import { useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import FragranceNotes from './sections/FragranceNotes';
import WhyChoose from './sections/WhyChoose';
import FeaturedProduct from './sections/FeaturedProduct';
import BrandStory from './sections/BrandStory';
import Testimonials from './sections/Testimonials';
import FAQ from './sections/FAQ';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="min-h-screen bg-black text-body font-sans selection:bg-primary selection:text-black overflow-x-hidden">
      
      {/* Cinematic Loader Screen */}
      <LoadingScreen onComplete={() => setIsLoading(false)} />

      {/* Website Content */}
      {!isLoading && (
        <div className="animate-fade-in">
          
          {/* Navigation */}
          <Navbar />

          {/* Main Layout Sections */}
          <main>
            <Hero />
            <FragranceNotes />
            <WhyChoose />
            <FeaturedProduct />
            <BrandStory />
            <Testimonials />
            <FAQ />
            <Contact />
          </main>

          {/* Luxury Footer */}
          <Footer />

        </div>
      )}

    </div>
  );
}
