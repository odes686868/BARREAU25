import Header from './Header';
import Hero from './Hero';
import Features from './Features';
import Testimonials from './Testimonials';
import PricingSection from './PricingSection';

export default function LandingPage() {
  return (
    <div className="bg-white">
      <Header />
      <Hero />
      <Testimonials />
      <PricingSection />
      <Features />
    </div>
  );
}