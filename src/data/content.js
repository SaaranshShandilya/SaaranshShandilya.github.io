/**
 * Single source of truth for every piece of copy on the site.
 * Any link left as an empty string is simply not rendered, so a project can be
 * listed before its URL exists.
 */

export const profile = {
  name: 'Saaransh Shandilya',
  first: 'Saaransh',
  last: 'Shandilya',
  role: 'M.Tech, Computer Science (AI)',
  place: 'IIT Gandhinagar',
  tagline: 'I build AI systems people actually use.',
  blurb:
    'Natural-language SQL for policymakers. Offline call analytics. Five years of shipping the part where research leaves the notebook.',
  email: 'saaranshshandilya@gmail.com',
  phone: '+91 7289009286',
  location: 'Gurgaon, Haryana, India',
  photo: '/saaransh.png',
  resumeUrl: '/Saaransh_Shandilya_Resume.pdf', // drop the PDF into /public
  socials: [
    { label: 'GitHub', href: 'https://github.com/SaaranshShandilya' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/saaranshshandilya/' },
    { label: 'Email', href: 'mailto:saaransh.shandilya@iitgn.ac.in' },
  ],
};

export const about = {
  heading: 'About',
  paragraphs: [
    'M.Tech student in CS (AI) at IIT Gandhinagar, working on shrinking language models small enough to run where the data actually lives.',
    'Before that, two years and six positions of shipping production software — frontends, backends, AR and a gaming portal.',
  ],
  facts: [
    { value: '9.17', label: 'M.Tech CPI, IIT Gandhinagar' },
    { value: '9.40', label: 'B.Tech CPI, gold medallist' },
    { value: '622', label: 'GATE rank' },
    { value: '92.4%', label: 'Class XII' },
  ],
};

export const projects = [
  {
    id: 'vayubuddy',
    index: '01',
    title: 'VayuBuddy',
    kind: 'M.Tech Thesis',
    supervisor: 'Prof. Nipun Batra, IIT Gandhinagar',
    year: '2025 —',
    summary:
      'Natural-language-to-SQL that lets policymakers interrogate CPCB and other environmental databases by simply asking.',
    bullets: [
      'Scaled the LLM from 120B to 270M parameters — fine-tuning, LoRA, quantization — small enough to run offline on a phone.',
      'Deployed with Thane Municipal Corporation and CEEW at up to 400 concurrent requests a day; extended to IIT Gandhinagar’s R&D office as “RnD Chat”.',
    ],
    stack: ['LLM fine-tuning', 'LoRA', 'Quantization', 'Text-to-SQL', 'Unsloth'],
    accent: '#ff6a3d',
    links: [
      // plain http on a bare IP — swap for a domain when VayuBuddy gets one
      { label: 'Live tool', href: 'http://34.14.147.52:8507/' },
      {
        label: 'Android app',
        href: 'https://drive.google.com/file/d/1Emz4KX6FugU_RCWevQtoTiUg22TGphoF/view?usp=drive_link',
      },
    ],
  },
  {
    id: 'voxiq',
    index: '02',
    title: 'VoxIQ',
    kind: 'Project',
    supervisor: '',
    year: '2025',
    summary:
      'A fully offline call-QA pipeline that listens to a support call and returns an evidence-backed scorecard in nine seconds.',
    bullets: [
      'React + FastAPI: faster-whisper transcription, pyannote diarization, and a fine-tuned LLM scoring a 19-skill rubric.',
      'Dual-signal scoring pairs TinyLlama rubric judgements with acoustic metrics — speech rate, pauses, fillers, wav2vec2 accent clarity.',
    ],
    stack: ['React', 'FastAPI', 'faster-whisper', 'pyannote', 'TinyLlama'],
    accent: '#5bc8f5',
    links: [
      {
        label: 'Demo video',
        href: 'https://drive.google.com/file/d/1NoX6Yz_nRYxkeBgI63TMGWemEJPKiYCf/view',
      },
      { label: 'GitHub', href: 'https://github.com/SaaranshShandilya/voice-ai-pipeline' },
    ],
  },
  {
    id: 'pathpilot',
    index: '03',
    title: 'PathPilot',
    kind: 'Byteridge',
    supervisor: '',
    year: '2023',
    summary:
      'AR indoor navigation in Flutter that walks you turn-by-turn through GPS-denied buildings.',
    bullets: [
      'Modelled venues as a node graph and ran traversal to compute routes, rendered as live AR waypoints.',
      'One Flutter interface bridging ARKit and ARCore, replacing two separate native builds.',
    ],
    stack: ['Flutter', 'Dart', 'ARKit', 'ARCore'],
    accent: '#ffc24b',
    links: [{ label: 'GitHub', href: 'https://github.com/SaaranshShandilya/AR_Navigator' }],
  },
];

/* Smaller live products and open-source repos — shown as a compact grid under
   the three featured projects. */
export const shipped = [
  {
    name: 'northstarz.ai',
    blurb: 'Company site and product frontend, built in React.',
    stack: ['React.js'],
    href: 'https://northstarz.ai/',
    kind: 'Live',
  },
  {
    name: 'interviewguru.co',
    blurb: 'Interview-prep platform frontend for Northstarz.Ai.',
    stack: ['React.js', 'JavaScript', 'GoLang'],
    href: 'https://interviewguru.co/',
    kind: 'Live',
  },
  {
    name: 'interviewvision.com',
    blurb: 'Interview platform on a React frontend with a GoLang backend.',
    stack: ['React.js', 'JavaScript', 'GoLang'],
    href: 'https://interviewvision.com/',
    kind: 'Live',
  },
  {
    name: 'highfivesgames.com',
    blurb: 'Gaming portal built at Megamynd — still in use in Iraq.',
    stack: ['React.js', 'Flutter', 'GoLang'],
    href: 'https://highfivesgames.com/',
    kind: 'Live',
  },
  {
    name: 'Word Recommendation AI',
    blurb: 'Next-word recommendation model trained in TensorFlow.',
    stack: ['TensorFlow', 'Python'],
    href: 'https://github.com/SaaranshShandilya/Word-Recommendation',
    kind: 'Code',
  },
  {
    name: 'GREP for Windows',
    blurb: 'A grep implementation that brings the tool to Windows.',
    stack: ['GoLang'],
    href: 'https://github.com/SaaranshShandilya/GREP-for-windows',
    kind: 'Code',
  },
];

/* Ordered by end date, most recent first. */
export const experience = [
  {
    role: 'Lead Software Engineer',
    company: 'Northstarz.Ai',
    period: 'Jan 2023 — Jul 2025',
    bullets: [
      'Lead frontend across three live platforms serving 2,000–3,000 users daily.',
      'Integrated LSTM sentiment models trained on 70,000 datapoints; shipped Razorpay and PhonePe payment flows.',
    ],
    stack: ['React.js', 'LSTM', 'Razorpay', 'PhonePe'],
  },
  {
    role: 'Full Stack Engineer',
    company: 'Byteridge',
    period: 'Feb 2023 — May 2023',
    bullets: [
      'Built AR indoor mapping in Flutter — venues as AR nodes, routed by traversal algorithms.',
      'Bridged ARKit and ARCore behind a single Flutter interface.',
    ],
    stack: ['Flutter', 'ARKit', 'ARCore'],
  },
  {
    role: 'Software Developer',
    company: 'Megamynd.org',
    period: 'Jun 2022 — Jan 2023',
    bullets: [
      'Core developer on highfivesgames.com in React and Flutter — a live revenue stream for the institution, still running in Iraq.',
    ],
    stack: ['React.js', 'Flutter'],
  },
  {
    role: 'Frontend Developer',
    company: 'PerroAyuda Welfare Foundation',
    period: 'Jan 2022 — Feb 2022',
    bullets: [
      'Rebuilt perroayuda.org off WordPress in React and Tailwind, handing the team dynamic control of components and imagery.',
    ],
    stack: ['React.js', 'Tailwind CSS'],
  },
  {
    role: 'Backend Developer Intern',
    company: 'Wilyer',
    period: 'Apr 2021 — May 2021',
    bullets: [
      'Django and REST backend serving three interfaces — user, provider and superuser.',
    ],
    stack: ['Django', 'REST API'],
  },
  {
    role: 'Software Engineer',
    company: 'Koders.in',
    period: 'Feb 2021 — Mar 2021',
    bullets: [
      'Selenium bot that logged into sites, bulk-ordered products and completed payment.',
    ],
    stack: ['Selenium', 'JavaScript'],
  },
];

export const education = [
  {
    degree: 'M.Tech, Computer Science (AI)',
    org: 'IIT Gandhinagar',
    year: '2025 — Present',
    score: 'CPI 9.17',
  },
  {
    degree: 'B.Tech, Computer Science',
    org: 'G.D. Goenka University',
    year: '2019 — 2023',
    score: 'CPI 9.40',
  },
  {
    degree: 'Class XII — PCM',
    org: 'Colonel’s Central Academy',
    year: '2019',
    score: '92.4%',
  },
  {
    degree: 'Class X',
    org: 'Colonel’s Central Academy',
    year: '2017',
    score: '10.0',
  },
];

export const skills = [
  {
    group: 'Languages',
    items: ['Python', 'C', 'C++', 'JavaScript', 'Dart', 'Java', 'C#', 'SQL', 'GoLang'],
  },
  {
    group: 'ML & AI',
    items: ['PyTorch', 'TensorFlow', 'Transformers', 'Unsloth', 'NLTK', 'AI Studio'],
  },
  {
    group: 'Web & App',
    items: ['React.js', 'FastAPI', 'Django', 'Node', 'Flutter', 'Tailwind CSS'],
  },
  {
    group: 'Data',
    items: ['MySQL', 'MongoDB', 'Firebase'],
  },
];

export const achievements = [
  { title: 'Smart India Hackathon Finalist', meta: 'National' },
  { title: 'India AI Fellowship Holder', meta: 'Fellowship' },
  { title: 'Gold Medallist', meta: 'G.D. Goenka University' },
];

export const positions = [
  {
    title: 'Masters ’25 Senator',
    org: 'IIT Gandhinagar',
    period: 'May 2026 — Apr 2027',
    detail:
      'Representing the Master’s cohort in the institute senate, driving resolution on hostel and academic issues.',
  },
  {
    title: 'HAT Coordinator',
    org: 'IIT Gandhinagar',
    period: 'May 2025 — Apr 2026',
    detail: 'Led a team of three organising cultural and sports activities across the hostel.',
  },
];

export const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export const marqueeWords = [
  'Text-to-SQL',
  'LoRA',
  'Quantization',
  'React',
  'PyTorch',
  'FastAPI',
  'Flutter',
  'Augmented reality',
  'On-device LLMs',
];
