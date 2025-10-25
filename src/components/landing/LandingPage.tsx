import Hero from './Hero';
import Features from './Features';
import Pricing from './Pricing';
import Testimonials from './Testimonials';

export default function LandingPage() {
  return (
    <div className="bg-white">
      <Hero />
      <Features />
      <Testimonials />
      <Pricing />
    </div>
  );
}