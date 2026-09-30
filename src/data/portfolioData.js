import {
  SiBootstrap,
  SiExpress,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPostman,
  SiReact,
  SiTypescript,
} from 'react-icons/si'
import { Code2 } from 'lucide-react'

export const profile = {
  email: 'princepawar891@gmail.com',
  github: 'https://github.com/prince891pawar',
  linkedin: 'https://www.linkedin.com/in/prince-pawar/',
  about:
    'I’m Prince Pawar, a passionate Full Stack Developer focused on building modern, scalable, and user-friendly web applications. I work across both frontend and backend development, using technologies like React.js, Next.js, Node.js, Express.js, MongoDB, MySQL, and TypeScript. I enjoy turning ideas into real-world digital products, writing clean and maintainable code, and continuously learning new technologies to improve my development skills.',
}

export const skillGroups = [
  {
    number: '01',
    name: 'Frontend',
    items: [
      { name: 'HTML', Icon: SiHtml5 },
      { name: 'CSS', Icon: Code2 },
      { name: 'JavaScript', Icon: SiJavascript },
      { name: 'TypeScript', Icon: SiTypescript },
      { name: 'React.js', Icon: SiReact },
      { name: 'Next.js', Icon: SiNextdotjs },
      { name: 'Bootstrap', Icon: SiBootstrap },
    ],
  },
  {
    number: '02',
    name: 'Backend',
    items: [
      { name: 'Node.js', Icon: SiNodedotjs },
      { name: 'Express.js', Icon: SiExpress },
    ],
  },
  {
    number: '03',
    name: 'Database',
    items: [
      { name: 'MongoDB', Icon: SiMongodb },
      { name: 'MySQL', Icon: SiMysql },
    ],
  },
  {
    number: '04',
    name: 'Tools',
    items: [
      { name: 'Git', Icon: SiGit },
      { name: 'GitHub', Icon: SiGithub },
      { name: 'Postman', Icon: SiPostman },
    ],
  },
]

export const projects = [
  {
    name: 'Travel Mate AI',
    description:
      'A travel-planning experience for organizing trips, exploring destinations, shaping day-by-day itineraries, and keeping travel details together.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JavaScript', 'Tailwind CSS', 'Vite'],
    github: 'https://github.com/prince891pawar/travel-mate-ai',
    status: '✓ Completed',
    statusType: 'completed',
    featured: true,
    preview: 'travel',
  },
  {
    name: 'Resume Builder',
    description:
      'A resume-building project focused on helping people create and present a polished professional profile.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JavaScript', 'Tailwind CSS', 'Vite'],
    github: 'https://github.com/prince891pawar/resume-builder',
    status: '✓ Completed',
    statusType: 'completed',
    preview: 'resume',
  },
  {
    name: 'Banking Backend System',
    description:
      'A backend-focused banking application designed to handle user authentication, account management, transactions, and secure API operations.',
    technologies: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'JWT', 'bcryptjs', 'dotenv', 'cookie-parser'],
    github: 'https://github.com/prince891pawar/banking-backend',
    status: '🚧 Currently Building',
    statusType: 'building',
    preview: 'banking',
  },
  {
    name: 'Snake Game',
    description:
      'An interactive browser-based Snake Game featuring classic game mechanics, keyboard controls, score tracking, and responsive gameplay.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/prince891pawar/snake-game-katha',
    status: '✓ Completed',
    statusType: 'completed',
    preview: 'snake',
  },
]

export const education = [
  {
    level: 'Secondary · 10th',
    school: 'Aastha High School',
    location: 'Singodi, Chhindwara',
  },
  {
    level: 'Higher Secondary · 12th',
    school: 'Aastha High School',
    location: 'Singodi, Chhindwara',
  },
  {
    level: 'Bachelor of Computer Applications',
    school: 'Rajashankar Shah University',
    location: 'Chhindwara',
    current: true,
  },
]