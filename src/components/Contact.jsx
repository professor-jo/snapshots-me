import CellHeading from './CellHeading';
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';

const Contact = () => {
    return (
        <div className="w-full text-lab-ink pb-24">
            <CellHeading n={6} code={<>me.contact()</>}>Get In Touch</CellHeading>
            <div className="flex flex-col items-start gap-8 max-w-md">
                <p className="text-xl text-lab-muted">
                    Whether you have a question, opportunity, or just want to say hi — my inbox is open.
                </p>
                <div className="flex flex-col gap-4 w-full">
                    <a
                        href="mailto:joajune03@gmail.com"
                        className="flex items-center gap-4 bg-lab-surface rounded px-6 py-4 shadow-sm hover:bg-lab-cell hover:border-lab-blue border border-lab-line transition-all duration-200 group"
                    >
                        <FaEnvelope className="text-2xl text-lab-out" />
                        <span className="font-mono text-base sm:text-lg text-lab-ink group-hover:text-lab-blue">joajune03@gmail.com</span>
                    </a>
                    <a
                        href="https://www.linkedin.com/in/ajunjo/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 bg-lab-surface rounded px-6 py-4 shadow-sm hover:bg-lab-cell hover:border-lab-blue border border-lab-line transition-all duration-200 group"
                    >
                        <FaLinkedin className="text-2xl text-lab-blue" />
                        <span className="font-mono text-base sm:text-lg text-lab-ink group-hover:text-lab-blue">linkedin.com/in/ajunjo</span>
                    </a>
                    <a
                        href="https://github.com/d3jo"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 bg-lab-surface rounded px-6 py-4 shadow-sm hover:bg-lab-cell hover:border-lab-blue border border-lab-line transition-all duration-200 group"
                    >
                        <FaGithub className="text-2xl text-lab-ink" />
                        <span className="font-mono text-base sm:text-lg text-lab-ink group-hover:text-lab-blue">github.com/d3jo</span>
                    </a>
                </div>
                <p className="font-mono text-lab-muted text-sm mt-8">© 2026 Ajun Jo · Snapshots.Me</p>
            </div>
        </div>
    );
};

export default Contact;
