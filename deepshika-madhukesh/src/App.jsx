import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Invitation from './components/Invitation';
import SaveTheDate from './components/SaveTheDate';
import Venue from './components/Venue';
import Schedule from './components/Schedule';
import Footer from './components/Footer';
import BackgroundMusic from './components/BackgroundMusic';
export default function App(){useEffect(()=>{const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.08});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));return()=>observer.disconnect()},[]);
// Cards animate open individually once they are well inside the screen (styles are mobile-only, see .anim in global.css).
useEffect(()=>{const cards=document.querySelectorAll('.invitation-lead,.family,.scratch-card,.countdown,.venue-photo,.timeline-item,.closing-content');document.querySelectorAll('.timeline-item').forEach((el,i)=>el.style.setProperty('--i',i%2));const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in');observer.unobserve(entry.target)}}),{threshold:.3});cards.forEach(el=>{el.classList.add('anim');observer.observe(el)});return()=>observer.disconnect()},[]);return <><a className="skip-link" href="#invitation">Skip to invitation</a><Navbar/><main><Hero/><Invitation/><SaveTheDate/><Venue/><Schedule/></main><Footer/><BackgroundMusic/></>}
