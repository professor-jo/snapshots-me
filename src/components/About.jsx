import CellHeading from './CellHeading';
import sedonaPhoto from '../assets/Sedona2025.png';
import { motion } from 'framer-motion';
import { FiMapPin } from 'react-icons/fi';


const ABOUT_TEXT = [
    "Welcome to Snapshots.Me! I’m Ajun, a data scientist and agentic AI practitioner based out of Waterloo. This is my personal space to share my professional journey, projects, and a bit of who I am.",
    "I build and deploy AI agents — systems that plan, reason, and take action autonomously to complete complex tasks. From orchestrating multi-step data pipelines to integrating LLM-powered tools into real workflows, I’m comfortable working at the intersection of AI engineering and data science.",
    "Whether you’re a potential employer, a fellow AI enthusiast, or just curious — I hope you find something that resonates. Feel free to reach out!"
];

const About = () => {
    return (
        <div className="border-b border-lab-line pb-4">
            <CellHeading n={2} code={<>me.about()</>}>About Me</CellHeading>
            <div className="flex flex-wrap lg:flex-nowrap gap-y-10">
                <div className="w-full lg:w-1/2 lg:px-8">
                    <motion.figure
                    whileInView={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: -60 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7 }}
                    className="relative group">
                        <div className="relative bg-lab-surface border border-lab-line rounded p-2 shadow-sm transition-transform duration-300 group-hover:-rotate-1">
                            <img src={sedonaPhoto} alt="Ajun standing in a creek among red rocks in Sedona" className="w-full h-auto rounded-sm" />
                        </div>
                        <figcaption className="relative mt-3 font-mono text-sm text-lab-muted flex items-center gap-1.5"><span className="text-lab-blue">fig. 1</span> ·<FiMapPin /> May 2025 · Sedona</figcaption>
                    </motion.figure>
                </div>
                <div className="w-full lg:w-1/2 flex items-center">
                    <div className="flex justify-center lg:justify-end">
                        <motion.div
                        whileInView={{ opacity: 1, x: 0 }}
                        initial={{ opacity: 0, x: 60 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6 }}
                        className="my-2 max-w-xl px-4 text-lg sm:text-xl leading-relaxed text-lab-ink">
                            {ABOUT_TEXT.map((paragraph, index) => (
                            <p key={index} className="mb-9">{paragraph}</p>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;

