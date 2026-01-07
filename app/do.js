"use client"

import { useState, useEffect, useRef } from "react";
import Hero from "../components/pages/landing-page/Hero"
import {
  Heart,
  Users,
  ArrowRight,
  GraduationCap,
  HandHeart,
  Droplets,
  ChevronDown,
  ChevronUp,
  MapPin,
  Calendar,
  ShieldCheck,
  Scale,
  Eye,
  Sparkles,
  Handshake,
  CheckCircle2,
  ChevronLeft,
  Quote,
  Clock,
  Zap
} from "lucide-react";

// ==================== DATA ====================

const testimonials = [
  {
    quote: "AHF's scholarship program changed my life. From an orphan with no hope, I'm now a university graduate with a bright future ahead.",
    author: "Emmanuel O.",
    role: "OVC Scholarship Beneficiary"
  },
  {
    quote: "The vocational training gave me a second chance. After leaving prison, I had no skills, but now I can support my family through tailoring.",
    author: "Sunday I.",
    role: "Reformed Inmate"
  },
  {
    quote: "When I lost my husband, I felt the world had ended. AHF's widows empowerment program gave me the seed capital to start my own business.",
    author: "Mama Blessing",
    role: "Widows Program Beneficiary"
  }
];

const mandates = [
  {
    icon: Heart,
    title: "Hospitalized & Medical Outreaches",
    description: "Restoring health and comfort to those in hospital wards through medical supplies, care packages, and emotional support.",
    color: "text-red-600",
    bgColor: "bg-red-50",
  },
  {
    icon: GraduationCap,
    title: "Orphans & Vulnerable Children (OVC)",
    description: "Securing the future through scholarships, eye care programs, and educational support for children who need it most.",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    icon: Users,
    title: "Prison Inmates (Reformation)",
    description: "Skill acquisition and reintegration programs giving inmates a second chance at life with dignity and purpose.",
    color: "text-blue-800",
    bgColor: "bg-blue-50",
  },
  {
    icon: HandHeart,
    title: "Widows Empowerment",
    description: "Empowering widowed women with tools, training, and resources for financial independence and self-sufficiency.",
    color: "text-red-500",
    bgColor: "bg-red-50",
  },
  {
    icon: Droplets,
    title: "Community Development",
    description: "Providing clean water access and public safety advocacy for rural communities across Nigeria.",
    color: "text-cyan-600",
    bgColor: "bg-cyan-50",
  },
];

const courses = [
  {
    title: "Vocational Skills Training",
    duration: "6 Months",
    description: "Tailoring, shoe making, and craftsmanship for financial independence.",
    image: "https://images.unsplash.com/photo-1544928147-7972df4641bb?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Information Technology (IT)",
    duration: "3 Months",
    description: "Basic computer operations and digital literacy for the modern world.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
  }
];

// ==================== HELPERS ====================

const CountUp = ({ end, start }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / 2000, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, start]);
  return <>{count}</>;
};

// ==================== SECTIONS ===================

const WhoWeAre = () => (
  <section className="py-32 bg-white w-full">
    <div className="w-[90%] mx-auto">
      <div className="grid lg:grid-cols-2 gap-20 items-center">
        <div className="relative rounded-[3rem] overflow-hidden aspect-[4/3] bg-gradient-to-br from-red-500 to-red-300 flex items-center justify-center shadow-2xl">
           <h2 className="text-white text-9xl font-black opacity-30">AHF</h2>
           <p className="absolute bottom-10 left-10 text-white font-bold text-xl uppercase tracking-widest">Est. 2007</p>
        </div>
        <div>
          <span className="inline-block px-4 py-1 mb-6 text-xs font-black tracking-widest uppercase bg-red-50 text-red-600 rounded-md">
            Who We Are
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-blue-900 mb-8 leading-tight tracking-tight">A Journey of Love and Compassion</h2>
          <p className="text-xl text-gray-500 leading-relaxed mb-8">
            Founded in 2007 by Mr. Apiriala Atedoghu, AHF began a journey of love at General Hospital Kubwa. What started as a simple act of compassion has grown into a movement that touches thousands of lives.
          </p>
          <div className="flex gap-8 mb-10">
            <div className="flex items-center gap-2 text-gray-600 font-bold uppercase text-sm"><Calendar className="text-red-600" size={20}/> Est. 2007</div>
            <div className="flex items-center gap-2 text-gray-600 font-bold uppercase text-sm"><MapPin className="text-red-600" size={20}/> Warri, Nigeria</div>
          </div>
          <button className="bg-blue-950 text-white px-10 py-5 rounded-xl font-black flex items-center gap-3 hover:bg-blue-900 transition-all">
            Read Our Full Story <ArrowRight size={20}/>
          </button>
        </div>
      </div>
    </div>
  </section>
);

const CoreMandates = () => {
    const [openIndex, setOpenIndex] = useState(0);
    return (
        <section className="py-32 bg-gray-50 w-full">
            <div className="w-[90%] mx-auto">
                <div className="text-center mb-20">
                    <span className="inline-block px-4 py-1 mb-6 text-xs font-black tracking-widest uppercase bg-red-100 text-red-600 rounded-md">What We Do</span>
                    <h2 className="text-4xl md:text-7xl font-black text-blue-900 tracking-tighter uppercase">Our 5 Core Mandates</h2>
                </div>
                <div className="max-w-4xl mx-auto space-y-4">
                    {mandates.map((m, i) => (
                        <div key={i} className={`bg-white rounded-3xl overflow-hidden transition-all duration-300 border-2 ${openIndex === i ? 'border-red-600 shadow-xl' : 'border-transparent'}`}>
                            <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full flex items-center justify-between p-8 text-left">
                                <div className="flex items-center gap-6">
                                    <div className={`p-4 rounded-2xl ${m.bgColor}`}><m.icon className={m.color} size={32}/></div>
                                    <h3 className="text-2xl font-black text-blue-900 uppercase tracking-tight">{m.title}</h3>
                                </div>
                                {openIndex === i ? <ChevronUp className="text-red-600"/> : <ChevronDown className="text-gray-300"/>}
                            </button>
                            {openIndex === i && (
                                <div className="px-10 pb-10 pl-28 animate-in fade-in slide-in-from-top-2">
                                    <p className="text-gray-500 text-xl leading-relaxed mb-8">{m.description}</p>
                                    <button className="flex items-center gap-2 text-red-600 font-black uppercase text-sm group">
                                        Learn More <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform"/>
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const FeaturedProject = () => (
    <section className="py-32 bg-white w-full">
        <div className="w-[90%] mx-auto">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
                <div>
                    <span className="inline-block px-4 py-1 mb-6 text-xs font-black tracking-widest uppercase bg-red-50 text-red-600 rounded-md">Featured Project</span>
                    <h2 className="text-4xl md:text-7xl font-black text-blue-900 mb-8 leading-[0.9] tracking-tighter">Rural Community <br/> Outreach — Rumuekini 2021</h2>
                    <p className="text-xl text-gray-500 mb-12">Reached over 115 community members with free medical care, foodstuff, and clothing.</p>
                    <div className="grid grid-cols-3 gap-4">
                        {[
                            { icon: Users, val: "115+", label: "People" },
                            { icon: Heart, val: "Free", label: "Medical" },
                            { icon: MapPin, val: "Rivers", label: "State" }
                        ].map((item, i) => (
                            <div key={i} className="bg-gray-50 p-6 rounded-3xl text-center">
                                <item.icon className="mx-auto text-red-600 mb-4" size={24}/>
                                <div className="text-2xl font-black text-blue-900">{item.val}</div>
                                <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{item.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="aspect-square bg-blue-900 rounded-[4rem] shadow-2xl relative overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1000" className="object-cover w-full h-full opacity-60" alt="Outreach"/>
                </div>
            </div>
        </div>
    </section>
);

const Courses = () => (
    <section className="py-32 bg-blue-950 w-full relative">
        <div className="w-[90%] mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                <div>
                    <span className="inline-block px-4 py-1 mb-6 text-xs font-black tracking-widest uppercase bg-red-600 text-white rounded-md">Education</span>
                    <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase">Academic Center</h2>
                </div>
                <p className="text-blue-200 text-xl italic max-w-xs text-right">Free specialized learning programs for self-sufficiency.</p>
            </div>
            <div className="grid lg:grid-cols-2 gap-12">
                {courses.map((c, i) => (
                    <div key={i} className="group relative bg-white rounded-[3rem] overflow-hidden flex flex-col md:flex-row h-full transition-all hover:scale-[1.02]">
                        <div className="md:w-1/2 h-64 md:h-auto overflow-hidden">
                            <img src={c.image} alt={c.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"/>
                        </div>
                        <div className="md:w-1/2 p-12 flex flex-col justify-center">
                            <div className="flex items-center gap-2 text-red-600 font-black text-xs uppercase tracking-widest mb-4"><Clock size={16}/> {c.duration}</div>
                            <h3 className="text-3xl font-black text-blue-900 mb-4 leading-tight">{c.title}</h3>
                            <p className="text-gray-500 mb-8">{c.description}</p>
                            <button className="w-full py-4 bg-blue-900 text-white rounded-2xl font-black uppercase hover:bg-red-600 transition-all">Enroll Free</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const Stats = () => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold: 0.5 });
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);
    return (
        <section ref={ref} className="py-32 bg-blue-900 w-full text-white">
            <div className="w-[90%] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
                {[
                    { val: 100, label: "Widows Helped", color: "text-red-500" },
                    { val: 15, label: "Years Impact", color: "text-white" },
                    { val: 19, label: "Scholarships", color: "text-red-500" },
                    { val: 110, label: "Inmates Trained", color: "text-white" }
                ].map((s, i) => (
                    <div key={i}>
                        <div className={`text-6xl md:text-8xl font-black ${s.color} mb-2`}><CountUp end={s.val} start={isVisible}/>+</div>
                        <div className="text-blue-200 font-black uppercase text-xs tracking-widest">{s.label}</div>
                    </div>
                ))}
            </div>
        </section>
    );
};

const Testimonials = () => {
    const [index, setIndex] = useState(0);
    const [fade, setFade] = useState(true);

    const next = () => {
        setFade(false);
        setTimeout(() => {
            setIndex((prev) => (prev + 1) % testimonials.length);
            setFade(true);
        }, 300);
    };

    const prev = () => {
        setFade(false);
        setTimeout(() => {
            setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
            setFade(true);
        }, 300);
    };

    return (
        <section className="py-32 bg-white w-full text-center">
            <div className="w-[90%] mx-auto max-w-5xl">
                <h2 className="text-4xl md:text-7xl font-black text-blue-900 mb-20 tracking-tighter uppercase">Lives Transformed</h2>
                <div className="bg-gray-50 rounded-[3.5rem] p-12 md:p-24 text-left relative shadow-sm min-h-[400px] flex flex-col justify-center">
                    <Quote className="text-red-600/10 absolute top-10 left-10" size={120}/>
                    
                    <div className={`transition-all duration-300 transform ${fade ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        <p className="text-2xl md:text-4xl font-medium text-blue-900 leading-tight mb-12 italic relative z-10">
                            "{testimonials[index].quote}"
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-t border-gray-200 pt-10 mt-auto gap-8">
                        <div className={`transition-all duration-300 ${fade ? 'opacity-100' : 'opacity-0'}`}>
                            <h4 className="text-2xl font-black text-blue-900">{testimonials[index].author}</h4>
                            <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">{testimonials[index].role}</p>
                        </div>
                        <div className="flex gap-4">
                            <button onClick={prev} className="w-16 h-16 rounded-full border-2 border-gray-200 flex items-center justify-center hover:bg-red-600 hover:text-white hover:border-red-600 transition-all active:scale-90 shadow-sm"><ChevronLeft size={28}/></button>
                            <button onClick={next} className="w-16 h-16 rounded-full border-2 border-gray-200 flex items-center justify-center hover:bg-red-600 hover:text-white hover:border-red-600 transition-all active:scale-90 shadow-sm"><ArrowRight size={28}/></button>
                        </div>
                    </div>
                    
                    {/* Progress Indicator */}
                    <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-4">
                        {testimonials.map((_, i) => (
                            <button key={i} onClick={() => { setFade(false); setTimeout(() => { setIndex(i); setFade(true); }, 300); }} 
                                    className={`h-2 rounded-full transition-all duration-500 ${index === i ? 'w-12 bg-red-600' : 'w-3 bg-gray-200 hover:bg-gray-300'}`} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const FAQ = () => {
    const [openIdx, setOpenIdx] = useState(0);
    const faqs = [
        { q: "How are the funds utilized?", a: "100% of public donations go directly to programs. Administrative costs are covered by our board and corporate partners." },
        { q: "Can I choose which program to support?", a: "Yes, you can specify if your donation should go to the OVC Scholarship, Prison Reformation, or Widows Empowerment." },
        { q: "Where is AHF located?", a: "Our headquarters are in Warri, Delta State, with active branches in Benin City, Edo State." }
    ];
    return (
        <section className="py-32 bg-gray-50 w-full">
            <div className="w-[90%] mx-auto max-w-4xl">
                <h2 className="text-4xl md:text-6xl font-black text-blue-900 text-center mb-20 uppercase tracking-tighter">Common Questions</h2>
                <div className="space-y-4">
                    {faqs.map((f, i) => (
                        <div key={i} className="bg-white rounded-3xl p-8 shadow-sm transition-all hover:shadow-md">
                            <button onClick={() => setOpenIdx(openIdx === i ? null : i)} className="w-full flex justify-between items-center text-left">
                                <span className="text-2xl font-black text-blue-900 leading-tight max-w-[80%]">{f.q}</span>
                                <div className={`p-2 rounded-full transition-transform ${openIdx === i ? 'rotate-180 bg-red-600 text-white' : 'bg-gray-100 text-gray-400'}`}><ChevronDown size={24}/></div>
                            </button>
                            {openIdx === i && <p className="mt-8 text-gray-500 text-xl leading-relaxed animate-in fade-in duration-500">{f.a}</p>}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const DonateSection = () => (
    <section className="py-40 bg-white w-full">
        <div className="w-[90%] mx-auto text-center">
            <div className="bg-[#000000] rounded-[4rem] py-24 px-10 relative overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-blue-900/10 pointer-events-none" />
                <h2 className="text-5xl md:text-8xl font-black text-white mb-10 leading-tight relative z-10">Your Support Saves Lives.</h2>
                <button className="bg-white text-red-600 px-16 py-8 rounded-full font-black text-3xl shadow-2xl transition-all transform hover:scale-110 flex items-center gap-4 mx-auto uppercase relative z-10">
                    <Heart fill="currentColor" size={32} /> Donate Now
                </button>
            </div>
        </div>
    </section>
);

// ==================== MAIN PAGE ====================

const Index = () => {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-red-600 selection:text-white">
      <Hero />
      <WhoWeAre />
      <CoreMandates />
      <FeaturedProject />
      <Courses />
      <Stats />
      <Testimonials />
      <FAQ />
      <DonateSection />
      <footer className="py-12 text-center text-gray-400 font-black uppercase text-[10px] tracking-[0.5em] border-t border-gray-100">
          AHF Foundation • Since 2007 • Matthew 25:31-46
      </footer>
    </div>
  );
};

export default Index;