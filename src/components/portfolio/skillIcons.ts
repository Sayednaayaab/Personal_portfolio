import type { ComponentType, CSSProperties } from 'react';
import { BrainCircuit, DatabaseZap } from 'lucide-react';
import { FaJava } from 'react-icons/fa6';
import {
  SiAndroid,
  SiAndroidstudio,
  SiDjango,
  SiExpress,
  SiFigma,
  SiFlask,
  SiFlutter,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiKotlin,
  SiN8N,
  SiNextdotjs,
  SiNodedotjs,
  SiOdoo,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from 'react-icons/si';

type IconComponent = ComponentType<{ className?: string; style?: CSSProperties }>;

export interface SkillIcon {
  icon: IconComponent;
  /** Brand color. Omitted for monochrome logos, which use the text color so they work in both themes. */
  color?: string;
}

// Keyed by the skill name used in src/data/developer.ts.
// Some colors are lightened versions of the official brand color so they stay
// visible on the dark theme.
export const skillIcons: Record<string, SkillIcon> = {
  'React.js': { icon: SiReact, color: '#61DAFB' },
  TypeScript: { icon: SiTypescript, color: '#3178C6' },
  JavaScript: { icon: SiJavascript, color: '#F7DF1E' },
  'HTML/CSS': { icon: SiHtml5, color: '#E34F26' },
  'Tailwind CSS': { icon: SiTailwindcss, color: '#06B6D4' },
  'Next.js': { icon: SiNextdotjs },
  Python: { icon: SiPython, color: '#4B8BBE' },
  Odoo: { icon: SiOdoo, color: '#A24689' },
  'Express.js': { icon: SiExpress },
  'Node.js': { icon: SiNodedotjs, color: '#5FA04E' },
  Flask: { icon: SiFlask },
  Django: { icon: SiDjango, color: '#44B78B' },
  'Android Development': { icon: SiAndroid, color: '#3DDC84' },
  Java: { icon: FaJava, color: '#F89820' },
  Kotlin: { icon: SiKotlin, color: '#7F52FF' },
  'React Native': { icon: SiReact, color: '#61DAFB' },
  Flutter: { icon: SiFlutter, color: '#54C5F8' },
  Github: { icon: SiGithub },
  'Android Studio': { icon: SiAndroidstudio, color: '#3DDC84' },
  Figma: { icon: SiFigma, color: '#F24E1E' },
  N8N: { icon: SiN8N, color: '#EA4B71' },
  LLM: { icon: BrainCircuit, color: '#A78BFA' },
  RAGs: { icon: DatabaseZap, color: '#22D3EE' },
  Vercel: { icon: SiVercel },
};
