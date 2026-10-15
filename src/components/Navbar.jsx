import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { FiMenu, FiX, FiArrowUpRight } from 'react-icons/fi';
import ThemeToggle from './ThemeToggle';

const LINKS = [
    { id: 'about', label: 'About' },
    { id: 'stack', label: 'Stack' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
];

const RESUME_URL = `${import.meta.env.BASE_URL}Ajun Jo Resume.pdf`;

// Highlights the link for whichever section is in the middle of the screen.
// The page scrolls inside #root (see index.css), so that is the observer root.
const useActiveSection = () => {
    const [active, setActive] = useState('');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActive(entry.target.id);
                });
            },
            { root: document.getElementById('root'), rootMargin: '-45% 0px -50% 0px' }
        );
        ['home', ...LINKS.map((l) => l.id)].forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        // The last section is too short to reach the middle of the screen,
        // so treat reaching the bottom of the page as being on it.
        const root = document.getElementById('root');
        const onScroll = () => {
            if (root.scrollTop + root.clientHeight >= root.scrollHeight - 4) {
                setActive(LINKS[LINKS.length - 1].id);
            }
        };
        root.addEventListener('scroll', onScroll, { passive: true });

        return () => {
            observer.disconnect();
            root.removeEventListener('scroll', onScroll);
        };
    }, []);

    return [active, setActive];
};

const Logo = () => (
    <a href="#home" className="flex items-center gap-2.5 pl-1 group" aria-label="Snapshots.Me home">
        <span className="flex h-11 w-11 items-center justify-center rounded-md bg-lab-btn text-lab-btnicon transition-transform duration-300 group-hover:rotate-12">
            <span className="font-logo text-lg font-extrabold">AJ</span>
        </span>
        <span className="font-mono text-lg lg:text-xl font-medium tracking-tight text-lab-ink">
            snapshots<span className="text-lab-blue">.me</span>/
        </span>
    </a>
);

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [active, setActive] = useActiveSection();

    return (
        <header className="sticky top-0 z-50 px-3 pt-5 pl-[76px] sm:pl-[100px] min-[1420px]:pl-3">
            <nav className="mx-auto max-w-6xl rounded-lg border border-lab-line bg-lab-surface/85 backdrop-blur-xl shadow-sm shadow-lab-ink/5">
                <div className="flex items-center justify-between gap-4 py-2.5 pl-3 pr-3">
                    <Logo />

                    {/* Section links with a sliding highlight */}
                    <ul className="hidden lg:flex items-center gap-1 font-mono text-sm">
                        {LINKS.map(({ id, label }) => (
                            <li key={id} className="relative">
                                {active === id && (
                                    <motion.span
                                        layoutId="nav-pill"
                                        className="absolute inset-0 rounded-md bg-lab-hl"
                                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                                    />
                                )}
                                <a
                                    href={`#${id}`}
                                    onClick={() => setActive(id)}
                                    className={`relative block px-4 py-2.5 rounded-md transition-colors ${
                                        active === id ? 'text-lab-onhl' : 'text-lab-muted hover:text-lab-ink'
                                    }`}
                                >
                                    {label.toLowerCase()}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Socials + resume */}
                    <div className="hidden md:flex items-center gap-1">
                        <a href="https://www.linkedin.com/in/ajunjo/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                           className="flex h-12 w-12 items-center justify-center rounded-md text-[1.75rem] text-lab-muted hover:bg-lab-cell hover:text-lab-ink transition-colors">
                            <FaLinkedin />
                        </a>
                        <a href="https://github.com/d3jo" target="_blank" rel="noopener noreferrer" aria-label="GitHub"
                           className="flex h-12 w-12 items-center justify-center rounded-md text-[1.75rem] text-lab-muted hover:bg-lab-cell hover:text-lab-ink transition-colors">
                            <FaGithub />
                        </a>
                        <a
                            href={RESUME_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-1 inline-flex items-center gap-1.5 rounded-md bg-lab-btn px-4 py-2.5 font-mono text-sm font-medium text-lab-onbtn hover:bg-lab-btnhover transition-colors"
                        >
                            resume.pdf
                            <FiArrowUpRight />
                        </a>
                    </div>

                    <div className="flex items-center gap-1">
                        <ThemeToggle />

                        {/* Mobile menu toggle */}
                        <button
                            onClick={() => setOpen(!open)}
                            aria-label={open ? 'Close menu' : 'Open menu'}
                            aria-expanded={open}
                            className="lg:hidden flex h-11 w-11 items-center justify-center rounded-md text-2xl text-lab-ink hover:bg-lab-cell"
                        >
                            {open ? <FiX /> : <FiMenu />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile menu */}
            {open && (
                <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-mono lg:hidden mx-auto mt-2 max-w-6xl rounded-lg border border-lab-line bg-lab-surface/95 backdrop-blur-xl p-3 flex flex-col shadow-sm"
                >
                    {LINKS.map(({ id, label }) => (
                        <a key={id} href={`#${id}`} onClick={() => { setActive(id); setOpen(false); }}
                           className={`rounded-md px-4 py-3 ${active === id ? 'bg-lab-hl text-lab-onhl' : 'text-lab-muted hover:bg-lab-cell'}`}>
                            {label.toLowerCase()}
                        </a>
                    ))}
                    <div className="flex items-center gap-2 border-t border-lab-line mt-2 pt-3 px-2 md:hidden">
                        <a href="https://www.linkedin.com/in/ajunjo/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex h-11 w-11 items-center justify-center text-[1.625rem] text-lab-muted"><FaLinkedin /></a>
                        <a href="https://github.com/d3jo" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="flex h-11 w-11 items-center justify-center text-[1.625rem] text-lab-muted"><FaGithub /></a>
                        <a href={RESUME_URL} target="_blank" rel="noopener noreferrer"
                           className="ml-auto inline-flex items-center gap-1 rounded-md bg-lab-btn px-4 py-2 text-sm font-medium text-lab-onbtn">
                            resume.pdf <FiArrowUpRight />
                        </a>
                    </div>
                </motion.div>
            )}
        </header>
    );
};

export default Navbar;
