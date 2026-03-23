
import React, { useState, useEffect } from 'react';
import { CharacterData, WorldDataStructure, NpcStructure } from '../../../types';
import { ImageService } from '../../../services/imageService';

interface VisualSummaryProps {
    character: CharacterData;
    world: WorldDataStructure;
    social: NpcStructure[];
    imageGenWorkerUrl?: string;
    onContinue: () => void;
    onUpdateCharacter: (char: CharacterData) => void;
    onUpdateSocial: (social: NpcStructure[]) => void;
    onUpdateWorld: (world: WorldDataStructure) => void;
}

const VisualSummary: React.FC<VisualSummaryProps> = ({
    character,
    world,
    social,
    imageGenWorkerUrl,
    onContinue,
    onUpdateCharacter,
    onUpdateSocial,
    onUpdateWorld
}) => {
    const [generating, setGenerating] = useState<Record<string, boolean>>({});
    const [activeTab, setActiveTab] = useState<'character' | 'npcs' | 'locations' | 'items'>('character');

    const generateImage = async (type: 'character' | 'npc' | 'location' | 'item', id: string, data: any) => {
        if (!imageGenWorkerUrl) return;
        
        setGenerating(prev => ({ ...prev, [id]: true }));
        try {
            let prompt = '';
            let cacheKey = '';
            
            if (type === 'character' || type === 'npc') {
                // ImageService now handles .appearance (protagonist) and .appearanceDescription (NPC)
                const favorability = (data as any).favorability;
                prompt = ImageService.constructCharacterPrompt({ ...data, favorability });
                
                // For NPCs, include favorability tier in cache key to allow variations
                let favSuffix = '';
                if (type === 'npc' && favorability !== undefined) {
                    if (favorability >= 80) favSuffix = '_fav80';
                    else if (favorability >= 40) favSuffix = '_fav40';
                    else if (favorability >= 20) favSuffix = '_fav20';
                    else if (favorability >= 10) favSuffix = '_fav10';
                    else favSuffix = '_fav0';
                }
                
                cacheKey = `${type}_${data.name.replace(/\s+/g, '_')}${favSuffix}`;
            } else if (type === 'location') {
                prompt = ImageService.constructMapPrompt(data);
                cacheKey = `map_${(data.Name || data.name).replace(/\s+/g, '_')}`;
            } else if (type === 'item') {
                prompt = ImageService.constructItemPrompt(data);
                cacheKey = `item_${data.name.replace(/\s+/g, '_')}`;
            }

            const dataUrl = await ImageService.generateAndCache(imageGenWorkerUrl, { prompt }, cacheKey);
            
            if (dataUrl) {
                if (type === 'character') {
                    // Use a more robust update if possible, though onUpdateCharacter 
                    // is likely a simple state setter from NewGameWizard
                    onUpdateCharacter({ ...character, avatar: dataUrl });
                } else if (type === 'npc') {
                    onUpdateSocial(social.map(n => n.name === id ? { ...n, avatar: dataUrl } : n));
                } else if (type === 'location') {
                    onUpdateWorld({
                        ...world,
                        maps: world.maps.map(m => (m.Name || m.name) === id ? { ...m, image: dataUrl } : m)
                    });
                } else if (type === 'item') {
                    onUpdateCharacter({
                        ...character,
                        itemList: character.itemList?.map(i => i.id === id ? { ...i, image: dataUrl } : i)
                    });
                }
            }
        } catch (error) {
            console.error('Generation error:', error);
        } finally {
            setGenerating(prev => ({ ...prev, [id]: false }));
        }
    };

    return (
        <div className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-6 backdrop-blur-md">
            <div className="bg-ink-black border-2 border-wuxia-gold/40 rounded-3xl w-full max-w-6xl h-[85vh] flex flex-col overflow-hidden shadow-[0_0_50px_rgba(0,0,0,1)]">
                {/* Header */}
                <div className="p-6 border-b border-wuxia-gold/20 flex justify-between items-center bg-gradient-to-r from-ink-black to-gray-900">
                    <div>
                        <h2 className="text-3xl font-bold text-wuxia-gold tracking-widest uppercase mb-1">Thiết Kế Thế Giới</h2>
                        <p className="text-gray-400 text-sm italic">Khởi tạo linh hồn và hình ảnh cho cuộc hành trình của bạn</p>
                    </div>
                    <button 
                        onClick={onContinue}
                        className="px-8 py-3 bg-wuxia-gold text-black font-bold rounded-lg hover:bg-wuxia-gold-light transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:scale-105 active:scale-95"
                    >
                        BẮT ĐẦU HÀNH TRÌNH
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex bg-black/40 p-2 gap-2">
                    {[
                        { id: 'character', label: 'Nhân Vật Chính', icon: '👤' },
                        { id: 'npcs', label: 'Nhân Vật Quan Trọng', icon: '👥' },
                        { id: 'locations', label: 'Địa Danh & Bản Đồ', icon: '🗺️' },
                        { id: 'items', label: 'Vật Phẩm & Trang Bị', icon: '⚔️' },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 ${
                                activeTab === tab.id 
                                ? 'bg-wuxia-gold/10 text-wuxia-gold border border-wuxia-gold/30 shadow-[inset_0_0_15px_rgba(212,175,55,0.1)]' 
                                : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                            }`}
                        >
                            <span className="text-xl">{tab.icon}</span>
                            <span className="font-bold tracking-wider">{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-[url('/assets/textures/paper-dark.png')] bg-repeat">
                    {activeTab === 'character' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
                            <div className="space-y-6">
                                <div className="bg-black/40 p-6 rounded-2xl border border-wuxia-gold/10">
                                    <h3 className="text-xl font-bold text-wuxia-gold mb-4 flex items-center gap-2">
                                        <span className="w-1 h-6 bg-wuxia-gold rounded-full"></span>
                                        Thông Tin Cơ Bản
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div><span className="text-gray-500">Họ Tên:</span> <span className="text-white font-medium">{character.name}</span></div>
                                        <div><span className="text-gray-500">Giới Tính:</span> <span className="text-white font-medium">{character.gender}</span></div>
                                        <div><span className="text-gray-500">Tuổi:</span> <span className="text-white font-medium">{character.age}</span></div>
                                        <div><span className="text-gray-500">Cảnh Giới:</span> <span className="text-wuxia-gold font-medium">{character.realm || 'Phàm Nhân'}</span></div>
                                    </div>
                                </div>
                                <div className="bg-black/40 p-6 rounded-2xl border border-wuxia-gold/10">
                                    <h3 className="text-xl font-bold text-wuxia-gold mb-4 flex items-center gap-2">
                                        <span className="w-1 h-6 bg-wuxia-gold rounded-full"></span>
                                        Ngoại Hình & Khí Chất
                                    </h3>
                                    <p className="text-gray-300 text-sm leading-relaxed italic">
                                        {character.appearance || "Chưa có mô tả ngoại hình cụ thể."}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center space-y-4">
                                <div className="relative group">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-wuxia-gold to-wuxia-red rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                                    <div className="relative w-full aspect-video bg-black rounded-2xl border-2 border-wuxia-gold/30 overflow-hidden flex items-center justify-center">
                                        {character.avatar && !character.avatar.includes('default') ? (
                                            <img src={character.avatar} alt={character.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="text-gray-700 text-6xl opacity-20">👤</div>
                                        )}
                                        {generating[character.name] && (
                                            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center space-y-3">
                                                <div className="w-12 h-12 border-4 border-wuxia-gold border-t-transparent rounded-full animate-spin"></div>
                                                <span className="text-wuxia-gold text-xs font-bold animate-pulse">ĐANG VẼ...</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <button 
                                    onClick={() => generateImage('character', character.name, character)}
                                    disabled={generating[character.name]}
                                    className="px-6 py-2 bg-white/5 border border-wuxia-gold/50 text-wuxia-gold rounded-full hover:bg-wuxia-gold/10 transition-all text-sm font-bold flex items-center gap-2"
                                >
                                    ✨ {character.avatar ? 'Vẽ Lại' : 'Tạo Hình Ảnh'}
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'npcs' && (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fade-in">
                    {social.map(npc => (
                                <div key={npc.name} className="bg-black/40 rounded-2xl border border-wuxia-gold/10 overflow-hidden group hover:border-wuxia-gold/30 transition-all">
                                    <div className="aspect-video bg-gray-900 relative">
                                        {npc.avatar ? (
                                            <img src={npc.avatar} alt={npc.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center opacity-10">👤</div>
                                        )}
                                        {generating[npc.name] && (
                                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                                <div className="w-8 h-8 border-3 border-wuxia-gold border-t-transparent rounded-full animate-spin"></div>
                                            </div>
                                        )}
                                        <button 
                                            onClick={() => generateImage('npc', npc.name, npc)}
                                            className="absolute bottom-2 right-2 p-2 bg-black/50 text-wuxia-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm border border-wuxia-gold/30"
                                        >
                                            🎨
                                        </button>
                                    </div>
                                    <div className="p-3 text-center">
                                        <div className="text-wuxia-gold font-bold text-sm truncate">{npc.name}</div>
                                        <div className="text-gray-500 text-[10px] truncate">{npc.identity || 'Bí ẩn'}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'locations' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
                            {world.maps.map(map => {
                                const mapName = map.Name || map.name;
                                return (
                                    <div key={mapName} className="bg-black/40 rounded-2xl border border-wuxia-gold/10 overflow-hidden">
                                        <div className="aspect-video bg-gray-900 relative">
                                            {map.image ? (
                                                <img src={map.image} alt={mapName} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center opacity-10 underline text-4xl">🗺️</div>
                                            )}
                                            {generating[mapName] && (
                                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                                    <div className="w-12 h-12 border-4 border-wuxia-gold border-t-transparent rounded-full animate-spin"></div>
                                                </div>
                                            )}
                                            <button 
                                                onClick={() => generateImage('location', mapName, map)}
                                                className="absolute bottom-4 right-4 px-4 py-2 bg-black/50 text-wuxia-gold rounded-full backdrop-blur-sm border border-wuxia-gold/30 font-bold text-xs"
                                            >
                                                Vẽ Cảnh Vật
                                            </button>
                                        </div>
                                        <div className="p-4">
                                            <div className="text-wuxia-gold font-bold text-lg mb-1">{mapName}</div>
                                            <p className="text-gray-400 text-xs italic line-clamp-2">{map.description}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {activeTab === 'items' && (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fade-in">
                            {character.itemList && character.itemList.length > 0 ? (
                                character.itemList.map(item => (
                                    <div key={item.id} className="bg-black/40 rounded-2xl border border-wuxia-gold/10 overflow-hidden group hover:border-wuxia-gold/30 transition-all">
                                        <div className="aspect-square bg-gray-900 relative">
                                            {item.image ? (
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center opacity-10 text-4xl">⚔️</div>
                                            )}
                                            {generating[item.id] && (
                                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                                    <div className="w-8 h-8 border-3 border-wuxia-gold border-t-transparent rounded-full animate-spin"></div>
                                                </div>
                                            )}
                                            <button 
                                                onClick={() => generateImage('item', item.id, item)}
                                                className="absolute bottom-2 right-2 p-2 bg-black/50 text-wuxia-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm border border-wuxia-gold/30"
                                            >
                                                🎨
                                            </button>
                                        </div>
                                        <div className="p-3 text-center">
                                            <div className="text-wuxia-gold font-bold text-sm truncate">{item.name}</div>
                                            <div className={`text-[10px] font-medium ${
                                                item.quality === 'Tuyệt thế' || item.quality === 'Truyền thuyết' ? 'text-wuxia-red' :
                                                item.quality === 'Cực phẩm' ? 'text-purple-400' :
                                                item.quality === 'Thượng phẩm' ? 'text-blue-400' : 'text-gray-500'
                                            }`}>
                                                {item.quality} - {item.type}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full py-12 flex flex-col items-center justify-center text-center">
                                    <div className="text-5xl opacity-20 mb-4">🧳</div>
                                    <p className="text-gray-500 italic">Hành trang hiện đang trống rỗng.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer Tip */}
                <div className="p-4 bg-black/60 border-t border-wuxia-gold/10 text-center">
                    <p className="text-gray-500 text-[10px] uppercase tracking-[0.2em]">
                        Mẹo: Bạn có thể bỏ qua bước này, hệ thống sẽ tự động vẽ ảnh trong quá trình chơi nếu bạn chưa chọn.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default VisualSummary;
