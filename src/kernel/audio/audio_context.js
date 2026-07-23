
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
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
/* config */
import { Music_Player_Cfg_Tracks_Get } from '../../layout/music/music_player_cfg';

/****************************************************************************************************
* Define
****************************************************************************************************/

/****************************************************************************************************
* Type Define
****************************************************************************************************/

/****************************************************************************************************
* Variable
****************************************************************************************************/

/* audio context */
const AudioContext = createContext(null);

/* audio instance */
let audioInstance = null;
let audioTrackIndex = 0;

/****************************************************************************************************
* Function Interface
****************************************************************************************************/

/****************************************************************************************************
* GetAudioInstance()
****************************************************************************************************/
function GetAudioInstance() {
    if (!audioInstance) {
        audioInstance = new Audio();
        audioInstance.preload = 'metadata';
    }
    return audioInstance;
}

/****************************************************************************************************
* AudioProvider()
****************************************************************************************************/
export function AudioProvider({ children }) {

    /* playlist */
    const tracks = Music_Player_Cfg_Tracks_Get();

    /* state */
    const [isPlaying, setIsPlaying]           = useState(false);
    const [currentTime, setCurrentTime]       = useState(0);
    const [duration, setDuration]             = useState(0);
    const [volume, setVolume]                 = useState(0.7);
    const [muted, setMuted]                   = useState(false);
    const [trackIndex, setTrackIndex]         = useState(audioTrackIndex);

    /* current track */
    useEffect(() => {
        const audio = GetAudioInstance();

        /* first mount */
        if (!audio.src || audio.src === window.location.href) {
            audio.src = process.env.PUBLIC_URL + tracks[audioTrackIndex].src;
            audio.volume = volume;
        }

        /* update state */
        setCurrentTime(audio.currentTime);
        setDuration(audio.duration || 0);
        setIsPlaying(!audio.paused);

        /* remove audio */
        const onTimeUpdate      = () => setCurrentTime(audio.currentTime);
        const onLoadedMetadata  = () => setDuration(audio.duration);
        const onPlay            = () => setIsPlaying(true);
        const onPause           = () => setIsPlaying(false);
        const onEnded           = () => {
            audioTrackIndex = (audioTrackIndex + 1) % tracks.length;
            setTrackIndex(audioTrackIndex);
            audio.src = process.env.PUBLIC_URL + tracks[audioTrackIndex].src;
            audio.load();
            setCurrentTime(0);
            audio.play().catch(() => {});
        };

        audio.addEventListener('timeupdate', onTimeUpdate);
        audio.addEventListener('loadedmetadata', onLoadedMetadata);
        audio.addEventListener('play', onPlay);
        audio.addEventListener('pause', onPause);
        audio.addEventListener('ended', onEnded);

        return () => {
            /* remove event listeners */
            audio.removeEventListener('timeupdate', onTimeUpdate);
            audio.removeEventListener('loadedmetadata', onLoadedMetadata);
            audio.removeEventListener('play', onPlay);
            audio.removeEventListener('pause', onPause);
            audio.removeEventListener('ended', onEnded);
        };
    }, []);

    /* update volume */
    useEffect(() => {
        GetAudioInstance().volume = muted ? 0 : volume;
    }, [volume, muted]);

    /* controls */

    /* select track */
    const selectTrack = useCallback((index, autoPlay = true) => {
        const audio = GetAudioInstance();
        audio.src = process.env.PUBLIC_URL + tracks[index].src;
        audio.load();
        setCurrentTime(0);
        audioTrackIndex = index;
        setTrackIndex(index);
        if (autoPlay) {
            audio.play().catch(() => {});
        }
    }, [tracks]);

    /* play | pause */
    const togglePlay = useCallback(() => {
        const audio = GetAudioInstance();
        if (audio.paused) {
            audio.play().catch(() => {});
        } else {
            audio.pause();
        }
    }, []);

    /* prev track */
    const prevTrack = useCallback(() => {
        const prev = (audioTrackIndex - 1 + tracks.length) % tracks.length;
        selectTrack(prev);
    }, [tracks.length, selectTrack]);

    /* next track */
    const nextTrack = useCallback(() => {
        const next = (audioTrackIndex + 1) % tracks.length;
        selectTrack(next);
    }, [tracks.length, selectTrack]);

    /* set time */
    const seek = useCallback((time) => {
        GetAudioInstance().currentTime = time;
        setCurrentTime(time);
    }, []);

    /* set volume */
    const setVolumeLevel = useCallback((v) => {
        setVolume(Math.max(0, Math.min(1, v)));
        setMuted(false);
    }, []);

    /* set mute */
    const toggleMute = useCallback(() => {
        setMuted(prev => !prev);
    }, []);

    return (
        <AudioContext.Provider value={{
            /* state */
            isPlaying,
            currentTime,
            duration,
            volume,
            muted,
            trackIndex,
            tracks,
            currentTrack: tracks[trackIndex],
            /* controls */
            togglePlay,
            selectTrack,
            prevTrack,
            nextTrack,
            seek,
            setVolume: setVolumeLevel,
            toggleMute,
        }}>
            {children}
        </AudioContext.Provider>
    );
}

/****************************************************************************************************
* useAudio()
****************************************************************************************************/
export function useAudio() {
    const ctx = useContext(AudioContext);
    if (!ctx) {
        throw new Error('useAudio must be used within AudioProvider');
    }
    return ctx;
}

/****************************************************************************************************
* File End!
****************************************************************************************************/
