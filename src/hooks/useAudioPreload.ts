import { useEffect, useCallback } from 'react';
import AudioPreloader from '../utils/AudioPreloader';

interface AudioConfig {
    url: string;
    duration: number;
}

export const useAudioPreload = () => {
    const preloader = AudioPreloader.getInstance();

    // 预加载单个音频
    const preloadAudio = useCallback(async (audioConfig: AudioConfig) => {
        try {
            await preloader.preloadAudio(audioConfig.url);
        } catch (error) {
            console.error(`Failed to preload audio: ${audioConfig.url}`, error);
        }
    }, []);

    // 预加载多个音频
    const preloadAudios = useCallback(async (audioConfigs: AudioConfig[]) => {
        try {
            const urls = audioConfigs.map(config => config.url);
            await Promise.all(preloader.preloadAudios(urls));
        } catch (error) {
            console.error('Failed to preload some audios:', error);
        }
    }, []);

    // 播放音频
    const playAudio = useCallback(async (audioConfig: AudioConfig) => {
        try {
            await preloader.playAudio(audioConfig.url);
        } catch (error) {
            console.error(`Failed to play audio: ${audioConfig.url}`, error);
        }
    }, []);

    return {
        preloadAudio,
        preloadAudios,
        playAudio
    };
};
