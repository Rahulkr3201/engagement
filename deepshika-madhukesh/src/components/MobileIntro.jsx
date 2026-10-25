import { useEffect, useState } from 'react';
import { invitationData as d } from '../data/invitationData';
import { startMusic } from './BackgroundMusic';
// Mobile-only opening: tap the sealed envelope, its four flaps fold open and reveal the welcome artwork.
// Hotspots sit over elements drawn in the artwork (left/top/width/height as % of the 941×1672 image).
const FLAPS=['top','bottom','left','right'],OPEN_MS=1700;
// The welcome text is cut from the artwork (vertical bands of the full image) and laid over a text-free copy so it can animate in.
const texts=['title','heart','sub'];
const spots=[{label:'Celebrate with us',to:'#invitation',box:[12,87,76,5.1],glow:true}];
export default function MobileIntro(){const{envelope,reveal,revealBase}=d.images.intro,[phase,setPhase]=useState(()=>typeof window!=='undefined'&&window.location.hash?'open':'closed'),open=phase==='open';
useEffect(()=>{if(phase!=='opening')return;const t=setTimeout(()=>setPhase('open'),OPEN_MS);return()=>clearTimeout(t)},[phase]);
useEffect(()=>{if(open||!window.matchMedia('(max-width: 767px)').matches)return;const root=document.documentElement;root.classList.add('intro-lock');return()=>root.classList.remove('intro-lock')},[open]);
const tap=()=>{if(phase!=='closed')return;startMusic();setPhase('opening')};
return <div className="hero-gate" data-phase={phase} onClick={open?undefined:tap}>
<img className="intro-backdrop" src={phase==='closed'?envelope:reveal} alt="" aria-hidden="true"/>
<div className="ix-frame">
<div className="ix-reveal"><img className="ix-layer" src={revealBase} alt="Our story begins. Step into a beautiful journey filled with love, celebrations and forever moments. The couple sits together on a flower swing in a pastel garden." draggable="false"/>{texts.map(t=><img key={t} className={`ix-layer ix-text ${t}`} src={reveal} alt="" aria-hidden="true" draggable="false"/>)}<div className="ix-names"><p className="ix-names-eyebrow">WE’RE GETTING ENGAGED</p><p className="ix-names-couple">{d.bride.name} <span>&</span> {d.groom.name}</p></div>{open&&spots.map(s=><a key={s.label} className={`intro-spot${s.glow?' glow':''}`} href={s.to.startsWith('#')?s.to:undefined} aria-label={s.label} style={{left:s.box[0]+'%',top:s.box[1]+'%',width:s.box[2]+'%',height:s.box[3]+'%'}} onClick={s.to.startsWith('#')?undefined:e=>{e.preventDefault();document.querySelector(s.to)?.scrollIntoView({behavior:'smooth'})}}/>)}</div>
{!open&&<div className="ix-env">{FLAPS.map(f=><img key={f} className={`ix-layer ix-flap ${f}`} src={envelope} alt={f==='top'?'You are invited. A sealed maroon envelope. Tap to open.':''} aria-hidden={f==='top'?undefined:true} draggable="false"/>)}<img className="ix-layer ix-seal" src={envelope} alt="" aria-hidden="true" draggable="false"/>{phase==='closed'&&<button type="button" className="intro-spot glow" aria-label="Open invitation" style={{left:'26.6%',top:'88.4%',width:'46.7%',height:'6%'}} onClick={e=>{e.stopPropagation();tap()}}/>}</div>}
</div></div>}
