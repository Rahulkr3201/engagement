import { useEffect, useRef, useState } from 'react';
import { invitationData as d } from '../data/invitationData';
const REVEAL_AT=.45,BRUSH=30;
// Gold foil painted on a canvas over the date; scratching erases it (destination-out) and it clears itself once mostly gone.
function paintFoil(canvas){const dpr=window.devicePixelRatio||1,w=canvas.offsetWidth,h=canvas.offsetHeight;canvas.width=w*dpr;canvas.height=h*dpr;const x=canvas.getContext('2d');x.scale(dpr,dpr);
const g=x.createLinearGradient(0,0,w,h);g.addColorStop(0,'#b88a4a');g.addColorStop(.3,'#ecd29c');g.addColorStop(.55,'#c39657');g.addColorStop(.8,'#f3dfb3');g.addColorStop(1,'#b0813f');x.fillStyle=g;x.fillRect(0,0,w,h);
for(let i=0;i<90;i++){x.fillStyle=`rgba(255,250,235,${Math.random()*.5})`;x.beginPath();x.arc(Math.random()*w,Math.random()*h,Math.random()*1.4+.3,0,7);x.fill()}
x.strokeStyle='#fff6e0aa';x.lineWidth=1;x.strokeRect(8.5,8.5,w-17,h-17);
x.fillStyle='#5a3b17';x.textAlign='center';x.font='700 24px "Cormorant Garamond", serif';x.letterSpacing='3px';x.fillText('SCRATCH HERE',w/2,h/2-8);x.letterSpacing='0px';x.font='600 15px "Cormorant Garamond", serif';x.letterSpacing='2px';x.fillText('✦ TO REVEAL OUR DATE ✦',w/2,h/2+20);x.letterSpacing='0px'}
function ScratchCard(){const canvas=useRef(null),[revealed,setRevealed]=useState(false),[touched,setTouched]=useState(false),drawing=useRef(false),last=useRef(null),moves=useRef(0);
useEffect(()=>{const c=canvas.current;if(!c)return;const repaint=()=>{if(!moves.current)paintFoil(c)};paintFoil(c);document.fonts?.ready.then(repaint);window.addEventListener('resize',repaint);return()=>window.removeEventListener('resize',repaint)},[]);
const scratchedShare=()=>{const c=canvas.current,x=c.getContext('2d'),{data}=x.getImageData(0,0,c.width,c.height);let clear=0,n=0;for(let i=3;i<data.length;i+=4*24){n++;if(data[i]<40)clear++}return clear/n};
const point=e=>{const r=canvas.current.getBoundingClientRect();return[e.clientX-r.left,e.clientY-r.top]};
const line=(a,b)=>{const x=canvas.current.getContext('2d');x.globalCompositeOperation='destination-out';x.lineCap=x.lineJoin='round';x.lineWidth=BRUSH;x.beginPath();x.moveTo(...a);x.lineTo(...b);x.stroke()};
const down=e=>{if(revealed)return;drawing.current=true;canvas.current.setPointerCapture(e.pointerId);last.current=point(e);line(last.current,last.current)};
const move=e=>{if(!drawing.current)return;if(!touched)setTouched(true);const p=point(e);line(last.current,p);last.current=p;if(++moves.current%8===0&&scratchedShare()>REVEAL_AT)setRevealed(true)};
const up=()=>{drawing.current=false;if(!revealed&&scratchedShare()>REVEAL_AT)setRevealed(true)};
return <><div className={`scratch-card${revealed?' revealed':touched?' touched':''}`}>
<div className="scratch-date"><p className="eyebrow">{d.event.day}</p><p className="scratch-day">{d.event.dateNumber} {d.event.month} {d.event.year}</p><p className="scratch-time">{d.event.time} onwards</p></div>
<canvas ref={canvas} className="scratch-foil" role="button" tabIndex={revealed?-1:0} aria-label="Scratch to reveal the date, or press Enter" aria-hidden={revealed} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();setRevealed(true)}}}/>
{revealed&&<div className="scratch-burst" aria-hidden="true">{Array.from({length:10},(_,i)=><span key={i} style={{'--a':`${i*36}deg`}}>♥</span>)}</div>}
</div></>}
const UNITS=[['Days',864e5],['Hours',36e5],['Minutes',6e4],['Seconds',1e3]];
function Countdown(){const target=new Date(d.event.startsAt).getTime(),[now,setNow]=useState(()=>Date.now());
useEffect(()=>{const t=setInterval(()=>setNow(Date.now()),1000);return()=>clearInterval(t)},[]);
let left=Math.max(0,target-now);if(!left)return <p className="countdown-done">The celebration has begun ♥</p>;
return <div className="countdown" role="timer" aria-label="Time left until the celebration">{UNITS.map(([label,ms])=>{const v=Math.floor(left/ms);left-=v*ms;return <div key={label} className="countdown-unit"><span>{String(v).padStart(2,'0')}</span><small>{label}</small></div>})}</div>}
export default function SaveTheDate(){return <section className="date-section section reveal" id="details"><p className="eyebrow">MARK YOUR CALENDAR</p><h2>Save the date</h2><ScratchCard/><Countdown/></section>}
