import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useReducedMotion, AnimatePresence } from 'framer-motion';
import { FiArrowUp } from 'react-icons/fi';

// The page scrolls inside #root (see index.css), not the window.
const ScrollExtras = () => {
    const rootRef = useRef(document.getElementById('root') || document.documentElement);
    const reducedMotion = useReducedMotion();
    const { scrollYProgress } = useScroll({ container: rootRef });
    const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
    const [showTop, setShowTop] = useState(false);

    useEffect(() => {
        const root = rootRef.current;
        const onScroll = () => setShowTop(root.scrollTop > 600);
        root.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => root.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <>
            {/* Reading progress bar */}
            <motion.div
                style={{ scaleX: reducedMotion ? scrollYProgress : scaleX }}
                className="fixed top-0 left-0 right-0 h-1 origin-left z-[60] bg-lab-blue"
            />

            {/* Back to top */}
            <AnimatePresence>
                {showTop && (
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        onClick={() => rootRef.current.scrollTo({ top: 0, behavior: reducedMotion ? 'instant' : 'smooth' })}
                        aria-label="Back to top"
                        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-md border border-lab-line bg-lab-surface/90 backdrop-blur text-lab-ink shadow-sm flex items-center justify-center hover:border-lab-blue hover:text-lab-blue transition-colors"
                    >
                        <FiArrowUp className="text-xl" />
                    </motion.button>
                )}
            </AnimatePresence>
        </>
    );
};

export default ScrollExtras;
