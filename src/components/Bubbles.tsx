"use client";

import { useState, useEffect } from 'react';

interface Bubble {
  id: number;
  size: number;
  left: number;
  delay: number;
  duration: number;
}

const Bubbles = () => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    // Generate bubbles only on the client side to avoid hydration mismatch
    setBubbles(
      Array.from({ length: 15 }, (_, i) => ({
        id: i,
        size: Math.random() * 30 + 10,
        left: Math.random() * 100,
        delay: Math.random() * 10,
        duration: Math.random() * 10 + 8,
      }))
    );
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="bubble"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: `${bubble.left}%`,
            animationDelay: `${bubble.delay}s`,
            animationDuration: `${bubble.duration}s`,
          }}
        />
      ))}
    </div>
  );
};

export default Bubbles;
