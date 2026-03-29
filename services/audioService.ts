
export interface Song {
    id: string;
    title: string;
    url: string;
    duration?: string;
}

export type PlaybackMode = 'shuffle' | 'loop' | 'single' | 'sequential';

class AudioService {
    private static instance: AudioService;
    private audio: HTMLAudioElement | null = null;
    private onEndedCallback: (() => void) | null = null;

    private constructor() {
        if (typeof window !== 'undefined') {
            this.audio = new Audio();
            this.audio.addEventListener('ended', () => {
                if (this.onEndedCallback) this.onEndedCallback();
            });
        }
    }

    static getInstance() {
        if (!AudioService.instance) {
            AudioService.instance = new AudioService();
        }
        return AudioService.instance;
    }

    setVolume(volume: number) {
        if (this.audio) {
            this.audio.volume = Math.max(0, Math.min(1, volume / 100));
        }
    }

    setSrc(url: string) {
        if (this.audio) {
            const wasPlaying = !this.audio.paused;
            this.audio.src = url;
            if (wasPlaying) {
                this.play();
            }
        }
    }

    play() {
        if (this.audio) {
            this.audio.play().catch(err => {
                console.warn('[AudioService] Playback failed, likely interaction required:', err);
            });
        }
    }

    pause() {
        if (this.audio) {
            this.audio.pause();
        }
    }

    stop() {
        if (this.audio) {
            this.audio.pause();
            this.audio.currentTime = 0;
        }
    }

    setOnEnded(callback: () => void) {
        this.onEndedCallback = callback;
    }

    get isPlaying() {
        return this.audio ? !this.audio.paused : false;
    }

    get currentTime() {
        return this.audio ? this.audio.currentTime : 0;
    }

    set currentTime(value: number) {
        if (this.audio) {
            this.audio.currentTime = value;
        }
    }
}

export const audioService = AudioService.getInstance();
