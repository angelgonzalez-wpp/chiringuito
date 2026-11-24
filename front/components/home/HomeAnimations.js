'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PARALLAX_RANGE = 6;

const animarHero = () => {
  gsap
    .timeline({ defaults: { ease: 'power3.out' } })
    .from('[data-hero-eyebrow]', { y: 24, autoAlpha: 0, duration: 0.9 })
    .from('[data-hero-title]', { y: 32, autoAlpha: 0, duration: 0.9 }, '-=0.2')
    .from('[data-hero-actions]', { y: 28, autoAlpha: 0, duration: 0.5 }, '-=0.15');
};

const animarBarraFeatures = () => {
  gsap.from('[data-feature-item]', {
    y: 25,
    autoAlpha: 0,
    duration: 1,
    stagger: 0.1,
    ease: 'power2.out',
    scrollTrigger: { trigger: '[data-feature-bar]', start: 'top 85%', once: true }
  });
};

const animarParallax = () => {
  gsap.utils.toArray('[data-parallax]').forEach((image) => {
    gsap.fromTo(
      image,
      { yPercent: -PARALLAX_RANGE },
      {
        yPercent: PARALLAX_RANGE,
        ease: 'none',
        scrollTrigger: {
          trigger: image.closest('section'),
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8
        }
      }
    );
  });
};

const animarSecciones = () => {
  gsap.utils.toArray('[data-scroll-section]').forEach((section) => {
    gsap.from(section.querySelectorAll('[data-scroll-item]'), {
      y: 45,
      autoAlpha: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: 'power2.out',
      scrollTrigger: { trigger: section, start: 'top 78%', once: true }
    });
  });
};

export default function HomeAnimations({ children }) {
  const pageRef = useRef(null);

  useLayoutEffect(() => {
    const page = pageRef.current;
    if (!page || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const context = gsap.context(() => {
      animarHero();
      animarBarraFeatures();
      animarParallax();
      animarSecciones();
    }, page);

    return () => context.revert();
  }, []);

  return <main ref={pageRef}>{children}</main>;
}
