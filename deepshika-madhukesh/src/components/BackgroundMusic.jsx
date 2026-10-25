import { useEffect } from 'react';
import { invitationData as d } from '../data/invitationData';
// One looping track that always plays; there is no pause control. Most browsers block sound until the visitor first
// taps, clicks or presses a key, so if the attempt on load is blocked it starts on that first interaction instead.
let audio;
const getAudio=()=>{if(!audio&&typeof Audio!=='undefined'){audio=new Audio(d.music.src);audio.loop=true;audio.preload='auto';audio.volume=0}return audio};
const fadeIn=(a,ms=1200)=>{const start=performance.now();const step=now=>{const t=Math.min((now-start)/ms,1);a.volume=d.music.volume*t;if(t<1)requestAnimationFrame(step)};requestAnimationFrame(step)};
export function startMusic(){const a=getAudio();if(!a||!a.paused)return;a.play().then(()=>{if(a.volume<d.music.volume)fadeIn(a)}).catch(()=>{})}
export default function BackgroundMusic(){
useEffect(()=>{const gestures=['pointerdown','touchend','keydown'],stop=()=>gestures.forEach(g=>document.removeEventListener(g,startMusic,true));
gestures.forEach(g=>document.addEventListener(g,startMusic,true));getAudio()?.addEventListener('play',stop);
// Phones pause audio when the browser goes to the background; resume when the visitor comes back.
const resume=()=>{if(document.visibilityState==='visible')startMusic()};document.addEventListener('visibilitychange',resume);startMusic();
return()=>{stop();getAudio()?.removeEventListener('play',stop);document.removeEventListener('visibilitychange',resume)}},[]);
return null}
