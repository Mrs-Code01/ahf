import React, { useState, useRef, useEffect } from "react";

const Stats = () => {
  const CountUp = ({ end, start }) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
      if (!start) return;
      let startTime;
      const animate = timestamp => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / 2000, 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }, [end, start]);
    return <>{count}</>;
  };
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <section ref={ref} className="py-[30px] bg-[#000000] w-full text-white">
      <div className="w-[90%] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
        {[
          { val: 100, label: "Widows Helped", color: "text-red-500" },
          { val: 15, label: "Years Impact", color: "text-white" },
          { val: 19, label: "Scholarships", color: "text-red-500" },
          { val: 110, label: "Inmates Trained", color: "text-white" }
        ].map((s, i) => (
          <div key={i}>
            <div className={`text-6xl md:text-8xl font-black ${s.color} mb-2`}>
              <CountUp end={s.val} start={isVisible} />+
            </div>
            <div className="text-blue-200 font-black uppercase text-xs tracking-widest">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
