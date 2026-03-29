import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, List, Repeat, Shuffle, Music as MusicIcon } from 'lucide-react';
import { useGame } from '../../../hooks/useGame';
import './MusicPlayer.css';

export const MusicPlayer: React.FC = () => {
    const { state, actions } = useGame();
    const { musicSettings } = state;
    const { handleTogglePlay, handleNextSong, handlePrevSong, handleUpdateMusicSettings } = actions;
    
    const [showPlaylist, setShowPlaylist] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const audioRef = React.useRef<HTMLAudioElement | null>(null);

    const currentSong = musicSettings.playlist.find(s => s.id === musicSettings.currentSongId);

    // Sync playing state
    useEffect(() => {
        if (!audioRef.current) return;
        if ((musicSettings as any).isPlaying) {
            audioRef.current.play().catch(err => console.warn('Audio play failed:', err));
        } else {
            audioRef.current.pause();
        }
    }, [(musicSettings as any).isPlaying, musicSettings.currentSongId]);

    // Sync volume
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = musicSettings.volume;
        }
    }, [musicSettings.volume]);

    const handleEnded = () => {
        handleNextSong();
    };

    const togglePlaybackMode = (mode: 'loopPlaylist' | 'singleLoop' | 'shuffle') => {
        const updates: any = {};
        if (mode === 'loopPlaylist') {
            updates.loopPlaylist = !musicSettings.loopPlaylist;
            if (updates.loopPlaylist) updates.singleLoop = false;
        } else if (mode === 'singleLoop') {
            updates.singleLoop = !musicSettings.singleLoop;
            if (updates.singleLoop) updates.loopPlaylist = false;
        } else if (mode === 'shuffle') {
            updates.shuffle = !musicSettings.shuffle;
        }
        handleUpdateMusicSettings(updates);
    };

    return (
        <div 
            className={`music-player-container ${isHovered ? 'hovered' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <audio 
                ref={audioRef} 
                src={currentSong?.url || ''}
                onEnded={handleEnded} 
                loop={musicSettings.singleLoop}
            />
            <div className="player-main">
                <div className="song-info">
                    <div className={`disc ${currentSong ? 'rotating' : ''}`}>
                        {currentSong ? <MusicIcon className="icon-rotating" /> : <MusicIcon />}
                    </div>
                    <div className="text-info">
                        <div className="song-title">{currentSong?.title || 'Không có bài hát'}</div>
                        <div className="song-artist">{currentSong?.artist || 'Vô danh'}</div>
                    </div>
                </div>

                <div className="controls">
                    <button className="control-btn" onClick={handlePrevSong} title="Bài trước">
                        <SkipBack size={18} />
                    </button>
                    <button className="play-btn" onClick={handleTogglePlay}>
                        {(musicSettings as any).isPlaying ? <Pause size={24} /> : <Play size={24} />}
                    </button>
                    <button className="control-btn" onClick={handleNextSong} title="Bài tiếp">
                        <SkipForward size={18} />
                    </button>
                </div>

                <div className="volume-control">
                    <button onClick={() => handleUpdateMusicSettings({ volume: musicSettings.volume === 0 ? 0.5 : 0 })}>
                        {musicSettings.volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    </button>
                    <input 
                        type="range" 
                        min="0" 
                        max="1" 
                        step="0.01" 
                        value={musicSettings.volume} 
                        onChange={(e) => handleUpdateMusicSettings({ volume: parseFloat(e.target.value) })}
                    />
                </div>

                <div className="extra-actions">
                    <button 
                        className={`action-btn ${musicSettings.shuffle ? 'active' : ''}`}
                        onClick={() => togglePlaybackMode('shuffle')}
                        title="Phát ngẫu nhiên"
                    >
                        <Shuffle size={16} />
                    </button>
                    <button 
                        className={`action-btn ${musicSettings.loopPlaylist ? 'active' : ''}`}
                        onClick={() => togglePlaybackMode('loopPlaylist')}
                        title="Lặp lại danh sách"
                    >
                        <Repeat size={16} />
                    </button>
                    <button 
                        className={`action-btn ${musicSettings.singleLoop ? 'active' : ''}`}
                        onClick={() => togglePlaybackMode('singleLoop')}
                        title="Lặp lại 1 bài"
                    >
                        <div className="single-loop-container">
                            <Repeat size={16} />
                            <span className="repeat-one-indicator">1</span>
                        </div>
                    </button>
                    <button 
                        className={`action-btn ${showPlaylist ? 'active' : ''}`}
                        onClick={() => setShowPlaylist(!showPlaylist)}
                        title="Danh sách phát"
                    >
                        <List size={16} />
                    </button>
                </div>
            </div>

            {showPlaylist && (
                <div className="playlist-dropdown">
                    <div className="playlist-header">Danh sách phát ({musicSettings.playlist.length})</div>
                    <div className="playlist-items">
                        {musicSettings.playlist.map((song) => (
                            <div 
                                key={song.id} 
                                className={`playlist-item ${song.id === musicSettings.currentSongId ? 'active' : ''}`}
                                onClick={() => handleUpdateMusicSettings({ currentSongId: song.id })}
                            >
                                <div className="item-title">{song.title}</div>
                                <div className="item-artist">{song.artist}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
