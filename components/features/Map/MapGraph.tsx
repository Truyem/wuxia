import React, { useMemo, useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { MapService, MapNode, TransientNode } from '../../../services/mapService';

interface MapGraphProps {
  currentLocation?: string;
  focalNodeName?: string | null;
  currentX: number;
  currentY: number;
  visitedNodeIds?: string[];
  dynamicNodes?: TransientNode[];
  currentTimeMinutes?: number;
  onNodeClick?: (node: MapNode) => void;
  onResetFocus?: () => void;
}

const WORLD_SIZE = 3000;
const SCALE = 3;
const MAP_SIZE = WORLD_SIZE * SCALE;

export const MapGraph: React.FC<MapGraphProps> = ({ 
  currentLocation,
  focalNodeName,
  currentX, 
  currentY, 
  visitedNodeIds,
  dynamicNodes,
  currentTimeMinutes,
  onNodeClick: externalOnNodeClick,
  onResetFocus
}) => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<MapNode | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [zoom, setZoom] = useState(1);
  const controls = useAnimation();

  // Synchronize Map Focal Point with Player's actual position or Sidebar Selection
  const focalPoint = useMemo(() => {
    // If user clicked a node in sidebar
    if (focalNodeName) {
        const targetNode = MapService.findNodeByName(focalNodeName) || dynamicNodes?.find(n => n.name === focalNodeName);
        if (targetNode) return { x: targetNode.x, y: targetNode.y };
    }
    // Else fall back to current location
    if (currentLocation) {
        const node = MapService.findNodeByName(currentLocation) || dynamicNodes?.find(n => n.name === currentLocation);
        if (node) return { x: node.x, y: node.y };
    }
    
    if (!isNaN(currentX) && !isNaN(currentY)) {
        const mult = currentX < 1100 ? 3 : 1; 
        return { x: currentX * mult, y: currentY * mult };
    }
    return { x: 1500, y: 1500 };
  }, [currentLocation, focalNodeName, currentX, currentY, dynamicNodes]);

  const targetX = - (focalPoint.x * SCALE);
  const targetY = - (focalPoint.y * SCALE);

  useEffect(() => {
    controls.start({
        x: targetX,
        y: targetY,
        transition: { type: "spring", damping: 30, stiffness: 200 }
    });

    // Auto-select the node when focalNodeName changes (from sidebar click)
    if (focalNodeName) {
      const targetNode = MapService.findNodeByName(focalNodeName) || dynamicNodes?.find(n => n.name === focalNodeName);
      if (targetNode) {
        setSelectedNode({
          ...targetNode,
          x: targetNode.x * SCALE,
          y: targetNode.y * SCALE,
          isVisited: true,
          isDynamic: !!dynamicNodes?.find(n => n.name === focalNodeName)
        } as any);
        
        // Slightly zoom in when focusing
        setZoom(1.5);
      }
    }
  }, [focalPoint, controls, targetX, targetY, focalNodeName, dynamicNodes]);

  const handleResetPosition = () => {
    setZoom(1);
    if (onResetFocus) {
        onResetFocus();
    } else {
        controls.start({
            x: - ((currentX < 1100 ? currentX * 3 : currentX) * SCALE),
            y: - ((currentY < 1100 ? currentY * 3 : currentY) * SCALE),
            transition: { type: "spring", damping: 30, stiffness: 200 }
        });
    }
  };

  const handleZoomIn = () => setZoom(z => Math.min(z + 0.5, 3));
  const handleZoomOut = () => setZoom(z => Math.max(z - 0.5, 0.3));

  // Revealed Nodes (Currently revealed all for exploration)
  const allNodes = useMemo(() => {
    return MapService.getNodesByProximity(1500, 1500, 5000);
  }, []);

  const { locations, visibleConnections } = useMemo(() => {
    const filteredNodes = allNodes.map(n => ({
      ...n,
      x: n.x * SCALE,
      y: n.y * SCALE,
      isVisited: true,
      isDynamic: false
    }));

    const validDynamicNodes = (dynamicNodes || []).filter(node => {
        const age = (currentTimeMinutes || 0) - node.createdAtMinutes;
        return age <= node.expiresInMinutes;
    }).map(n => ({
        ...n,
        x: n.x * SCALE,
        y: n.y * SCALE,
        isVisited: true,
        isDynamic: true
    }));

    const mergedNodes = [...filteredNodes, ...validDynamicNodes];
    const paths: { from: MapNode, to: MapNode, id: string, isDynamic?: boolean }[] = [];
    const processed = new Set<string>();

    mergedNodes.forEach(loc => {
      if (loc.connections) {
        loc.connections.forEach(targetId => {
          const target = mergedNodes.find(n => n.id === targetId);
          if (target && !processed.has(`${target.id}-${loc.id}`)) {
            processed.add(`${loc.id}-${target.id}`);
            paths.push({ 
              from: { ...loc } as any, 
              to: { ...target } as any, 
              id: `${loc.id}-${target.id}`,
              isDynamic: (loc as any).isDynamic || (target as any).isDynamic
            });
          }
        });
      }
    });

    return { locations: mergedNodes, visibleConnections: paths };
  }, [allNodes, dynamicNodes, currentTimeMinutes]);

  const handleNodeClick = (loc: MapNode) => {
    setSelectedNode(loc);
    if (externalOnNodeClick) externalOnNodeClick(loc);
  };

  const renderConnections = useMemo(() => {
    return visibleConnections.map(conn => (
      <motion.path
        key={conn.id}
        d={`M ${conn.from.x} ${conn.from.y} L ${conn.to.x} ${conn.to.y}`}
        stroke={conn.isDynamic ? "url(#gold-gradient)" : "rgba(197, 160, 89, 0.2)"}
        strokeWidth="1.5"
        strokeDasharray={conn.isDynamic ? "4 4" : "none"}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
      />
    ));
  }, [visibleConnections]);

  const getIconForType = (type: string, isDynamic: boolean, isCurrent: boolean) => {
    const t = (type || '').toLowerCase();
    const color = isCurrent ? '#fff' : (isDynamic ? '#a0aec0' : '#c5a059');
    
    // Tông môn (Sect) - Đền/Tháp
    if (t.includes('tông môn') || t.includes('môn phái')) return (
      <path d="M-8,-2 L0,-12 L8,-2 L6,8 L-6,8 Z" fill="none" stroke={color} strokeWidth="1.5" />
    );
    // Thành trì (City) - Tường thành
    if (t.includes('thành trì') || t.includes('thành thị') || t.includes('trấn')) return (
      <path d="M-10,6 L-10,-4 L-6,-4 L-6,0 L-2,0 L-2,-6 L2,-6 L2,0 L6,0 L6,-4 L10,-4 L10,6 Z" fill="none" stroke={color} strokeWidth="1.5" />
    );
    // Bí cảnh (Realm/Dungeon) - Vòng xoáy
    if (t.includes('bí cảnh') || t.includes('động phủ')) return (
      <g stroke={color} fill="none" strokeWidth="1.5">
          <circle cx="0" cy="0" r="7" strokeDasharray="3 2" />
          <circle cx="0" cy="0" r="3" />
      </g>
    );
    // Thôn trang (Village) - Ngôi nhà nhỏ
    if (t.includes('thôn trang') || t.includes('bản')) return (
      <path d="M-6,6 L-6,0 L0,-6 L6,0 L6,6 Z M-2,6 L-2,3 L2,3 L2,6" fill="none" stroke={color} strokeWidth="1.5" />
    );
    // Cấm kỵ / Di tích (Ruins) - Đầu lâu / Ngôi sao gãy
    if (t.includes('cấm kỵ') || t.includes('di tích')) return (
      <path d="M-5,-5 L5,5 M5,-5 L-5,5" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
    );
    
    // Default Map Point (Địa điểm thường)
    return <circle cx="0" cy="0" r={isDynamic ? "4" : "5"} fill={isDynamic ? "transparent" : "#1a1a1a"} stroke={color} strokeWidth={isDynamic ? "1" : "1.5"} strokeDasharray={isDynamic ? "2 2" : "none"} />;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full bg-[#0a0a0a] overflow-hidden flex items-center justify-center font-wuxia cursor-grab active:cursor-grabbing"
    >
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/parchment.png')]"></div>
      
      <div className="absolute top-6 md:top-10 left-6 md:left-10 z-20 pointer-events-none">
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="border-l-2 border-wuxia-gold/30 pl-3 md:pl-5"
        >
          <h1 className="text-xl md:text-3xl text-white/90 font-black tracking-widest uppercase mb-1" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>Thần Cơ Đồ</h1>
          <p className="text-wuxia-gold/50 text-[8px] md:text-[10px] tracking-[0.2em] md:tracking-[0.4em] font-sans">INK-WASH STRATEGIC MAP</p>
        </motion.div>
      </div>

      <motion.div
        className="w-full h-full relative"
        animate={{ scale: zoom }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
        style={{ transformOrigin: 'center center' }}
      >
        <motion.div
          drag
          dragMomentum={false}
          className="relative z-10"
          initial={{ x: 0, y: 0 }}
          animate={controls}
          style={{ 
            width: MAP_SIZE, 
            height: MAP_SIZE, 
            position: 'absolute',
            left: '50%',
            top: '50%'
          }}
        >
        <svg
          viewBox={`0 0 ${MAP_SIZE} ${MAP_SIZE}`}
          width={MAP_SIZE}
          height={MAP_SIZE}
          className="overflow-visible"
        >
          <defs>
            <filter id="glow-gold">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c5a059" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#8b7355" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          <g>{renderConnections}</g>

          {locations.map((loc) => {
            const isHovered = hoveredNode === loc.id;
            const isCurrent = currentLocation === loc.name;
            
            return (
              <motion.g
                key={loc.id}
                onMouseEnter={() => setHoveredNode(loc.id)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => handleNodeClick(loc)}
                className="cursor-pointer"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <g 
                  transform={`translate(${loc.x}, ${loc.y})`}
                  className="transition-all duration-300"
                  filter={isCurrent ? "url(#glow-gold)" : (isHovered ? "drop-shadow(0px 0px 4px rgba(197,160,89,0.5))" : "")}
                >
                  {getIconForType(loc.type, (loc as any).isDynamic, isCurrent)}
                </g>

                {isCurrent && (
                  <motion.circle
                    cx={loc.x}
                    cy={loc.y}
                    r={8}
                    stroke="#c5a059"
                    strokeWidth={2}
                    fill="none"
                    initial={{ scale: 1, opacity: 0.8 }}
                    animate={{ scale: 2.5, opacity: 0 }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}

                {(isHovered || isCurrent || loc.type === 'Tông môn' || loc.type === 'Thành trì' || (loc as any).isDynamic) && (
                  <motion.text
                    x={loc.x}
                    y={loc.y - 18}
                    textAnchor="middle"
                    fill={isCurrent ? "#fff" : ((loc as any).isDynamic ? "#e2e8f0" : "#c5a059")}
                    className={`text-[12px] pointer-events-none select-none ${isCurrent ? 'font-black' : 'font-bold'}`}
                    style={{ textShadow: '0 2px 4px rgba(0,0,0,0.9)' }}
                  >
                    {loc.name}
                  </motion.text>
                )}
              </motion.g>
            );
          })}
        </svg>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 z-50 w-[90%] md:w-80 bg-black/95 border border-wuxia-gold/40 p-4 md:p-6 backdrop-blur-md"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-wuxia-gold text-xl font-bold flex items-center gap-2">
                    {selectedNode.name}
                    {(selectedNode as any).isDynamic && <span className="text-[9px] bg-white/10 text-white/50 px-2 py-0.5 rounded-full border border-white/20 font-normal">Tạm thời</span>}
                </h3>
                <p className="text-white/40 text-[10px] uppercase tracking-widest">{selectedNode.type} • {selectedNode.faction}</p>
              </div>
              <button 
                onClick={() => setSelectedNode(null)}
                className="text-white/40 hover:text-white transition-colors"
              >
                ×
              </button>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-6 font-sans">
              {selectedNode.description}
            </p>
            {/* Travel button Removed per USER request */}
            <div className="text-[10px] text-wuxia-gold/50 uppercase tracking-[0.2em] italic">
              Strategic View • Coordinates tracked automatically
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute right-4 md:right-8 bottom-4 md:bottom-8 z-50 flex flex-col gap-3 md:gap-4 scale-90 md:scale-100">
        <button
          onClick={handleResetPosition}
          className="bg-black/80 border border-wuxia-gold/30 hover:border-wuxia-gold text-wuxia-gold w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)] group"
          title="Vị trí hiện tại"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6 opacity-80 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v2m0 12v2m8-8h-2M6 12H4" />
          </svg>
        </button>

        <div className="bg-black/80 border border-wuxia-gold/30 rounded-full flex flex-col items-center shadow-[0_0_15px_rgba(0,0,0,0.5)] overflow-hidden">
          <button
            onClick={handleZoomIn}
            className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-wuxia-gold hover:bg-wuxia-gold/10 transition-colors"
            title="Phóng to"
          >
            <span className="text-xl md:text-2xl leading-none font-light">+</span>
          </button>
          <div className="w-6 md:w-8 h-px bg-wuxia-gold/20"></div>
          <button
            onClick={handleZoomOut}
            className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-wuxia-gold hover:bg-wuxia-gold/10 transition-colors"
            title="Thu nhỏ"
          >
            <span className="text-xl md:text-2xl leading-none font-light">-</span>
          </button>
        </div>
      </div>
    </div>
  );
};
