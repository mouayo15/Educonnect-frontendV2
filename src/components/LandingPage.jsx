import { Header } from './Header';
import { Hero } from './Hero';
import { Levels } from './Levels';
import { Subjects } from './Subjects';
import { Features } from './Features';
import { Stats } from './Stats';

export function LandingPage({ onGetStarted }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header onGetStarted={onGetStarted} />
      <Hero onGetStarted={onGetStarted} />
      <Stats />
      <Levels />
      <Subjects />
      <Features />
    </div>
  );
}
