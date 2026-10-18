/**
 * Generates api/_knowledge.js (the chat assistant's facts) from src/data/developer.ts,
 * so the assistant always matches the site. Runs automatically before `npm run build`
 * and `npm run dev`; run it manually with `npm run chat:knowledge`.
 *
 * Facts are split into small topic chunks. At question time api/chat.js sends only the
 * chunks relevant to the question, which keeps requests small, fast and focused.
 */
import { build } from 'esbuild';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// Transpile the TypeScript data file in memory and import it
const result = await build({
  entryPoints: [resolve(root, 'src/data/developer.ts')],
  bundle: true,
  format: 'esm',
  platform: 'node',
  write: false,
  logLevel: 'silent',
});
const code = result.outputFiles[0].text;
const data = await import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);
const { developerInfo: d, skills, services, projects } = data;

const chunks = [];
/**
 * @param id       unique id
 * @param title    heading shown to the model
 * @param text     the facts
 * @param keywords extra words/synonyms visitors might use for this topic
 * @param always   include in every request (keep these short)
 */
const chunk = (id, title, text, keywords = [], always = false) =>
  chunks.push({ id, title, text: text.trim(), keywords: keywords.map((k) => k.toLowerCase()), always });

const current = d.experiences.find((e) => e.current);

chunk(
  'overview',
  'Overview',
  [
    `${d.name} is a ${d.title}. ${d.tagline}.`,
    current ? `Current role: ${current.role} at ${current.organization} (${current.period}, ${current.location}).` : '',
    `Graduated with a B.E. in Computer Science in ${d.graduationYear}. Lives in ${d.location}.`,
    `Availability: ${d.availability.label}. ${d.availability.note}`,
  ].filter(Boolean).join('\n'),
  [],
  true
);

chunk(
  'project-index',
  'All projects (titles)',
  projects.map((p) => `- ${p.title} (${p.professional ? 'company project' : 'personal project'}, ${p.category})`).join('\n'),
  [],
  true
);

chunk('about', 'About him (bio)', d.biography, [
  'about', 'who', 'bio', 'background', 'introduce', 'summary', 'himself', 'story', 'journey', 'person', 'personality',
  'values', 'approach', 'strength', 'strengths', 'why', 'hire', 'describe',
]);

chunk(
  'experience',
  'Work experience',
  d.experiences
    .filter((e) => !/B\.?E\.?|degree|college|university/i.test(e.role))
    .map((e) => `- ${e.role} at ${e.organization} (${e.period}, ${e.location})${e.current ? ' [current]' : ''}: ${e.description} Skills used: ${e.skills.join(', ')}.`)
    .join('\n'),
  ['experience', 'work', 'job', 'role', 'company', 'employer', 'employed', 'working', 'career', 'current', 'position',
    'professional', 'geelani', 'office', 'years', 'months', 'senior', 'junior', 'fresher', 'industry', 'responsibilities']
);

chunk(
  'education',
  'Education',
  [
    ...d.education.map((e) => `- ${e.degree}, ${e.school}, graduated ${e.year}. Focus: ${e.focus}.`),
    ...d.experiences
      .filter((e) => /B\.?E\.?|degree|college|university/i.test(e.role))
      .map((e) => `- ${e.period}: ${e.description}`),
  ].join('\n'),
  ['education', 'college', 'university', 'degree', 'study', 'studied', 'graduate', 'graduated', 'graduation', 'b.e',
    'engineering', 'student', 'qualification', 'academic', 'school', 'cgpa', 'gpa', 'marks', 'fresher']
);

chunk(
  'skills',
  'Skills and tech stack',
  Object.entries(skills)
    .map(([group, list]) => `- ${group}: ${list.map((s) => s.name).join(', ')}`)
    .join('\n'),
  ['skill', 'skills', 'stack', 'tech', 'technology', 'technologies', 'tools', 'languages', 'language', 'framework',
    'frameworks', 'know', 'knows', 'proficient', 'expert', 'good', 'frontend', 'backend', 'mobile', 'database',
    'ai', 'ml', 'cloud', 'devops', 'fit', 'suitable', 'capable', 'experience with',
    // every skill name, so "Has he used Flutter?" finds this section
    ...Object.values(skills).flat().flatMap((s) => [s.name.toLowerCase(), ...s.name.toLowerCase().split(/[^a-z0-9+#]+/)])]
);

for (const p of projects) {
  const links = [p.liveUrl && `live demo: ${p.liveUrl}`, p.githubUrl && `code: ${p.githubUrl}`].filter(Boolean).join(', ');
  chunk(
    `project-${p.id}`,
    `${p.title} (${p.professional ? 'company project; private, no public demo or code' : 'personal project'}; ${p.category})`,
    [
      p.longDescription || p.description,
      `Tech: ${p.techStack.join(', ')}.`,
      p.highlights?.length ? `Highlights: ${p.highlights.join('; ')}.` : '',
      p.challenges?.length ? `Challenges solved: ${p.challenges.join('; ')}.` : '',
      p.architecture?.length ? `System overview: ${p.architecture.join(' -> ')}.` : '',
      links ? `Links: ${links}.` : '',
    ].filter(Boolean).join('\n'),
    [
      'project', 'projects', 'built', 'build', 'made', 'portfolio', 'demo', 'app', 'website', 'work', 'example',
      ...(p.professional ? ['company', 'professional', 'client', 'office', 'geelani', 'private', 'industry'] : ['personal', 'side', 'own', 'github', 'live', 'college']),
      ...p.title.toLowerCase().split(/[^a-z0-9]+/),
      p.category.toLowerCase(),
      ...p.techStack.map((t) => t.toLowerCase()),
    ]
  );
}

chunk(
  'services',
  'Freelance services offered',
  services.map((s) => `- ${s.title}: ${s.description}`).join('\n'),
  ['service', 'services', 'freelance', 'freelancer', 'offer', 'offers', 'hire', 'help', 'build', 'develop', 'consult',
    'consulting', 'automation', 'website', 'ecommerce', 'contract', 'gig', 'can he', 'client']
);

chunk('fun-facts', 'Fun facts', d.funFacts.map((f) => `- ${f}`).join('\n'), [
  'fun', 'fact', 'facts', 'hobby', 'hobbies', 'interest', 'interests', 'coffee', 'personal', 'free time', 'like', 'enjoy',
]);

chunk(
  'contact',
  'Contact',
  [
    `- Email: ${d.email}`,
    `- Phone: ${d.phone}`,
    `- LinkedIn: ${d.socialLinks.linkedin}`,
    `- GitHub: ${d.socialLinks.github}`,
    '- Resume: PDF download on the site (Resume button in the hero section).',
    '- Contact form: at the bottom of the site; messages go straight to his inbox.',
  ].join('\n'),
  ['contact', 'email', 'mail', 'phone', 'call', 'number', 'reach', 'connect', 'linkedin', 'github', 'resume', 'cv',
    'message', 'talk', 'meet', 'interview', 'hire', 'hiring', 'whatsapp', 'social']
);

const out = `// AUTO-GENERATED by scripts/build-chat-knowledge.mjs from src/data/developer.ts. Do not edit by hand.
export const OWNER_NAME = ${JSON.stringify(d.name)};
export const CAREER_START = ${JSON.stringify(d.careerStart)};
export const CHUNKS = ${JSON.stringify(chunks, null, 2)};
`;
writeFileSync(resolve(root, 'api/_knowledge.js'), out);
const total = chunks.reduce((n, c) => n + c.text.length, 0);
console.log(`chat knowledge: ${chunks.length} chunks, ${total} chars written to api/_knowledge.js`);
