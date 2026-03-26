import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapGraph } from './MapGraph';
import { MapService, MapNode, TransientNode } from '../../../services/mapService';

interface MapModalProps {
  onClose: () => void;
  onUpdateEnv?: (env: any) => void;
  world?: any;
  env?: any;
  apiConfig?: any;
  onUpdateWorld?: any;
  workerUrl?: string;
}

export const MapModal: React.FC<MapModalProps> = ({ onClose, onUpdateEnv, env, world }) => {
  const [activeTab, setActiveTab] = useState<'fixed' | 'dynamic'>('fixed');
  const [focalNodeName, setFocalNodeName] = useState<string | null>(null);

  const currentTimeMinutes = env?.gameDays ? (env.gameDays * 24 * 60 + env?.Hour * 60 + env?.Minute) : 0;

  // Build grouped fixed locations
  const groupedFixedNodes = useMemo(() => {
    const all = MapService.getAllNodes();
    const groups: Record<string, MapNode[]> = {};
    const visitedSet = new Set(world?.visitedNodeIds || []);
    
    all.forEach(n => {
      // Show important landmarks + visited nodes to keep the list practical
      if (visitedSet.has(n.id) || n.type === 'Tông môn' || n.type === 'Thành trì' || n.type === 'Bí cảnh') {
        const region = n.regionName || 'Vô Định Khu';
        if (!groups[region]) groups[region] = [];
        groups[region].push(n);
      }
    });
    return groups;
  }, [world?.visitedNodeIds]);

  // Build dynamic nodes
  const dynamicNodesList = useMemo(() => {
    const list = world?.dynamicNodes || [];
    return list.filter((node: TransientNode) => {
        const age = currentTimeMinutes - node.createdAtMinutes;
        return age <= node.expiresInMinutes;
    });
  }, [world?.dynamicNodes, currentTimeMinutes]);

  const currentLocation = env?.specificLocation || env?.minorLocation || env?.mediumLocation || '';
  return (
    <AnimatePresence>
       <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-0 md:p-8"
       >
          {/* Decorative Border Layer */}
          <div className="absolute inset-4 border border-wuxia-gold/10 rounded-3xl pointer-events-none opacity-40"></div>
          
          {/* Close Button UI */}
          <div className="absolute top-8 right-8 z-[1001]">
            <button 
              onClick={onClose}
              className="group relative flex items-center gap-4 px-6 py-2 bg-black/40 border border-wuxia-gold/30 rounded-full hover:border-wuxia-gold transition-all duration-300"
            >
              <div className="text-[10px] text-wuxia-gold/60 tracking-[0.4em] uppercase group-hover:text-wuxia-gold transition-colors">Close Map</div>
              <div className="w-8 h-px bg-wuxia-gold/30 group-hover:w-12 transition-all"></div>
              <div className="text-wuxia-gold font-bold text-xl leading-none">×</div>
            </button>
          </div>
 
          {/* Main Map Content Area */}
          <div className="w-full h-full max-w-7xl max-h-[90vh] relative bg-[#0a0a0a] rounded-none md:rounded-2xl border border-white/5 shadow-2xl overflow-hidden flex flex-row">
              {/* Left Sidebar */}
              <div className="w-72 border-r border-white/5 bg-black/60 backdrop-blur-md flex flex-col relative z-30 flex-shrink-0">
                  <div className="p-4 border-b border-white/5">
                      <h2 className="text-wuxia-gold font-bold tracking-widest uppercase text-sm mb-4">Danh sách Địa danh</h2>
                      <div className="flex gap-2">
                          <button 
                            onClick={() => setActiveTab('fixed')}
                            className={`flex-1 py-2 text-[10px] tracking-widest uppercase transition-all border ${activeTab === 'fixed' ? 'border-wuxia-gold bg-wuxia-gold/10 text-wuxia-gold' : 'border-white/10 text-white/50 hover:bg-white/5'}`}
                          >
                              Cố Định
                          </button>
                          <button 
                            onClick={() => setActiveTab('dynamic')}
                            className={`flex-1 py-2 text-[10px] tracking-widest uppercase transition-all border ${activeTab === 'dynamic' ? 'border-wuxia-gold bg-wuxia-gold/10 text-wuxia-gold' : 'border-white/10 text-white/50 hover:bg-white/5'}`}
                          >
                              Tạm Thời
                          </button>
                      </div>
                  </div>
                  <div className="flex-1 overflow-y-auto wuxia-scrollbar p-2">
                      {activeTab === 'fixed' && (
                          <div className="flex flex-col gap-4">
                              {Object.entries(groupedFixedNodes).map(([region, nodes]) => (
                                  <div key={region} className="px-2">
                                      <div className="text-[9px] text-white/30 tracking-[0.2em] uppercase mb-2 flex items-center gap-2">
                                          <div className="h-px flex-1 bg-white/5"></div>
                                          {region}
                                          <div className="h-px flex-1 bg-white/5"></div>
                                      </div>
                                      <div className="flex flex-col gap-1">
                                          {nodes.map(n => (
                                              <button
                                                key={n.id}
                                                onClick={() => setFocalNodeName(n.name)}
                                                className={`text-left px-3 py-2 rounded text-xs transition-colors group flex items-center justify-between ${focalNodeName === n.name || currentLocation === n.name ? 'bg-wuxia-gold/20 text-wuxia-gold' : 'hover:bg-white/5 text-white/70'}`}
                                              >
                                                <span>{n.name}</span>
                                                <span className="text-[9px] opacity-40 uppercase tracking-wider">{n.type}</span>
                                              </button>
                                          ))}
                                      </div>
                                  </div>
                              ))}
                          </div>
                      )}
                      {activeTab === 'dynamic' && (
                          <div className="px-2 flex flex-col gap-2 pt-2">
                              {dynamicNodesList.length === 0 ? (
                                  <div className="text-white/30 text-xs italic text-center py-8">Chưa ghi nhận tọa độ dị biến nào.</div>
                              ) : (
                                  dynamicNodesList.map((n: TransientNode) => {
                                      const age = currentTimeMinutes - n.createdAtMinutes;
                                      const timeLeft = n.expiresInMinutes - age;
                                      const hoursLeft = Math.floor(timeLeft / 60);

                                      return (
                                          <button
                                            key={n.id}
                                            onClick={() => setFocalNodeName(n.name)}
                                            className="text-left p-3 rounded bg-white/5 border border-white/5 hover:border-wuxia-gold/50 transition-all group relative overflow-hidden"
                                          >
                                              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-white/10 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                              <div className="text-wuxia-gold font-bold text-sm mb-1">{n.name}</div>
                                              <div className="flex justify-between items-center">
                                                  <span className="text-[10px] text-white/50 uppercase tracking-widest">{n.type}</span>
                                                  <span className="text-[9px] text-rose-400/80 italic">{hoursLeft}h tồn tại</span>
                                              </div>
                                          </button>
                                      );
                                  })
                              )}
                          </div>
                      )}
                  </div>
              </div>

              {/* Right Side: Map Graph + Legend */}
              <div className="flex-1 flex flex-col relative bg-[#0a0a0a] min-w-0">
                  {/* Map Graph */}
                  <div className="flex-1 relative">
                      <MapGraph 
                        currentLocation={currentLocation}
                        focalNodeName={focalNodeName}
                        currentX={env?.x ?? 500}
                        currentY={env?.y ?? 500}
                        visitedNodeIds={world?.visitedNodeIds}
                        dynamicNodes={world?.dynamicNodes}
                        currentTimeMinutes={env?.gameDays ? (env.gameDays * 24 * 60 + env?.Hour * 60 + env?.Minute) : 0}
                        onResetFocus={() => setFocalNodeName(null)}
                      />
                  </div>

                  {/* Bottom Legend/Instructions */}
                  <div className="h-16 bg-black/80 border-t border-white/5 flex items-center justify-between px-8 z-20 flex-shrink-0">
                      <div className="flex gap-8 items-center">
                          <div className="flex items-center gap-2">
                              {/* Cập nhật Icon màu sắc để diễn giải Legend nếu cần */}
                              <svg className="w-3 h-3" viewBox="0 0 16 16"><path d="M1,6 L8,14 L15,6 L15,-4 L1,-4 Z" fill="none" stroke="#c5a059" strokeWidth="1.5"/></svg>
                              <span className="text-[10px] text-wuxia-gold/60 uppercase tracking-widest font-bold">Kinh Thành / Sect</span>
                          </div>
                          <div className="flex items-center gap-2">
                              <circle cx="8" cy="8" r="4" fill="transparent" stroke="#a0aec0" strokeWidth="1" strokeDasharray="2 2" className="w-4 h-4" />
                              <span className="text-[10px] text-wuxia-gold/60 uppercase tracking-widest font-bold">Vùng Đất / Tạm Thời</span>
                          </div>
                      </div>
                      <div className="text-[9px] text-white/30 uppercase tracking-[0.3em] font-sans text-right">
                          Select a node to travel or view details
                      </div>
                  </div>
              </div>
          </div>
       </motion.div>
    </AnimatePresence>
  );
};

export default MapModal;
