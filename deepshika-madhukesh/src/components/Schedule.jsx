import { Coffee, Gem, Utensils, Music2 } from 'lucide-react';
import { invitationData as d } from '../data/invitationData';
import Ornament from './Ornament';
const icons=[Coffee,Gem,Utensils,Music2];
export default function Schedule(){return <section className="schedule section reveal" id="schedule"><p className="eyebrow">A LITTLE LOOK AT THE EVENING</p><h2>Let the celebration unfold</h2><Ornament/><div className="timeline container">{d.schedule.map((item,i)=>{const Icon=icons[i];return <article className="timeline-item" key={item.title}><div className="timeline-icon"><Icon size={24} strokeWidth={1.2}/></div><p className="event-time">{item.time}</p><h3>{item.title}</h3><p>{item.description}</p></article>})}</div></section>}
