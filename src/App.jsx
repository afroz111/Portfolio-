import React, { Suspense, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Float, MeshTransmissionMaterial, Sparkles, Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDown, Github, Linkedin, Mail, MoveUpRight } from 'lucide-react';
import ExperienceScene from './scene/OfficeExperience.jsx';

const skills = ['React.js','JavaScript','TypeScript','Java','Spring Boot','Microservices','REST APIs','Redux','HTML & CSS','SQL','Git','Three.js'];
const jobs = [
  { company:'Wipro', role:'Full Stack Developer', period:'CURRENT', copy:'Building and enhancing enterprise applications across modern frontend experiences and backend services.' },
  { company:'Verizon', role:'Full Stack Developer', period:'PREVIOUS', copy:'Contributed to the trade-in platform, improving customer journeys and service integrations.' },
  { company:'Capgemini', role:'Software Engineer', period:'EARLIER', copy:'Built a strong foundation in enterprise software engineering and collaborative product delivery.' }
];
function TopScene(){ return <div className="visual-world"><Canvas dpr={[1,1.5]} camera={{position:[0,0,8],fov:42}} gl={{antialias:true,alpha:true}}><color attach="background" args={['#070910']}/><ambientLight intensity={1.3}/><directionalLight position={[5,6,5]} intensity={3}/><pointLight position={[-4,2,2]} intensity={24} color="#56d9ff"/><pointLight position={[4,-3,-2]} intensity={18} color="#9d7bff"/><Suspense fallback={null}><ExperienceScene/><Environment preset="city"/><Sparkles count={80} scale={9} size={1.8} speed={.25} color="#91eaff"/><Stars radius={45} depth={30} count={700} factor={2} fade speed={.35}/></Suspense></Canvas></div> }
export default function App(){
 const root=useRef(null);
 useEffect(()=>{
   let ctx;
   import('gsap').then(async ({gsap})=>{
     const {ScrollTrigger}=await import('gsap/ScrollTrigger'); gsap.registerPlugin(ScrollTrigger);
     ctx=gsap.context(()=>{
       gsap.from('.hero-kicker',{y:18,opacity:0,duration:.8,delay:.2,ease:'power3.out'});
       gsap.from('.hero-title .line',{y:110,opacity:0,duration:1.15,stagger:.13,delay:.25,ease:'power4.out'});
       gsap.from('.hero-description,.hero-links',{y:22,opacity:0,duration:.8,stagger:.12,delay:.75,ease:'power3.out'});
       gsap.utils.toArray('.reveal').forEach(el=>gsap.from(el,{y:50,opacity:0,duration:1,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 84%'}}));
       gsap.to('.visual-world',{yPercent:12,scale:.92,ease:'none',scrollTrigger:{trigger:'.about-section',start:'top bottom',end:'bottom top',scrub:1}});
     },root);
   });
   return ()=>ctx?.revert();
 },[]);
 return <main ref={root} className="site">
   <TopScene/>
   <header className="topbar"><a className="wordmark" href="#top">AFROZ<span>®</span></a><nav><a href="#about">ABOUT</a><a href="#experience">EXPERIENCE</a><a href="#stack">STACK</a><a className="nav-contact" href="mailto:afrozmohammed111@gmail.com">LET’S TALK <MoveUpRight size={13}/></a></nav></header>
   <section id="top" className="hero">
     <div className="hero-content">
       <div className="hero-kicker"><i/> AVAILABLE FOR NEW OPPORTUNITIES <span>— HYDERABAD, IN</span></div>
       <h1 className="hero-title"><span className="line">Building</span><span className="line outline">digital</span><span className="line">experiences<span className="dot">.</span></span></h1>
       <p className="hero-description">I’m <b>Afroz Mohammed</b>, a Full Stack Developer crafting responsive interfaces and reliable backend systems with React, Java and Spring Boot.</p>
       <div className="hero-links"><a className="pill-link" href="#experience">EXPLORE MY WORK <ArrowDown size={15}/></a><a className="text-link" href="mailto:afrozmohammed111@gmail.com">GET IN TOUCH <ArrowUpRight size={15}/></a></div>
     </div>
     <div className="hero-index"><span>01 / 04</span><span>SCROLL TO EXPLORE ↓</span></div>
     <div className="hero-caption">CREATIVE DEVELOPMENT<br/>ENGINEERED WITH PURPOSE</div>
   </section>
   <section id="about" className="about-section section-pad">
     <div className="section-label reveal">01 — ABOUT ME</div><div className="about-grid"><h2 className="reveal">Code with<br/><em>clarity.</em><br/>Build with<br/><em>purpose.</em></h2><div className="about-copy reveal"><p>I’m a software developer with around five years of experience building web applications. I enjoy connecting thoughtful user experiences with scalable, maintainable services.</p><p>From shaping React interfaces to developing Java and Spring Boot services, I focus on solving real problems and making products feel effortless to use.</p><div className="stat-row"><div><b>05<span>+</span></b><small>YEARS IN TECH</small></div><div><b>03</b><small>COMPANIES</small></div><div><b>01</b><small>FULL STACK MINDSET</small></div></div></div></div>
   </section>
   <section id="experience" className="experience-section section-pad">
     <div className="section-label reveal">02 — EXPERIENCE</div><div className="section-heading reveal"><h2>Where I’ve<br/><em>made impact.</em></h2><span>THE JOURNEY SO FAR ↘</span></div>
     <div className="job-list">{jobs.map((job,i)=><article className="job-card reveal" key={job.company}><span className="job-number">0{i+1}</span><div><h3>{job.company}</h3><p>{job.copy}</p></div><div className="job-meta"><b>{job.role}</b><span>{job.period}</span></div><ArrowUpRight className="job-arrow"/></article>)}</div>
   </section>
   <section id="stack" className="stack-section section-pad"><div className="section-label reveal">03 — TOOLKIT</div><div className="section-heading reveal"><h2>My everyday<br/><em>building blocks.</em></h2><span>TOOLS I WORK WITH ↘</span></div><div className="skill-grid reveal">{skills.map((skill,i)=><div className="skill-chip" key={skill}><span>0{i+1}</span>{skill}<ArrowUpRight size={14}/></div>)}</div></section>
   <section className="contact-section section-pad"><div className="section-label reveal">04 — WHAT’S NEXT?</div><h2 className="reveal">Let’s make<br/><em>something matter.</em></h2><a className="contact-cta reveal" href="mailto:afrozmohammed111@gmail.com">START A CONVERSATION <ArrowUpRight/></a><div className="social-row"><span>HYDERABAD, INDIA</span><div><a href="https://github.com/afroz111" target="_blank" rel="noreferrer"><Github size={16}/> GITHUB</a><a href="https://www.linkedin.com/in/mohammed-afroz-a48150243/" target="_blank" rel="noreferrer"><Linkedin size={16}/> LINKEDIN</a><a href="mailto:afrozmohammed111@gmail.com"><Mail size={16}/> EMAIL</a></div><span>© AFROZ 2026</span></div></section>
 </main>
}