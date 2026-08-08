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
    title: 'law and order',
    category: 'Video Production',
    image: 'https://res.cloudinary.com/dv9jpkgrs/image/upload/v1773073079/Whisk_c451e4d9353ac399ab1438a486573712dr_d8hsrf.jpg',
    videoUrl: 'https://youtu.be/F8s7b0EvDPs?si=G9GgY_6LK17Vxkak',
    fullVideoUrl: 'https://youtu.be/F8s7b0EvDPs?si=G9GgY_6LK17Vxkak',
    description: 'A short film on law and order and what happens without them.',
    techStack: ['Premiere Pro', 'After Effects', 'Stable Diffusion'],
    year: '2026',
  },
  {
    id: '03',
    title: 'DJP BANNER',
    category: 'Graphic Authority',
    image: 'https://res.cloudinary.com/dv9jpkgrs/image/upload/v1773080570/stay_tune_to_hear_others_perspective_yi0sj1.webp',
    description: 'Brand identity system for a modern art museum in Tokyo.',
    techStack: ['Illustrator', 'Blender', 'Photoshop'],
    year: '2024',
  },
  {
    id: '04',
    title: 'Cakes do Owi',
    category: 'Web Development',
    image: 'https://res.cloudinary.com/dv9jpkgrs/image/upload/q_auto,f_auto,w_1920/v1777219418/cakes-do-owi.vercel.app__6_x6vred.webp',
    description: 'A premium digital storefront and ordering ecosystem for a boutique cake studio, focusing on visual indulgence and seamless user flow.',
    techStack: ['React', 'Framer Motion', 'Tailwind CSS', 'Cloudinary'],
    year: '2026',
    liveSiteUrl: 'https://cakes-do-owi.vercel.app',
    gallery: [
      'https://res.cloudinary.com/dv9jpkgrs/image/upload/q_auto,f_auto,w_1920/v1777219418/cakes-do-owi.vercel.app__6_x6vred.webp',
      'https://res.cloudinary.com/dv9jpkgrs/image/upload/q_auto,f_auto,w_1920/v1777219417/cakes-do-owi.vercel.app__5_jl99eb.webp',
      'https://res.cloudinary.com/dv9jpkgrs/image/upload/q_auto,f_auto,w_1920/v1777219419/cakes-do-owi.vercel.app__1_q7eaic.webp',
      'https://res.cloudinary.com/dv9jpkgrs/image/upload/q_auto,f_auto,w_1920/v1777219423/cakes-do-owi.vercel.app__epginh.jpg',
      'https://res.cloudinary.com/dv9jpkgrs/image/upload/q_auto,f_auto,w_1920/v1777219417/cakes-do-owi.vercel.app__4_jbu6ft.webp',
      'https://res.cloudinary.com/dv9jpkgrs/image/upload/q_auto,f_auto,w_1920/v1777219417/cakes-do-owi.vercel.app__3_kcjwt7.webp',
      'https://res.cloudinary.com/dv9jpkgrs/image/upload/q_auto,f_auto,w_1920/v1777219417/cakes-do-owi.vercel.app__2_psmnzy.webp',
    ],
  },
  {
    id: '05',
    title: 'kings and empires',
    category: 'Video Production',
    image: 'https://res.cloudinary.com/dv9jpkgrs/image/upload/v1773078533/Whisk_b09ef307e2d63009b514a8bfa9655726dr_dydjwp.jpg',
    videoUrl: 'https://res.cloudinary.com/dv9jpkgrs/video/upload/q_auto:good,f_auto,vc_auto/v1773074452/after_blink_start_kymhdc.mp4',
    fullVideoUrl: 'https://res.cloudinary.com/dv9jpkgrs/video/upload/q_auto:good,f_auto,vc_auto/v1773074452/after_blink_start_kymhdc.mp4',
    description: 'Experimental music video featuring generative AI visuals.',
    techStack: ['DaVinci Resolve', 'Runway Gen-2'],
    year: '2025',
  },
  {
    id: '06',
    title: 'excel course design',
    category: 'Graphic Authority',
    image: 'https://res.cloudinary.com/dv9jpkgrs/image/upload/v1773081276/Panfleto_cursos_profissionalizantes_geom%C3%A9trico_amarelo_e_azul_xha6ks.png',
    description: 'Typography-focused editorial design for a luxury architecture magazine.',
    techStack: ['InDesign', 'Cinema 4D'],
    year: '2023',
  },
  {
    id: '07',
    title: 'AM4LESS',
    category: 'Video Production',
    image: 'https://res.cloudinary.com/dv9jpkgrs/video/upload/so_0/q_auto,f_auto/v1775842869/AM4LESS_TRAINING_COMERCIAL_h1sh7n.jpg',
    videoUrl: 'https://res.cloudinary.com/dv9jpkgrs/video/upload/v1775842869/AM4LESS_TRAINING_COMERCIAL_h1sh7n.mp4',
    fullVideoUrl: 'https://res.cloudinary.com/dv9jpkgrs/video/upload/v1775842869/AM4LESS_TRAINING_COMERCIAL_h1sh7n.mp4',
    description: 'High-energy motion production for the AM4LESS training ecosystem.',
    techStack: ['After Effects', 'C4D', 'Redshift'],
    year: '2026',
  },
  {
    id: '08',
    title: 'Azlatã',
    category: 'Web Development',
    image: 'https://res.cloudinary.com/dv9jpkgrs/image/upload/v1777465751/product_list_-_Copy_g13unc.png',
    description: 'A comprehensive e-commerce ecosystem with a focus on high-fidelity product visualization and seamless user experience.',
    techStack: ['Next.js', 'PostgreSQL', 'Tailwind CSS'],
    year: '2026',
    gallery: [
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