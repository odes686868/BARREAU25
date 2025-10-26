import Header from './Header';
import Hero from './Hero';
import Features from './Features';
import Testimonials from './Testimonials';

export default function LandingPage() {
  return (
    <div className="bg-white">
      <Header />
      <Hero />
      <Features />
      <Testimonials />
    </div>
  );
}