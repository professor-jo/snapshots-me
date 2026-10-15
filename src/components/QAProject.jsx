import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiRotateCcw, FiTerminal } from 'react-icons/fi';

const REPO_URL = 'https://github.com/professor-jo/qa-agentic-system';
const COMMAND = 'qa_team https://github.com/you/my-app';

// Scripted, sped-up run (seconds). A real run takes 10 to 15 minutes; the screens
// mirror the dashboard and summary in the project's README.
const TYPE_START = 0.4;
const TYPE_SPEED = 0.035;
const DASH_AT = 2.0;
const STAGES = [
    { name: 'Setup', start: 2.0, end: 3.4, doing: 'installing backend + frontend dependencies', done: 'backend (python), frontend (js) · 1m 22s' },
    { name: '1 · Code Analyst', start: 3.4, end: 6.0, doing: 'reading backend/app/services/llm.py', done: '2m 17s' },
    { name: '2 · Optimizer', start: 6.0, end: 8.6, doing: 'editing backend/app/routes/auth.py', done: '3m 05s' },
    { name: '3 · Test Engineer', start: 8.6, end: 11.2, doing: 'running pytest and vitest', done: '8 passed · 4m 40s' },
    { name: '4 · QA Reporter', start: 11.2, end: 12.6, doing: 'writing the QA report', done: '1m 12s' },
    { name: 'Branch & PR', start: 12.6, end: 13.6, doing: 'pushing qa/agentic-20261015-191217', done: 'pull request #1 opened' },
];
const LOG = [
    { at: 2.2, time: '14:00:02', agent: 'Setup', text: 'cloning you/my-app @ main' },
    { at: 3.0, time: '14:01:10', agent: 'Setup', text: 'detected backend (python), frontend (js)' },
    { at: 3.7, time: '14:01:24', agent: 'Code Analyst', text: 'reading backend/app/routes/auth.py' },
    { at: 4.7, time: '14:02:05', agent: 'Code Analyst', text: 'found hard-coded JWT secret' },
    { at: 5.4, time: '14:02:58', agent: 'Code Analyst', text: 'reading backend/app/services/llm.py' },
    { at: 6.3, time: '14:03:41', agent: 'Optimizer', text: 'editing backend/app/routes/auth.py' },
    { at: 7.5, time: '14:05:12', agent: 'Optimizer', text: 'editing backend/app/services/llm.py' },
    { at: 8.9, time: '14:06:47', agent: 'Test Engineer', text: 'writing test_llm_parse.py, test_trip_prefs.py' },
    { at: 10.0, time: '14:09:30', agent: 'Test Engineer', text: 'backend: 6 passed · frontend: 2 passed' },
    { at: 11.5, time: '14:11:28', agent: 'QA Reporter', text: 'writing Comprehensive QA report' },
    { at: 12.9, time: '14:12:40', agent: 'Branch & PR', text: 'opening pull request #1' },
];
const RESULT_AT = 14.2;
const END = 15;

const SPINNER = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];

const prefersReducedMotion = () =>
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

// Plays the script once the terminal scrolls into view.
const usePlayback = (ref) => {
    const [t, setT] = useState(0);
    const [run, setRun] = useState(0);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => entry.isIntersecting && setVisible(true),
            { root: document.getElementById('root'), threshold: 0.35 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [ref]);

    useEffect(() => {
        if (!visible) return;
        if (prefersReducedMotion()) {
            setT(END);
            return;
        }
        setT(0);
        const started = performance.now();
        const id = setInterval(() => {
            const elapsed = (performance.now() - started) / 1000;
            setT(elapsed);
            if (elapsed >= END) clearInterval(id);
        }, 80);
        return () => clearInterval(id);
    }, [visible, run]);

    return [t, () => setRun((r) => r + 1)];
};

// A Rich-style panel: a rounded border with its title set into the top edge.
const Panel = ({ title, children, tone = 'border-[#2b3a5c]' }) => (
    <div className={`relative mt-3 rounded-md border ${tone} px-3 pb-2 pt-3`}>
        <span className="absolute -top-2.5 left-3 bg-[#0a1020] px-1.5 text-[#7cb6ff]">{title}</span>
        {children}
    </div>
);

const StageRow = ({ stage, t }) => {
    const running = t >= stage.start && t < stage.end;
    const done = t >= stage.end;
    const frame = SPINNER[Math.floor(t * 12) % SPINNER.length];
    const progress = Math.min(4, Math.floor(((t - stage.start) / (stage.end - stage.start)) * 5));

    return (
        <div className="flex gap-3 whitespace-pre">
            <span className={`w-3 ${done ? 'text-[#3ddc97]' : running ? 'text-[#ffe066]' : 'text-[#4a5878]'}`}>
                {done ? '✓' : running ? frame : '·'}
            </span>
            <span className={`w-36 ${done || running ? 'text-[#e8eefa]' : 'text-[#4a5878]'}`}>{stage.name}</span>
            {done && <span className="text-[#8b9bbd]">{stage.done}</span>}
            {running && (
                <span className="text-[#c9d4ec]">
                    <span className="text-[#ffe066]">[{'='.repeat(progress).padEnd(4, ' ')}]</span> {stage.doing}
                </span>
            )}
        </div>
    );
};

const Terminal = () => {
    const ref = useRef(null);
    const [t, replay] = usePlayback(ref);

    const typed = COMMAND.slice(0, Math.max(0, Math.floor((t - TYPE_START) / TYPE_SPEED)));
    const typing = t < DASH_AT;
    const log = LOG.filter((line) => t >= line.at).slice(-4);
    const finished = t >= RESULT_AT;

    return (
        <div ref={ref} className="mx-6 mb-6 rounded overflow-hidden border border-lab-line bg-[#0a1020] shadow-inner">
            {/* Window bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#111a30] border-b border-[#1f2b47]">
                <span className="w-3 h-3 rounded-full bg-red-500 opacity-70"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500 opacity-70"></span>
                <span className="w-3 h-3 rounded-full bg-green-500 opacity-70"></span>
                <span className="flex-1 text-center font-mono text-xs text-[#8b9bbd] truncate">zsh · qa_team · demo, sped up</span>
                <button
                    onClick={replay}
                    className="flex items-center gap-1.5 rounded px-2 py-1 font-mono text-xs text-[#8b9bbd] hover:bg-white/10 hover:text-white transition-colors"
                    aria-label="Replay the terminal demo"
                >
                    <FiRotateCcw /> replay
                </button>
            </div>

            {/* Screen */}
            <div className="overflow-x-auto">
                <div className="min-w-[560px] min-h-[430px] p-4 font-mono text-[12px] sm:text-[13px] leading-relaxed text-[#c9d4ec]">
                    <div className="whitespace-pre">
                        <span className="text-[#3ddc97]">~/projects</span> <span className="text-[#7cb6ff]">❯</span> {typed}
                        {typing && <span className="inline-block w-[0.6em] h-[1.1em] align-text-bottom bg-[#c9d4ec] animate-pulse" />}
                    </div>

                    {t >= DASH_AT && !finished && (
                        <Panel title="Agentic QA · https://github.com/you/my-app @ main">
                            {STAGES.map((stage) => <StageRow key={stage.name} stage={stage} t={t} />)}
                            <div className="mt-2 border-t border-[#1f2b47] pt-2 text-[#4a5878]">activity</div>
                            {log.map((line) => (
                                <div key={line.at} className="flex gap-3 whitespace-pre">
                                    <span className="text-[#4a5878]">{line.time}</span>
                                    <span className="w-28 text-[#c4a5ff]">{line.agent}</span>
                                    <span>{line.text}</span>
                                </div>
                            ))}
                        </Panel>
                    )}

                    {finished && (
                        <div className="mt-3">
                            <div className="whitespace-pre">
                                <span className="rounded-sm bg-[#3ddc97] px-1.5 font-semibold text-[#0a1020]">SUCCESS</span>
                                {'  '}All tests pass and the work is on its own branch.
                            </div>
                            <div className="whitespace-pre text-[#8b9bbd]">
                                {'  PR      '}<span className="text-[#7cb6ff] underline">https://github.com/you/my-app/pull/1</span>
                            </div>
                            <Panel title="What changed · on branch qa/agentic-20261015-191217">
                                <div className="text-[#e8eefa]">Code fixed (2 files)</div>
                                <div className="whitespace-pre"><span className="text-[#ffe066]">  ✎ </span>backend/app/routes/auth.py   <span className="text-[#3ddc97]">+14</span> <span className="text-[#ff8a8a]">−2</span>   Replaced hard-coded JWT secret</div>
                                <div className="whitespace-pre"><span className="text-[#ffe066]">  ✎ </span>backend/app/services/llm.py  <span className="text-[#3ddc97]">+10</span> <span className="text-[#ff8a8a]">−4</span>   Made parsing of model output safer</div>
                                <div className="mt-1 text-[#e8eefa]">Tests added (3 files)  <span className="text-[#3ddc97]">backend: 6 passed; frontend: 2 passed</span></div>
                                <div className="whitespace-pre text-[#8b9bbd]"><span className="text-[#3ddc97]">  + </span>agentic test/backend/unit/test_llm_parse.py</div>
                                <div className="whitespace-pre text-[#8b9bbd]"><span className="text-[#3ddc97]">  + </span>agentic test/backend/unit/test_trip_prefs.py</div>
                                <div className="whitespace-pre text-[#8b9bbd]"><span className="text-[#3ddc97]">  + </span>agentic test/frontend/unit/test_api_fallback.test.js</div>
                                <div className="mt-1 text-[#e8eefa]">Reports added</div>
                                <div className="whitespace-pre text-[#8b9bbd]"><span className="text-[#3ddc97]">  + </span>Agentic QA Report/Comprehensive QA report 2026-10-15.md</div>
                            </Panel>
                            <div className="mt-3 whitespace-pre">
                                <span className="text-[#3ddc97]">~/projects</span> <span className="text-[#7cb6ff]">❯</span>{' '}
                                <span className="inline-block w-[0.6em] h-[1.1em] align-text-bottom bg-[#c9d4ec] animate-pulse" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const QAProject = () => (
    <section className="w-full pb-16">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-start mb-10 gap-3"
        >
            <span className="flex items-center gap-2 font-mono text-xs font-semibold tracking-widest uppercase text-lab-green border border-lab-green/50 bg-lab-surface px-4 py-1.5 rounded">
                <span className="w-2 h-2 rounded-full bg-lab-green animate-pulse"></span>
                Live Project
            </span>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl rounded border border-lab-line bg-lab-surface overflow-hidden shadow-md shadow-lab-ink/5"
        >
            <div className="p-8 flex flex-col lg:flex-row gap-8 items-start">
                <div className="flex-shrink-0 w-16 h-16 rounded-md bg-lab-btn flex items-center justify-center">
                    <FiTerminal className="text-3xl text-lab-btnicon" />
                </div>

                <div className="flex-1 min-w-0">
                    <h2 className="text-3xl font-bold text-lab-ink mb-2">QA Agentic System</h2>
                    <p className="text-lab-ink/85 text-lg leading-relaxed mb-5">
                        An AI QA team in your terminal. Four agents read a codebase, fix the bugs they find, write and run tests until they pass, and write a report, then open a pull request so every change gets reviewed before it reaches main.
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                        {['Python', 'CrewAI', 'Multi-agent', 'pytest', 'Rich CLI'].map((tag) => (
                            <span key={tag} className="rounded border border-lab-line bg-lab-cell px-3 py-1 font-mono text-xs text-lab-teal">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <a
                        href={REPO_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 px-6 py-3 rounded font-mono font-medium text-lab-onbtn bg-lab-btn hover:bg-lab-btnhover transition-colors duration-200 active:scale-[0.98]"
                    >
                        <FiGithub className="text-lg" />
                        View on GitHub
                    </a>
                </div>
            </div>

            <Terminal />
        </motion.div>
    </section>
);

export default QAProject;
