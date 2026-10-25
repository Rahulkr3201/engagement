import { Heart } from 'lucide-react';
import { invitationData as d } from '../data/invitationData';
import Ornament from './Ornament';
export default function Footer(){return <footer className="closing"><img src={d.images.closing} alt="Romantic palace garden at golden sunset" loading="lazy"/><div className="closing-overlay"/><div className="closing-content"><p className="eyebrow">FROM OUR HEARTS TO YOURS</p><h2>Thank You</h2><Ornament light/><p>We can’t wait to celebrate<br/>this special day with you.</p><div className="closing-names">{d.bride.name} & {d.groom.name}</div><Heart size={18} strokeWidth={1}/></div><p className="footer-note">TWO HEARTS. ONE BEAUTIFUL BEGINNING.</p></footer>}
