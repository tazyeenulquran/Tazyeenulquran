import React, { useState } from 'react';
import { 
  BookOpen, 
  Phone, 
  Menu, 
  X, 
  Sparkles, 
  UserCheck, 
  ShieldAlert,
  Globe
} from 'lucide-react';
import { PageTab } from '../types';

interface NavbarProps {
  activeTab: PageTab;
  setActiveTab: (tab: PageTab) => void;
  onOpenTrialModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Clean, streamlined navigation links for desktop
  const navItems: { label: string; tab: PageTab }[] = [
    { label: 'Home', tab: 'home' },
    { label: 'About Us', tab: 'about' },
    { label: 'Courses', tab: 'courses' },
    { label: 'Teachers', tab: 'teachers' },
    { label: 'Pricing', tab: 'pricing' },
    { label: 'Blog', tab: 'blog' },
    { label: 'Contact', tab: 'contact' },
  ];

  const handleNavClick = (tab: PageTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 shadow-md bg-white">
      {/* Top Bar with Islamic Motif, WhatsApp & Portal Links */}
      <div className="bg-primary text-ivory text-xs py-2 px-3 sm:px-4 border-b border-accent/20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          
          {/* Left: Calligraphy greeting & worldwide notice */}
          <div className="flex items-center gap-2.5 truncate">
            <span className="font-serif text-accent font-semibold tracking-wide text-sm hidden md:inline whitespace-nowrap">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </span>
            <span className="text-ivory/60 hidden md:inline">|</span>
            <span className="flex items-center gap-1.5 text-ivory/90 text-[11px] sm:text-xs whitespace-nowrap">
              <Globe className="w-3.5 h-3.5 text-accent flex-shrink-0" />
              <span>Serving Students in USA, UK, Canada, Australia, Europe & Gulf</span>
            </span>
          </div>

          {/* Right: Direct WhatsApp Contact & Dashboards */}
          <div className="flex items-center gap-3 sm:gap-4 text-xs flex-shrink-0">
            <a 
              href="https://wa.me/923052350269" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-medium text-accent hover:text-white transition-colors whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 flex-shrink-0" />
              <span>WhatsApp: +92 305 2350269</span>
            </a>

            <span className="text-accent/40">|</span>

            {/* Quick access to Student & Admin Portal */}
            <button 
              onClick={() => handleNavClick('student-portal')} 
              className={`hover:text-accent transition-colors flex items-center gap-1 whitespace-nowrap ${activeTab === 'student-portal' ? 'text-accent font-bold' : 'text-ivory/80'}`}
              title="Student Learning Portal"
            >
              <UserCheck className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Student Portal</span>
            </button>

            <button 
              onClick={() => handleNavClick('admin')} 
              className={`hover:text-accent transition-colors flex items-center gap-1 whitespace-nowrap ${activeTab === 'admin' ? 'text-accent font-bold' : 'text-ivory/80'}`}
              title="Academy Admin Panel"
            >
              <ShieldAlert className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Admin</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 gap-3 xl:gap-6">
            
            {/* Brand Logo & Tagline */}
            <div 
              className="flex items-center gap-3 cursor-pointer group flex-shrink-0 py-1"
              onClick={() => handleNavClick('home')}
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-primary flex items-center justify-center border-2 border-accent shadow-sm group-hover:scale-105 transition-transform flex-shrink-0">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-serif text-lg sm:text-xl xl:text-2xl font-bold text-primary tracking-tight leading-tight block whitespace-nowrap">
                  Tazyeenul Quran <span className="text-accent">Academy</span>
                </span>
                <span className="text-[10px] sm:text-[11px] xl:text-xs text-charcoal/70 tracking-wide font-medium block whitespace-nowrap leading-tight mt-0.5">
                  Beautifying Hearts with the Light of the Quran
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1 xl:space-x-2 flex-shrink-0">
              {navItems.map((item) => (
                <button
                  key={item.tab}
                  onClick={() => handleNavClick(item.tab)}
                  className={`px-2.5 py-1.5 xl:px-3.5 xl:py-2 rounded-lg text-xs xl:text-sm font-semibold tracking-wide whitespace-nowrap transition-all duration-200 ${
                    activeTab === item.tab
                      ? 'text-primary font-bold bg-ivory border-b-2 border-accent shadow-xs'
                      : 'text-charcoal hover:text-primary hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Desktop Action CTA */}
            <div className="hidden lg:flex items-center flex-shrink-0">
              <button
                onClick={() => handleNavClick('trial')}
                className="relative inline-flex items-center justify-center px-4 py-2 xl:px-5 xl:py-2.5 text-xs xl:text-sm font-bold text-primary-dark transition-all duration-300 rounded-full shadow-md bg-gradient-to-r from-accent via-accent-light to-accent hover:shadow-gold hover:scale-105 active:scale-95 group overflow-hidden border border-accent-dark/30 whitespace-nowrap flex-shrink-0"
              >
                <Sparkles className="w-3.5 h-3.5 xl:w-4 xl:h-4 mr-1.5 text-primary group-hover:rotate-12 transition-transform flex-shrink-0" />
                <span>Book Free Trial</span>
              </button>
            </div>

            {/* Mobile / Tablet Hamburger & Quick CTA */}
            <div className="flex items-center lg:hidden gap-2">
              <button
                onClick={() => handleNavClick('trial')}
                className="px-3 py-1.5 text-xs font-semibold text-primary-dark rounded-full bg-accent hover:bg-accent-light shadow-sm whitespace-nowrap"
              >
                Free Trial
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-primary hover:text-accent hover:bg-ivory focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white/98 backdrop-blur-md px-4 pt-3 pb-6 space-y-1 shadow-xl">
            <div className="pb-2 mb-2 border-b border-gray-100 text-xs text-charcoal/60 px-2 font-medium">
              Beautifying Hearts with the Light of the Quran
            </div>
            
            {/* Nav list with full labels for mobile */}
            {[
              { label: 'Home', tab: 'home' as PageTab },
              { label: 'About Us', tab: 'about' as PageTab },
              { label: 'Our Courses', tab: 'courses' as PageTab },
              { label: 'Our Teachers', tab: 'teachers' as PageTab },
              { label: 'Pricing Plans', tab: 'pricing' as PageTab },
              { label: 'Free Trial', tab: 'trial' as PageTab },
              { label: 'Blog', tab: 'blog' as PageTab },
              { label: 'Contact Us', tab: 'contact' as PageTab },
            ].map((item) => (
              <button
                key={item.tab}
                onClick={() => handleNavClick(item.tab)}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-base font-medium flex items-center justify-between transition-colors ${
                  activeTab === item.tab
                    ? 'text-primary bg-ivory font-bold border-l-4 border-accent'
                    : 'text-charcoal hover:bg-gray-50'
                }`}
              >
                <span>{item.label}</span>
                {item.tab === 'trial' && (
                  <span className="text-xs bg-accent/20 text-accent-dark px-2.5 py-0.5 rounded-full font-bold">Free</span>
                )}
              </button>
            ))}

            <div className="pt-4 border-t border-gray-100 space-y-2">
              <button
                onClick={() => handleNavClick('student-portal')}
                className="w-full text-left px-4 py-2 text-sm text-charcoal/80 flex items-center gap-2 hover:text-primary transition-colors"
              >
                <UserCheck className="w-4 h-4 text-primary" />
                <span>Student Portal</span>
              </button>
              <button
                onClick={() => handleNavClick('admin')}
                className="w-full text-left px-4 py-2 text-sm text-charcoal/80 flex items-center gap-2 hover:text-accent transition-colors"
              >
                <ShieldAlert className="w-4 h-4 text-accent" />
                <span>Admin Dashboard</span>
              </button>
              <a
                href="https://wa.me/923052350269"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full mt-2 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 text-white font-semibold text-sm shadow hover:bg-emerald-700 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Chat on WhatsApp (+92 305 2350269)</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
