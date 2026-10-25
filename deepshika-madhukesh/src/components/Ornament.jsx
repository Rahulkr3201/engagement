export default function Ornament({light=false}) { return <div className={`ornament ${light?'light':''}`} aria-hidden="true"><span/>❦<span/></div>; }
