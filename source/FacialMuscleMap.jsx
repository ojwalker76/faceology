import { useState } from "react";

const MUSCLES = {
  frontalis: {
    name: "Frontalis",
    region: "Forehead & Scalp",
    color: "#4a9a9a",
    origin: "Galea aponeurotica (epicranial aponeurosis)",
    insertion: "Skin of forehead, eyebrows, root of nose",
    action: "Raises eyebrows, wrinkles forehead horizontally, assists in opening eyes wide",
    nerve: "Facial nerve (CN VII) — temporal branch",
    aging: "Chronic contraction creates permanent horizontal forehead lines; hypertonicity pulls scalp forward increasing tension throughout galea",
    tension: "Raised resting brow position, deep horizontal lines, scalp tightness, forehead always appears 'braced'",
    techniques: ["Deep Muscle Work", "Scalp / Galea Release", "Lymphatic (open)"],
  },
  corrugator: {
    name: "Corrugator Supercilii",
    region: "Glabella & Brow",
    color: "#e07b54",
    origin: "Medial superciliary arch (frontal bone)",
    insertion: "Skin of medial eyebrow",
    action: "Draws eyebrow medially and downward — creates vertical glabellar frown lines",
    nerve: "Facial nerve (CN VII) — temporal branch",
    aging: "Primary driver of the '11' lines between brows; chronic frowning, screen use, and stress cause sustained hypertonicity",
    tension: "Vertical lines between brows; eyebrows drawn together at rest; client looks worried or angry even when relaxed",
    techniques: ["Deep Muscle Work", "Cross-fiber Friction", "Brow Sculpting"],
  },
  procerus: {
    name: "Procerus",
    region: "Glabella & Brow",
    color: "#c0392b",
    origin: "Fascia over nasal bone and upper lateral nasal cartilage",
    insertion: "Skin between eyebrows (lower forehead / glabella)",
    action: "Pulls medial brow inferiorly; creates horizontal lines at root of nose",
    nerve: "Facial nerve (CN VII) — temporal branch",
    aging: "Creates horizontal 'bunny lines' across nose bridge; often contracted alongside corrugator in chronic frowning",
    tension: "Horizontal lines at root of nose; nose scrunching at rest; brow depression",
    techniques: ["Deep Muscle Work", "Light Cross-fiber"],
  },
  orboculi: {
    name: "Orbicularis Oculi",
    region: "Eye Region",
    color: "#8b5cf6",
    origin: "Medial orbital margin, medial palpebral ligament, lacrimal bone",
    insertion: "Skin around orbital rim; lateral palpebral raphe",
    action: "Closes eyelid (palpebral = blinking; orbital = forced closure); compresses lacrimal sac",
    nerve: "Facial nerve (CN VII) — temporal and zygomatic branches",
    aging: "Lateral portion creates crow's feet; orbital portion compresses lymphatics causing under-eye puffiness; palpebral laxity causes eyelid hooding",
    tension: "Crow's feet at outer corners; under-eye puffiness; eyelid appears heavy; fine radiating lines from lateral canthus",
    techniques: ["Soft Lymphatic", "Gentle Cross-fiber (lateral only)", "Small Cup (lateral only)"],
  },
  temporalis: {
    name: "Temporalis",
    region: "Jaw & Temple",
    color: "#f59e0b",
    origin: "Temporal fossa (entire floor and deep surface of temporal fascia)",
    insertion: "Coronoid process and anterior ramus of mandible",
    action: "Elevates mandible; posterior fibers retract mandible; maintains jaw position at rest",
    nerve: "Trigeminal nerve (CN V) — mandibular division (V3), deep temporal nerves",
    aging: "Chronic clenching creates temple hollowing; contributes to lateral brow descent; restriction causes radiating head pain",
    tension: "Hollowed temples; temporal headache; tightness at side of head; upper jaw tension; earache without infection",
    techniques: ["Deep Muscle Work", "Buccal (jaw)", "Lymphatic (close)"],
  },
  zygmaj: {
    name: "Zygomaticus Major",
    region: "Cheek & Mid-Face",
    color: "#10b981",
    origin: "Lateral zygomatic bone (cheekbone)",
    insertion: "Modiolus (corner of mouth); orbicularis oris",
    action: "Draws angle of mouth superiorly and laterally — primary smiling muscle",
    nerve: "Facial nerve (CN VII) — zygomatic and buccal branches",
    aging: "Repeated contraction deepens nasolabial folds; loss of tone contributes to mid-face descent and flattening of cheek contour",
    tension: "Deep nasolabial folds; flat or descended cheek; cheek appears to drop below zygomatic arch",
    techniques: ["Facial Sculpting", "Buccal", "Cupping"],
  },
  zygmin: {
    name: "Zygomaticus Minor",
    region: "Cheek & Mid-Face",
    color: "#34d399",
    origin: "Malar surface of zygomatic bone",
    insertion: "Skin of upper lip (lateral to philtrum)",
    action: "Elevates upper lip; contributes to nasolabial fold",
    nerve: "Facial nerve (CN VII) — zygomatic and buccal branches",
    aging: "Works alongside zygomaticus major in mid-face descent; contributes to nasolabial fold and upper lip thinning",
    tension: "Deepening nasolabial fold; upper lip appears thinner; vertical lines lateral to philtrum",
    techniques: ["Facial Sculpting", "Buccal"],
  },
  levlabii: {
    name: "Levator Labii Superioris",
    region: "Cheek & Mid-Face",
    color: "#6366f1",
    origin: "Infraorbital margin of maxilla",
    insertion: "Skin of upper lip; alar cartilage of nose",
    action: "Elevates and everts upper lip; dilates nostril",
    nerve: "Facial nerve (CN VII) — zygomatic and buccal branches",
    aging: "Key driver of nasolabial fold deepening; contributes to 'gummy smile'; chronic tension thins upper lip appearance",
    tension: "Deep nasolabial folds; upper lip appears thin; nostrils slightly flared at rest",
    techniques: ["Buccal", "Deep Muscle Work", "Sculpting"],
  },
  buccinator: {
    name: "Buccinator",
    region: "Cheek — Primary Buccal Target",
    color: "#ec4899",
    origin: "Alveolar processes of maxilla and mandible; pterygomandibular raphe",
    insertion: "Modiolus; blends with orbicularis oris",
    action: "Compresses cheeks against teeth; assists chewing and blowing; maintains food between molars",
    nerve: "Facial nerve (CN VII) — buccal branch",
    aging: "Loss of tone contributes to jowl formation and cheek laxity; hypertonicity from grinding creates tension lines; primary Buccal massage target",
    tension: "Puffiness at mid-cheek; loss of jawline definition; cheek feels thick and tough on palpation",
    techniques: ["Buccal Massage", "Facial Sculpting", "Lymphatic"],
  },
  masseter: {
    name: "Masseter",
    region: "Jaw — Most Commonly Hypertonic",
    color: "#dc2626",
    origin: "Zygomatic arch and zygomatic process of maxilla",
    insertion: "Lateral surface and angle of mandible; coronoid process",
    action: "Elevates mandible (closes jaw); assists lateral jaw movement; deep portion retracts mandible",
    nerve: "Trigeminal nerve (CN V) — mandibular division (V3), masseteric nerve",
    aging: "Most commonly hypertonic facial muscle; grinding/clenching causes bulk hypertrophy that squares the jaw and creates jowl appearance; restricts lymphatic drainage from lower face",
    tension: "Squared or enlarged lower jaw; jowling; cheek puffiness; jaw soreness; temporal headaches; clicking or grinding",
    techniques: ["Deep Muscle Work", "Buccal Massage", "Lymphatic (close)"],
  },
  orboris: {
    name: "Orbicularis Oris",
    region: "Mouth & Lower Face",
    color: "#7c3aed",
    origin: "No bone attachment — fibers from surrounding muscles (modiolus, buccinator)",
    insertion: "Skin and mucosa of lips; blends with surrounding muscles",
    action: "Closes and protrudes lips; shapes lips for speech, kissing, and expression",
    nerve: "Facial nerve (CN VII) — buccal branch",
    aging: "Chronic contraction creates perioral vertical lip lines ('smoker's lines'); loss of tone causes lip thinning and loss of definition at vermillion border",
    tension: "Vertical lines above and below lip border; lip appears thinner; pursed or pinched look at rest",
    techniques: ["Buccal Massage", "Deep Muscle Work", "Cupping (perioral)"],
  },
  dao: {
    name: "Depressor Anguli Oris",
    region: "Mouth & Lower Face",
    color: "#9333ea",
    origin: "Oblique line of mandible",
    insertion: "Modiolus; skin at angle of mouth",
    action: "Depresses corner of mouth — creates frowning expression",
    nerve: "Facial nerve (CN VII) — marginal mandibular branch",
    aging: "Hypertonicity causes persistent downturned mouth corners; primary contributor to marionette line formation",
    tension: "Downturned mouth corners at rest; marionette lines; resting frown; client looks sad or displeased",
    techniques: ["Buccal Massage", "Deep Muscle Work", "Sculpting (lift)"],
  },
  mentalis: {
    name: "Mentalis",
    region: "Chin",
    color: "#0891b2",
    origin: "Incisive fossa of mandible",
    insertion: "Skin of chin",
    action: "Elevates and protrudes lower lip; wrinkles chin skin",
    nerve: "Facial nerve (CN VII) — marginal mandibular branch",
    aging: "Hypertonicity creates 'orange peel' or 'cobblestone' chin dimpling; often overactive when orbicularis oris is weak",
    tension: "Dimpled or bumpy chin texture; puckered chin at rest; lower lip appears pushed forward",
    techniques: ["Deep Muscle Work", "Buccal (inferior)"],
  },
  platysma: {
    name: "Platysma",
    region: "Neck — Critical Aging Muscle",
    color: "#f97316",
    origin: "Fascia over pectoralis major and deltoid (clavicular region)",
    insertion: "Base of mandible; skin of lower face and cheek; modiolus; corners of mouth",
    action: "Depresses mandible; depresses lower lip and corners of mouth; tenses skin of neck",
    nerve: "Facial nerve (CN VII) — cervical branch",
    aging: "CRITICAL — directly inserts into lower face. Laxity creates neck bands. Chronic downward pull contributes to jowling, mouth corner descent, and overall lower face sagging.",
    tension: "Vertical neck bands (platysmal banding); jowling; downturned mouth corners; lower face drooping; 'turkey neck'",
    techniques: ["Lymphatic (neck)", "Sculpting", "Deep Neck Work"],
  },
  scm: {
    name: "Sternocleidomastoid (SCM)",
    region: "Neck — Lymphatic Gatekeeper",
    color: "#2563eb",
    origin: "Manubrium of sternum; medial clavicle",
    insertion: "Mastoid process of temporal bone; lateral superior nuchal line of occipital bone",
    action: "Unilateral: rotates head to opposite side, lateral flexion to same side. Bilateral: neck flexion, assisted inspiration",
    nerve: "Accessory nerve (CN XI); cervical plexus (C2–C3)",
    aging: "Hypertonicity limits lymphatic drainage from the face — puffiness worsens when SCM is chronically tight. Affects ear, jaw, and temporal tension.",
    tension: "Face appears puffier than expected; poor lymphatic drainage despite treatment; jaw tension that won't resolve; earache; headache radiating from neck",
    techniques: ["Neck Lymphatic", "Deep Neck Release", "Address before facial drainage"],
  },
  suboccipital: {
    name: "Suboccipitals",
    region: "Head / Neck — Hidden Forehead Driver",
    color: "#7c3aed",
    origin: "Posterior atlas (C1) and axis (C2)",
    insertion: "Inferior nuchal line of occipital bone",
    action: "Extend and rotate head at atlanto-occipital and atlanto-axial joints; fine motor head position control",
    nerve: "Suboccipital nerve (posterior ramus of C1)",
    aging: "Restriction here is often the hidden driver of chronic forehead tension — the suboccipital-frontal fascial chain runs continuously. Tight suboccipitals create compensatory frontalis hypertonicity.",
    tension: "Chronic forehead tension that doesn't respond to direct treatment; base-of-skull headaches; client always furrows brow; worsens after screen time",
    techniques: ["Suboccipital Release", "Address before forehead work"],
  },
  trapezius: {
    name: "Trapezius (Upper Fibers)",
    region: "Neck / Shoulder — Lymphatic Chain",
    color: "#059669",
    origin: "External occipital protuberance; ligamentum nuchae; spinous processes C7–T12",
    insertion: "Lateral clavicle; acromion; spine of scapula",
    action: "Upper: elevates scapula, extends and laterally flexes head. Middle: retracts scapula. Lower: depresses scapula",
    nerve: "Accessory nerve (CN XI); cervical plexus (C3–C4)",
    aging: "Chronic upper trap tension restricts lymphatic drainage, compresses cervical lymph nodes, perpetuates lower face puffiness and jowling that facial massage alone cannot resolve",
    tension: "Shoulders raised toward ears; facial puffiness that returns quickly after lymphatic drainage; persistent cheek heaviness",
    techniques: ["Upper Trap Release", "Clavicular Lymph Nodes", "Neck Release before drainage"],
  },
  pectoralis: {
    name: "Pectoralis Major (Clavicular Head)",
    region: "Chest — Posture & Fascial Chain",
    color: "#be185d",
    origin: "Medial clavicle; sternum; upper costal cartilages",
    insertion: "Greater tubercle of humerus",
    action: "Flexes and adducts humerus; medially rotates arm; assists forced inspiration",
    nerve: "Lateral and medial pectoral nerves (C5–T1)",
    aging: "Tight pectorals pull shoulders forward creating forward head posture — compresses anterior neck lymphatics and accelerates lower face and neck descent via fascial tension chain",
    tension: "Forward head posture; anterior shoulder rounding; passively stretches and weakens platysma and lower face muscles, accelerating descent",
    techniques: ["Pec Stretch / Release", "Address posture chain", "Décolletage work"],
  },
};

const SEQUENCES = [
  { title: "Puffiness / Fluid Retention", tags: ["fluid"], sub: "under-eye bags, morning puffiness", steps: [["Open","Lymphatic Drainage","Open lymph nodes: clavicle → neck → preauricular. Feather pressure."],["Work","Soft Lymphatic","Maintain feather-light pressure throughout entire face."],["Close","Light Sculpting + Effleurage","Gentle strokes to settle and smooth tissue."]] },
  { title: "Fine Lines — Dehydration", tags: ["lines"], sub: "surface crepiness, texture lines", steps: [["Open","Lymphatic Drainage","Clear lymphatic pathways first."],["Work","Facial Cupping","Suction plumps tissue; draws nutrients to surface. Small cup around eyes, larger on cheeks."],["Work 2","Traditional Soft Lymphatic","Alternate with cupping to maximize fluid movement."],["Close","Lymphatic","Flush loosened congestion and debris."]] },
  { title: "Fine Lines — Expression / Muscle", tags: ["lines"], sub: "forehead, frown lines, crow's feet, lip lines", steps: [["Open","Lymphatic Drainage","Decongest before working muscles."],["Work","Deep Facial Muscle Work","Frontalis (forehead), corrugator/procerus (glabella), orbicularis oculi (crow's feet)."],["Work 2","Buccal (lip lines)","Releases orbicularis oris and buccinator from inside."],["Close","Lymphatic + Effleurage","Drain and calm post-deep work."]] },
  { title: "Smile Lines / Nasolabial Folds", tags: ["lines","lift"], sub: "lines running nose to mouth corners", steps: [["Open","Lymphatic","Full face drainage sequence."],["Work 1","Buccal — Levator Labii / Buccinator","Work muscles driving the fold from inside."],["Work 2","Deep Muscle — Zygomaticus","External cross-fiber along the fold line."],["Work 3","Sculpting","Lift tissue superiorly along fold."],["Close","Cupping + Lymphatic","Suction along fold, then lymphatic flush."]] },
  { title: "Forehead Wrinkles", tags: ["lines"], sub: "horizontal lines, raised brow patterns", steps: [["Open","Lymphatic","Drain from forehead toward temporal lymph nodes."],["Work 1","Deep Muscle — Frontalis","Slow, firm cross-fiber friction perpendicular to the lines."],["Work 2","Scalp / Galea Release","Release galea aponeurotica — tightness pulls forehead skin."],["Work 3","Sculpting","Smooth downward fascial strokes along forehead."],["Close","Lymphatic + Effleurage","Calm the tissue."]] },
  { title: "Crow's Feet", tags: ["lines"], sub: "lateral eye lines, crepiness at outer corners", steps: [["Open","Soft Lymphatic","Feather strokes outward from orbit toward preauricular nodes. Extremely light."],["Work 1","Deep Muscle — Orb. Oculi","Gentle cross-fiber at lateral orbital rim ONLY. Never on orbital bone."],["Work 2","Cupping — Small Cup","Very light suction laterally. Never over eyelid."],["Close","Soft Lymphatic","Drain from lateral eye outward to preauricular."]] },
  { title: "Jowls / Loss of Definition", tags: ["lift"], sub: "jowling, sagging cheeks, jawline loss", steps: [["Open","Lymphatic Drainage","Decongest — you cannot lift congested tissue effectively."],["Work 1","Buccal — Buccinator + Masseter","Release from inside; address masseter if hypertonic."],["Work 2","Facial Sculpting","Work fascia along jawline and cheekbone superiorly."],["Close","Lymphatic","Drain everything mobilized."]] },
  { title: "Jaw Tension / TMJ / Grinding", tags: ["jaw"], sub: "tight masseter, jaw pain, clenching", steps: [["Open","Deep Muscle — Masseter + Temporalis","Start external before intraoral. Slow sustained pressure into muscle belly."],["Work 1","Deep Muscle — SCM + Digastric","Release cervical connections pulling on jaw."],["Work 2","Buccal Massage","Intraoral masseter and pterygoid release."],["Close","Traditional Soft Lymphatic","Tissue will be tender — parasympathetic finish essential."]] },
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

export default function FacialMuscleMap() {
  const [tab, setTab] = useState("diagram");
  const [view, setView] = useState("front");
  const [selected, setSelected] = useState(null);
  const [seqFilter, setSeqFilter] = useState("all");

  const selectMuscle = (id) => setSelected(selected === id ? null : id);
  const muscle = selected ? MUSCLES[selected] : null;

  const filteredSeqs = SEQUENCES.filter(s => seqFilter === "all" || s.tags.includes(seqFilter));

  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", background: "#f4fafa", minHeight: "100vh", color: "#1a1a2e" }}>
      {/* Header */}
      <div style={{ background: "#0f4040", padding: "20px 16px 0", textAlign: "center" }}>
        <div style={{ fontFamily: "Georgia, serif", fontSize: "1.5rem", fontWeight: 300, color: "white", letterSpacing: "0.06em" }}>Facial Muscle Clinical Map</div>
        <div style={{ fontSize: "0.7rem", color: "#c8e8e8", letterSpacing: "0.14em", textTransform: "uppercase", marginTop: 4, marginBottom: 12 }}>Interactive Reference for Facial Massage</div>
        <div style={{ display: "flex", justifyContent: "center", gap: 0 }}>
          {[["diagram","Muscle Diagram"],["quickref","Aging Map"],["sequences","Sequences"]].map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)} style={{ padding: "8px 16px", border: "none", background: "transparent", color: tab === id ? "white" : "#a0c8c8", borderBottom: tab === id ? "3px solid #c8973a" : "3px solid transparent", cursor: "pointer", fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500 }}>{label}</button>
          ))}
        </div>
      </div>

      {/* ── TAB: DIAGRAM ── */}
      {tab === "diagram" && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* View toggle */}
          <div style={{ display: "flex", justifyContent: "center", gap: 8, padding: "14px 16px 0" }}>
            {[["front","Front View"],["side","Neck & Jaw"]].map(([id, label]) => (
              <button key={id} onClick={() => { setView(id); setSelected(null); }} style={{ padding: "5px 14px", border: "1.5px solid #1B6B6B", borderRadius: 20, cursor: "pointer", fontSize: "0.72rem", background: view === id ? "#1B6B6B" : "white", color: view === id ? "white" : "#1B6B6B", fontWeight: 500 }}>{label}</button>
            ))}
          </div>

          {/* SVG */}
          <div style={{ display: "flex", justifyContent: "center", padding: "10px 8px 4px", overflowX: "auto" }}>
            {view === "front" ? (
              <svg width="320" height="400" viewBox="0 0 320 400" style={{ maxWidth: "100%" }}>
                {/* Head */}
                <ellipse cx="160" cy="148" rx="100" ry="125" fill="#f5d5b8" stroke="#d4a882" strokeWidth="1.5"/>
                {/* Neck */}
                <path d="M125 255 Q132 295 130 325 Q160 338 190 325 Q188 295 195 255" fill="#f0cba8" stroke="#d4a882" strokeWidth="1"/>
                {/* Shoulders */}
                <path d="M90 325 Q125 340 160 344 Q195 340 230 325 L238 355 Q160 372 82 355Z" fill="#e8c8a8" stroke="#d4a882" strokeWidth="0.8" opacity="0.5"/>

                {/* FRONTALIS */}
                <path d="M73 68 Q90 50 120 44 Q160 38 200 44 Q230 50 247 68 Q238 88 228 100 Q195 96 160 95 Q125 96 92 100 Q82 88 73 68Z" fill={MUSCLES.frontalis.color} opacity={selected && selected !== "frontalis" ? 0.2 : 0.82} onClick={() => selectMuscle("frontalis")} style={{ cursor: "pointer" }} />
                <text x="160" y="72" textAnchor="middle" fontSize="8" fill="#fff" fontWeight="600" pointerEvents="none">Frontalis</text>

                {/* CORRUGATOR */}
                <path d="M126 108 Q143 102 160 103 Q177 102 194 108 Q186 117 160 115 Q134 117 126 108Z" fill={MUSCLES.corrugator.color} opacity={selected && selected !== "corrugator" ? 0.2 : 0.85} onClick={() => selectMuscle("corrugator")} style={{ cursor: "pointer" }} />
                <text x="160" y="112" textAnchor="middle" fontSize="6.5" fill="#fff" fontWeight="600" pointerEvents="none">Corrugator</text>

                {/* PROCERUS */}
                <path d="M150 114 Q160 109 170 114 Q172 126 170 133 Q160 130 150 133 Q148 126 150 114Z" fill={MUSCLES.procerus.color} opacity={selected && selected !== "procerus" ? 0.2 : 0.8} onClick={() => selectMuscle("procerus")} style={{ cursor: "pointer" }} />
                <text x="160" y="126" textAnchor="middle" fontSize="6" fill="#fff" fontWeight="600" pointerEvents="none">Procerus</text>

                {/* TEMPORALIS L+R */}
                {[["M42 95 Q46 68 58 52 Q72 40 88 43 Q92 56 92 72 Q95 90 93 108 Q84 116 72 120 Q52 113 42 95Z", "temporalis", "72", "88"],
                  ["M278 95 Q274 68 262 52 Q248 40 232 43 Q228 56 228 72 Q225 90 227 108 Q236 116 248 120 Q268 113 278 95Z", "temporalis", "248", "88"]].map(([d, id, tx, ty], i) => (
                  <g key={i}><path d={d} fill={MUSCLES[id].color} opacity={selected && selected !== id ? 0.2 : 0.75} onClick={() => selectMuscle(id)} style={{ cursor: "pointer" }} />
                  {i === 0 && <text x={tx} y={ty} textAnchor="middle" fontSize="6.5" fill="#fff" fontWeight="600" pointerEvents="none">Temporalis</text>}</g>
                ))}

                {/* ORBICULARIS OCULI L+R */}
                {[["126", "133"], ["194", "133"]].map(([cx, cy], i) => (
                  <g key={i}><ellipse cx={cx} cy={cy} rx="26" ry="15" fill={MUSCLES.orboculi.color} opacity={selected && selected !== "orboculi" ? 0.2 : 0.72} onClick={() => selectMuscle("orboculi")} style={{ cursor: "pointer" }} />
                  {i === 0 && <text x="126" y="137" textAnchor="middle" fontSize="6" fill="#fff" fontWeight="600" pointerEvents="none">Orb. Oculi</text>}</g>
                ))}
                {/* Eyes */}
                <ellipse cx="126" cy="133" rx="12" ry="7" fill="white" opacity="0.5" pointerEvents="none"/>
                <ellipse cx="194" cy="133" rx="12" ry="7" fill="white" opacity="0.5" pointerEvents="none"/>

                {/* ZYGOMATICUS MAJOR L+R */}
                {[["M98 160 Q106 150 118 147 Q124 165 128 182 Q120 194 113 204 Q102 188 98 170Z","zygmaj","96","172"],
                  ["M222 160 Q214 150 202 147 Q196 165 192 182 Q200 194 207 204 Q218 188 222 170Z","zygmaj","224","172"]].map(([d,id,tx,ty],i) => (
                  <g key={i}><path d={d} fill={MUSCLES[id].color} opacity={selected && selected !== id ? 0.2 : 0.78} onClick={() => selectMuscle(id)} style={{ cursor: "pointer" }} />
                  {i===0 && <text x={tx} y={ty} textAnchor="middle" fontSize="6" fill="#fff" fontWeight="600" pointerEvents="none" transform="rotate(-10,96,172)">Zyg.Maj</text>}</g>
                ))}

                {/* ZYGOMATICUS MINOR L+R */}
                {[["M110 152 Q120 145 130 143 Q132 154 129 163 Q120 161 110 156Z","zygmin"],
                  ["M210 152 Q200 145 190 143 Q188 154 191 163 Q200 161 210 156Z","zygmin"]].map(([d,id],i) => (
                  <path key={i} d={d} fill={MUSCLES[id].color} opacity={selected && selected !== id ? 0.2 : 0.8} onClick={() => selectMuscle(id)} style={{ cursor: "pointer" }} />
                ))}

                {/* LEVATOR LABII L+R */}
                {[["M128 160 Q137 153 146 156 Q148 172 143 184 Q136 182 128 175Z","levlabii"],
                  ["M192 160 Q183 153 174 156 Q172 172 177 184 Q184 182 192 175Z","levlabii"]].map(([d,id],i) => (
                  <path key={i} d={d} fill={MUSCLES[id].color} opacity={selected && selected !== id ? 0.2 : 0.8} onClick={() => selectMuscle(id)} style={{ cursor: "pointer" }} />
                ))}

                {/* BUCCINATOR L+R */}
                {[["M93 183 Q101 169 118 166 Q126 182 124 202 Q116 212 103 210 Q91 200 93 183Z","buccinator","96","192"],
                  ["M227 183 Q219 169 202 166 Q194 182 196 202 Q204 212 217 210 Q229 200 227 183Z","buccinator","224","192"]].map(([d,id,tx,ty],i) => (
                  <g key={i}><path d={d} fill={MUSCLES[id].color} opacity={selected && selected !== id ? 0.2 : 0.72} onClick={() => selectMuscle(id)} style={{ cursor: "pointer" }} />
                  {i===0 && <text x={tx} y={ty} textAnchor="middle" fontSize="6" fill="#fff" fontWeight="600" pointerEvents="none">Bucc.</text>}</g>
                ))}

                {/* MASSETER L+R */}
                {[["M78 178 Q87 162 99 155 Q105 168 105 196 Q102 216 94 225 Q78 218 72 200 Q70 186 78 178Z","masseter","76","196"],
                  ["M242 178 Q233 162 221 155 Q215 168 215 196 Q218 216 226 225 Q242 218 248 200 Q250 186 242 178Z","masseter","244","196"]].map(([d,id,tx,ty],i) => (
                  <g key={i}><path d={d} fill={MUSCLES[id].color} opacity={selected && selected !== id ? 0.2 : 0.8} onClick={() => selectMuscle(id)} style={{ cursor: "pointer" }} />
                  {i===0 && <text x={tx} y={ty} textAnchor="middle" fontSize="6" fill="#fff" fontWeight="600" pointerEvents="none">Masseter</text>}</g>
                ))}

                {/* ORBICULARIS ORIS */}
                <ellipse cx="160" cy="214" rx="30" ry="19" fill={MUSCLES.orboris.color} opacity={selected && selected !== "orboris" ? 0.2 : 0.75} onClick={() => selectMuscle("orboris")} style={{ cursor: "pointer" }} />
                <text x="160" y="218" textAnchor="middle" fontSize="6.5" fill="#fff" fontWeight="600" pointerEvents="none">Orb. Oris</text>

                {/* DAO L+R */}
                {[["M128 224 Q136 217 143 220 Q144 234 139 244 Q131 242 127 233Z","dao"],
                  ["M192 224 Q184 217 177 220 Q176 234 181 244 Q189 242 193 233Z","dao"]].map(([d,id],i) => (
                  <path key={i} d={d} fill={MUSCLES[id].color} opacity={selected && selected !== id ? 0.2 : 0.8} onClick={() => selectMuscle(id)} style={{ cursor: "pointer" }} />
                ))}

                {/* MENTALIS */}
                <path d="M143 244 Q160 238 177 244 Q178 255 174 263 Q160 267 146 263 Q142 255 143 244Z" fill={MUSCLES.mentalis.color} opacity={selected && selected !== "mentalis" ? 0.2 : 0.8} onClick={() => selectMuscle("mentalis")} style={{ cursor: "pointer" }} />
                <text x="160" y="255" textAnchor="middle" fontSize="6.5" fill="#fff" fontWeight="600" pointerEvents="none">Mentalis</text>

                {/* PLATYSMA L+R */}
                {[["M110 258 Q120 253 132 262 Q140 278 138 308 Q128 316 118 312 Q108 292 108 272Z","platysma","108","284"],
                  ["M210 258 Q200 253 188 262 Q180 278 182 308 Q192 316 202 312 Q212 292 212 272Z","platysma","212","284"]].map(([d,id,tx,ty],i) => (
                  <g key={i}><path d={d} fill={MUSCLES[id].color} opacity={selected && selected !== id ? 0.2 : 0.75} onClick={() => selectMuscle(id)} style={{ cursor: "pointer" }} />
                  {i===0 && <text x={tx} y={ty} textAnchor="middle" fontSize="6" fill="#fff" fontWeight="600" pointerEvents="none">Platysma</text>}</g>
                ))}

                {/* Nose */}
                <path d="M154 148 Q152 172 148 180 Q155 185 160 185 Q165 185 172 180 Q168 172 166 148" fill="#d4a882" opacity="0.35" pointerEvents="none"/>
                {/* Mouth */}
                <path d="M142 206 Q160 211 178 206" stroke="#c0806a" strokeWidth="1.2" fill="none" pointerEvents="none"/>

                {/* Hint */}
                <text x="160" y="392" textAnchor="middle" fontSize="8.5" fill="#6b7280" fontStyle="italic">Tap any muscle to see clinical details below</text>
              </svg>
            ) : (
              /* SIDE VIEW */
              <svg width="320" height="400" viewBox="0 0 320 400" style={{ maxWidth: "100%" }}>
                {/* Head profile */}
                <path d="M132 42 Q178 26 205 48 Q230 68 234 104 Q238 138 225 164 Q215 182 202 190 Q192 200 188 216 Q184 232 180 250" fill="#f5d5b8" stroke="#d4a882" strokeWidth="1.5"/>
                <path d="M132 42 Q96 58 84 96 Q76 134 88 164 Q102 192 128 204 Q152 212 180 216 Q184 200 202 190" fill="#f5d5b8" stroke="#d4a882" strokeWidth="1.5"/>
                {/* Neck */}
                <path d="M180 250 Q174 278 172 308 Q180 328 192 332 Q212 324 222 305 Q228 280 224 257 Q212 246 198 244 Q186 244 180 250Z" fill="#f0cba8" stroke="#d4a882" strokeWidth="1"/>
                {/* Chest */}
                <path d="M138 332 Q166 344 200 340 Q224 334 240 320 Q248 340 240 362 Q196 378 132 366Z" fill="#e8c8a8" opacity="0.5" stroke="#d4a882" strokeWidth="0.8"/>

                {/* SCM */}
                <path d="M180 218 Q190 230 196 244 Q204 268 206 292 Q204 312 196 324 Q183 327 175 316 Q167 295 167 270 Q167 246 172 230Z" fill={MUSCLES.scm.color} opacity={selected && selected !== "scm" ? 0.2 : 0.75} onClick={() => selectMuscle("scm")} style={{ cursor: "pointer" }} />
                <text x="212" y="272" fontSize="7" fill="#fff" fontWeight="600" pointerEvents="none">SCM</text>

                {/* PLATYSMA side */}
                <path d="M170 232 Q160 254 156 282 Q153 308 157 328 Q165 336 173 333 Q176 316 178 292 Q179 270 178 248 Q178 236 172 228Z" fill={MUSCLES.platysma.color} opacity={selected && selected !== "platysma" ? 0.2 : 0.72} onClick={() => selectMuscle("platysma")} style={{ cursor: "pointer" }} />
                <text x="148" y="284" textAnchor="end" fontSize="7" fill={MUSCLES.platysma.color} fontWeight="600" pointerEvents="none">Platysma</text>

                {/* TRAPEZIUS */}
                <path d="M196 324 Q218 315 236 303 Q250 291 254 274 Q257 256 246 244 Q232 240 218 248 Q208 264 204 286 Q200 310 196 324Z" fill={MUSCLES.trapezius.color} opacity={selected && selected !== "trapezius" ? 0.2 : 0.75} onClick={() => selectMuscle("trapezius")} style={{ cursor: "pointer" }} />
                <text x="242" y="284" textAnchor="middle" fontSize="7" fill="#fff" fontWeight="600" pointerEvents="none">Trap.</text>

                {/* TEMPORALIS side */}
                <path d="M96 68 Q108 52 132 44 Q150 40 165 48 Q170 60 168 78 Q165 94 152 102 Q136 108 120 104 Q104 96 96 80Z" fill={MUSCLES.temporalis.color} opacity={selected && selected !== "temporalis" ? 0.2 : 0.75} onClick={() => selectMuscle("temporalis")} style={{ cursor: "pointer" }} />
                <text x="134" y="74" textAnchor="middle" fontSize="7" fill="#fff" fontWeight="600" pointerEvents="none">Temporalis</text>

                {/* MASSETER side */}
                <path d="M186 148 Q200 140 212 148 Q220 163 217 188 Q211 205 198 210 Q182 207 175 190 Q170 172 176 158Z" fill={MUSCLES.masseter.color} opacity={selected && selected !== "masseter" ? 0.2 : 0.8} onClick={() => selectMuscle("masseter")} style={{ cursor: "pointer" }} />
                <text x="204" y="176" textAnchor="middle" fontSize="7" fill="#fff" fontWeight="600" pointerEvents="none">Masseter</text>

                {/* SUBOCCIPITALS */}
                <path d="M87 136 Q96 124 110 120 Q122 118 130 126 Q128 142 118 148 Q105 153 95 146Z" fill={MUSCLES.suboccipital.color} opacity={selected && selected !== "suboccipital" ? 0.2 : 0.75} onClick={() => selectMuscle("suboccipital")} style={{ cursor: "pointer" }} />
                <text x="82" y="138" textAnchor="end" fontSize="6.5" fill={MUSCLES.suboccipital.color} fontWeight="600" pointerEvents="none">Suboccip.</text>

                {/* OCCIPITALIS - using trapezius color stand-in */}
                <path d="M84 100 Q96 88 112 86 Q122 87 128 96 Q122 112 112 118 Q98 121 88 112Z" fill="#0891b2" opacity={selected && selected !== "occipitalis" ? 0.2 : 0.75} onClick={() => selectMuscle("occipitalis")} style={{ cursor: "pointer" }} />
                <text x="80" y="103" textAnchor="end" fontSize="6.5" fill="#0891b2" fontWeight="600" pointerEvents="none">Occipitalis</text>

                {/* DIGASTRIC */}
                <path d="M172 208 Q182 213 193 217 Q202 226 198 239 Q187 241 176 237 Q168 229 168 218Z" fill="#0d9488" opacity={selected && selected !== "digastric" ? 0.2 : 0.78} onClick={() => selectMuscle("digastric")} style={{ cursor: "pointer" }} />
                <text x="205" y="228" fontSize="7" fill="#0d9488" fontWeight="600" pointerEvents="none">Digastric</text>

                {/* PECTORALIS */}
                <path d="M148 340 Q176 350 208 346 Q228 340 242 328 Q248 344 240 362 Q196 378 138 366Z" fill={MUSCLES.pectoralis.color} opacity={selected && selected !== "pectoralis" ? 0.2 : 0.7} onClick={() => selectMuscle("pectoralis")} style={{ cursor: "pointer" }} />
                <text x="192" y="356" textAnchor="middle" fontSize="7" fill="#fff" fontWeight="600" pointerEvents="none">Pectoralis Maj.</text>

                <text x="160" y="392" textAnchor="middle" fontSize="8.5" fill="#6b7280" fontStyle="italic">Tap any muscle to see clinical details below</text>
              </svg>
            )}
          </div>

          {/* Info Panel */}
          <div style={{ margin: "0 12px 16px", background: muscle ? "#eaf4f4" : "#f4fafa", borderRadius: 10, border: "1px solid #c8e8e8", padding: "14px 14px", minHeight: 80 }}>
            {!muscle ? (
              <div style={{ textAlign: "center", color: "#9ca3af", fontStyle: "italic", fontSize: "0.85rem", padding: "20px 0" }}>
                👆 Tap a muscle on the diagram above
              </div>
            ) : (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                  <div style={{ fontFamily: "Georgia, serif", fontSize: "1.15rem", color: "#0f4040", fontWeight: 400 }}>{muscle.name}</div>
                  <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", fontSize: "1.1rem", cursor: "pointer", color: "#9ca3af", lineHeight: 1 }}>✕</button>
                </div>
                <div style={{ display: "inline-block", background: "#fdf3e3", border: "1px solid #c8973a", color: "#c8973a", fontSize: "0.62rem", padding: "2px 8px", borderRadius: 10, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10, fontWeight: 600 }}>{muscle.region}</div>
                {[["Origin", muscle.origin],["Insertion", muscle.insertion],["Action", muscle.action],["Nerve", muscle.nerve]].map(([label, value]) => (
                  <div key={label} style={{ marginBottom: 8 }}>
                    <div style={{ fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "#4a9a9a", fontWeight: 600, marginBottom: 2 }}>{label}</div>
                    <div style={{ fontSize: "0.78rem", lineHeight: 1.5 }}>{value}</div>
                  </div>
                ))}
                <div style={{ background: "white", borderLeft: "3px solid #1B6B6B", borderRadius: "0 6px 6px 0", padding: "10px 12px", margin: "10px 0" }}>
                  <div style={{ fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "#1B6B6B", fontWeight: 600, marginBottom: 3 }}>Aging Role</div>
                  <div style={{ fontSize: "0.78rem", lineHeight: 1.5 }}>{muscle.aging}</div>
                </div>
                <div style={{ background: "#fdf3e3", borderLeft: "3px solid #c8973a", borderRadius: "0 6px 6px 0", padding: "10px 12px", margin: "10px 0" }}>
                  <div style={{ fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "#c8973a", fontWeight: 600, marginBottom: 3 }}>Tension Shows As</div>
                  <div style={{ fontSize: "0.78rem", lineHeight: 1.5 }}>{muscle.tension}</div>
                </div>
                <div style={{ fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "#4a9a9a", fontWeight: 600, marginBottom: 6 }}>Techniques</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                  {muscle.techniques.map(t => <span key={t} style={{ background: "#c8e8e8", color: "#0f4040", fontSize: "0.68rem", padding: "3px 9px", borderRadius: 10, fontWeight: 500 }}>{t}</span>)}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── TAB: AGING MAP ── */}
      {tab === "quickref" && (
        <div style={{ padding: "20px 12px" }}>
          <div style={{ fontFamily: "Georgia, serif", fontSize: "1.2rem", color: "#0f4040", marginBottom: 4 }}>Aging Area → Muscle Map</div>
          <div style={{ fontSize: "0.72rem", color: "#6b7280", fontStyle: "italic", marginBottom: 14 }}>Which muscles to target for each concern</div>
          {AGING_MAP.map(([area, primary, secondary, techniques], i) => (
            <div key={i} style={{ background: i % 2 === 0 ? "white" : "#eaf4f4", borderRadius: 8, border: "1px solid #c8e8e8", marginBottom: 8, padding: "11px 13px" }}>
              <div style={{ fontWeight: 600, color: "#0f4040", fontSize: "0.85rem", marginBottom: 4 }}>{area}</div>
              <div style={{ fontSize: "0.72rem", marginBottom: 2 }}><span style={{ color: "#4a9a9a", fontWeight: 600 }}>Primary: </span>{primary}</div>
              <div style={{ fontSize: "0.72rem", marginBottom: 2 }}><span style={{ color: "#9ca3af", fontWeight: 600 }}>Supporting: </span>{secondary}</div>
              <div style={{ fontSize: "0.72rem" }}><span style={{ color: "#c8973a", fontWeight: 600 }}>Techniques: </span>{techniques}</div>
            </div>
          ))}
        </div>
      )}

      {/* ── TAB: SEQUENCES ── */}
      {tab === "sequences" && (
        <div style={{ padding: "20px 12px" }}>
          <div style={{ fontFamily: "Georgia, serif", fontSize: "1.2rem", color: "#0f4040", marginBottom: 4 }}>Treatment Sequences</div>
          <div style={{ fontSize: "0.72rem", color: "#6b7280", fontStyle: "italic", marginBottom: 4 }}>Open → Work → Close</div>
          <div style={{ background: "#eaf4f4", borderRadius: 6, padding: "8px 12px", marginBottom: 14, fontSize: "0.74rem", color: "#0f4040" }}>
            ⚠ Always close with lymphatic — don't leave tissue mobilized with no exit route.
          </div>
          {/* Filters */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
            {[["all","All"],["lines","Fine Lines"],["lift","Lifting"],["jaw","Jaw / TMJ"],["fluid","Puffiness"],["sensitive","Sensitive"]].map(([id, label]) => (
              <button key={id} onClick={() => setSeqFilter(id)} style={{ padding: "4px 12px", border: "1.5px solid", borderColor: seqFilter === id ? "#1B6B6B" : "#c8e8e8", borderRadius: 14, cursor: "pointer", fontSize: "0.68rem", background: seqFilter === id ? "#1B6B6B" : "white", color: seqFilter === id ? "white" : "#6b7280", fontWeight: 500 }}>{label}</button>
            ))}
          </div>
          {filteredSeqs.map((seq, i) => (
            <div key={i} style={{ background: "white", borderRadius: 10, border: "1px solid #c8e8e8", marginBottom: 14, overflow: "hidden" }}>
              <div style={{ background: "#1B6B6B", padding: "11px 14px" }}>
                <div style={{ fontFamily: "Georgia, serif", fontSize: "1rem", color: "white", fontWeight: 400 }}>{seq.title}</div>
                <div style={{ fontSize: "0.68rem", color: "#c8e8e8", fontStyle: "italic", marginTop: 2 }}>{seq.sub}</div>
              </div>
              <div style={{ padding: "10px 14px" }}>
                {seq.steps.map(([step, tech, note], j) => (
                  <div key={j} style={{ display: "grid", gridTemplateColumns: "58px 1fr", gap: 10, paddingBottom: 8, marginBottom: 8, borderBottom: j < seq.steps.length - 1 ? "1px solid #eaf4f4" : "none" }}>
                    <div style={{ fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#4a9a9a", paddingTop: 1 }}>{step}</div>
                    <div>
                      <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "#0f4040", marginBottom: 2 }}>{tech}</div>
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
