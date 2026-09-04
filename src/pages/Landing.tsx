import LandingNavbar from '@/components/landing/LandingNavbar';
import LandingHero from '@/components/landing/LandingHero';
import LandingFeatures from '@/components/landing/LandingFeatures';
import LandingCTA from '@/components/landing/LandingCTA';
import LandingFooter from '@/components/landing/LandingFooter';

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#05060f] text-slate-100 relative overflow-hidden font-display">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[36rem] h-[36rem] rounded-full bg-indigo-600/30 blur-3xl animate-float-slow" />
        <div className="absolute top-1/3 -right-40 w-[32rem] h-[32rem] rounded-full bg-fuchsia-500/20 blur-3xl animate-float-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-0 left-1/3 w-[28rem] h-[28rem] rounded-full bg-cyan-500/15 blur-3xl animate-float-slow" style={{ animationDelay: '4s' }} />
      </div>
      <div className="relative z-10">
        <LandingNavbar />
        <LandingHero />
        <LandingFeatures />
        <LandingCTA />
        <LandingFooter />
      </div>
    </div>
  );
}
