import CellHeading from './CellHeading';
import { motion } from 'framer-motion';
import { FaBriefcase, FaGraduationCap } from 'react-icons/fa';

const EXPERIENCES = [
    {
        year: "2026.8 - Present",
        role: "Product Manager",
        company: "CONPORTLAB",
        description: "Product Manager for Porta Solution, CONPORTLAB's no-code industrial DX platform that lets teams build and run factory-floor systems without specialist programmers. The suite spans PortaCON, an ultra-lightweight programmable IIoT gateway recognized with CES Innovation Awards in 2024 and 2025; Porta Studio, a cloud-based no-code development environment; and Porta IoT Link, which provides cloud servers and monitoring dashboards.",
        technologies: [],
    },
    {
        year: "2026.4 - Present",
        role: "Started Georgia Institute of Technology",
        company: "",
        description: "Master's Degree in Data Science",
        technologies: [],
    },
    {
        year: "2026.4",
        role: "Graduated University of Waterloo",
        company: "",
        description: "Bachelor's Degree in Statistics",
        technologies: [],
    },
    {
        year: "2025.9 - 2026.5",
        role: "Software QA Engineer",
        company: "People Inc.",
        description: "Designed and implemented a Jenkins-based pull-request CD pipeline to generate deployable build artifacts and enable Squadron preview environments for pre-merge UI, API, and database testing. Performed API and database validation for a FastAPI service generator, including PGVector and Milvus integrations, and resolved a silent failure allowing 400/500 errors to pass undetected, reducing UI/UX issues by up to 80%. Verified PostgreSQL schema workflows and supported release-cutting processes to ensure approved changes were packaged correctly for production deployment.",
        technologies: ["Bitbucket", "Jira", "Squadron", "REST API"],
    },
    {
        year: "2025.1 - 2025.4",
        role: "Data Developer",
        company: "Scotiabank",
        description: "Conducted data analysis on data collected by a Time Study tool I developed for the team, which measures time efficiency of branch activities to investigate their efficiency.",
        technologies: ["Python", "Excel", "Power BI", "SQL"],
    },
    {
        year: "2024.5 - 2024.8",
        role: "AI Data Engineer Intern",
        company: "Vosyn",
        description: "Built data pipelines for TTS models and trained them. Prepared data by cleaning it for LLM models and improved sound quality of TTS output, reducing background noise in generated audio files.",
        technologies: ["Python", "Audacity", "Bash", "Tensorflow", "PyTorch"],
    },
    {
        year: "2023.5 - 2023.8",
        role: "Waterpark Lifeguard",
        company: "Fallsview Waterpark",
        description: "Worked in summer after finishing 2nd year. Performed manual water slide testing before opening, inspecting possible dangers.",
        technologies: ["CPR"],
    },
    {
        year: "2022.4 - 2022.7",
        role: "Highschool Private Math Tutor",
        company: "Freelancing",
        description: "Developed communication and tutoring skills assisting students with high school math concepts. Provided constructive feedback each session, resulting in over 20% improvement in student marks.",
        technologies: ["Advanced Functions"],
    },
    {
        year: "2022.4 - 2022.6",
        role: "Waterpark Lifeguard",
        company: "Fallsview Waterpark",
        description: "Saved children and weak swimmers from the deep end of the wave pool. Filed incident reports for possible future legal documentation.",
        technologies: ["CPR"],
    },
    {
        year: "2021.9",
        role: "Started University of Waterloo",
        company: "",
        description: "Bachelors of Honours Mathematics",
        technologies: [],
    },
    {
        year: "2021.6",
        role: "Graduated AN Myer Secondary School",
        company: "",
        description: "",
        technologies: [],
    },
];

const cardVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

const yearVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

const Timeline = () => {
    return (
        <div className="border-b w-full border-lab-line pb-4 relative">
            <CellHeading n={4} code={<>me.timeline.sort_values(<span className="text-lab-teal">&quot;year&quot;</span>, ascending=<span className="text-lab-purple">False</span>)</>}>Timeline</CellHeading>

            <div className="relative py-9 lg:px-9">
                {/* Vertical line: left edge on mobile, centered on desktop */}
                <div className="absolute left-4 lg:left-1/2 top-0 -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-lab-blue via-lab-line to-transparent"></div>

                {EXPERIENCES.map((experience, index) => {
                    const isLeft = index % 2 === 0;
                    const isCurrent = experience.year.includes('Present');
                    const isMilestone = !experience.company;
                    const Icon = isMilestone ? FaGraduationCap : FaBriefcase;

                    return (
                        <div
                            key={index}
                            className={`mb-12 flex flex-col lg:flex-row items-start relative pl-12 lg:pl-0 ${
                                isLeft ? '' : 'lg:flex-row-reverse'
                            }`}
                        >
                            {/* Dot on the line */}
                            <div className="absolute left-4 lg:left-1/2 top-6 -translate-x-1/2 z-10 flex items-center justify-center">
                                {isCurrent && (
                                    <span className="absolute h-8 w-8 rounded-full bg-lab-green/30 animate-ping"></span>
                                )}
                                <span className={`relative flex h-8 w-8 items-center justify-center rounded-full border-2 bg-lab-surface text-xs ${
                                    isCurrent ? 'border-lab-green text-lab-green' : 'border-lab-blue text-lab-blue'
                                }`}>
                                    <Icon />
                                </span>
                            </div>

                            {/* Year label */}
                            <div className="w-full lg:w-1/2 flex lg:px-4">
                                <motion.div
                                    variants={isLeft ? yearVariants : cardVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.3 }}
                                    className={`w-full flex ${isLeft ? 'lg:justify-end lg:pr-8' : 'lg:justify-start lg:pl-8'}`}
                                >
                                    <p className="font-mono text-base lg:text-xl text-lab-muted font-medium pb-2 lg:pb-0 lg:pt-6">{experience.year}</p>
                                </motion.div>
                            </div>

                            {/* Card */}
                            <div className="w-full lg:w-1/2 lg:px-8">
                                <motion.div
                                    variants={isLeft ? cardVariants : yearVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.3 }}
                                    className={`p-6 rounded shadow-sm border transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:shadow-lab-ink/10 ${
                                        isCurrent
                                            ? 'bg-lab-surface border-lab-green/50 hover:border-lab-green'
                                            : 'bg-lab-surface border-lab-line hover:border-lab-blue'
                                    }`}
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <h2 className="text-xl font-bold text-lab-ink">{experience.role}</h2>
                                        {isCurrent && (
                                            <span className="flex-shrink-0 rounded border border-lab-green/50 bg-lab-green/10 px-2.5 py-0.5 font-mono text-xs font-semibold uppercase tracking-wider text-lab-green">
                                                Current
                                            </span>
                                        )}
                                    </div>
                                    {experience.company && (
                                        <p className="text-lg text-lab-blue mb-2">{experience.company}</p>
                                    )}
                                    {experience.description && (
                                        <p className="text-md text-lab-ink/85 leading-relaxed">{experience.description}</p>
                                    )}
                                    {experience.technologies.length > 0 && (
                                        <div className="flex flex-wrap mt-4 gap-2">
                                            {experience.technologies.map((tech, techIndex) => (
                                                <span key={techIndex} className="rounded border border-lab-line bg-lab-cell px-2 py-1 font-mono text-sm text-lab-teal">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Timeline;
