import React, { useEffect, useMemo, useState } from 'react';
import { WorldDataStructure } from '../../../models/world';
import { EnvironmentData } from '../../../models/environment';
import { MapGraph } from './MapGraph';

interface Props {
    world: WorldDataStructure;
    env: EnvironmentData;
    onClose: () => void;
}

const normalizedText = (value: string | undefined | null) => (value || '').trim().replace(/\s+/g, '').toLowerCase();

const MapModal: React.FC<Props> = ({ world, env, onClose }) => {
    const maps = Array.isArray(world?.maps) ? world.maps : [];
    const buildings = Array.isArray(world?.buildings) ? world.buildings : [];
    const currentLocationNorm = normalizedText(env?.specificLocation || '');
    const currentLevel = {
        Big: normalizedText(env?.majorLocation || ''),
        Middle: normalizedText(env?.mediumLocation || ''),
        Small: normalizedText(env?.minorLocation || '')
    };

    const defaultMapIndex = useMemo(() => {
        const bySmallName = maps.findIndex((m: any) => normalizedText(m?.name) === currentLevel.Small);
        if (bySmallName >= 0) return bySmallName;

        const byBelong = maps.findIndex((m: any) => (
            normalizedText(m?.affiliation?.majorLocation) === currentLevel.Big &&
            normalizedText(m?.affiliation?.mediumLocation) === currentLevel.Middle &&
            normalizedText(m?.affiliation?.minorLocation) === currentLevel.Small
        ));
        if (byBelong >= 0) return byBelong;

        const byCurrentPlace = maps.findIndex((m: any) => {
            const key = normalizedText(m?.name);
            return !!key && !!currentLocationNorm && (currentLocationNorm.includes(key) || key.includes(currentLocationNorm));
        });
        return byCurrentPlace >= 0 ? byCurrentPlace : 0;
    }, [maps, currentLocationNorm, currentLevel.Big, currentLevel.Middle, currentLevel.Small]);

    const [selectedMapIndex, setSelectedMapIndex] = useState(defaultMapIndex);
    const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
    const [viewMode, setViewMode] = useState<'list' | 'detail' | 'current'>(isMobile ? 'current' : 'detail');
    const [isGraphView, setIsGraphView] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            // On desktop, we don't use tabs, but on mobile we need one active.
            // If switching from desktop to mobile, default to 'current' or 'list'.
            if (mobile && viewMode === 'detail' && selectedMapIndex < 0) {
                setViewMode('current');
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [viewMode, selectedMapIndex]);

    useEffect(() => {
        setSelectedMapIndex(defaultMapIndex);
        if (isMobile && defaultMapIndex >= 0) setViewMode('detail');
    }, [defaultMapIndex, isMobile]);

    const currentMap = selectedMapIndex >= 0 ? maps[selectedMapIndex] || null : null;
    const currentMapInternalBuildingNames = useMemo(() => {
        if (!currentMap || !Array.isArray(currentMap.internalBuildings)) return [];
        return currentMap.internalBuildings.map((b: any) => {
            if (typeof b === 'string') return b.trim();
            return (b?.name || '').trim();
        }).filter(name => name.length > 0);
    }, [currentMap]);

    const currentMapBuildingList = useMemo(() => {
        if (currentMapInternalBuildingNames.length === 0) return [];
        return buildings.filter((building: any) => {
            const name = normalizedText(building?.name);
            return currentMapInternalBuildingNames.some((raw: string) => normalizedText(raw) === name);
        });
    }, [buildings, currentMapInternalBuildingNames]);

    const hitBuildingList = useMemo(() => {
        if (!currentLocationNorm) return [];
        return buildings.filter((building: any) => {
            const nameNorm = normalizedText(building?.name);
            if (!nameNorm) return false;
            return currentLocationNorm === nameNorm
                || currentLocationNorm.includes(nameNorm)
                || nameNorm.includes(currentLocationNorm);
        });
    }, [buildings, currentLocationNorm]);

    return (
        <div className={`fixed inset-0 bg-black/90 backdrop-blur-3xl z-[220] flex items-center justify-center ${isMobile ? 'p-0' : 'p-4 md:p-8'} font-sans`}>
            {/* Modal Container */}
            <div className={`glass-panel border border-white/10 w-full ${isMobile ? 'h-full' : 'max-w-[1320px] max-h-[820px] h-full'} flex flex-col shadow-[0_0_100px_rgba(0,0,0,0.95)] rounded-none overflow-hidden relative`}>
                {/* Decorative Background Elements */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
                    <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-wuxia-gold/10 blur-[120px] rounded-none" />
                    <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-wuxia-cyan/10 blur-[120px] rounded-none" />
                </div>

                {/* Header */}
                <div className={`${isMobile ? 'h-auto py-4 px-4 flex-col gap-4' : 'h-20 px-8'} shrink-0 border-b border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-between z-10`}>
                    <div className={`flex items-center ${isMobile ? 'w-full justify-between' : 'gap-4'}`}>
                        <div className="flex items-center gap-4">
                            {!isMobile && (
                                <div className="w-12 h-12 rounded-none bg-gradient-to-br from-wuxia-gold/20 to-transparent border border-wuxia-gold/30 flex items-center justify-center shadow-lg shadow-wuxia-gold/5">
                                    <svg className="w-6 h-6 text-wuxia-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A2 2 0 013 15.485V5.515a2 2 0 011.553-1.943l7.331-1.332a2 2 0 011.232 0l7.331 1.332A2 2 0 0121 5.515v9.97a2 2 0 01-1.553 1.943L14 20l-5 0z M9 20V9l-6-1.5 M14 20V9l7-1.5 M9 9l5 0" />
                                    </svg>
                                </div>
                            )}
                            <div>
                                <h3 className={`${isMobile ? 'text-lg' : 'text-2xl'} text-wuxia-gold font-serif font-bold tracking-[0.2em] drop-shadow-lg uppercase`}>
                                    Giang Hồ Đồ Giám
                                </h3>
                                {!isMobile && (
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <span className="h-px w-4 bg-wuxia-gold/40"></span>
                                        <p className="text-gray-400 text-[10px] md:text-xs tracking-[0.15em] font-medium opacity-80 uppercase leading-none">
                                            Khám phá Địa giới & Kiến trúc
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setIsGraphView(!isGraphView)}
                                className={`px-2 md:px-4 py-1.5 md:py-2 border rounded-none text-[10px] md:text-xs font-bold uppercase tracking-widest transition-colors ${
                                    isGraphView
                                        ? 'border-wuxia-gold bg-wuxia-gold/20 text-wuxia-gold'
                                        : 'border-white/10 bg-white/5 text-gray-400 hover:text-white'
                                }`}
                            >
                                {isGraphView ? 'Chi Tiết' : 'Phân Nhánh'}
                            </button>
                            {!isMobile ? (
                                <button
                                    onClick={onClose}
                                    className="group relative w-10 h-10 flex items-center justify-center rounded-none bg-ink-black border border-white/10 text-gray-400 hover:text-white overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-wuxia-red/20 opacity-0 group-hover:opacity-100" />
                                    <svg className="w-5 h-5 relative z-10 transform group-hover:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            ) : (
                                <button 
                                    onClick={onClose}
                                    className="p-2 border border-white/10 text-wuxia-gold bg-white/5"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>

                    {isMobile && (
                        <div className="flex w-full gap-1 border border-white/5 bg-black/20 p-1">
                            {(['current', 'list', 'detail'] as const).map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setViewMode(tab)}
                                    className={`flex-1 py-2 text-[9px] font-black uppercase tracking-widest transition-all ${
                                        viewMode === tab 
                                        ? 'bg-wuxia-gold/20 text-wuxia-gold border border-wuxia-gold/30' 
                                        : 'text-gray-500 border border-transparent'
                                    }`}
                                >
                                    {tab === 'current' ? 'Hiện Tại' : tab === 'list' ? 'Địa Hạt' : 'Bản Đồ'}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Main Content Area */}
                {isGraphView ? (
                    <div className="flex-1 w-full p-4 md:p-6 overflow-hidden relative z-10">
                         <MapGraph maps={maps} />
                    </div>
                ) : (
                    <div className={`flex-1 ${isMobile ? 'flex flex-col' : 'grid grid-cols-12 gap-6'} p-4 md:p-6 overflow-hidden relative z-10`}>
                    
                    {/* Maps List Sidebar */}
                    {(!isMobile || viewMode === 'list') && (
                        <div className={`${isMobile ? 'flex-1' : 'col-span-3'} flex flex-col gap-3 overflow-hidden h-full`}>
                            <div className="flex items-center justify-between px-2">
                                <h4 className="text-[11px] font-bold text-wuxia-gold/60 uppercase tracking-[0.2em]">Danh Sách Địa Hạt</h4>
                                <span className="text-[10px] text-gray-500 font-mono">({maps.length})</span>
                            </div>
                            
                            <div className="flex-1 overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-wuxia-gold/20 hover:scrollbar-thumb-wuxia-gold/40">
                                {maps.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-20 opacity-40">
                                        <svg className="w-12 h-12 text-gray-600 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 20l-5.447-2.724A2 2 0 013 15.485V5.515a2 2 0 011.553-1.943l7.331-1.332a2 2 0 011.232 0l7.331 1.332A2 2 0 0121 5.515v9.97a2 2 0 01-1.553 1.943L14 20l-5 0z" />
                                        </svg>
                                        <span className="text-xs tracking-widest uppercase">Trống Không</span>
                                    </div>
                                ) : maps.map((item: any, idx: number) => {
                                    const active = idx === selectedMapIndex;
                                    const mediumLocations = item?.affiliation?.mediumLocation;
                                    const cities = Array.isArray(mediumLocations) ? mediumLocations : (mediumLocations ? [mediumLocations] : []);
                                    
                                    return (
                                        <div key={`map-container-${idx}`} className="space-y-1">
                                            <button
                                                onClick={() => {
                                                    setSelectedMapIndex(idx);
                                                    if (isMobile) setViewMode('detail');
                                                }}
                                                className={`group relative w-full text-left p-3 rounded-none overflow-hidden border ${
                                                    active 
                                                    ? 'border-wuxia-gold/60 bg-gradient-to-r from-wuxia-gold/15 to-transparent' 
                                                    : 'border-white/5 bg-white/5 hover:border-wuxia-gold/40 hover:bg-white/[0.08]'
                                                }`}
                                            >
                                                <div className="relative z-10 flex flex-col gap-1">
                                                    <div className="flex items-center justify-between">
                                                        <span className={`text-xs font-bold uppercase tracking-wider ${active ? 'text-wuxia-gold' : 'text-gray-300 group-hover:text-white'}`}>
                                                            {item?.name || `Địa danh ${idx + 1}`}
                                                        </span>
                                                        <span className="text-[10px] text-gray-500 font-mono">MAP</span>
                                                    </div>
                                                </div>
                                                {active && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-3/4 bg-wuxia-gold shadow-[0_0_10px_rgba(212,175,55,0.5)]" />}
                                                {active && <div className="absolute right-2 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-wuxia-gold shadow-[0_0_8px_rgba(212,175,55,0.8)]" />}
                                            </button>
                                            
                                            {/* Cities List */}
                                            {cities.length > 0 && (
                                                <div className="pl-4 space-y-1 border-l border-white/5 ml-2">
                                                    {cities.map((city: string, cIdx: number) => {
                                                        const isMatch = active && !!city; // Just styling for now
                                                        return (
                                                            <div key={cIdx} className="flex items-center gap-2 py-1.5 px-2 group cursor-default">
                                                                <div className={`w-1 h-1 rounded-full ${active ? 'bg-wuxia-cyan/40' : 'bg-gray-700'}`} />
                                                                <span className={`text-[11px] ${active ? 'text-gray-300' : 'text-gray-500'}`}>
                                                                    {city}
                                                                </span>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Map Details Center */}
                    {(!isMobile || viewMode === 'detail') && (
                        <div className={`${isMobile ? 'flex-1' : 'col-span-5'} flex flex-col gap-4 overflow-hidden h-full`}>
                            <div className="px-2">
                                <h4 className="text-[11px] font-bold text-wuxia-gold/60 uppercase tracking-[0.2em]">Thông Tin Tổng Quan</h4>
                            </div>
                            
                            <div className="flex-1 bg-white/[0.03] border border-white/10 rounded-none overflow-y-auto no-scrollbar p-4 md:p-6 relative">
                                {currentMap ? (
                                    <div className="space-y-6 md:space-y-8">
                                        <div className="relative">
                                            <h2 className="text-xl md:text-2xl font-serif font-bold text-gray-100 tracking-[0.1em]">{currentMap.name || 'Bản đồ không tên'}</h2>
                                            <div className="w-16 md:w-20 h-0.5 bg-gradient-to-r from-wuxia-gold/50 to-transparent mt-2"></div>
                                        </div>

                                        {currentMap.avatar && (
                                            <div className="w-full h-40 md:h-48 rounded-xl overflow-hidden border border-wuxia-gold/20 shadow-lg relative">
                                                <div className="absolute inset-0 bg-gradient-to-t from-ink-black/80 to-transparent z-10"></div>
                                                <img src={currentMap.avatar} alt={currentMap.name || 'Map'} className="w-full h-full object-cover" />
                                            </div>
                                        )}

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                            <div className="space-y-1.5">
                                                <span className="text-[10px] text-wuxia-gold/50 uppercase tracking-widest font-bold">Vị Trí Hiện Tại</span>
                                                <div className="p-3 rounded-lg bg-ink-black/40 border border-wuxia-gold/5 text-gray-300 text-xs font-serif leading-relaxed italic">
                                                    {currentMap.coordinate || 'Bản đồ thất lạc...'}
                                                </div>
                                            </div>
                                            <div className="space-y-1.5">
                                                <span className="text-[10px] text-wuxia-gold/50 uppercase tracking-widest font-bold">Quyền Sở Hữu</span>
                                                <div className="p-3 rounded-lg bg-ink-black/40 border border-wuxia-gold/5 text-gray-300 text-xs font-serif leading-relaxed italic">
                                                    {(currentMap?.affiliation?.majorLocation || 'Vô danh')} / {Array.isArray(currentMap?.affiliation?.mediumLocation) ? currentMap.affiliation.mediumLocation.join(', ') : (currentMap?.affiliation?.mediumLocation || 'Bất động')}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-2.5">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] text-wuxia-gold/50 uppercase tracking-widest font-bold">Mô Tả Cảnh Vật</span>
                                                <div className="flex-1 h-px bg-wuxia-gold/10"></div>
                                            </div>
                                            <p className="text-gray-400 text-xs leading-[1.8] font-serif tracking-wide italic">
                                                {currentMap.description || 'Một nơi hoang vắng, khói sương mờ ảo, không lời nào tả xiết...'}
                                            </p>
                                        </div>

                                        <div className="space-y-4 pt-4 border-t border-wuxia-gold/10">
                                            <div className="space-y-2">
                                                <span className="text-[10px] text-wuxia-gold/40 uppercase tracking-widest font-bold">Nội Kiến Trúc</span>
                                                <div className="flex flex-wrap gap-2 text-[11px]">
                                                    {currentMapInternalBuildingNames.length > 0 ? currentMapInternalBuildingNames.map((name, i) => (
                                                        <span key={i} className="px-3 py-1 rounded-full bg-wuxia-cyan/5 border border-wuxia-cyan/20 text-wuxia-cyan/80">
                                                            {name}
                                                        </span>
                                                    )) : <span className="text-gray-600 italic">Phong trần che lấp...</span>}
                                                </div>
                                            </div>
                                            
                                            <div className="space-y-2">
                                                <span className="text-[10px] text-wuxia-gold/40 uppercase tracking-widest font-bold">Lưu trữ Kiến trúc</span>
                                                <div className="flex flex-wrap gap-2 text-[11px]">
                                                    {currentMapBuildingList.length > 0 ? currentMapBuildingList.map((b, i) => (
                                                        <span key={i} className="px-3 py-1 rounded-full bg-wuxia-gold/5 border border-wuxia-gold/20 text-wuxia-gold/70">
                                                            {b?.name || 'Ẩn tàng'}
                                                        </span>
                                                    )) : <span className="text-gray-600 italic">Vạn tượng quy không...</span>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center opacity-30 gap-4">
                                        <div className="w-16 h-16 rounded-full border border-dashed border-wuxia-gold/40 flex items-center justify-center">
                                            <svg className="w-8 h-8 text-wuxia-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
                                            </svg>
                                        </div>
                                        <span className="text-xs uppercase tracking-[0.3em]">Chọn Địa Điểm</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Current Position Highlights Right */}
                    {(!isMobile || viewMode === 'current') && (
                        <div className={`${isMobile ? 'flex-1' : 'col-span-4'} flex flex-col gap-4 overflow-hidden h-full`}>
                            <div className="px-2 flex items-center justify-between">
                                <h4 className="text-[11px] font-bold text-wuxia-gold/60 uppercase tracking-[0.2em]">Khu Vực Hiện Tại</h4>
                                <div className="px-2 py-0.5 rounded bg-wuxia-red/10 border border-wuxia-red/20 text-wuxia-red text-[9px] font-bold">
                                    LIVE
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-4 h-full overflow-hidden">
                                <div className="p-4 rounded-2xl bg-gradient-to-br from-wuxia-gold/10 to-transparent border border-wuxia-gold/20 shadow-xl shadow-black/40">
                                    <span className="text-[9px] text-wuxia-gold/40 uppercase tracking-widest font-mono">Tọa Độ Hiện Tại</span>
                                    <div className="text-gray-100 text-sm font-medium mt-1 truncate">
                                        {env?.specificLocation || 'Đang xác định...'}
                                    </div>
                                </div>

                                <div className="flex-1 overflow-y-auto no-scrollbar space-y-4 pb-20">
                                    {hitBuildingList.length > 0 ? hitBuildingList.map((building: any, idx: number) => (
                                        <div key={`hit-building-${building?.name || idx}`} className="group relative p-5 rounded-2xl bg-white/[0.04] border border-wuxia-gold/15 hover:bg-white/[0.08] hover:border-wuxia-gold/40">
                                            <div className="flex items-start gap-4">
                                                <div className="w-10 h-10 shrink-0 rounded-xl bg-ink-black border border-wuxia-gold/10 flex items-center justify-center text-wuxia-gold group-hover:scale-110">
                                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                    </svg>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h5 className="text-gray-100 font-bold text-sm tracking-wide truncate">{building?.name || 'Kiến trúc bí ẩn'}</h5>
                                                    <p className="text-gray-400 text-[11px] leading-relaxed mt-2 line-clamp-3 italic opacity-80">
                                                        {building?.description || 'Phong ba bão táp che khuất lối vào, không rõ chốn này rốt cuộc là đâu...'}
                                                    </p>
                                                    <div className="mt-4 pt-3 border-t border-wuxia-gold/5 flex flex-col gap-1.5 opacity-60">
                                                        <span className="text-[9px] text-gray-500 font-mono tracking-tighter block truncate italic">Sở hữu: {(building?.affiliation?.majorLocation || 'Không rõ')}</span>
                                                        <span className="text-[9px] text-gray-500 font-mono tracking-tighter block truncate italic">Pháp trận: {(building?.affiliation?.mediumLocation || 'Không rõ')}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Corner Accent */}
                                            <div className="absolute top-0 right-0 w-8 h-8 opacity-20 pointer-events-none">
                                                <div className="absolute top-2 right-2 w-px h-2 bg-wuxia-gold" />
                                                <div className="absolute top-2 right-2 w-2 h-px bg-wuxia-gold" />
                                            </div>
                                        </div>
                                    )) : (
                                        <div className="h-40 flex flex-col items-center justify-center p-6 rounded-2xl bg-white/[0.02] border border-dashed border-wuxia-gold/10 opacity-40">
                                            <svg className="w-8 h-8 text-gray-600 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                            </svg>
                                            <p className="text-[10px] text-center tracking-widest leading-loose uppercase">
                                                Vị trí này không có<br />kiến trúc đặc thù
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                    </div>
                )}

                {/* Bottom Status Bar */}
                <div className={`${isMobile ? 'h-auto py-2' : 'h-8'} shrink-0 bg-ink-black/90 border-t border-wuxia-gold/10 px-6 flex items-center justify-between z-10`}>
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-wuxia-cyan" />
                        <span className="text-[9px] text-wuxia-cyan/60 font-mono tracking-widest uppercase truncate">{isMobile ? 'Linh Khí' : 'Thiên địa linh khí quy tụ'}</span>
                    </div>
                    <div className="text-[9px] text-gray-600 font-mono tracking-widest uppercase">
                        {isMobile ? 'OK' : 'Trạng thái: Ổn định'}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MapModal;


