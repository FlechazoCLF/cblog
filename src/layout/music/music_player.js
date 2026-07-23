
/****************************************************************************************************
* File Start!
****************************************************************************************************/

/*
 *
 *  Copyright (c) 2024-2026 by flechazo. All rights reserved.
 *
 * Author : CarlChai LinFeng Chai flechazo
 * Website: flechazo.mba
 *
 * Change Logs:
 * Date           Author       Notes
 * 2026-07-05     cc          the first version
 *
*/

/****************************************************************************************************
* Include
****************************************************************************************************/

/* react */
import React, { useState, useRef, useEffect } from 'react';
/* theme */
import { useTheme } from '../../kernel/theme/theme'
/* audio context */
import { useAudio } from '../../kernel/audio/audio_context'
/* config */
import { Music_Player_Cfg_DefaultCover_Get } from './music_player_cfg'

/****************************************************************************************************
* Define
****************************************************************************************************/

/* visualizer bar count */
const VISUALIZER_BAR_COUNT = 5;
/* visualizer interval */
const VISUALIZER_INTERVAL = 150;

/****************************************************************************************************
* Type Define
****************************************************************************************************/

/****************************************************************************************************
* Variable
****************************************************************************************************/

/****************************************************************************************************
* Function Interface
****************************************************************************************************/

/****************************************************************************************************
* Music_Player_Format_Time()
****************************************************************************************************/
function Music_Player_Format_Time(seconds)
{
    if (!seconds || isNaN(seconds)) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return m + ':' + (s < 10 ? '0' : '') + s;
}

/****************************************************************************************************
* Music_Player_Icon_Play()
****************************************************************************************************/
function Music_Player_Icon_Play() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
        </svg>
    );
}

/****************************************************************************************************
* Music_Player_Icon_Pause()
****************************************************************************************************/
function Music_Player_Icon_Pause() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
        </svg>
    );
}

/****************************************************************************************************
* Music_Player_Icon_Prev()
****************************************************************************************************/
function Music_Player_Icon_Prev() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
        </svg>
    );
}

/****************************************************************************************************
* Music_Player_Icon_Next()
****************************************************************************************************/
function Music_Player_Icon_Next() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
        </svg>
    );
}

/****************************************************************************************************
* Music_Player_Icon_Volume()
****************************************************************************************************/
function Music_Player_Icon_Volume({muted}) {
    if (muted) {
        return (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
            </svg>
        );
    }
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
        </svg>
    );
}

/****************************************************************************************************
* Music_Player_Visualizer()
****************************************************************************************************/
function Music_Player_Visualizer({isPlaying, color}) {

    const [heights, setHeights] = useState(Array(VISUALIZER_BAR_COUNT).fill(3));
    const intervalRef = useRef(null);

    useEffect(() => {
        if (isPlaying) {
            intervalRef.current = setInterval(() => {
                setHeights(Array.from({length: VISUALIZER_BAR_COUNT}, () => Math.random() * 12 + 2));
            }, VISUALIZER_INTERVAL);
        } else {
            clearInterval(intervalRef.current);
            /* stop animation */
            setHeights(Array(VISUALIZER_BAR_COUNT).fill(3));
        }
        return () => clearInterval(intervalRef.current);
    }, [isPlaying]);

    return (
        <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: '2px',
            height: '16px',
            marginLeft: 'auto',
            flexShrink: 0,
        }}>
            {heights.map((h, i) => (
                <div key={i} style={{
                    width: '3px',
                    height: h + 'px',
                    borderRadius: '1px',
                    background: color,
                    transition: 'height 0.1s',
                }} />
            ))}
        </div>
    );
}

/****************************************************************************************************
* Music_Player()
****************************************************************************************************/
export function Music_Player() {
    const theme = useTheme();

    /* get Audio Context */
    const {
        isPlaying, currentTime, duration, volume, muted,
        trackIndex, tracks, currentTrack,
        togglePlay, selectTrack, prevTrack, nextTrack,
        seek, setVolume, toggleMute,
    } = useAudio();

    /* showPlaylist */
    const [showPlaylist, setShowPlaylist] = useState(false);
    /* cover Src */
    const coverSrc = currentTrack.cover || Music_Player_Cfg_DefaultCover_Get();

    /* click progress bar */
    const handleProgressClick = (e) => {
        if (!duration) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const pct = (e.clientX - rect.left) / rect.width;
        seek(pct * duration);
    };
    /* click volume bar */
    const handleVolumeClick = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const pct = (e.clientX - rect.left) / rect.width;
        setVolume(pct);
    };

    /* progress */
    const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0;

    /* colors */
    const titleColor    = theme.total.textPrimary;
    const artistColor   = theme.total.textSecondary;
    const subtextColor  = theme.total.textMuted;
    const barBg         = theme.total.progressBg;
    const progressColor = theme.total.progressBar;
    const vizColor      = theme.total.progressBar;
    const btnColor      = theme.total.textSecondary;
    const btnPlayBg     = theme.total.primaryLight;
    const btnPlayBorder = theme.total.border;
    const btnPlayColor  = theme.total.primary;
    const activeBg      = theme.total.primaryUltraLight;
    const activeColor   = theme.total.primary;
    const hoverBg       = theme.total.surfaceHover;
    const volumeFillBg  = theme.total.textMuted;

    return (
        <div
            style={{
                /* card */
                padding: '20px',
                borderRadius: '18px',
                margin: '16px 8px 0 8px',
                transition: 'all 0.3s ease',
            }}
            /* mouse */
            onMouseEnter={e => {
                e.currentTarget.style.boxShadow = theme.total.shadowMd;
            }}
            onMouseLeave={e => {
                e.currentTarget.style.boxShadow = 'None';
            }}
        >
            {/* music player */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                {/* cover */}
                <div style={{
                    width: '52px', height: '52px',
                    borderRadius: '12px', overflow: 'hidden', flexShrink: 0,
                    boxShadow: theme.total.shadowSm,
                }}>
                    <img src={coverSrc} alt="cover" style={{
                        width: '100%', height: '100%', objectFit: 'cover',
                        animation: isPlaying ? 'spin 8s linear infinite' : 'none',
                    }} />
                </div>
                {/* info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                        color: titleColor, fontSize: '14px', fontWeight: 600,
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                    }}>
                        {/* tilte */}
                        {currentTrack.title}
                    </div>
                    <div style={{
                        color: artistColor, fontSize: '12px', marginTop: '2px',
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                    }}>
                        {/* artist */}
                        {currentTrack.artist}
                    </div>
                </div>
                {/* visualizer */}
                <Music_Player_Visualizer isPlaying={isPlaying} color={vizColor} />
            </div>

            {/* progress */}
            <div style={{ marginBottom: '14px' }}>
                <div
                    onClick={handleProgressClick}
                    style={{
                        width: '100%', height: '4px', borderRadius: '2px',
                        background: barBg, cursor: 'pointer', position: 'relative',
                    }}
                >
                    <div style={{
                        height: '100%', borderRadius: '2px',
                        background: progressColor,
                        width: progressPct + '%',
                        transition: 'width 0.1s linear',
                    }} />
                </div>
                {/* time */}
                <div style={{
                    display: 'flex', justifyContent: 'space-between',
                    marginTop: '4px', fontSize: '10px', color: subtextColor,
                    fontVariantNumeric: 'tabular-nums',
                }}>
                    <span>{Music_Player_Format_Time(currentTime)}</span>
                    <span>{Music_Player_Format_Time(duration)}</span>
                </div>
            </div>

            {/* controls */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
                {/* prev */}
                <button onClick={prevTrack} style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: btnColor, padding: 0, display: 'flex',
                    transition: 'all 0.2s',
                }}>
                    <Music_Player_Icon_Prev />
                </button>
                {/* play / pause */}
                <button onClick={togglePlay} style={{
                    width: '40px', height: '40px', borderRadius: '50%',
                    background: btnPlayBg, border: `1px solid ${btnPlayBorder}`,
                    color: btnPlayColor, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backdropFilter: 'blur(8px)', transition: 'all 0.25s',
                }}>
                    {isPlaying ? <Music_Player_Icon_Pause /> : <Music_Player_Icon_Play />}
                </button>
                {/* next */}
                <button onClick={nextTrack} style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: btnColor, padding: 0, display: 'flex',
                    transition: 'all 0.2s',
                }}>
                    <Music_Player_Icon_Next />
                </button>
            </div>

            {/* volume */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '14px' }}>
                <div
                    onClick={toggleMute}
                    style={{ cursor: 'pointer', color: subtextColor, flexShrink: 0, display: 'flex' }}
                >
                    <Music_Player_Icon_Volume muted={muted} />
                </div>
                <div
                    onClick={handleVolumeClick}
                    style={{
                        flex: 1, height: '3px', borderRadius: '2px',
                        background: barBg, cursor: 'pointer',
                    }}
                >
                    <div style={{
                        height: '100%', borderRadius: '2px',
                        background: volumeFillBg,
                        width: (muted ? 0 : volume * 100) + '%',
                        transition: 'width 0.15s',
                    }} />
                </div>
            </div>

            {/* show playlist */}
            <div style={{ textAlign: 'center', marginTop: '12px' }}>
                <button
                    onClick={() => setShowPlaylist(!showPlaylist)}
                    style={{
                        background: 'none', border: 'none', cursor: 'pointer',
                        color: subtextColor, fontSize: '11px',
                        padding: '3px 10px', borderRadius: '10px',
                        transition: 'all 0.2s',
                    }}
                >
                    {showPlaylist ? '收起' : `播放列表 (${tracks.length})`}
                </button>
            </div>

            {/* playlist */}
            <div style={{
                maxHeight: showPlaylist ? '150px' : '0',
                overflow: 'hidden',
                transition: 'max-height 0.35s ease, opacity 0.25s',
                opacity: showPlaylist ? 1 : 0,
                marginTop: showPlaylist ? '8px' : '0',
            }}>
                {tracks.map((t, i) => (
                    <div
                        key={i}
                        onClick={() => selectTrack(i)}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '8px',
                            padding: '6px 10px', borderRadius: '8px',
                            cursor: 'pointer',
                            background: i === trackIndex ? activeBg : 'transparent',
                            transition: 'background 0.2s',
                        }}
                    >
                        {/* index */}
                        <span style={{
                            fontSize: '10px', color: i === trackIndex ? activeColor : subtextColor,
                            width: '14px', textAlign: 'center', flexShrink: 0,
                        }}>
                            {String(i + 1).padStart(2, '0')}
                        </span>
                        {/* music info */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{
                                fontSize: '12px',
                                color: i === trackIndex ? activeColor : titleColor,
                                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                            }}>
                                {t.title}
                            </div>
                            <div style={{ fontSize: '10px', color: subtextColor }}>
                                {t.artist}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* cover */}
            <style>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}

/****************************************************************************************************
* File End!
****************************************************************************************************/
