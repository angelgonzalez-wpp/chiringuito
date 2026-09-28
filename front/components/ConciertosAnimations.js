'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ConciertosAnimations({ children }) {
  const pageRef = useRef(null);

  useLayoutEffect(() => {
    const page = pageRef.current;
    if (!page || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const context = gsap.context(() => {
      const heroTimeline = gsap.timeline({
        defaults: { ease: 'power3.out' }
      });

      heroTimeline
        .from('[data-concerts-hero-eyebrow]', {
          y: 20,
          autoAlpha: 0,
          duration: 0.7
        })
        .from(
          '[data-concerts-hero-title]',
          { y: 30, autoAlpha: 0, duration: 0.8 },
          '-=0.35'
        )
        .from(
          '[data-concerts-hero-subtitle]',
          { y: 20, autoAlpha: 0, duration: 0.7 },
          '-=0.4'
        );

      gsap.utils.toArray('[data-concerts-scroll-section]').forEach((section) => {
        const items = section.querySelectorAll('[data-concerts-scroll-item]');
        if (!items.length) return;

        gsap.from(items, {
          y: 32,
          autoAlpha: 0,
          duration: 0.75,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 82%',
            once: true
          }
        });
      });

      gsap.utils.toArray('[data-concert-card]').forEach((card) => {
        gsap.from(card, {
          y: 28,
          autoAlpha: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            once: true
          }
        });
      });
    }, page);

    return () => context.revert();
  }, []);

  return <main ref={pageRef}>{children}</main>;
}
