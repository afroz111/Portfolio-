import React, { Suspense, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Volume2, VolumeX, RotateCcw, ChevronDown } from 'lucide-react';
import OfficeExperience from './scene/OfficeExperience.jsx';

const skills = ['React','JavaScript','TypeScript','Java','Spring Boot','Microservices','REST APIs','Redux','SQL','Git'];
export default function App() {
  const [introDone,setIntroDone] = useState(false);
  const [muted,setMuted] = useState(true);
  const [section,setSection] = useState('about');
  useEffect(()=>{ const timer=setTimeout(()=>setIntroDone(true),21800); return ()=>clearTimeout(timer); },[]);
  const skip=()=>setIntroDone(true);
  return <main className="portfolio-shell">
    <div className="scene"><Suspense fallback={<div className="loading">BUILDING THE EXPERIENCE<span> · · ·</span></div>}><OfficeExperience/></Suspense></div>
    <header className="nav">
      <a className="logo" href="#home">AFROZ<span>.</span></a>
      <div className="nav-right"><span className="availability"><i/> HYDERABAD, INDIA</span><a href="mailto:afrozmohammed111@gmail.com">LET'S TALK <ArrowUpRight size={13}/></a></div>
    </header>
    <div className="intro-controls">
      <div className="story-progress"><span className={!introDone?'active':''}/><span className={introDone?'active':''}/></div>
      <span className="story-label">{introDone?'THE DEVELOPER':'AN OFFICE STORY · 01—03'}</span>
      {!introDone && <button onClick={skip} className="skip">SKIP INTRO <ChevronDown size={13}/></button>}
    </div>
    <AnimatePresence>
      {introDone && <motion.section id="home" className="hero-copy" initial={{opacity:0,y:28}} animate={{opacity:1,y:0}} transition={{duration:.9,ease:[.2,.7,.2,1]}}>
        <div className="eyebrow"><span/> FULL STACK DEVELOPER · 5 YEARS EXPERIENCE</div>
        <h1>Engineering<br/><em>what’s next.</em></h1>
        <p className="lead">Hi, I’m <strong>Afroz Mohammed</strong> — I build thoughtful digital experiences and dependable applications, from React interfaces to Java-powered services.</p>
        <div className="hero-actions"><a className="button primary" href="#experience">EXPLORE MY WORK <ArrowUpRight size={15}/></a><a className="button secondary" href="mailto:afrozmohammed111@gmail.com">GET IN TOUCH</a></div>
        <div className="hero-meta"><span>01 <i/> ABOUT</span><span>02 <i/> EXPERIENCE</span><span>03 <i/> TOOLKIT</span></div>
      </motion.section>}
    </AnimatePresence>
    {introDone && <motion.aside className="scene-note" initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} transition={{delay:.4}}>YOU MADE IT IN.<br/><b>TAKE A LOOK AROUND.</b></motion.aside>}
    <div className="scroll-cue">{introDone?'SCROLL TO EXPLORE':'THE STORY IS PLAYING'} <span/></div>
    {introDone && <div className="content">
      <section id="experience" className="content-section">
        <div className="section-kicker">02 / EXPERIENCE</div><h2>Building across<br/><em>the stack.</em></h2>
        <div className="timeline">
          <article><div className="date">CURRENT</div><div><h3>Wipro <small>Full Stack Developer</small></h3><p>Developing and enhancing enterprise applications, contributing across modern frontend experiences and backend services.</p></div></article>
          <article><div className="date">PREVIOUS</div><div><h3>Verizon <small>Full Stack Developer</small></h3><p>Contributed to trade-in platform enhancements, working on customer-facing flows and service integrations.</p></div></article>
          <article><div className="date">EARLIER</div><div><h3>Capgemini <small>Software Engineer</small></h3><p>Started my professional journey building a foundation in enterprise software development.</p></div></article>
        </div>
      </section>
      <section className="content-section toolkit"><div className="section-kicker">03 / TOOLKIT</div><h2>Tools of<br/><em>the trade.</em></h2><div className="skill-list">{skills.map(s=><span key={s}>{s}</span>)}</div></section>
      <section className="content-section contact"><div className="section-kicker">04 / NEXT CHAPTER</div><h2>Have a good<br/><em>problem to solve?</em></h2><a className="button primary" href="mailto:afrozmohammed111@gmail.com">LET'S BUILD TOGETHER <ArrowUpRight size={15}/></a><div className="socials"><a href="https://github.com/afroz111" target="_blank" rel="noreferrer">GITHUB ↗</a><a href="https://www.linkedin.com/in/mohammed-afroz-a48150243/" target="_blank" rel="noreferrer">LINKEDIN ↗</a><a href="mailto:afrozmohammed111@gmail.com">EMAIL ↗</a></div></section>
      <footer className="footer"><span>AFROZ<span className="cyan">.</span></span><span>DESIGNED & BUILT WITH INTENTION · 2026</span></footer>
    </div>}
  </main>;
}