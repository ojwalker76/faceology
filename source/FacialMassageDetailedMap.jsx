import { useState } from "react";

const MUSCLES = {
  frontalis: { name: "Frontalis", region: "Forehead & Scalp", color: "#4a9a9a", origin: "Galea aponeurotica (epicranial aponeurosis)", insertion: "Skin of forehead, eyebrows, root of nose", action: "Raises eyebrows, wrinkles forehead horizontally", nerve: "CN VII — temporal branch", aging: "Chronic contraction creates permanent horizontal forehead lines; hypertonicity pulls scalp forward increasing tension throughout galea", tension: "Raised resting brow, deep horizontal lines, scalp tightness, forehead always appears braced", techniques: ["Deep Muscle Work", "Scalp / Galea Release", "Lymphatic (open)"] },
  corrugator: { name: "Corrugator Supercilii", region: "Glabella & Brow", color: "#e07b54", origin: "Medial superciliary arch (frontal bone)", insertion: "Skin of medial eyebrow", action: "Draws eyebrow medially and downward — creates vertical frown lines", nerve: "CN VII — temporal branch", aging: "Primary driver of the 11 lines between brows; chronic frowning and screen use cause sustained hypertonicity", tension: "Vertical lines between brows; eyebrows drawn together at rest; client looks worried even when relaxed", techniques: ["Deep Muscle Work", "Cross-fiber Friction", "Brow Sculpting"] },
  procerus: { name: "Procerus", region: "Glabella & Brow", color: "#c0392b", origin: "Fascia over nasal bone and upper lateral nasal cartilage", insertion: "Skin between eyebrows (glabella)", action: "Pulls medial brow inferiorly; creates horizontal lines at root of nose", nerve: "CN VII — temporal branch", aging: "Creates horizontal bunny lines across nose bridge; often contracts alongside corrugator", tension: "Horizontal lines at root of nose; nose scrunching at rest; brow depression", techniques: ["Deep Muscle Work", "Light Cross-fiber"] },
  orboculi: { name: "Orbicularis Oculi", region: "Eye Region", color: "#8b5cf6", origin: "Medial orbital margin, medial palpebral ligament, lacrimal bone", insertion: "Skin around orbital rim; lateral palpebral raphe", action: "Closes eyelid; compresses lacrimal sac", nerve: "CN VII — temporal and zygomatic branches", aging: "Lateral portion creates crow's feet; orbital portion compresses lymphatics causing under-eye puffiness; palpebral laxity causes hooding", tension: "Crow's feet; under-eye puffiness; heavy eyelid; fine radiating lines from lateral canthus", techniques: ["Soft Lymphatic", "Gentle Cross-fiber (lateral only)", "Small Cup (lateral only)"] },
  temporalis: { name: "Temporalis", region: "Jaw & Temple", color: "#f59e0b", origin: "Temporal fossa (entire floor and deep surface of temporal fascia)", insertion: "Coronoid process and anterior ramus of mandible", action: "Elevates mandible; posterior fibers retract mandible; maintains jaw position", nerve: "CN V — mandibular division (V3)", aging: "Chronic clenching creates temple hollowing; contributes to lateral brow descent; restriction causes radiating head pain", tension: "Hollowed temples; temporal headache; upper jaw tension; earache without infection", techniques: ["Deep Muscle Work", "Buccal (jaw)", "Lymphatic (close)"] },
  zygmaj: { name: "Zygomaticus Major", region: "Cheek & Mid-Face", color: "#10b981", origin: "Lateral zygomatic bone (cheekbone)", insertion: "Modiolus (corner of mouth); orbicularis oris", action: "Draws angle of mouth superiorly and laterally — primary smiling muscle", nerve: "CN VII — zygomatic and buccal branches", aging: "Repeated contraction deepens nasolabial folds; loss of tone contributes to mid-face descent", tension: "Deep nasolabial folds; flat or descended cheek; cheek drops below zygomatic arch", techniques: ["Facial Sculpting", "Buccal", "Cupping"] },
  zygmin: { name: "Zygomaticus Minor", region: "Cheek & Mid-Face", color: "#34d399", origin: "Malar surface of zygomatic bone", insertion: "Skin of upper lip (lateral to philtrum)", action: "Elevates upper lip; contributes to nasolabial fold", nerve: "CN VII — zygomatic and buccal branches", aging: "Works alongside zygomaticus major in mid-face descent; contributes to upper lip thinning", tension: "Deepening nasolabial fold; upper lip appears thinner; vertical lines lateral to philtrum", techniques: ["Facial Sculpting", "Buccal"] },
  levlabii: { name: "Levator Labii Superioris", region: "Cheek & Mid-Face", color: "#6366f1", origin: "Infraorbital margin of maxilla", insertion: "Skin of upper lip; alar cartilage of nose", action: "Elevates and everts upper lip; dilates nostril", nerve: "CN VII — zygomatic and buccal branches", aging: "Key driver of nasolabial fold deepening; chronic tension thins upper lip appearance", tension: "Deep nasolabial folds; upper lip appears thin; nostrils slightly flared at rest", techniques: ["Buccal", "Deep Muscle Work", "Sculpting"] },
  buccinator: { name: "Buccinator", region: "Cheek — Primary Buccal Target", color: "#ec4899", origin: "Alveolar processes of maxilla and mandible; pterygomandibular raphe", insertion: "Modiolus; blends with orbicularis oris", action: "Compresses cheeks against teeth; assists chewing; maintains food between molars", nerve: "CN VII — buccal branch", aging: "Loss of tone contributes to jowl formation; hypertonicity from grinding creates tension; primary Buccal massage target", tension: "Puffiness at mid-cheek; loss of jawline definition; cheek feels thick and tough on palpation", techniques: ["Buccal Massage", "Facial Sculpting", "Lymphatic"] },
  masseter: { name: "Masseter", region: "Jaw — Most Commonly Hypertonic", color: "#dc2626", origin: "Zygomatic arch and zygomatic process of maxilla", insertion: "Lateral surface and angle of mandible; coronoid process", action: "Elevates mandible (closes jaw); assists lateral jaw movement", nerve: "CN V — mandibular division (V3), masseteric nerve", aging: "Most commonly hypertonic facial muscle; grinding causes bulk hypertrophy that squares jaw and creates jowls; restricts lymphatic drainage", tension: "Squared or enlarged lower jaw; jowling; cheek puffiness; jaw soreness; temporal headaches; grinding sounds", techniques: ["Deep Muscle Work", "Buccal Massage", "Lymphatic (close)"] },
  orboris: { name: "Orbicularis Oris", region: "Mouth & Lower Face", color: "#7c3aed", origin: "No bone attachment — fibers from surrounding muscles and modiolus", insertion: "Skin and mucosa of lips", action: "Closes and protrudes lips; shapes lips for speech and expression", nerve: "CN VII — buccal branch", aging: "Chronic contraction creates perioral vertical lip lines; loss of tone causes lip thinning", tension: "Vertical lines above and below lip border; lip appears thinner; pursed or pinched look at rest", techniques: ["Buccal Massage", "Deep Muscle Work", "Cupping (perioral)"] },
  dao: { name: "Depressor Anguli Oris", region: "Mouth & Lower Face", color: "#9333ea", origin: "Oblique line of mandible", insertion: "Modiolus; skin at angle of mouth", action: "Depresses corner of mouth — creates frowning expression", nerve: "CN VII — marginal mandibular branch", aging: "Hypertonicity causes persistent downturned mouth corners; primary contributor to marionette line formation", tension: "Downturned mouth corners at rest; marionette lines; resting frown; client looks sad or displeased", techniques: ["Buccal Massage", "Deep Muscle Work", "Sculpting (lift)"] },
  mentalis: { name: "Mentalis", region: "Chin", color: "#0891b2", origin: "Incisive fossa of mandible", insertion: "Skin of chin", action: "Elevates and protrudes lower lip; wrinkles chin skin", nerve: "CN VII — marginal mandibular branch", aging: "Hypertonicity creates orange peel chin dimpling; often overactive when orbicularis oris is weak", tension: "Dimpled or bumpy chin texture; puckered chin at rest; lower lip appears pushed forward", techniques: ["Deep Muscle Work", "Buccal (inferior)"] },
  platysma: { name: "Platysma", region: "Neck — Critical Aging Muscle", color: "#f97316", origin: "Fascia over pectoralis major and deltoid (clavicular region)", insertion: "Base of mandible; skin of lower face; corners of mouth", action: "Depresses mandible and lower lip; tenses skin of neck", nerve: "CN VII — cervical branch", aging: "CRITICAL: directly inserts into lower face. Laxity creates neck bands and contributes to jowling, mouth corner descent, and overall lower face sagging.", tension: "Vertical neck bands; jowling; downturned mouth corners; lower face drooping; turkey neck", techniques: ["Lymphatic (neck)", "Sculpting", "Deep Neck Work"] },
  scm: { name: "Sternocleidomastoid (SCM)", region: "Neck — Lymphatic Gatekeeper", color: "#2563eb", origin: "Manubrium of sternum; medial clavicle", insertion: "Mastoid process of temporal bone; superior nuchal line", action: "Rotates head to opposite side; lateral flexion; neck flexion", nerve: "CN XI; cervical plexus (C2-C3)", aging: "Hypertonicity limits lymphatic drainage from the face — puffiness worsens when SCM is chronically tight", tension: "Face appears puffier than expected; lymphatic drainage does not hold; jaw tension; earache; neck headaches", techniques: ["Neck Lymphatic", "Deep Neck Release", "Address before facial drainage"] },
  suboccipital: { name: "Suboccipitals", region: "Head/Neck — Hidden Forehead Driver", color: "#7c3aed", origin: "Posterior atlas (C1) and axis (C2)", insertion: "Inferior nuchal line of occipital bone", action: "Extend and rotate head; fine motor head position control", nerve: "Suboccipital nerve — posterior ramus of C1", aging: "Restriction here is often the hidden driver of chronic forehead tension — the suboccipital-frontal fascial chain runs continuously", tension: "Chronic forehead tension that does not respond to direct treatment; base-of-skull headaches; worsens after screen time", techniques: ["Suboccipital Release", "Address before forehead work"] },
  trapezius: { name: "Trapezius (Upper Fibers)", region: "Neck/Shoulder — Lymphatic Chain", color: "#059669", origin: "External occipital protuberance; ligamentum nuchae; spinous processes C7-T12", insertion: "Lateral clavicle; acromion; spine of scapula", action: "Elevates scapula; extends and laterally flexes head", nerve: "CN XI; cervical plexus (C3-C4)", aging: "Chronic tension restricts lymphatic drainage and compresses cervical lymph nodes — perpetuates facial puffiness and jowling that facial massage alone cannot resolve", tension: "Shoulders raised toward ears; facial puffiness returns quickly after drainage; persistent cheek heaviness", techniques: ["Upper Trap Release", "Clavicular Lymph Nodes", "Neck Release before drainage"] },
  pectoralis: { name: "Pectoralis Major (Clavicular Head)", region: "Chest — Posture & Fascial Chain", color: "#be185d", origin: "Medial clavicle; sternum; upper costal cartilages", insertion: "Greater tubercle of humerus", action: "Flexes and adducts humerus; medially rotates arm", nerve: "Lateral and medial pectoral nerves (C5-T1)", aging: "Tight pectorals pull shoulders forward creating forward head posture — compresses anterior neck lymphatics and accelerates lower face descent via fascial tension chain", tension: "Forward head posture; anterior shoulder rounding; passively stretches and weakens platysma, accelerating neck and face descent", techniques: ["Pec Stretch / Release", "Address posture chain", "Decolletage work"] },
};

const SEQUENCES = [
  { title: "Puffiness / Fluid Retention", tags: ["fluid"], sub: "under-eye bags, morning puffiness", steps: [["Open","Lymphatic Drainage","Open lymph nodes: clavicle to neck to preauricular. Feather pressure."],["Work","Soft Lymphatic","Maintain feather-light pressure throughout entire face."],["Close","Light Sculpting + Effleurage","Gentle strokes to settle and smooth tissue."]] },
  { title: "Fine Lines — Dehydration", tags: ["lines"], sub: "surface crepiness, texture lines", steps: [["Open","Lymphatic Drainage","Clear lymphatic pathways first."],["Work","Facial Cupping","Suction plumps tissue; draws nutrients to surface."],["Work 2","Traditional Soft Lymphatic","Alternate with cupping to maximize fluid movement."],["Close","Lymphatic","Flush loosened congestion."]] },
  { title: "Fine Lines — Expression/Muscle", tags: ["lines"], sub: "forehead, frown lines, crow's feet, lip lines", steps: [["Open","Lymphatic Drainage","Decongest before working muscles."],["Work","Deep Facial Muscle Work","Frontalis (forehead), corrugator/procerus (glabella), orbicularis oculi (crow's feet)."],["Work 2","Buccal (lip lines)","Releases orbicularis oris and buccinator from inside."],["Close","Lymphatic + Effleurage","Drain and calm post-deep work."]] },
  { title: "Smile Lines / Nasolabial Folds", tags: ["lines","lift"], sub: "lines running from nose to mouth corners", steps: [["Open","Lymphatic","Full face drainage sequence."],["Work 1","Buccal — Levator Labii / Buccinator","Work muscles driving the fold from inside."],["Work 2","Deep Muscle — Zygomaticus","External cross-fiber along the fold line."],["Work 3","Sculpting","Lift tissue superiorly along fold."],["Close","Cupping + Lymphatic","Suction along fold, then flush."]] },
  { title: "Forehead Wrinkles", tags: ["lines"], sub: "horizontal lines, raised brow patterns", steps: [["Open","Lymphatic","Drain from forehead toward temporal lymph nodes."],["Work 1","Deep Muscle — Frontalis","Slow, firm cross-fiber friction perpendicular to the lines."],["Work 2","Scalp / Galea Release","Release galea — tightness here pulls forehead skin."],["Work 3","Sculpting","Smooth downward fascial strokes."],["Close","Lymphatic + Effleurage","Calm the tissue."]] },
  { title: "Crow's Feet", tags: ["lines"], sub: "lateral eye lines, crepiness at outer corners", steps: [["Open","Soft Lymphatic","Feather strokes outward from orbit toward preauricular nodes. Extremely light."],["Work","Deep Muscle — Orb. Oculi","Gentle cross-fiber at lateral orbital rim ONLY. Never on orbital bone."],["Work 2","Cupping — Small Cup","Very light suction laterally. Never over eyelid."],["Close","Soft Lymphatic","Drain from lateral eye outward to preauricular."]] },
  { title: "Jowls / Loss of Definition", tags: ["lift"], sub: "jowling, sagging cheeks, jawline loss", steps: [["Open","Lymphatic Drainage","Decongest first — you cannot lift congested tissue."],["Work 1","Buccal — Buccinator + Masseter","Release from inside; address masseter if hypertonic."],["Work 2","Facial Sculpting","Work fascia along jawline and cheekbone superiorly."],["Close","Lymphatic","Drain everything mobilized."]] },
  { title: "Jaw Tension / TMJ / Grinding", tags: ["jaw"], sub: "tight masseter, jaw pain, clenching", steps: [["Open","Deep Muscle — Masseter + Temporalis","Start external before intraoral. Slow sustained pressure."],["Work 1","Deep Muscle — SCM + Digastric","Release cervical connections pulling on jaw."],["Work 2","Buccal Massage","Intraoral masseter and pterygoid release."],["Close","Traditional Soft Lymphatic","Tissue will be tender — parasympathetic finish essential."]] },
  { title: "Deep Wrinkles / Volume Loss", tags: ["lines","lift"], sub: "nasolabial folds, marionette lines, lip lines", steps: [["Open","Lymphatic Drainage","Full lymphatic clearing sequence."],["Work 1","Buccal Massage","Work levator labii, buccinator, orbicularis oris intraorally."],["Work 2","Deep Facial Muscle Work","External work on masseter, zygomaticus major/minor."],["Work 3","Facial Sculpting","Lift and reposition fascia toward origin points."],["Close","Cupping + Lymphatic","Cupping for collagen stimulus, then lymphatic flush."]] },
  { title: "General Aging / Rejuvenation", tags: ["lift"], sub: "combination of laxity, dullness, mild tension", steps: [["Open","Traditional Soft Lymphatic","Most versatile and universally tolerated opening."],["Work 1","Facial Sculpting","Address fascia and overall lift."],["Work 2","Cupping (cheeks + forehead)","Collagen stimulus without aggression."],["Work 3","Buccal (if appropriate)","Deepen results on folds and lip area."],["Close","Lymphatic","Full flush to finish."]] },
  { title: "Sensitive / Reactive Skin", tags: ["sensitive"], sub: "rosacea, post-procedure, compromised barrier", steps: [["Only","Traditional Soft Lymphatic","No cupping, no deep work, no Buccal. Nothing stimulating."],["Goal","Reduce, calm, support","Keep everything parasympathetic. Do not stimulate."]] },
];

const AGING_MAP = [
  ["Forehead lines","Frontalis","Galea aponeurotica, Occipitalis","Deep muscle, Scalp release, Lymphatic"],
  ["Glabella / 11 lines","Corrugator supercilii, Procerus","Orbicularis oculi (medial)","Cross-fiber friction, Deep muscle"],
  ["Crow's feet","Orbicularis oculi (lateral)","Zygomaticus minor, Temporalis","Soft lymphatic, Gentle cross-fiber, Small cup"],
  ["Nasolabial folds","Levator labii sup., Zyg. major/minor","Buccinator, Orbicularis oris","Buccal, Deep muscle, Sculpting, Cupping"],
  ["Marionette lines","Depressor anguli oris, Platysma","Buccinator, Mentalis","Buccal, Deep muscle, Sculpting (lift)"],
  ["Jowls / jawline","Masseter, Platysma, Digastric","Buccinator, SMAS layer","Buccal, Deep muscle, Sculpting, Lymphatic"],
  ["Lip lines / thinning","Orbicularis oris","Buccinator, Depressor labii inf.","Buccal, Deep muscle, Cupping (perioral)"],
  ["Neck banding","Platysma","SCM, Digastric","Neck lymphatic, Sculpting, Deep neck work"],
  ["Temple hollowing","Temporalis","Masseter, Zygomaticus arch","Deep muscle, Buccal"],
  ["Chin dimpling","Mentalis","Depressor labii inferioris","Deep muscle, Buccal (inferior)"],
  ["Persistent puffiness","SCM, Trapezius (upper)","Platysma","Neck release before lymphatic drainage"],
  ["Forehead tension returning","Suboccipitals, Occipitalis","Frontalis, Galea","Suboccipital release, Scalp/galea work"],
];

export default function App() {
  const [tab, setTab] = useState("diagram");
  const [view, setView] = useState("front");
  const [selected, setSelected] = useState(null);
  const [seqFilter, setSeqFilter] = useState("all");

  const m = selected ? MUSCLES[selected] : null;
  const filteredSeqs = SEQUENCES.filter(s => seqFilter === "all" || s.tags.includes(seqFilter));
  const sel = (id) => setSelected(selected === id ? null : id);
  const op = (id) => selected && selected !== id ? 0.18 : 0.82;

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", background: "#f4fafa", minHeight: "100vh", color: "#1a1a2e", maxWidth: 500, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ background: "#0f4040", padding: "16px 16px 0", textAlign: "center" }}>
        <div style={{ fontSize: "1.3rem", color: "white", fontWeight: 300, letterSpacing: "0.04em" }}>Facial Massage Detailed Map</div>
        <div style={{ fontSize: "0.65rem", color: "#c8e8e8", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 3, marginBottom: 10 }}>Interactive Reference for Facial Massage</div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {[["diagram","Diagram"],["quickref","Aging Map"],["sequences","Sequences"]].map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)} style={{ padding: "7px 14px", border: "none", background: "transparent", color: tab === id ? "white" : "#88b8b8", borderBottom: tab === id ? "3px solid #c8973a" : "3px solid transparent", cursor: "pointer", fontSize: "0.7rem", letterSpacing: "0.07em", textTransform: "uppercase", fontWeight: 600 }}>{label}</button>
          ))}
        </div>
      </div>

      {/* DIAGRAM TAB */}
      {tab === "diagram" && (
        <div>
          <div style={{ display: "flex", justifyContent: "center", gap: 8, padding: "12px 16px 4px" }}>
            {[["front","Front View"],["side","Neck & Jaw"]].map(([id, label]) => (
              <button key={id} onClick={() => { setView(id); setSelected(null); }} style={{ padding: "5px 14px", border: "1.5px solid #1B6B6B", borderRadius: 20, cursor: "pointer", fontSize: "0.7rem", background: view === id ? "#1B6B6B" : "white", color: view === id ? "white" : "#1B6B6B", fontWeight: 600 }}>{label}</button>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "center", padding: "4px 8px" }}>
            {view === "front" ? (
              <svg width="300" height="380" viewBox="0 0 300 380">
                <ellipse cx="150" cy="140" rx="95" ry="118" fill="#f5d5b8" stroke="#d4a882" strokeWidth="1.5"/>
                <path d="M118 242 Q126 278 124 308 Q150 320 176 308 Q174 278 182 242" fill="#f0cba8" stroke="#d4a882" strokeWidth="1"/>
                <path d="M82 308 Q116 322 150 326 Q184 322 218 308 L224 338 Q150 356 76 338Z" fill="#e8c8a8" stroke="#d4a882" strokeWidth="0.8" opacity="0.5"/>
                <path d="M65 65 Q82 46 112 40 Q150 34 188 40 Q218 46 235 65 Q226 84 216 94 Q185 90 150 89 Q115 90 84 94 Q74 84 65 65Z" fill={MUSCLES.frontalis.color} opacity={op("frontalis")} onClick={() => sel("frontalis")} style={{cursor:"pointer"}}/>
                <text x="150" y="68" textAnchor="middle" fontSize="8" fill="#fff" fontWeight="700" pointerEvents="none">Frontalis</text>
                <path d="M112 103 Q130 97 150 98 Q170 97 188 103 Q180 112 150 110 Q120 112 112 103Z" fill={MUSCLES.corrugator.color} opacity={op("corrugator")} onClick={() => sel("corrugator")} style={{cursor:"pointer"}}/>
                <text x="150" y="107" textAnchor="middle" fontSize="6.5" fill="#fff" fontWeight="700" pointerEvents="none">Corrugator</text>
                <path d="M140 110 Q150 105 160 110 Q162 121 160 128 Q150 125 140 128 Q138 121 140 110Z" fill={MUSCLES.procerus.color} opacity={op("procerus")} onClick={() => sel("procerus")} style={{cursor:"pointer"}}/>
                <text x="150" y="120" textAnchor="middle" fontSize="6" fill="#fff" fontWeight="700" pointerEvents="none">Procerus</text>
                <path d="M36 90 Q40 62 52 46 Q66 34 82 38 Q86 50 86 66 Q89 84 87 102 Q78 110 66 114 Q46 107 36 90Z" fill={MUSCLES.temporalis.color} opacity={op("temporalis")} onClick={() => sel("temporalis")} style={{cursor:"pointer"}}/>
                <path d="M264 90 Q260 62 248 46 Q234 34 218 38 Q214 50 214 66 Q211 84 213 102 Q222 110 234 114 Q254 107 264 90Z" fill={MUSCLES.temporalis.color} opacity={op("temporalis")} onClick={() => sel("temporalis")} style={{cursor:"pointer"}}/>
                <text x="52" y="82" textAnchor="middle" fontSize="6.5" fill="#fff" fontWeight="700" pointerEvents="none">Temp.</text>
                <ellipse cx="116" cy="127" rx="25" ry="14" fill={MUSCLES.orboculi.color} opacity={op("orboculi")} onClick={() => sel("orboculi")} style={{cursor:"pointer"}}/>
                <ellipse cx="184" cy="127" rx="25" ry="14" fill={MUSCLES.orboculi.color} opacity={op("orboculi")} onClick={() => sel("orboculi")} style={{cursor:"pointer"}}/>
                <text x="116" y="130" textAnchor="middle" fontSize="6" fill="#fff" fontWeight="700" pointerEvents="none">Orb.Oculi</text>
                <ellipse cx="116" cy="127" rx="11" ry="7" fill="white" opacity="0.45" pointerEvents="none"/>
                <ellipse cx="184" cy="127" rx="11" ry="7" fill="white" opacity="0.45" pointerEvents="none"/>
                <path d="M88 152 Q96 142 108 139 Q114 157 118 174 Q110 186 103 196 Q92 180 88 162Z" fill={MUSCLES.zygmaj.color} opacity={op("zygmaj")} onClick={() => sel("zygmaj")} style={{cursor:"pointer"}}/>
                <path d="M212 152 Q204 142 192 139 Q186 157 182 174 Q190 186 197 196 Q208 180 212 162Z" fill={MUSCLES.zygmaj.color} opacity={op("zygmaj")} onClick={() => sel("zygmaj")} style={{cursor:"pointer"}}/>
                <text x="80" y="166" textAnchor="middle" fontSize="6" fill="#fff" fontWeight="700" pointerEvents="none" transform="rotate(-8,80,166)">Z.Maj</text>
                <path d="M100 144 Q110 137 120 135 Q122 146 119 155 Q110 153 100 149Z" fill={MUSCLES.zygmin.color} opacity={op("zygmin")} onClick={() => sel("zygmin")} style={{cursor:"pointer"}}/>
                <path d="M200 144 Q190 137 180 135 Q178 146 181 155 Q190 153 200 149Z" fill={MUSCLES.zygmin.color} opacity={op("zygmin")} onClick={() => sel("zygmin")} style={{cursor:"pointer"}}/>
                <path d="M120 153 Q129 146 138 149 Q140 163 135 175 Q128 173 120 166Z" fill={MUSCLES.levlabii.color} opacity={op("levlabii")} onClick={() => sel("levlabii")} style={{cursor:"pointer"}}/>
                <path d="M180 153 Q171 146 162 149 Q160 163 165 175 Q172 173 180 166Z" fill={MUSCLES.levlabii.color} opacity={op("levlabii")} onClick={() => sel("levlabii")} style={{cursor:"pointer"}}/>
                <path d="M82 174 Q90 160 108 157 Q116 173 114 194 Q106 204 93 202 Q80 192 82 174Z" fill={MUSCLES.buccinator.color} opacity={op("buccinator")} onClick={() => sel("buccinator")} style={{cursor:"pointer"}}/>
                <path d="M218 174 Q210 160 192 157 Q184 173 186 194 Q194 204 207 202 Q220 192 218 174Z" fill={MUSCLES.buccinator.color} opacity={op("buccinator")} onClick={() => sel("buccinator")} style={{cursor:"pointer"}}/>
                <text x="74" y="184" textAnchor="middle" fontSize="6" fill="#fff" fontWeight="700" pointerEvents="none">Bucc.</text>
                <path d="M62 170 Q70 155 82 148 Q88 161 88 188 Q85 207 77 217 Q62 210 56 192 Q54 178 62 170Z" fill={MUSCLES.masseter.color} opacity={op("masseter")} onClick={() => sel("masseter")} style={{cursor:"pointer"}}/>
                <path d="M238 170 Q230 155 218 148 Q212 161 212 188 Q215 207 223 217 Q238 210 244 192 Q246 178 238 170Z" fill={MUSCLES.masseter.color} opacity={op("masseter")} onClick={() => sel("masseter")} style={{cursor:"pointer"}}/>
                <text x="50" y="190" textAnchor="middle" fontSize="6" fill="#fff" fontWeight="700" pointerEvents="none">Mass.</text>
                <ellipse cx="150" cy="204" rx="28" ry="18" fill={MUSCLES.orboris.color} opacity={op("orboris")} onClick={() => sel("orboris")} style={{cursor:"pointer"}}/>
                <text x="150" y="208" textAnchor="middle" fontSize="6.5" fill="#fff" fontWeight="700" pointerEvents="none">Orb.Oris</text>
                <path d="M122 216 Q130 209 137 212 Q138 225 133 234 Q125 232 121 223Z" fill={MUSCLES.dao.color} opacity={op("dao")} onClick={() => sel("dao")} style={{cursor:"pointer"}}/>
                <path d="M178 216 Q170 209 163 212 Q162 225 167 234 Q175 232 179 223Z" fill={MUSCLES.dao.color} opacity={op("dao")} onClick={() => sel("dao")} style={{cursor:"pointer"}}/>
                <path d="M133 234 Q150 228 167 234 Q168 245 164 253 Q150 257 136 253 Q132 245 133 234Z" fill={MUSCLES.mentalis.color} opacity={op("mentalis")} onClick={() => sel("mentalis")} style={{cursor:"pointer"}}/>
                <text x="150" y="245" textAnchor="middle" fontSize="6.5" fill="#fff" fontWeight="700" pointerEvents="none">Mentalis</text>
                <path d="M103 248 Q112 243 124 251 Q131 266 129 294 Q120 302 111 298 Q101 278 101 262Z" fill={MUSCLES.platysma.color} opacity={op("platysma")} onClick={() => sel("platysma")} style={{cursor:"pointer"}}/>
                <path d="M197 248 Q188 243 176 251 Q169 266 171 294 Q180 302 189 298 Q199 278 199 262Z" fill={MUSCLES.platysma.color} opacity={op("platysma")} onClick={() => sel("platysma")} style={{cursor:"pointer"}}/>
                <text x="95" y="274" textAnchor="middle" fontSize="6" fill="#fff" fontWeight="700" pointerEvents="none">Plat.</text>
                <path d="M144 140 Q142 163 138 172 Q145 177 150 177 Q155 177 162 172 Q158 163 156 140" fill="#d4a882" opacity="0.3" pointerEvents="none"/>
                <path d="M132 196 Q150 201 168 196" stroke="#c0806a" strokeWidth="1.2" fill="none" pointerEvents="none"/>
                <text x="150" y="374" textAnchor="middle" fontSize="8" fill="#6b7280" fontStyle="italic">Tap any colored area to see details below</text>
              </svg>
            ) : (
              <svg width="300" height="380" viewBox="0 0 300 380">
                <path d="M124 38 Q166 24 194 46 Q218 64 222 100 Q226 132 213 158 Q202 176 188 184 Q178 194 174 210 Q170 226 167 244" fill="#f5d5b8" stroke="#d4a882" strokeWidth="1.5"/>
                <path d="M124 38 Q90 54 78 90 Q70 128 82 158 Q96 184 120 196 Q144 206 168 210" fill="#f5d5b8" stroke="#d4a882" strokeWidth="1.5"/>
                <path d="M167 244 Q161 270 158 300 Q165 318 178 322 Q196 314 206 296 Q212 272 208 251 Q196 240 183 238 Q172 238 167 244Z" fill="#f0cba8" stroke="#d4a882" strokeWidth="1"/>
                <path d="M126 322 Q158 336 192 330 Q214 323 228 308 Q234 326 226 348 Q186 364 120 352Z" fill="#e8c8a8" opacity="0.5" stroke="#d4a882" strokeWidth="0.8"/>
                <path d="M167 212 Q178 224 183 238 Q191 260 193 283 Q191 302 183 313 Q171 315 163 305 Q155 285 155 261 Q155 239 160 222Z" fill={MUSCLES.scm.color} opacity={op("scm")} onClick={() => sel("scm")} style={{cursor:"pointer"}}/>
                <text x="200" y="264" fontSize="7" fill="#fff" fontWeight="700" pointerEvents="none">SCM</text>
                <path d="M157 226 Q147 248 144 274 Q141 298 145 318 Q153 326 161 323 Q164 306 165 283 Q166 261 165 242 Q165 230 159 222Z" fill={MUSCLES.platysma.color} opacity={op("platysma")} onClick={() => sel("platysma")} style={{cursor:"pointer"}}/>
                <text x="136" y="274" textAnchor="end" fontSize="7" fill={MUSCLES.platysma.color} fontWeight="700" pointerEvents="none">Platysma</text>
                <path d="M183 313 Q202 304 218 292 Q230 280 233 264 Q236 248 225 237 Q212 233 200 241 Q191 256 187 276 Q183 298 183 313Z" fill={MUSCLES.trapezius.color} opacity={op("trapezius")} onClick={() => sel("trapezius")} style={{cursor:"pointer"}}/>
                <text x="226" y="272" fontSize="7" fill="#fff" fontWeight="700" pointerEvents="none">Trap.</text>
                <path d="M88 62 Q100 47 122 40 Q140 36 155 44 Q160 56 158 72 Q155 88 142 96 Q126 102 110 98 Q94 90 88 74Z" fill={MUSCLES.temporalis.color} opacity={op("temporalis")} onClick={() => sel("temporalis")} style={{cursor:"pointer"}}/>
                <text x="124" y="70" textAnchor="middle" fontSize="7" fill="#fff" fontWeight="700" pointerEvents="none">Temporalis</text>
                <path d="M174 142 Q186 134 198 142 Q206 156 203 180 Q197 197 184 202 Q168 199 161 183 Q156 165 162 151Z" fill={MUSCLES.masseter.color} opacity={op("masseter")} onClick={() => sel("masseter")} style={{cursor:"pointer"}}/>
                <text x="192" y="170" textAnchor="middle" fontSize="7" fill="#fff" fontWeight="700" pointerEvents="none">Masseter</text>
                <path d="M80 130 Q89 118 103 114 Q114 112 122 120 Q120 136 110 142 Q97 147 87 140Z" fill={MUSCLES.suboccipital.color} opacity={op("suboccipital")} onClick={() => sel("suboccipital")} style={{cursor:"pointer"}}/>
                <text x="74" y="130" textAnchor="end" fontSize="6.5" fill={MUSCLES.suboccipital.color} fontWeight="700" pointerEvents="none">Suboccip.</text>
                <path d="M132 330 Q163 342 194 336 Q214 329 226 315 Q232 330 224 352 Q186 366 126 356Z" fill={MUSCLES.pectoralis.color} opacity={op("pectoralis")} onClick={() => sel("pectoralis")} style={{cursor:"pointer"}}/>
                <text x="182" y="344" textAnchor="middle" fontSize="7" fill="#fff" fontWeight="700" pointerEvents="none">Pectoralis</text>
                <text x="150" y="374" textAnchor="middle" fontSize="8" fill="#6b7280" fontStyle="italic">Tap any colored area to see details below</text>
              </svg>
            )}
          </div>

          <div style={{ margin: "0 12px 16px", background: m ? "#eaf4f4" : "#f0f9f9", borderRadius: 10, border: "1px solid #c8e8e8", padding: 14, minHeight: 70 }}>
            {!m ? (
              <div style={{ textAlign: "center", color: "#9ca3af", fontStyle: "italic", fontSize: "0.85rem", padding: "16px 0" }}>👆 Tap a muscle on the diagram above</div>
            ) : (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                  <div style={{ fontSize: "1.1rem", color: "#0f4040", fontWeight: 600 }}>{m.name}</div>
                  <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", fontSize: "1.1rem", cursor: "pointer", color: "#9ca3af" }}>✕</button>
                </div>
                <div style={{ display: "inline-block", background: "#fdf3e3", border: "1px solid #c8973a", color: "#c8973a", fontSize: "0.6rem", padding: "2px 8px", borderRadius: 10, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10, fontWeight: 700 }}>{m.region}</div>
                {[["Origin", m.origin],["Insertion", m.insertion],["Action", m.action],["Nerve", m.nerve]].map(([label, val]) => (
                  <div key={label} style={{ marginBottom: 7 }}>
                    <div style={{ fontSize: "0.58rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "#4a9a9a", fontWeight: 700, marginBottom: 2 }}>{label}</div>
                    <div style={{ fontSize: "0.78rem", lineHeight: 1.5 }}>{val}</div>
                  </div>
                ))}
                <div style={{ background: "white", borderLeft: "3px solid #1B6B6B", borderRadius: "0 6px 6px 0", padding: "9px 11px", margin: "9px 0" }}>
                  <div style={{ fontSize: "0.58rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "#1B6B6B", fontWeight: 700, marginBottom: 3 }}>Aging Role</div>
                  <div style={{ fontSize: "0.78rem", lineHeight: 1.5 }}>{m.aging}</div>
                </div>
                <div style={{ background: "#fdf3e3", borderLeft: "3px solid #c8973a", borderRadius: "0 6px 6px 0", padding: "9px 11px", margin: "9px 0" }}>
                  <div style={{ fontSize: "0.58rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "#c8973a", fontWeight: 700, marginBottom: 3 }}>Tension Shows As</div>
                  <div style={{ fontSize: "0.78rem", lineHeight: 1.5 }}>{m.tension}</div>
                </div>
                <div style={{ fontSize: "0.58rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "#4a9a9a", fontWeight: 700, marginBottom: 5 }}>Techniques</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                  {m.techniques.map(t => <span key={t} style={{ background: "#c8e8e8", color: "#0f4040", fontSize: "0.68rem", padding: "3px 9px", borderRadius: 10, fontWeight: 600 }}>{t}</span>)}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {tab === "quickref" && (
        <div style={{ padding: "16px 12px" }}>
          <div style={{ fontSize: "1.1rem", color: "#0f4040", fontWeight: 600, marginBottom: 3 }}>Aging Area → Muscle Map</div>
          <div style={{ fontSize: "0.72rem", color: "#6b7280", fontStyle: "italic", marginBottom: 12 }}>Muscles to target for each concern</div>
          {AGING_MAP.map(([area, primary, secondary, techniques], i) => (
            <div key={i} style={{ background: i % 2 === 0 ? "white" : "#eaf4f4", borderRadius: 8, border: "1px solid #c8e8e8", marginBottom: 8, padding: "11px 13px" }}>
              <div style={{ fontWeight: 700, color: "#0f4040", fontSize: "0.85rem", marginBottom: 4 }}>{area}</div>
              <div style={{ fontSize: "0.72rem", marginBottom: 2 }}><span style={{ color: "#4a9a9a", fontWeight: 700 }}>Primary: </span>{primary}</div>
              <div style={{ fontSize: "0.72rem", marginBottom: 2 }}><span style={{ color: "#9ca3af", fontWeight: 700 }}>Supporting: </span>{secondary}</div>
              <div style={{ fontSize: "0.72rem" }}><span style={{ color: "#c8973a", fontWeight: 700 }}>Techniques: </span>{techniques}</div>
            </div>
          ))}
        </div>
      )}

      {tab === "sequences" && (
        <div style={{ padding: "16px 12px" }}>
          <div style={{ fontSize: "1.1rem", color: "#0f4040", fontWeight: 600, marginBottom: 3 }}>Treatment Sequences</div>
          <div style={{ background: "#eaf4f4", borderRadius: 6, padding: "8px 12px", marginBottom: 12, fontSize: "0.74rem", color: "#0f4040" }}>
            ⚠ Always close with lymphatic — don't leave tissue mobilized with no exit route.
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
            {[["all","All"],["lines","Fine Lines"],["lift","Lifting"],["jaw","Jaw/TMJ"],["fluid","Puffiness"],["sensitive","Sensitive"]].map(([id, label]) => (
              <button key={id} onClick={() => setSeqFilter(id)} style={{ padding: "4px 11px", border: "1.5px solid", borderColor: seqFilter === id ? "#1B6B6B" : "#c8e8e8", borderRadius: 14, cursor: "pointer", fontSize: "0.68rem", background: seqFilter === id ? "#1B6B6B" : "white", color: seqFilter === id ? "white" : "#6b7280", fontWeight: 600 }}>{label}</button>
            ))}
          </div>
          {filteredSeqs.map((seq, i) => (
            <div key={i} style={{ background: "white", borderRadius: 10, border: "1px solid #c8e8e8", marginBottom: 12, overflow: "hidden" }}>
              <div style={{ background: "#1B6B6B", padding: "10px 14px" }}>
                <div style={{ fontSize: "0.95rem", color: "white", fontWeight: 600 }}>{seq.title}</div>
                <div style={{ fontSize: "0.67rem", color: "#c8e8e8", fontStyle: "italic", marginTop: 2 }}>{seq.sub}</div>
              </div>
              <div style={{ padding: "10px 14px" }}>
                {seq.steps.map(([step, tech, note], j) => (
                  <div key={j} style={{ display: "grid", gridTemplateColumns: "54px 1fr", gap: 10, paddingBottom: 8, marginBottom: 8, borderBottom: j < seq.steps.length - 1 ? "1px solid #eaf4f4" : "none" }}>
                    <div style={{ fontSize: "0.58rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#4a9a9a", paddingTop: 1 }}>{step}</div>
                    <div>
                      <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#0f4040", marginBottom: 2 }}>{tech}</div>
                      <div style={{ fontSize: "0.72rem", color: "#6b7280", lineHeight: 1.45 }}>{note}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
