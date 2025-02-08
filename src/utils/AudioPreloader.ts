type AudioCache = {
    [url: string]: {
        audio: HTMLAudioElement;
        loadPromise: Promise<void>;
        lastUsed: number;
    };
};

class AudioPreloader {
    private static instance: AudioPreloader;
    private cache: AudioCache = {};
    private maxCacheSize: number = 20;  // 最大缓存数量

    private constructor() {
        // 每5分钟清理一次缓存
        setInterval(() => this.cleanCache(), 5 * 60 * 1000);
    }

    public static getInstance(): AudioPreloader {
        if (!AudioPreloader.instance) {
            AudioPreloader.instance = new AudioPreloader();
        }
        return AudioPreloader.instance;
    }

    /**
     * 预加载音频
     * @param urls 要预加载的音频URL数组
     * @returns Promise数组，每个Promise在对应的音频加载完成时resolve
     */
    public preloadAudios(urls: string[]): Promise<void>[] {
        return urls.map(url => this.preloadAudio(url));
    }

    /**
     * 预加载单个音频
     * @param url 音频URL
     * @returns Promise，在音频加载完成时resolve
     */
    public preloadAudio(url: string): Promise<void> {
        if (this.cache[url]) {
            this.cache[url].lastUsed = Date.now();
            return this.cache[url].loadPromise;
        }

        const audio = new Audio();
        
        const loadPromise = new Promise<void>((resolve, reject) => {
            audio.addEventListener('canplaythrough', () => resolve());
            audio.addEventListener('error', (e) => reject(e));
        });

        this.cache[url] = {
            audio,
            loadPromise,
            lastUsed: Date.now()
        };

        audio.src = url;
        audio.load();

        return loadPromise;
    }

    /**
     * 获取已预加载的音频
     * @param url 音频URL
     * @returns 音频元素或null（如果未预加载）
     */
    public getAudio(url: string): HTMLAudioElement | null {
        const cached = this.cache[url];
        if (cached) {
            cached.lastUsed = Date.now();
            return cached.audio;
        }
        return null;
    }

    /**
     * 播放音频
     * @param url 音频URL
     * @returns Promise，在音频播放完成时resolve
     */
    public async playAudio(url: string): Promise<void> {
        try {
            await this.preloadAudio(url);
            const audio = this.getAudio(url);
            if (audio) {
                audio.currentTime = 0;
                await audio.play();
            }
        } catch (error) {
            console.error('Error playing audio:', error);
            throw error;
        }
    }

    /**
     * 清理长时间未使用的缓存
     */
    private cleanCache(): void {
        const urls = Object.keys(this.cache);
        if (urls.length <= this.maxCacheSize) return;

        // 按最后使用时间排序
        const sortedUrls = urls.sort((a, b) => 
            this.cache[b].lastUsed - this.cache[a].lastUsed
        );

        // 移除最旧的条目
        sortedUrls.slice(this.maxCacheSize).forEach(url => {
            const audio = this.cache[url].audio;
            audio.src = '';
            delete this.cache[url];
        });
    }

    /**
     * 清除所有缓存
     */
    public clearCache(): void {
        Object.keys(this.cache).forEach(url => {
            const audio = this.cache[url].audio;
            audio.src = '';
        });
        this.cache = {};
    }
}

export default AudioPreloader;
