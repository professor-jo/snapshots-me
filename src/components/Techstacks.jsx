import CellHeading from './CellHeading';
import { FaPython } from 'react-icons/fa';
import {
    SiR, SiGnubash, SiTensorflow, SiPytorch, SiMysql, SiPostgresql,
    SiPandas, SiNumpy, SiScikitlearn, SiFastapi, SiJenkins, SiJira,
} from 'react-icons/si';
import { TbBrain } from 'react-icons/tb';
import { motion } from 'framer-motion';

const ICON = 'text-5xl sm:text-6xl';

const STACK_GROUPS = [
    {
        title: 'Languages',
        techs: [
            { icon: <FaPython className={ICON} style={{ color: '#3776AB' }} />, label: 'Python' },
            { icon: <SiR className={ICON} style={{ color: '#276DC3' }} />, label: 'R' },
            { icon: <SiGnubash className={ICON} style={{ color: '#4EAA25' }} />, label: 'Bash' },
        ],
    },
    {
        title: 'ML & Data Science',
        techs: [
            { icon: <SiPytorch className={ICON} style={{ color: '#EE4C2C' }} />, label: 'PyTorch' },
            { icon: <SiTensorflow className={ICON} style={{ color: '#FF6F00' }} />, label: 'TensorFlow' },
            { icon: <SiScikitlearn className={ICON} style={{ color: '#F7931E' }} />, label: 'scikit-learn' },
            { icon: <SiPandas className={ICON} style={{ color: '#E70488' }} />, label: 'Pandas' },
            { icon: <SiNumpy className={ICON} style={{ color: '#4DABCF' }} />, label: 'NumPy' },
        ],
    },
    {
        title: 'Data & Engineering',
        techs: [
            { icon: <SiMysql className={ICON} style={{ color: '#FFA500' }} />, label: 'MySQL' },
            { icon: <SiPostgresql className={ICON} style={{ color: '#4169E1' }} />, label: 'PostgreSQL' },
            { icon: <SiFastapi className={ICON} style={{ color: '#009688' }} />, label: 'FastAPI' },
            { icon: <SiJenkins className={ICON} style={{ color: '#D24939' }} />, label: 'Jenkins' },
            { icon: <SiJira className={ICON} style={{ color: '#2684FF' }} />, label: 'Jira' },
        ],
    },
];

const FLOATS = ['animate-float', 'animate-float3', 'animate-float2'];

const Techstacks = () => {
    return (
        <div className="pb-12">
            <CellHeading n={3} code={<>me.stack</>}>Tech Stacks</CellHeading>

            {/* Agentic AI highlight badge */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex mb-12"
            >
                <div className="flex items-center gap-4 px-6 sm:px-8 py-5 rounded border border-lab-line bg-lab-surface shadow-sm max-w-lg w-full">
                    <div className="flex-shrink-0 w-14 h-14 rounded-md bg-lab-btn flex items-center justify-center animate-float">
                        <TbBrain className="text-3xl text-lab-btnicon" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-lg font-bold text-lab-ink"><span className="highlight">Agentic AI</span></span>
                            <span className="font-mono text-xs px-2 py-0.5 rounded bg-lab-green/10 text-lab-green border border-lab-green/40 font-medium">Proficient</span>
                        </div>
                        <p className="text-sm text-lab-muted leading-snug">
                            Building LLM-powered agents that plan, use tools, and execute multi-step tasks autonomously.
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Tool icons, grouped */}
            <div className="flex flex-col gap-14">
                {STACK_GROUPS.map((group, groupIndex) => (
                    <div key={group.title} className="flex flex-col items-start gap-6">
                        <motion.h2
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="font-mono text-xs sm:text-sm uppercase tracking-[0.2em] text-lab-muted"
                        >
                            {group.title}
                        </motion.h2>
                        <div className="flex flex-wrap items-end gap-6 sm:gap-8">
                            {group.techs.map(({ icon, label }, index) => (
                                <motion.div
                                    key={label}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.08 }}
                                    className="flex flex-col items-center gap-3 group"
                                >
                                    <div className={`rounded-md border border-lab-line bg-lab-surface p-4 shadow-sm transition-colors duration-300 group-hover:border-lab-blue group-hover:bg-lab-cell ${FLOATS[(index + groupIndex) % FLOATS.length]}`}>
                                        {icon}
                                    </div>
                                    <span className="font-mono text-sm text-lab-muted group-hover:text-lab-ink transition-colors">{label}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Techstacks;
