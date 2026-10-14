import { useEffect, useState } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';
import { applyTheme, currentTheme, saveOverride } from '../theme';

const ThemeToggle = () => {
    const [theme, setTheme] = useState(currentTheme);

    useEffect(() => applyTheme(theme), [theme]);

    // Keep following the clock while the page stays open.
    useEffect(() => {
        const id = setInterval(() => setTheme(currentTheme()), 60_000);
        return () => clearInterval(id);
    }, []);

    const next = theme === 'dark' ? 'light' : 'dark';
    const label = `Switch to ${next === 'dark' ? 'night' : 'day'} mode`;

    return (
        <button
            onClick={() => {
                saveOverride(next);
                setTheme(next);
            }}
            aria-label={label}
            title={label}
            className="flex h-12 w-12 items-center justify-center rounded-md text-2xl text-lab-muted hover:bg-lab-cell hover:text-lab-ink transition-colors"
        >
            {theme === 'dark' ? <FiSun /> : <FiMoon />}
        </button>
    );
};

export default ThemeToggle;
