import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';
import { Logo } from './Logo';
import { useApp } from '@/context/AppContext';

const navLinks = [
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'For Patients', to: '/patient' },
  { label: 'For Doctors', to: '/doctor' },
  { label: 'Facilities', to: '/facility' },
  { label: 'About', to: '/about' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { loadDemo } = useApp();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleDemo = () => {
    loadDemo();
    navigate('/results');
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-soft border-b border-slate-200' : 'bg-white/60 backdrop-blur-sm'
      }`}
    >
      <nav className="section-container flex h-16 items-center justify-between">
        <Logo />

        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                location.pathname === link.to
                  ? 'text-navy-800 bg-navy-50'
                  : 'text-navy-600 hover:text-navy-800 hover:bg-navy-50'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-2">
          <button
            onClick={handleDemo}
            className="btn-ghost text-teal-600 hover:bg-teal-50 hover:text-teal-700"
          >
            Demo Mode
          </button>
          <Link to="/doctor" className="btn-ghost">
            Login
          </Link>
          <Link to="/doctor/create-referral" className="btn-primary">
            Get Started
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 rounded-lg text-navy-700 hover:bg-navy-50"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white animate-slide-up">
          <div className="section-container py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="block px-3 py-2.5 text-sm font-medium text-navy-700 rounded-lg hover:bg-navy-50"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-slate-200 space-y-2">
              <button
                onClick={handleDemo}
                className="w-full btn-secondary text-teal-600 border-teal-200 hover:bg-teal-50"
              >
                Demo Mode
              </button>
              <Link to="/doctor" className="w-full btn-secondary">
                Login
              </Link>
              <Link to="/doctor/create-referral" className="w-full btn-primary">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
