import { useEffect, useRef, useState } from 'react';
import { STATS } from '@/data/siteData';

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true;
        const dur = 1800;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setN(Math.round(eased * value));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-5xl lg:text-6xl font-serif font-bold text-[#F5B335]">
      {n}{suffix}
    </div>
  );
}

export default function Stats() {
  return (
    <section className="bg-[#111] py-16 lg:py-20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, #F5B335 0, transparent 40%), radial-gradient(circle at 80% 70%, #5A3E2B 0, transparent 50%)' }} />
      <div className="relative max-w-6xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-10">
        {STATS.map((s, i) => (
          <div key={i} className="text-center">
            <Counter value={s.value} suffix={s.suffix} />
            <p className="text-white/80 mt-3 font-medium">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
