import { Project, Category } from '../types/project';

export const PROJECTS: Project[] = [
  {
    id: '01',
    title: 'veloria',
    category: 'Web Development',
    image: 'https://res.cloudinary.com/dv9jpkgrs/image/upload/v1772994247/veloria-git-main-rafael-bulezis-projects.vercel.app__sycozm.webp',
    description: "Veloria is a premier seafood destination on the Luanda coastline, blending fresh Atlantic flavors with sophisticated, panoramic ocean views. The experience celebrates Angola's rich maritime heritage through a refined, seasonal menu served in an elegant, sun-drenched setting.",
    techStack: ['React', 'Three.js', 'GSAP', 'WebGL', 'Gemini 3.1'],
    year: '2025',
    liveSiteUrl: 'https://example.com',
    gallery: [
      'https://res.cloudinary.com/dv9jpkgrs/image/upload/v1773059854/rafael-bulezi-restaurant-demo-velor.vercel.app__7_lvjupf.jpg',
      'https://res.cloudinary.com/dv9jpkgrs/image/upload/v1773060423/rafael-bulezi-restaurant-demo-velor.vercel.app__8_tydoky.jpg',
      'https://res.cloudinary.com/dv9jpkgrs/image/upload/v1773062216/rafael-bulezi-restaurant-demo-velor.vercel.app__10_1_azyjew.webp',
      'https://res.cloudinary.com/dv9jpkgrs/image/upload/v1773059006/rafael-bulezi-restaurant-demo-velor.vercel.app__i4d0lj.jpg',
      'https://res.cloudinary.com/dv9jpkgrs/image/upload/v1773062317/rafael-bulezi-restaurant-demo-velor.vercel.app__11_vvqe0f.jpg',
      'https://res.cloudinary.com/dv9jpkgrs/image/upload/v1773064773/rafael-bulezi-restaurant-demo-velor.vercel.app__12_bn7t2y.webp',
      'https://res.cloudinary.com/dv9jpkgrs/image/upload/v1773059438/rafael-bulezi-restaurant-demo-velor.vercel.app__5_j7t5m4.jpg',
    ],
  },
  {
    id: '02',
    title: 'Reflecting the Glory of GOD',
    category: 'Video Production',
    image: 'https://res.cloudinary.com/dv9jpkgrs/image/upload/v1786928216/ChatGPT_Image_Aug_17_2026_01_56_33_AM_wrbekd.png',
    videoUrl: 'https://drive.google.com/file/d/1GBXTA452RRx1Q2m24-OWjicpqxTuxh0E/view?usp=drive_link',
    fullVideoUrl: 'https://drive.google.com/file/d/1GBXTA452RRx1Q2m24-OWjicpqxTuxh0E/view?usp=drive_link',
    description: 'An evocative and sacred cinematic exploration into divine reverence, awe, and transcendent light.',
    techStack: ['Premiere Pro', 'DaVinci Resolve', 'Sound Design'],
    year: '2026',
  },
  {
    id: '03',
    title: 'Dr Jimmy Trailer',
    category: 'Video Production',
    image: 'https://res.cloudinary.com/dv9jpkgrs/image/upload/v1786930828/ChatGPT_Image_Aug_17_2026_02_40_16_AM_hmqthr.png',
    videoUrl: 'https://drive.google.com/file/d/1zemg28ieElR3nFGrYy6PjlDLAulxDDoY/view?usp=drive_link',
    fullVideoUrl: 'https://drive.google.com/file/d/1zemg28ieElR3nFGrYy6PjlDLAulxDDoY/view?usp=drive_link',
    description: 'A gripping documentary trailer exploring vision, legacy, and leadership through high-contrast storytelling.',
    techStack: ['Cinematography', 'Color Grading', 'After Effects'],
    year: '2026',
  },
  {
    id: '04',
    title: 'My Past Business',
    category: 'Video Production',
    image: 'https://res.cloudinary.com/dv9jpkgrs/image/upload/v1786786663/livestream_clip_about_my_bussiness._b9zd12.png',
    videoUrl: 'https://drive.google.com/file/d/1JMNr1kLTNzfnRnl65yEMDRTO-N2vJn6r/view?usp=drive_link',
    fullVideoUrl: 'https://drive.google.com/file/d/1JMNr1kLTNzfnRnl65yEMDRTO-N2vJn6r/view?usp=drive_link',
    description: 'A candid retrospective and livestream documentary breaking down real entrepreneurial lessons, pivots, and milestones.',
    techStack: ['Directing', 'Storytelling', 'Editing'],
    year: '2026',
  },
  {
    id: '05',
    title: 'AM4Less Training Commercial',
    category: 'Video Production',
    image: 'https://res.cloudinary.com/dv9jpkgrs/image/upload/v1786929846/ChatGPT_Image_Aug_17_2026_02_19_56_AM_ck5vqr.png',
    videoUrl: 'https://drive.google.com/file/d/1pY9sS0TwXws38K-aJxYZ0RXnRd5MyaCs/view?usp=drive_link',
    fullVideoUrl: 'https://drive.google.com/file/d/1pY9sS0TwXws38K-aJxYZ0RXnRd5MyaCs/view?usp=drive_link',
    description: 'Dynamic commercial spotlighting AM4Less training modules with kinetic pacing and bold soundscapes.',
    techStack: ['Commercial Production', 'After Effects', 'C4D'],
    year: '2026',
  },
  {
    id: '06',
    title: 'Love Is Selfless',
    category: 'Video Production',
    image: 'https://res.cloudinary.com/dv9jpkgrs/image/upload/v1786787274/ChatGPT_Image_Aug_15_2026_10_47_35_AM_balt1e.png',
    videoUrl: 'https://drive.google.com/file/d/1VNslJv9AVY1jcVf0ZdJzO02Gk13hL2rW/view?usp=drive_link',
    fullVideoUrl: 'https://drive.google.com/file/d/1VNslJv9AVY1jcVf0ZdJzO02Gk13hL2rW/view?usp=drive_link',
    description: 'An intimate, cinematic visual piece on unconditional devotion and the quiet strength of love.',
    techStack: ['Directing', 'Cinematography', 'Atmospheric Score'],
    year: '2025',
  },
  {
    id: '07',
    title: 'Ambition',
    category: 'Video Production',
    image: 'https://res.cloudinary.com/dv9jpkgrs/image/upload/v1787026783/ChatGPT_Image_Aug_18_2026_05_19_19_AM_udizho.png',
    videoUrl: 'https://drive.google.com/file/d/1uwqxNI6QQPFVO-XDZX8GdG5fdny8s5aa/view?usp=drive_link',
    fullVideoUrl: 'https://drive.google.com/file/d/1uwqxNI6QQPFVO-XDZX8GdG5fdny8s5aa/view?usp=drive_link',
    description: 'A striking dramatic piece exploring drive, ambition, and pursuit through high-impact visual storytelling.',
    techStack: ['Premiere Pro', 'Sound Design', 'Motion Graphics'],
    year: '2026',
  },
  {
    id: '13',
    title: 'Law and Order',
    category: 'Video Production',
    image: 'https://res.cloudinary.com/dv9jpkgrs/image/upload/v1773073079/Whisk_c451e4d9353ac399ab1438a486573712dr_d8hsrf.jpg',
    videoUrl: 'https://youtu.be/F8s7b0EvDPs?si=G9GgY_6LK17Vxkak',
    fullVideoUrl: 'https://youtu.be/F8s7b0EvDPs?si=G9GgY_6LK17Vxkak',
    description: 'A intense cinematic study of structure, justice, and authority.',
    techStack: ['Directing', 'Cinematography', 'Sound Design'],
    year: '2026',
  },
  {
    id: '14',
    title: 'Kings and Empires',
    category: 'Video Production',
    image: 'https://res.cloudinary.com/dv9jpkgrs/image/upload/v1787027922/ChatGPT_Image_Aug_18_2026_05_38_12_AM_yfgcdr.png',
    videoUrl: 'https://res.cloudinary.com/dv9jpkgrs/video/upload/q_auto:good,f_auto,vc_auto/v1773074452/after_blink_start_kymhdc.mp4',
    fullVideoUrl: 'https://res.cloudinary.com/dv9jpkgrs/video/upload/q_auto:good,f_auto,vc_auto/v1773074452/after_blink_start_kymhdc.mp4',
    description: 'An epic visual narrative tracing power, legacy, and historical grandeur.',
    techStack: ['VFX', 'Cinematography', 'Editing'],
    year: '2026',
  },
  {
    id: '08',
    title: 'Christ Is Love',
    category: 'Video Production',
    image: 'https://res.cloudinary.com/dv9jpkgrs/image/upload/v1786787790/ChatGPT_Image_Aug_15_2026_10_56_05_AM_kpwsvf.png',
    videoUrl: 'https://drive.google.com/file/d/19n7eH50gGbdwiAbd4yPi6TC_Ll8Enp_b/view?usp=drive_link',
    fullVideoUrl: 'https://drive.google.com/file/d/19n7eH50gGbdwiAbd4yPi6TC_Ll8Enp_b/view?usp=drive_link',
    description: 'An evocative visual hymn merging sacred themes with contemporary cinematic aesthetics.',
    techStack: ['Color Grading', 'Visual Effects', 'Editing'],
    year: '2025',
  },
  {
    id: '09',
    title: 'Cakes do Owi',
    category: 'Web Development',
    image: 'https://res.cloudinary.com/dv9jpkgrs/image/upload/q_auto,f_auto,w_1920/v1777219417/cakes-do-owi.vercel.app__4_jbu6ft.webp',
    description: 'A premium digital storefront and ordering ecosystem for a boutique cake studio, focusing on visual indulgence and seamless user flow.',
    techStack: ['React', 'Framer Motion', 'Tailwind CSS', 'Cloudinary'],
    year: '2026',
    liveSiteUrl: 'https://cakes-do-owi.vercel.app',
    gallery: [
      'https://res.cloudinary.com/dv9jpkgrs/image/upload/q_auto,f_auto,w_1920/v1777219417/cakes-do-owi.vercel.app__4_jbu6ft.webp',
      'https://res.cloudinary.com/dv9jpkgrs/image/upload/q_auto,f_auto,w_1920/v1777219418/cakes-do-owi.vercel.app__6_x6vred.webp',
      'https://res.cloudinary.com/dv9jpkgrs/image/upload/q_auto,f_auto,w_1920/v1777219417/cakes-do-owi.vercel.app__5_jl99eb.webp',
      'https://res.cloudinary.com/dv9jpkgrs/image/upload/q_auto,f_auto,w_1920/v1777219419/cakes-do-owi.vercel.app__1_q7eaic.webp',
      'https://res.cloudinary.com/dv9jpkgrs/image/upload/q_auto,f_auto,w_1920/v1777219423/cakes-do-owi.vercel.app__epginh.jpg',
      'https://res.cloudinary.com/dv9jpkgrs/image/upload/q_auto,f_auto,w_1920/v1777219417/cakes-do-owi.vercel.app__3_kcjwt7.webp',
      'https://res.cloudinary.com/dv9jpkgrs/image/upload/q_auto,f_auto,w_1920/v1777219417/cakes-do-owi.vercel.app__2_psmnzy.webp',
    ],
  },
  {
    id: '10',
    title: 'DJP BANNER',
    category: 'Graphic Authority',
    image: 'https://res.cloudinary.com/dv9jpkgrs/image/upload/v1773080570/stay_tune_to_hear_others_perspective_yi0sj1.webp',
    description: 'Brand identity system for a modern art museum in Tokyo.',
    techStack: ['Illustrator', 'Blender', 'Photoshop'],
    year: '2024',
  },
  {
    id: '11',
    title: 'Electric Brew',
    category: 'Web Development',
    image: 'https://res.cloudinary.com/dv9jpkgrs/image/upload/v1786769816/stitch.withgoogle.com_preview_11889611427327085943_node-id_83587e38beb043a3832d2faed15d6053_raw_1_acsqyl.png',
    description: 'A high-energy digital brand and beverage commerce experience combining electric neon aesthetics with contemporary coffee culture and tactile user interactions.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    year: '2026',
    gallery: [
      'https://res.cloudinary.com/dv9jpkgrs/image/upload/v1786769816/stitch.withgoogle.com_preview_11889611427327085943_node-id_83587e38beb043a3832d2faed15d6053_raw_1_acsqyl.png',
      'https://res.cloudinary.com/dv9jpkgrs/image/upload/v1786769802/stitch.withgoogle.com_preview_11889611427327085943_node-id_5154f6afbed0475492b4ade5f48fdb61_raw_1_3_cx420f.png',
      'https://res.cloudinary.com/dv9jpkgrs/image/upload/v1786769804/stitch.withgoogle.com_preview_11889611427327085943_node-id_83587e38beb043a3832d2faed15d6053_raw_1_8_uietvc.png',
      'https://res.cloudinary.com/dv9jpkgrs/image/upload/v1786769820/stitch.withgoogle.com_preview_11889611427327085943_node-id_5154f6afbed0475492b4ade5f48fdb61_raw_1_1_vosvwh.png',
      'https://res.cloudinary.com/dv9jpkgrs/image/upload/v1786769826/stitch.withgoogle.com_preview_11889611427327085943_node-id_83587e38beb043a3832d2faed15d6053_raw_1_6_utkjt7.png',
      'https://res.cloudinary.com/dv9jpkgrs/image/upload/v1786769791/stitch.withgoogle.com_preview_11889611427327085943_node-_ppcxl8.png',
    ],
  },
  {
    id: '12',
    title: 'Azlatã',
    category: 'Web Development',
    image: 'https://res.cloudinary.com/dv9jpkgrs/image/upload/v1786930023/ChatGPT_Image_Aug_17_2026_02_26_38_AM_mwuzvg.png',
    description: 'A comprehensive e-commerce ecosystem with a focus on high-fidelity product visualization and seamless user experience.',
    techStack: ['Next.js', 'PostgreSQL', 'Tailwind CSS'],
    year: '2026',
    gallery: [
      'https://res.cloudinary.com/dv9jpkgrs/image/upload/v1786930023/ChatGPT_Image_Aug_17_2026_02_26_38_AM_mwuzvg.png',
      'https://res.cloudinary.com/dv9jpkgrs/image/upload/v1777465751/product_list_-_Copy_g13unc.png',
      'https://res.cloudinary.com/dv9jpkgrs/image/upload/v1777465750/homepage_e0dftc.png',
      'https://res.cloudinary.com/dv9jpkgrs/image/upload/v1777465744/homepage_section_2_c3saqx.png',
      'https://res.cloudinary.com/dv9jpkgrs/image/upload/v1777465729/cart1_v7ranl.png',
      'https://res.cloudinary.com/dv9jpkgrs/image/upload/v1777465738/product_page_-_Copy_sc6dcq.png',
      'https://res.cloudinary.com/dv9jpkgrs/image/upload/v1777465723/user_page_-_Copy_nmsrlj.png',
    ],
  },
];

export const CATEGORIES: Category[] = ['All', 'Web Development', 'Video Production', 'Graphic Authority'];

export function convertToYouTubeEmbed(url: string): string {
  if (url.includes('youtu.be/')) {
    return `https://www.youtube.com/embed/${url.split('youtu.be/')[1].split('?')[0]}`;
  }
  if (url.includes('youtube.com/watch')) {
    return `https://www.youtube.com/embed/${new URLSearchParams(url.split('?')[1]).get('v')}`;
  }
  return url;
}

export function isYouTubeUrl(url: string): boolean {
  return url.includes('youtube.com') || url.includes('youtu.be');
}

export function convertToGoogleDriveEmbed(url: string): string {
  const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    return `https://drive.google.com/file/d/${match[1]}/preview`;
  }
  return url;
}

export function isGoogleDriveUrl(url: string): boolean {
  return url.includes('drive.google.com');
}