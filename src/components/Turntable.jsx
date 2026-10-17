import { useEffect, useRef, useState } from 'react';
import { FiChevronUp, FiPause, FiPlay } from 'react-icons/fi';
import PropTypes from '../utils/propTypes';

// The playlist the record plays. From a link like open.spotify.com/playlist/<ID>, use <ID>.
const PLAYLIST_ID = '2mGFdKJ4yVsrzHlb9ZDTCO';
const API_SRC = 'https://open.spotify.com/embed/iframe-api/v1';

// Spotify's iFrame API loads only when a visitor first turns the record on.
let apiPromise;
let spotifyApi;
const loadSpotifyApi = () => {
    if (spotifyApi) return Promise.resolve(spotifyApi);
    if (!apiPromise) {
        apiPromise = new Promise((resolve, reject) => {
            const script = document.createElement('script');
            const fail = () => {
                clearTimeout(timer);
                script.remove();
                window.onSpotifyIframeApiReady = undefined;
                reject(new Error('Spotify could not be loaded.'));
            };
            const timer = setTimeout(fail, 8000);
            window.onSpotifyIframeApiReady = (api) => {
                clearTimeout(timer);
                script.onerror = null;
                spotifyApi = api;
                resolve(api);
            };
            script.src = API_SRC;
            script.async = true;
            script.onerror = fail;
            document.body.appendChild(script);
        }).catch((error) => {
            apiPromise = undefined;
            throw error;
        });
    }
    return apiPromise;
};

const Vinyl = ({ size, className = '', labelClass = '', spinning }) => (
    <div
        className={`vinyl rounded-full shadow-md ${spinning ? 'vinyl-spin' : 'vinyl-spin vinyl-paused'} ${className}`}
        style={size ? { width: size, height: size } : undefined}
    >
        <span
            className={`vinyl-label font-logo font-extrabold ${labelClass}`}
            style={size ? { fontSize: size * 0.11 } : undefined}
        >
            AJ
        </span>
    </div>
);

Vinyl.propTypes = {
    size: PropTypes.number,
    className: PropTypes.string,
    labelClass: PropTypes.string,
    spinning: PropTypes.bool,
};

const Turntable = () => {
    const [open, setOpen] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [loading, setLoading] = useState(false);
    const [needsTap, setNeedsTap] = useState(false);
    const [everPlayed, setEverPlayed] = useState(false);
    const [error, setError] = useState(false);
    const controllerRef = useRef(null);
    const embedRef = useRef(null);
    const tapTimer = useRef(null);
    const initTimer = useRef(null);
    const operationRef = useRef(null);

    useEffect(() => () => {
        operationRef.current = null;
        clearTimeout(tapTimer.current);
        clearTimeout(initTimer.current);
        controllerRef.current?.destroy();
        controllerRef.current = null;
    }, []);

    // Browsers sometimes block audio started from outside the player; if nothing
    // plays shortly after a click, ask the visitor to press play in the player.
    const watchForBlockedPlay = () => {
        clearTimeout(tapTimer.current);
        tapTimer.current = setTimeout(() => setNeedsTap(true), 2500);
    };

    const startPlayer = async () => {
        if (operationRef.current?.pending) return;
        if (controllerRef.current) {
            controllerRef.current.togglePlay();
            if (!playing) watchForBlockedPlay();
            return;
        }
        const operation = { pending: true };
        operationRef.current = operation;
        const isCurrent = () => operationRef.current === operation;
        const fail = () => {
            if (!isCurrent()) return;
            operationRef.current = null;
            clearTimeout(initTimer.current);
            clearTimeout(tapTimer.current);
            controllerRef.current?.destroy();
            controllerRef.current = null;
            embedRef.current?.replaceChildren();
            setLoading(false);
            setPlaying(false);
            setNeedsTap(false);
            setError(true);
        };
        setLoading(true);
        setError(false);
        setNeedsTap(false);
        // Keep the existing eight-second limit, but allow a failed start to be retried.
        initTimer.current = setTimeout(fail, 8000);
        try {
            const IFrameAPI = await loadSpotifyApi();
            if (!isCurrent() || !embedRef.current) return;
            // Spotify replaces the element it is given, so hand it a node React doesn't manage.
            const target = document.createElement('div');
            embedRef.current.appendChild(target);
            IFrameAPI.createController(
                target,
                { uri: `spotify:playlist:${PLAYLIST_ID}`, width: '100%', height: 152 },
                (controller) => {
                    if (!isCurrent()) {
                        controller.destroy();
                        return;
                    }
                    controllerRef.current = controller;
                    controller.addListener('ready', () => {
                        if (!isCurrent()) return;
                        operation.pending = false;
                        clearTimeout(initTimer.current);
                        setLoading(false);
                        controller.play();
                        watchForBlockedPlay();
                    });
                    controller.addListener('playback_update', (e) => {
                        if (!isCurrent()) return;
                        const isPlaying = !e.data.isPaused;
                        setPlaying(isPlaying);
                        if (isPlaying) {
                            setEverPlayed(true);
                            clearTimeout(tapTimer.current);
                            setNeedsTap(false);
                        }
                    });
                }
            );
        } catch {
            fail();
        }
    };

    const onDiscClick = () => {
        if (!open) {
            setOpen(true);
            if (!playing) startPlayer();
        } else {
            setOpen(false);
        }
    };

    return (
        <div className="fixed right-3 top-[26px] sm:right-4 sm:top-4 z-[60] flex flex-col items-end gap-3">
            {/* The record in the corner, always spinning */}
            <button
                onClick={onDiscClick}
                aria-label={open ? 'Hide the music player' : 'Play my favourite music'}
                title={open ? 'Hide the player' : 'Play my favourite music'}
                className={`vinyl-dock group relative focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lab-blue ${everPlayed ? '' : 'vinyl-invite'}`}
            >
                <Vinyl className="h-11 w-11 sm:h-16 sm:w-16" labelClass="text-[6px] sm:text-[8px]" spinning />
                {!playing && !open && (
                    <span className="pointer-events-none absolute right-0 top-full mt-3 whitespace-nowrap rounded border border-lab-line bg-lab-surface px-2 py-1 font-mono text-xs text-lab-muted opacity-0 transition-opacity group-hover:opacity-100">
                        play my music ♪
                    </span>
                )}
            </button>
            {/* Panel stays mounted when closed so the music keeps playing */}
            <div
                className={`w-[min(260px,calc(100vw-1.5rem))] rounded-lg border border-lab-line bg-lab-surface/95 backdrop-blur shadow-lg shadow-black/20 p-3 origin-top-right transition-all duration-300 ${
                    open ? 'opacity-100 scale-100' : 'pointer-events-none opacity-0 scale-95 -translate-y-2'
                }`}
                aria-hidden={!open}
                inert={open ? undefined : ''}
            >
                <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs text-lab-muted">
                        <span className="text-lab-blue">In [♪]:</span> me.favourite_music()
                    </span>
                    <button
                        onClick={() => setOpen(false)}
                        aria-label="Hide the player (music keeps playing)"
                        title="Hide (music keeps playing)"
                        className="flex h-8 w-8 items-center justify-center rounded text-lab-muted hover:bg-lab-cell hover:text-lab-ink"
                        tabIndex={open ? 0 : -1}
                    >
                        <FiChevronUp />
                    </button>
                </div>

                <div className="flex items-center gap-3 mb-3">
                    {/* Turntable */}
                    <div className="relative h-[84px] w-[94px] flex-shrink-0 rounded-md bg-lab-cell border border-lab-line">
                        <div className="absolute left-1.5 top-1.5">
                            <Vinyl size={70} spinning={playing} />
                        </div>
                        <span
                            className={`tonearm ${playing ? 'tonearm-on' : ''}`}
                            aria-hidden="true"
                        />
                    </div>

                    <div className="min-w-0 flex flex-col gap-2">
                        <div>
                            <p className="text-sm font-bold text-lab-ink leading-tight">Ajun’s favourites</p>
                            <p className="font-mono text-xs text-lab-muted">
                                {loading ? 'warming up the needle…' : playing ? 'now spinning' : 'on Spotify'}
                            </p>
                        </div>
                        <button
                            onClick={startPlayer}
                            disabled={loading}
                            className="inline-flex w-fit items-center gap-1.5 rounded px-2.5 py-1 font-mono text-sm font-medium text-lab-onbtn bg-lab-btn hover:bg-lab-btnhover transition-colors"
                            tabIndex={open ? 0 : -1}
                        >
                            {playing ? <FiPause /> : <FiPlay />}
                            {playing ? 'pause' : 'play'}
                        </button>
                    </div>
                </div>

                {error && (
                    <p role="alert" className="mb-2 font-mono text-xs text-lab-out">
                        Spotify could not load. Press play to retry or{' '}
                        <a href={`https://open.spotify.com/playlist/${PLAYLIST_ID}`} target="_blank" rel="noopener noreferrer" className="underline">
                            open the playlist on Spotify
                        </a>.
                    </p>
                )}
                {needsTap && !playing && (
                    <p className="mb-2 font-mono text-xs text-lab-out">Press play in the Spotify player below to start.</p>
                )}

                <div ref={embedRef} className="overflow-hidden rounded-xl min-h-[152px] bg-lab-cell" />
                <p className="mt-2 font-mono text-[10px] leading-snug text-lab-muted">
                    Full songs when signed in to Spotify; otherwise 30-sec previews.
                </p>
            </div>

        </div>
    );
};

export default Turntable;
