import { motion } from 'framer-motion';

// Section heading styled as a notebook cell: an "In [n]:" prompt with the code that
// "runs" the section, followed by the title as its output.
const CellHeading = ({ n, code, children }) => (
    <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-12 mb-10 sm:mt-16 sm:mb-12 max-w-3xl grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-3 items-start"
    >
        <span className="font-mono text-sm text-lab-blue pt-2 whitespace-nowrap">In [{n}]:</span>
        <code className="font-mono text-sm sm:text-base bg-lab-cell border border-lab-line rounded px-3 py-2 overflow-x-auto whitespace-nowrap text-lab-ink">
            {code}
        </code>
        <span className="font-mono text-sm text-lab-out pt-3 whitespace-nowrap">Out[{n}]:</span>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-lab-ink">{children}</h1>
    </motion.div>
);

export default CellHeading;
