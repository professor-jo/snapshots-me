import CellHeading from './CellHeading';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiExternalLink, FiGlobe } from 'react-icons/fi';
import { MdFlightTakeoff } from 'react-icons/md';

const SITE_URL = 'https://overseesai.vercel.app';

const FeaturedProject = () => {
    const [iframeBlocked, setIframeBlocked] = useState(false);

    return (
        <section className="w-full pb-16">
            <CellHeading n={5} code={<>me.projects.featured()</>}>Featured Work</CellHeading>

            {/* Section header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-start -mt-6 mb-10 gap-3"
            >
                <span className="flex items-center gap-2 font-mono text-xs font-semibold tracking-widest uppercase text-lab-green border border-lab-green/50 bg-lab-surface px-4 py-1.5 rounded">
                    <span className="w-2 h-2 rounded-full bg-lab-green animate-pulse"></span>
                    Live Project
                </span>
            </motion.div>

            {/* Main card */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6 }}
                className="max-w-5xl rounded border border-lab-line bg-lab-surface overflow-hidden shadow-md shadow-lab-ink/5"
            >
                {/* Card top: project info */}
                <div className="p-8 flex flex-col lg:flex-row gap-8 items-start">
                    {/* Icon */}
                    <div className="flex-shrink-0 w-16 h-16 rounded-md bg-lab-btn flex items-center justify-center">
                        <MdFlightTakeoff className="text-3xl text-lab-btnicon" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 flex-wrap mb-2">
                            <h2 className="text-3xl font-bold text-lab-ink">OverSees AI</h2>
                        </div>
                        <p className="text-lab-ink/85 text-lg leading-relaxed mb-5">
                            An AI-powered travel planning platform that helps you discover, plan, and navigate overseas destinations. Built to simplify the overwhelming parts of international travel planning.
                        </p>

                        {/* Tech tags */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            {['React', 'AI', 'Vercel', 'Travel'].map((tag) => (
                                <span key={tag} className="rounded border border-lab-line bg-lab-cell px-3 py-1 font-mono text-xs text-lab-teal">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* CTA */}
                        <a
                            href={SITE_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2.5 px-6 py-3 rounded font-mono font-medium text-lab-onbtn bg-lab-btn hover:bg-lab-btnhover transition-colors duration-200 active:scale-[0.98]"
                        >
                            <FiGlobe className="text-lg" />
                            Launch OverSees AI
                            <FiExternalLink className="text-sm opacity-75" />
                        </a>
                    </div>
                </div>

                {/* Browser chrome + iframe */}
                <div className="mx-6 mb-6 rounded overflow-hidden border border-lab-line">
                    {/* Browser chrome bar */}
                    <div className="flex items-center gap-2 px-4 py-3 bg-lab-cell border-b border-lab-line">
                        <span className="w-3 h-3 rounded-full bg-red-500 opacity-70"></span>
                        <span className="w-3 h-3 rounded-full bg-yellow-500 opacity-70"></span>
                        <span className="w-3 h-3 rounded-full bg-green-500 opacity-70"></span>
                        <div className="flex-1 mx-4 bg-lab-surface border border-lab-line rounded px-3 py-1 text-xs text-lab-muted font-mono truncate">
                            {SITE_URL}
                        </div>
                        <a
                            href={SITE_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lab-muted hover:text-lab-ink transition-colors"
                            title="Open in new tab"
                        >
                            <FiExternalLink className="text-sm" />
                        </a>
                    </div>

                    {/* Iframe or fallback */}
                    {iframeBlocked ? (
                        <div className="h-80 flex flex-col items-center justify-center gap-4 bg-lab-cell text-lab-muted">
                            <FiGlobe className="text-4xl text-lab-blue" />
                            <p className="text-sm">Preview not available in embedded mode.</p>
                            <a
                                href={SITE_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-lab-blue hover:text-lab-ink text-sm underline underline-offset-2 transition-colors"
                            >
                                Open overseesai.vercel.app ↗
                            </a>
                        </div>
                    ) : (
                        <div className="relative">
                            <iframe
                                src={SITE_URL}
                                title="OverSees AI"
                                className="w-full h-[480px] border-0 bg-white"
                                loading="lazy"
                                onError={() => setIframeBlocked(true)}
                            />
                            {/* Transparent click-through overlay that opens the site */}
                            <a
                                href={SITE_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute inset-0 flex items-end justify-end p-4 opacity-0 hover:opacity-100 transition-opacity duration-200"
                                title="Open OverSees AI"
                            >
                                <span className="flex items-center gap-1.5 bg-lab-paper/90 text-lab-ink text-xs px-3 py-1.5 rounded-lg backdrop-blur-sm">
                                    <FiExternalLink />
                                    Open full site
                                </span>
                            </a>
                        </div>
                    )}
                </div>
            </motion.div>
        </section>
    );
};

export default FeaturedProject;
