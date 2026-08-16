import { Link } from 'react-router-dom';
import { Activity, ShieldCheck, Lock, FileCheck } from 'lucide-react';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="bg-navy-800 text-navy-100 mt-20">
      <div className="section-container py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-xl bg-navy-600 flex items-center justify-center">
                <Activity className="h-4 w-4 text-teal-400" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-display font-bold text-white">
                Care<span className="text-teal-400">Route</span>
              </span>
            </div>
            <p className="text-sm text-navy-200 leading-relaxed max-w-xs">
              From knowing WHAT care is needed to finding WHERE and HOW it can realistically be accessed.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Platform</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/how-it-works" className="text-navy-200 hover:text-teal-400 transition-colors">How It Works</Link></li>
              <li><Link to="/doctor" className="text-navy-200 hover:text-teal-400 transition-colors">Doctor Portal</Link></li>
              <li><Link to="/patient" className="text-navy-200 hover:text-teal-400 transition-colors">Patient Portal</Link></li>
              <li><Link to="/facility" className="text-navy-200 hover:text-teal-400 transition-colors">Facility Portal</Link></li>
              <li><Link to="/admin" className="text-navy-200 hover:text-teal-400 transition-colors">Public Health Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Trust & Privacy</h4>
            <ul className="space-y-3 text-sm text-navy-200">
              <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-teal-400" /> Privacy-first design</li>
              <li className="flex items-center gap-2"><Lock className="h-4 w-4 text-teal-400" /> Encrypted referrals</li>
              <li className="flex items-center gap-2"><FileCheck className="h-4 w-4 text-teal-400" /> Verified facility data</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">About</h4>
            <p className="text-sm text-navy-200 leading-relaxed">
              CareRoute is a healthcare access intelligence platform that connects doctor referrals to feasible care pathways.
            </p>
            <Link to="/about" className="inline-flex items-center gap-1 mt-3 text-sm text-teal-400 hover:text-teal-300">
              Learn more →
            </Link>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-navy-700 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-navy-300">
            © 2026 CareRoute. Prototype for SIH. All facility data is mock/demo.
          </p>
          <div className="flex items-center gap-4 text-xs text-navy-300">
            <span>Not a medical device</span>
            <span>•</span>
            <span>Does not diagnose</span>
            <span>•</span>
            <span>Demo Mode available</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
