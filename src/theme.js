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

const readOverride = () => {
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
        if (saved && Date.now() < saved.until) return saved.theme;
    } catch {
        // Storage can be blocked (private mode); fall back to the clock.
    }
    return null;
};

export const currentTheme = () => readOverride() || clockTheme();

export const saveOverride = (theme) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ theme, until: nextSwitchTime() }));
    } catch {
        // Ignore: the choice still applies for this visit.
    }
};

export const applyTheme = (theme) => {
    document.documentElement.dataset.theme = theme;
};
