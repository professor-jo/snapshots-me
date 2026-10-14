import CellHeading from './CellHeading';
import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';

const PROJECTS = [
    {
        title: "Snapshots.Me",
        description: "A personal portfolio website showcasing projects, skills, and introducing myself.",
        technologies: ["HTML", "CSS", "Javascript", "React"],
        github: "https://github.com/d3jo/Snapshots.Me",
    },
    {
        title: "CNN Dog Breed Classifier",
        description: "A Convolutional Neural Network model trained on dog images of different breeds, classifying them with more than 95% accuracy.",
        metric: "accuracy > 95%",
        technologies: ["Tensorflow", "Matplotlib", "OpenCV"],
    },
    {
        title: "California Real Estate Analytics",
        description: "Python data analytics project providing visualizations and insights of real estate information in California.",
        technologies: ["Matplotlib", "Python", "Seaborn", "Pandas", "NumPy"],
        github: "https://github.com/d3jo/Real-Estate-Analysis",
    },
    {
        title: "Sephora Product Intelligence and ML Analysis",
        description: "Performed ETL on product data, transforming raw datasets into BI dashboards and ML models.",
        technologies: ["PyTorch", "Python"],
        github: "https://github.com/d3jo/Sephora_BI_ML_Analysis",
    },
];

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Projects = () => {
    return (
        <div className="w-full">
            <CellHeading n={6} code={<>me.projects.all()</>}>Project Gallery</CellHeading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl pb-12">
                {PROJECTS.map((project, index) => (
                    <motion.div
                        key={index}
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="bg-lab-surface rounded p-6 flex flex-col gap-3 shadow-sm transition-colors duration-200 border border-lab-line hover:border-lab-blue"
                    >
                        {project.metric && (
                            <span className="font-mono text-xs text-lab-green">▲ {project.metric}</span>
                        )}
                        <h2 className="text-xl font-bold text-lab-ink">
                            {project.title}
                        </h2>
                        <p className="text-md text-lab-ink/85 flex-1">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                            {project.technologies.map((tech, i) => (
                                <span key={i} className="rounded bg-lab-cell px-3 py-1 font-mono text-xs text-lab-teal border border-lab-line">
                                    {tech}
                                </span>
                            ))}
                        </div>
                        {project.github && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 mt-2 text-lab-muted hover:text-lab-blue transition-colors duration-200 w-fit"
                            >
                                <FaGithub className="text-lg" />
                                <span className="text-sm">View on GitHub</span>
                            </a>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Projects;
