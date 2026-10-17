// Day/night theme. It follows the visitor's local clock unless they pick one with the
// toggle; a manual pick lasts until the next switch time, then the clock takes over again.
// index.html has an inline copy of currentTheme() so the right theme is set before first paint.

export const DAY_START = 7; // 7 AM
export const NIGHT_START = 19; // 7 PM
const STORAGE_KEY = 'snapshots-theme';

export const clockTheme = (now = new Date()) => {
    const hour = now.getHours();
    return hour >= DAY_START && hour < NIGHT_START ? 'light' : 'dark';
};

const nextSwitchTime = (now = new Date()) => {
    const next = new Date(now);
    next.setMinutes(0, 0, 0);
    const hour = now.getHours();
    if (hour < DAY_START) next.setHours(DAY_START);
    else if (hour < NIGHT_START) next.setHours(NIGHT_START);
    else {
        next.setDate(next.getDate() + 1);
        next.setHours(DAY_START);
    }
    return next.getTime();
};

let memoryOverride = null;
const isValidOverride = (saved) => saved &&
    (saved.theme === 'light' || saved.theme === 'dark') &&
    Number.isFinite(saved.until) && Date.now() < saved.until;

const readOverride = () => {
    if (isValidOverride(memoryOverride)) return memoryOverride.theme;
    memoryOverride = null;
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
        if (isValidOverride(saved)) return saved.theme;
    } catch {
        // Storage can be blocked (private mode); retain this visit's choice.
    }
    return null;
};

export const currentTheme = () => readOverride() || clockTheme();

export const saveOverride = (theme) => {
    if (theme !== 'light' && theme !== 'dark') return;
    const saved = { theme, until: nextSwitchTime() };
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
        memoryOverride = null;
    } catch {
        memoryOverride = saved;
    }
};

export const applyTheme = (theme) => {
    document.documentElement.dataset.theme = theme;
};
