import { motion } from 'framer-motion';
import { FiArrowDown, FiFileText, FiMail } from 'react-icons/fi';

const MY_INTRODUCTION = `Alumni of University of Waterloo Statistics`;
const MY_FIELD = 'Data Science · Machine Learning · Agentic AI';

const fadeUp = (delay) => ({
    hidden: { y: 30, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.6, delay },
    },
});

const Hero = () => {
    return (
        <div className="border-b border-lab-line pb-4">
            <div className="w-full max-w-3xl flex flex-col">
                {/* Currently badge, styled as the notebook's kernel status */}
                <motion.div
                    variants={fadeUp(0)}
                    initial="hidden"
                    animate="visible"
                    className="mt-10 lg:mt-14 mb-6 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs sm:text-sm text-lab-muted"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lab-green opacity-75"></span>
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-lab-green"></span>
                    </span>
                    <span className="text-lab-ink">kernel:</span>
                    Currently PM @ CONPORTLAB · M.S. Data Science @ Georgia Tech
                </motion.div>

                {/* In/Out cell: the name is the output */}
                <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-4 items-start">
                    <motion.span variants={fadeUp(0.05)} initial="hidden" animate="visible"
                        className="font-mono text-sm text-lab-blue pt-2.5 whitespace-nowrap">In [1]:</motion.span>
                    <motion.code variants={fadeUp(0.05)} initial="hidden" animate="visible"
                        className="font-mono text-sm sm:text-base bg-lab-cell border border-lab-line rounded px-3 py-2 overflow-x-auto whitespace-nowrap">
                        <span className="text-lab-purple">from</span> waterloo <span className="text-lab-purple">import</span> statistics <span className="text-lab-purple">as</span> me
                    </motion.code>

                    <motion.span variants={fadeUp(0.1)} initial="hidden" animate="visible"
                        className="font-mono text-sm text-lab-out pt-4 sm:pt-7 md:pt-10 whitespace-nowrap">Out[1]:</motion.span>
                    <motion.h1
                        variants={fadeUp(0.1)}
                        initial="hidden"
                        animate="visible"
                        className="text-6xl md:text-8xl font-bold tracking-tight text-lab-ink">
                        <span className="highlight">Ajun Jo</span>
                    </motion.h1>
                </div>

                <motion.span
                    variants={fadeUp(0.25)}
                    initial="hidden"
                    animate="visible"
                    className="mt-6 font-mono text-base sm:text-xl text-lab-muted tracking-wider uppercase">
                    Data Scientist · Product Manager
                </motion.span>
                <motion.div
                    variants={fadeUp(0.4)}
                    initial="hidden"
                    animate="visible"
                    className="mt-4 text-lg sm:text-xl max-w-xl text-lab-ink">
                    <p>{MY_INTRODUCTION}</p>
                    <p className="font-mono text-base sm:text-lg text-lab-teal mt-1">
                        {MY_FIELD}
                    </p>
                </motion.div>

                {/* Calls to action */}
                <motion.div
                    variants={fadeUp(0.55)}
                    initial="hidden"
                    animate="visible"
                    className="mt-8 flex flex-wrap gap-4"
                >
                    <a
                        href={`${import.meta.env.BASE_URL}Ajun Jo Resume.pdf`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded font-mono font-medium text-lab-onbtn bg-lab-btn hover:bg-lab-btnhover active:scale-[0.98] transition-colors"
                    >
                        <FiFileText />
                        resume.pdf
                    </a>
                    <a
                        href="#contact"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded font-mono font-medium border border-lab-ink bg-lab-surface text-lab-ink hover:border-lab-blue hover:text-lab-blue transition-colors"
                    >
                        <FiMail />
                        get_in_touch()
                    </a>
                </motion.div>

                {/* Scroll cue */}
                <motion.a
                    href="#about"
                    aria-label="Scroll to About"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 8, 0] }}
                    transition={{ opacity: { delay: 1 }, y: { repeat: Infinity, duration: 1.8, ease: 'easeInOut' } }}
                    className="mt-10 mb-4 self-start text-2xl text-lab-muted hover:text-lab-ink"
                >
                    <FiArrowDown />
                </motion.a>
            </div>
        </div>
    );
};

export default Hero;
