'use client';

import { useEffect, useState } from 'react';

import { useWindowSize, useMouse } from '@uidotdev/usehooks';
import { generateUniqueRandomValues } from './helpers/utils';
import { Header } from './components/Header';
import { RateChart } from './components/RateChart';
import { ConverterHome } from './components/ConverterHome';

type Lines = {
  animationDelay: string;
  left: string;
}[];

export default function Home() {
  const { width } = useWindowSize();
  const [mouse] = useMouse();
  const [lines, setLines] = useState<Lines>();

  useEffect(() => {
    if (width) {
      const totalLines = Math.ceil(width / 200);
      const newLines: Lines = Array.from({ length: totalLines });
      const animationDelays = generateUniqueRandomValues(1, totalLines, totalLines);

      newLines.forEach((_, index) => {
        const left = `${index === 0 ? 200 : (index + 1) * 200}px`;

        newLines[index] = {
          animationDelay: `${animationDelays[index]}s`,
          left
        };
      });

      setLines(newLines);
    }
  }, [width]);

  return (
    <main
      style={
        {
          '--cursor-x': mouse.x + 'px',
          '--cursor-y': mouse.y + 'px'
        } as React.CSSProperties
      }
    >
      <div className="home-hero-bg">
        <div className="home-hero-bg-tiles"></div>
      </div>

      <div
        className="lines"
        style={
          {
            '--animationDuration': lines?.length ? `${lines.length}s` : '1s'
          } as React.CSSProperties
        }
      >
        {lines?.length &&
          lines.map((line, index) => {
            return (
              <div
                key={index}
                className="line"
                style={
                  {
                    '--animationDelay': line.animationDelay,
                    left: line.left
                  } as React.CSSProperties
                }
              ></div>
            );
          })}
      </div>

      <div className="container mx-auto px-4 py-8">
        <Header />

        <ConverterHome />

        <RateChart />
      </div>
    </main>
  );
}
