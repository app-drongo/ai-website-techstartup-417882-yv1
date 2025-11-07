'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Zap, Shield, Globe, Rocket, Star } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import type { Container, Engine } from 'tsparticles-engine';
import { ReactTyped } from 'react-typed';
import Countdown from 'react-countdown';
import { Link } from 'react-scroll';

type BackgroundPattern = 'dots' | 'grid' | 'gradient';

const DEFAULT_HERO = {
  badge: '🚀 Product Launch in',
  title: 'Build AI-Powered',
  titleHighlight: 'Automation',
  subtitle:
    "Transform your business with intelligent automation solutions. Join 10,000+ companies already scaling with TechFlow's cutting-edge AI platform.",
  primaryCTA: 'Start Free Trial',
  secondaryCTA: 'Watch Demo',
  primaryCTAHref: '/signup',
  secondaryCTAHref: '/demo',
  feature1Icon: 'zap',
  feature1Text: 'AI-Powered',
  feature2Icon: 'shield',
  feature2Text: 'Enterprise Ready',
  feature3Icon: 'globe',
  feature3Text: 'Global Scale',
  trustedByText: 'Trusted by industry leaders worldwide',
  showTrustedLogos: true,
  backgroundPattern: 'gradient' as BackgroundPattern,
  showAnimatedBadge: true,
  launchDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
  typedStrings: ['Automation', 'Intelligence', 'Innovation', 'Solutions'],
} as const;

type HeroProps = Partial<typeof DEFAULT_HERO>;

// Countdown renderer component
const CountdownRenderer = ({ days, hours, minutes, seconds, completed }: any) => {
  if (completed) {
    return <span className="text-primary font-bold">🎉 Launched!</span>;
  } else {
    return (
      <div className="flex items-center gap-2 text-xs">
        <div className="flex flex-col items-center">
          <span className="font-bold text-primary">{days}</span>
          <span className="text-muted-foreground">days</span>
        </div>
        <span className="text-muted-foreground">:</span>
        <div className="flex flex-col items-center">
          <span className="font-bold text-primary">{hours}</span>
          <span className="text-muted-foreground">hrs</span>
        </div>
        <span className="text-muted-foreground">:</span>
        <div className="flex flex-col items-center">
          <span className="font-bold text-primary">{minutes}</span>
          <span className="text-muted-foreground">min</span>
        </div>
      </div>
    );
  }
};

export default function Hero(props: HeroProps) {
  const config = { ...DEFAULT_HERO, ...props };
  const navigate = useSmartNavigation();
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handleMouseMove = (event: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set((event.clientX - centerX) / 20);
      mouseY.set((event.clientY - centerY) / 20);
    }
  };

  const particlesInit = async (engine: Engine) => {
    await loadSlim(engine);
  };

  const particlesLoaded = async (container?: Container) => {
    console.log('Particles loaded', container);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'zap':
        return Zap;
      case 'shield':
        return Shield;
      case 'globe':
        return Globe;
      default:
        return Sparkles;
    }
  };

  const Feature1Icon = getIcon(config.feature1Icon);
  const Feature2Icon = getIcon(config.feature2Icon);
  const Feature3Icon = getIcon(config.feature3Icon);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-background"
      onMouseMove={handleMouseMove}
      data-editable="hero"
    >
      {/* Particles Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: 'transparent',
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: 'push',
              },
              onHover: {
                enable: true,
                mode: 'repulse',
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: 'hsl(var(--primary))',
            },
            links: {
              color: 'hsl(var(--primary))',
              distance: 150,
              enable: true,
              opacity: 0.1,
              width: 1,
            },
            move: {
              direction: 'none',
              enable: true,
              outModes: {
                default: 'bounce',
              },
              random: false,
              speed: 1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.2,
            },
            shape: {
              type: 'circle',
            },
            size: {
              value: { min: 1, max: 3 },
            },
          },
          detectRetina: true,
        }}
        className="absolute inset-0"
      />

      {/* Background Pattern */}
      {config.backgroundPattern === 'dots' && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--primary)_0.5px,transparent_0.5px)] [background-size:16px_16px] opacity-[0.03]" />
      )}
      {config.backgroundPattern === 'grid' && (
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:64px_64px]" />
      )}
      {config.backgroundPattern === 'gradient' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/[0.05] via-transparent to-accent/[0.08]"
          style={{ y, opacity }}
        />
      )}

      {/* Floating gradient orbs with parallax */}
      <motion.div
        className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/[0.05] blur-3xl"
        style={{
          x: springX,
          y: springY,
        }}
      />
      <motion.div
        className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-accent/[0.05] blur-3xl"
        style={{
          x: useTransform(springX, value => -value),
          y: useTransform(springY, value => -value),
        }}
      />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="flex min-h-screen flex-col items-center justify-center py-20 text-center">
          {/* Animated Badge with Countdown */}
          {config.showAnimatedBadge && (
            <motion.div
              className="mb-8 inline-flex"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="flex items-center gap-3 rounded-full border border-border bg-background/50 backdrop-blur-sm px-6 py-3 text-sm"
                animate={{
                  boxShadow: [
                    '0 0 0 0 hsl(var(--primary) / 0.3)',
                    '0 0 0 10px hsl(var(--primary) / 0)',
                    '0 0 0 0 hsl(var(--primary) / 0)',
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: 'loop',
                }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                  <Rocket className="h-4 w-4 text-primary" />
                </motion.div>
                <span data-editable="badge" className="text-muted-foreground">
                  {config.badge}
                </span>
                <Countdown date={config.launchDate} renderer={CountdownRenderer} />
              </motion.div>
            </motion.div>
          )}

          {/* Main Title with Typing Effect */}
          <motion.h1
            className="max-w-4xl text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span data-editable="title" className="text-foreground">
              {config.title}
            </span>
            <span className="relative ml-3 block sm:inline">
              <span className="bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent">
                <ReactTyped
                  strings={config.typedStrings}
                  typeSpeed={100}
                  backSpeed={50}
                  backDelay={2000}
                  loop
                  showCursor={true}
                  cursorChar="|"
                />
              </span>
              <motion.div
                className="absolute -right-2 -top-2"
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: 'loop',
                }}
              >
                <Star className="h-6 w-6 text-primary/60 fill-current" />
              </motion.div>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            data-editable="subtitle"
            className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {config.subtitle}
          </motion.p>

          {/* Feature Pills */}
          <motion.div
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {[
              { Icon: Feature1Icon, text: config.feature1Text, editableKey: 'feature1Text' },
              { Icon: Feature2Icon, text: config.feature2Text, editableKey: 'feature2Text' },
              { Icon: Feature3Icon, text: config.feature3Text, editableKey: 'feature3Text' },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-2 rounded-full border border-border bg-background/50 backdrop-blur-sm px-4 py-2 text-sm"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <feature.Icon className="h-4 w-4 text-primary" />
                <span data-editable={feature.editableKey} className="text-muted-foreground">
                  {feature.text}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="mt-10 flex flex-col gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="group px-8 text-base font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
                onClick={() => navigate(config.primaryCTAHref)}
                data-editable-href="primaryCTAHref"
                data-href={config.primaryCTAHref}
              >
                <span data-editable="primaryCTA">{config.primaryCTA}</span>
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                className="border-border/50 backdrop-blur-sm text-base font-medium hover:bg-background/50 transition-all"
                onClick={() => navigate(config.secondaryCTAHref)}
                data-editable-href="secondaryCTAHref"
                data-href={config.secondaryCTAHref}
              >
                <span data-editable="secondaryCTA">{config.secondaryCTA}</span>
              </Button>
            </motion.div>
          </motion.div>

          {/* Trusted By Section */}
          {config.showTrustedLogos && (
            <motion.div
              className="mt-20 w-full max-w-4xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <p data-editable="trustedByText" className="mb-6 text-sm text-muted-foreground">
                {config.trustedByText}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-8 opacity-50 grayscale">
                {/* Placeholder for logos - in production these would be actual logos */}
                {[1, 2, 3, 4, 5].map(i => (
                  <motion.div
                    key={i}
                    className="h-8 w-24 rounded bg-muted-foreground/10"
                    whileHover={{ opacity: 0.8, grayscale: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Link to="features" smooth={true} duration={500} className="cursor-pointer">
              <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center">
                <motion.div
                  className="w-1 h-3 bg-primary rounded-full mt-2"
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
