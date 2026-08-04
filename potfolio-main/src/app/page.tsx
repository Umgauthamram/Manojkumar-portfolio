import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/app/components/HeroSection';
import AboutSection from '@/app/components/AboutSection';
import SkillsSection from '@/app/components/SkillsSection';
import ProjectsSection from '@/app/components/ProjectsSection';
import ExperienceSection from '@/app/components/ExperienceSection';
import TestimonialsSection from '@/app/components/TestimonialsSection';
import ContactSection from '@/app/components/ContactSection';
import NovaStarOrb from '@/app/components/NovaStarOrb';
import CustomCursor from '@/app/components/CustomCursor';
import LoadingScreen from '@/app/components/LoadingScreen';
import ScrollToTop from '@/app/components/ScrollToTop';
import CommandPalette from '@/app/components/CommandPalette';

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground cursor-none">
      <LoadingScreen />
      <CustomCursor />
      <NovaStarOrb />
      <CommandPalette />
      <Header />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
      <ScrollToTop />
    </main>
  );
}
