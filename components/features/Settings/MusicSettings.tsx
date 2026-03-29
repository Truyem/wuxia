import React from 'react';
import { Music, Volume2, SkipBack, Play, Pause, SkipForward, Repeat, Shuffle, Trash2, Plus } from 'lucide-react';
import { useGame } from '../../../hooks/useGame';

const MusicSettings: React.FC = () => {
    const { state, actions } = useGame();
    const { musicSettings } = state;
    const { handleUpdateMusicSettings } = actions;

    const handleAddSong = () => {
        const title = prompt('Nhập tên bài hát:');
        const artist = prompt('Nhập tên nghệ sĩ:');
        const url = prompt('Nhập link âm thanh (mp3, wav...):');

        if (title && url) {
            const newSong = {
                id: Math.random().toString(36).substr(2, 9),
                title,
                artist: artist || 'Vô danh',
                url
            };
            handleUpdateMusicSettings({
                playlist: [...musicSettings.playlist, newSong]
            });
        }
    };

    const handleRemoveSong = (id: string) => {
        handleUpdateMusicSettings({
            playlist: musicSettings.playlist.filter(s => s.id !== id),
            currentSongId: musicSettings.currentSongId === id ? null : musicSettings.currentSongId
        });
    };

    return (
        <div className="space-y-6 text-paper-white relative pb-8">
            <style>
                {`
                .wuxia-slider {
                    -webkit-appearance: none;
                    width: 100%;
                    height: 4px;
                    background: rgb(var(--c-wuxia-gold) / 0.3);
                    outline: none;
                    border-radius: 2px;
                    position: relative;
                }
                .wuxia-slider::-webkit-slider-runnable-track {
                    width: 100%;
                    height: 4px;
                    cursor: pointer;
                    background: linear-gradient(to right, rgb(var(--c-wuxia-gold)) var(--value), rgb(var(--c-wuxia-gold) / 0.3) var(--value));
                    border-radius: 2px;
                }
                .wuxia-slider::-webkit-slider-thumb {
                    height: 20px;
                    width: 20px;
                    border-radius: 50%;
                    background: #7a7a7a;
                    border: 2px solid #fff;
                    cursor: pointer;
                    -webkit-appearance: none;
                    margin-top: -8px;
                    box-shadow: 0 0 10px rgba(0,0,0,0.5);
                }
                .wuxia-slider::-moz-range-thumb {
                    height: 18px;
                    width: 18px;
                    border-radius: 50%;
                    background: #7a7a7a;
                    border: 2px solid #fff;
                    cursor: pointer;
                    box-shadow: 0 0 10px rgba(0,0,0,0.5);
                }
                .wuxia-checkbox {
                    appearance: none;
                    width: 18px;
                    height: 18px;
                    border: 1px solid rgb(var(--c-wuxia-gold) / 0.5);
                    background: rgba(0,0,0,0.3);
                    cursor: pointer;
                    position: relative;
                    transition: all 0.2s;
                }
                .wuxia-checkbox:checked {
                    background: rgb(var(--c-wuxia-gold) / 0.2);
                    border-color: rgb(var(--c-wuxia-gold));
                }
                .wuxia-checkbox:checked::after {
                    content: '✓';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -51%);
                    color: rgb(var(--c-wuxia-gold));
                    font-size: 14px;
                    font-weight: bold;
                }
                `}
            </style>

            {/* Main Header */}
            <div className="mb-8 relative">
                <h3 className="text-2xl md:text-3xl font-serif font-black text-wuxia-gold tracking-[0.2em] mb-2 uppercase">
                    Âm nhạc & Âm thanh
                </h3>
                <div className="h-[2px] w-full" 
                    style={{ background: 'linear-gradient(90deg, rgb(var(--c-wuxia-gold)) 0%, transparent 100%)' }} />
                <div className="text-[10px] text-paper-white/40 mt-1 tracking-[0.3em] font-sans uppercase">AUDIO & MUSIC SETTINGS</div>
            </div>

            {/* Volume Section */}
            <div className="glass-card p-5 md:p-6 relative overflow-hidden group">
                <div className="wuxia-corner wuxia-corner-tl opacity-40 group-hover:opacity-100 transition-opacity" />
                <div className="wuxia-corner wuxia-corner-br opacity-40 group-hover:opacity-100 transition-opacity" />
                
                <div className="flex items-center gap-3 mb-6">
                    <Volume2 className="text-wuxia-gold w-5 h-5" />
                    <h4 className="text-lg font-serif font-bold text-wuxia-gold tracking-wider uppercase">Âm lượng hệ thống</h4>
                </div>
                
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="flex-1 w-full relative pt-2">
                        <input 
                            type="range" 
                            min="0" 
                            max="100" 
                            step="1" 
                            value={musicSettings.volume} 
                            onChange={(e) => handleUpdateMusicSettings({ volume: parseFloat(e.target.value) })}
                            className="wuxia-slider cursor-pointer"
                            style={{ '--value': `${musicSettings.volume}%` } as any}
                        />
                    </div>
                    <div className="shrink-0 font-mono text-xl md:text-2xl text-wuxia-gold/80 bg-black/40 px-4 py-1 border border-wuxia-gold/20 min-w-[100px] text-center">
                        {Math.round(musicSettings.volume)}%
                    </div>
                </div>
            </div>

            {/* Playlist Section */}
            <div className="glass-card p-5 md:p-6 relative overflow-hidden group">
                <div className="wuxia-corner wuxia-corner-tl opacity-40 group-hover:opacity-100 transition-opacity" />
                <div className="wuxia-corner wuxia-corner-br opacity-40 group-hover:opacity-100 transition-opacity" />
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                        <Music className="text-wuxia-gold w-5 h-5" />
                        <h4 className="text-lg font-serif font-bold text-wuxia-gold tracking-wider uppercase">Danh sách phát</h4>
                    </div>
                    <button 
                        onClick={handleAddSong}
                        className="btn-wuxia py-2 px-4 text-xs w-full sm:w-auto"
                    >
                        <Plus size={14} className="mr-2" /> Thêm bài hát
                    </button>
                </div>

                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {musicSettings.playlist.length === 0 ? (
                        <div className="text-center py-10 text-paper-white/20 italic font-serif border border-dashed border-white/10">
                            Chưa có bài hát nào trong danh sách
                        </div>
                    ) : (
                        musicSettings.playlist.map((song) => (
                            <div 
                                key={song.id}
                                className={`group/item flex items-center justify-between p-4 border transition-all duration-300 ${
                                    song.id === musicSettings.currentSongId 
                                    ? 'border-wuxia-gold/40 bg-wuxia-gold/10 shadow-[inset_0_0_20px_rgba(230,200,110,0.05)]' 
                                    : 'border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20'
                                }`}
                            >
                                <div className="flex-1 min-w-0 mr-4 flex items-center gap-4">
                                    <div className={`p-2 rounded-full border ${song.id === musicSettings.currentSongId ? 'border-wuxia-gold text-wuxia-gold bg-wuxia-gold/20' : 'border-white/10 text-paper-white/40'}`}>
                                        <Music size={14} />
                                    </div>
                                    <div className="truncate">
                                        <div className={`font-serif font-bold tracking-wide truncate ${song.id === musicSettings.currentSongId ? 'text-wuxia-gold text-glow-gold' : 'text-paper-white'}`}>
                                            {song.title}
                                        </div>
                                        <div className="text-[10px] text-paper-white/40 uppercase tracking-widest">{song.artist}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    {song.id !== musicSettings.currentSongId ? (
                                        <button 
                                            onClick={() => handleUpdateMusicSettings({ currentSongId: song.id })}
                                            className="p-2.5 text-paper-white/40 hover:text-wuxia-gold hover:bg-wuxia-gold/10 rounded-lg transition-all"
                                            title="Phát bài này"
                                        >
                                            <Play size={18} fill="currentColor" fillOpacity={0.2} />
                                        </button>
                                    ) : (
                                        <div className="p-2.5 text-wuxia-gold">
                                            <div className="flex gap-0.5 items-end h-4 w-4">
                                                <div className="w-1 bg-wuxia-gold animate-[music-bar_1s_ease-in-out_infinite]" style={{height: '60%'}} />
                                                <div className="w-1 bg-wuxia-gold animate-[music-bar_1s_ease-in-out_infinite_0.2s]" style={{height: '100%'}} />
                                                <div className="w-1 bg-wuxia-gold animate-[music-bar_1s_ease-in-out_infinite_0.4s]" style={{height: '40%'}} />
                                            </div>
                                        </div>
                                    )}
                                    <button 
                                        onClick={() => handleRemoveSong(song.id)}
                                        className="p-2.5 text-paper-white/20 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                                        title="Xóa"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Playback Modes */}
            <div className="glass-card p-5 md:p-6 relative overflow-hidden group">
                <div className="wuxia-corner wuxia-corner-tl opacity-40 group-hover:opacity-100 transition-opacity" />
                <div className="wuxia-corner wuxia-corner-br opacity-40 group-hover:opacity-100 transition-opacity" />
                
                <h4 className="text-lg font-serif font-bold text-wuxia-gold tracking-wider mb-6 uppercase">Chế độ phát</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <label className="flex items-center gap-4 cursor-pointer group/opt">
                        <div className="relative flex items-center justify-center">
                            <input 
                                type="checkbox" 
                                checked={musicSettings.shuffle} 
                                onChange={(e) => handleUpdateMusicSettings({ shuffle: e.target.checked })}
                                className="wuxia-checkbox"
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-serif font-bold group-hover/opt:text-wuxia-gold transition-colors">Phát ngẫu nhiên</span>
                            <span className="text-[10px] text-paper-white/40 uppercase tracking-wider">Shuffle Play</span>
                        </div>
                    </label>

                    <label className="flex items-center gap-4 cursor-pointer group/opt">
                        <div className="relative flex items-center justify-center">
                            <input 
                                type="checkbox" 
                                checked={musicSettings.loopPlaylist} 
                                onChange={(e) => {
                                    const checked = e.target.checked;
                                    handleUpdateMusicSettings({ 
                                        loopPlaylist: checked,
                                        singleLoop: checked ? false : musicSettings.singleLoop
                                    });
                                }}
                                className="wuxia-checkbox"
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-serif font-bold group-hover/opt:text-wuxia-gold transition-colors">Lặp lại danh sách</span>
                            <span className="text-[10px] text-paper-white/40 uppercase tracking-wider">Loop Playlist</span>
                        </div>
                    </label>

                    <label className="flex items-center gap-4 cursor-pointer group/opt">
                        <div className="relative flex items-center justify-center">
                            <input 
                                type="checkbox" 
                                checked={musicSettings.singleLoop} 
                                onChange={(e) => {
                                    const checked = e.target.checked;
                                    handleUpdateMusicSettings({ 
                                        singleLoop: checked,
                                        loopPlaylist: checked ? false : musicSettings.loopPlaylist
                                    });
                                }}
                                className="wuxia-checkbox"
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-serif font-bold group-hover/opt:text-wuxia-gold transition-colors">Lặp lại 1 bài</span>
                            <span className="text-[10px] text-paper-white/40 uppercase tracking-wider">Single Loop</span>
                        </div>
                    </label>
                </div>
            </div>

            <style>
                {`
                @keyframes music-bar {
                    0%, 100% { height: 30%; }
                    50% { height: 100%; }
                }
                `}
            </style>
        </div>
    );
};

export default MusicSettings;
