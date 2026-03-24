import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  Node,
  Edge,
  MarkerType,
  Position,
  useNodesState,
  useEdgesState,
  Handle,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { MapStructure } from '../../../models/world';
import dagre from 'dagre';

/* ═══════════════════════════════════════════════════════════════════════
   Glassmorphism Tooltip
   ═══════════════════════════════════════════════════════════════════════ */

const Tooltip = ({ data, nodeRef }: { data: any; nodeRef: HTMLDivElement | null }) => {
  if (!data || !nodeRef) return null;
  
  return (
    <div
      className="absolute z-[9999] pointer-events-none"
      style={{
        left: '50%',
        bottom: '100%',
        transform: 'translateX(-50%)',
        marginBottom: '10px',
      }}
    >
      <div
        className="min-w-[220px] max-w-[320px] rounded-lg p-4 shadow-2xl border border-white/10"
        style={{
          background: 'rgba(15, 18, 25, 0.85)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}
      >
        <h4 className="text-amber-300 font-bold text-sm mb-2 leading-snug">{data.label}</h4>
        
        {data.type && (
          <div className="inline-block px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider mb-2" 
               style={{ background: data.typeColor || 'rgba(255,255,255,0.1)', color: data.textColor || 'white' }}>
            {data.type}
          </div>
        )}

        {data.description && (
          <p className="text-stone-300 text-xs leading-relaxed mb-2 italic">"{data.description}"</p>
        )}
        
        <div className="space-y-1 text-[10px]">
          {data.coordinates && (
            <p className="text-stone-400"><span className="text-stone-500">Tọa độ:</span> {data.coordinates}</p>
          )}
          {data.affiliation && (
            <p className="text-stone-400"><span className="text-stone-500">Thuộc về:</span> {data.affiliation}</p>
          )}
        </div>

        {data.connections && data.connections.length > 0 && (
          <div className="mt-3 pt-2 border-t border-white/10">
            <p className="text-stone-400 text-[10px] font-semibold mb-1 uppercase tracking-wider">Kết nối lân cận:</p>
            <div className="flex flex-wrap gap-1">
              {data.connections.map((c: string, i: number) => (
                <span key={i} className="bg-white/5 px-1.5 py-0.5 rounded text-stone-400 text-[9px]">{c}</span>
              ))}
            </div>
          </div>
        )}
        {data.buildingCount > 0 && (
          <div className="mt-2 text-amber-500/80 text-[10px] font-medium">
            ✨ Chứa {data.buildingCount} kiến trúc quan trọng
          </div>
        )}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════
   Glassmorphism Custom Nodes
   ═══════════════════════════════════════════════════════════════════════ */

const GlassNode = ({
  data,
  bgColor,
  textColor,
  borderColor,
  glowColor,
  hasSource = true,
  hasTarget = true,
}: {
  data: any;
  bgColor: string;
  textColor: string;
  borderColor: string;
  glowColor: string;
  hasSource?: boolean;
  hasTarget?: boolean;
}) => {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hasTarget && (
        <Handle type="target" position={Position.Top} className="w-1.5 h-1.5 !border-0" style={{ background: borderColor }} />
      )}
      <div
        className="rounded-lg px-4 py-2.5 text-center cursor-pointer transition-all duration-300 min-w-[100px]"
        style={{
          background: bgColor,
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: `1px solid ${borderColor}`,
          boxShadow: hovered
            ? `0 0 20px ${glowColor}, 0 4px 20px rgba(0,0,0,0.4)`
            : `0 2px 10px rgba(0,0,0,0.3)`,
          transform: hovered ? 'scale(1.05)' : 'scale(1)',
        }}
      >
        <span
          className="font-semibold text-sm leading-tight block"
          style={{ color: textColor }}
        >
          {data.label}
        </span>
      </div>
      {hasSource && (
        <Handle type="source" position={Position.Bottom} className="w-1.5 h-1.5 !border-0" style={{ background: borderColor }} />
      )}
      {hovered && <Tooltip data={data} nodeRef={ref.current} />}
    </div>
  );
};

// Root Node - Golden glass
const RootNode = ({ data }: { data: any }) => (
  <GlassNode
    data={data}
    bgColor="rgba(120, 80, 10, 0.6)"
    textColor="#fde68a"
    borderColor="rgba(251, 191, 36, 0.7)"
    glowColor="rgba(251, 191, 36, 0.35)"
    hasTarget={false}
  />
);

// Map / Major Node - Amber/orange glass
const MajorNode = ({ data }: { data: any }) => (
  <GlassNode
    data={data}
    bgColor="rgba(180, 83, 9, 0.45)"
    textColor="#fed7aa"
    borderColor="rgba(251, 146, 60, 0.6)"
    glowColor="rgba(251, 146, 60, 0.3)"
  />
);

// City / Medium Node - Green glass
const MediumNode = ({ data }: { data: any }) => (
  <GlassNode
    data={data}
    bgColor="rgba(22, 101, 52, 0.45)"
    textColor="#bbf7d0"
    borderColor="rgba(74, 222, 128, 0.55)"
    glowColor="rgba(74, 222, 128, 0.3)"
  />
);

// Building / Minor Node - Blue/slate glass
const MinorNode = ({ data }: { data: any }) => (
  <GlassNode
    data={data}
    bgColor="rgba(30, 58, 138, 0.4)"
    textColor="#bfdbfe"
    borderColor="rgba(96, 165, 250, 0.5)"
    glowColor="rgba(96, 165, 250, 0.25)"
  />
);

const nodeTypes = {
  rootNode: RootNode,
  majorNode: MajorNode,
  mediumNode: MediumNode,
  minorNode: MinorNode,
};

/* ═══════════════════════════════════════════════════════════════════════
   Dagre Layout
   ═══════════════════════════════════════════════════════════════════════ */

const getLayoutedElements = (nodes: Node[], edges: Edge[], direction = 'TB') => {
  const g = new dagre.graphlib.Graph();
  g.setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: direction, nodesep: 60, ranksep: 100, marginx: 30, marginy: 30 });

  nodes.forEach((node) => {
    const label = String(node.data?.label || '');
    const charW = Math.max(120, Math.min(label.length * 12 + 40, 280));
    let h = 50;
    if (node.type === 'rootNode') h = 55;
    else if (node.type === 'majorNode') h = 50;
    else if (node.type === 'mediumNode') h = 50;
    else if (node.type === 'minorNode') h = 45;
    g.setNode(node.id, { width: charW, height: h });
  });

  edges.forEach((edge) => g.setEdge(edge.source, edge.target));
  dagre.layout(g);

  const laid = nodes.map((node) => {
    const pos = g.node(node.id);
    return {
      ...node,
      targetPosition: 'top' as Position,
      sourcePosition: 'bottom' as Position,
      position: { x: pos.x - pos.width / 2, y: pos.y - pos.height / 2 },
    };
  });

  return { nodes: laid, edges };
};

/* ═══════════════════════════════════════════════════════════════════════
   Main Component
   ═══════════════════════════════════════════════════════════════════════ */

interface MapGraphProps {
  maps: MapStructure[];
}

export const MapGraph: React.FC<MapGraphProps> = ({ maps }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    const n: Node[] = [];
    const e: Edge[] = [];

    // ── Root ──
    n.push({
      id: 'root',
      type: 'rootNode',
      position: { x: 0, y: 0 },
      data: { 
        label: 'Bản Đồ Giang Hồ',
        type: 'Thế giới',
        typeColor: 'rgba(217, 119, 6, 0.3)',
        textColor: '#fcd34d'
      },
    });

    maps.forEach((map, mi) => {
      const mapId = `map-${mi}`;

      // ── Map node ──
      n.push({
        id: mapId,
        type: 'majorNode',
        position: { x: 0, y: 0 },
        data: {
          label: map.name,
          description: map.description,
          coordinates: map.coordinate || (map as any).coordinates,
          type: 'Đại địa',
          typeColor: 'rgba(234, 179, 8, 0.2)',
          textColor: '#fde047',
          affiliation: map.affiliation?.majorLocation
        },
      });

      e.push({
        id: `root-${mapId}`,
        source: 'root',
        target: mapId,
        type: 'smoothstep',
        animated: true,
        style: { stroke: '#f59e0b', strokeWidth: 2, opacity: 0.7 },
      });

      // ── Cities ──
      // 1. Try to get cities from the nested array (new structure)
      // 2. Fallback to affiliation.mediumLocation (old structure)
      const citiesRaw = (map as any).cities;
      const mediumLocRaw = map.affiliation?.mediumLocation;
      
      let cities: string[] = [];
      if (Array.isArray(citiesRaw) && citiesRaw.length > 0) {
        cities = citiesRaw.map((c: any) => typeof c === 'string' ? c : (c.name || ''));
      } else if (Array.isArray(mediumLocRaw)) {
        cities = mediumLocRaw;
      } else if (mediumLocRaw) {
        cities = [mediumLocRaw];
      }
      
      const allBuildings: any[] = Array.isArray(map.internalBuildings) ? map.internalBuildings : [];
      const used = new Set<number>();

      cities.forEach((city, ci) => {
        const cityName = typeof city === 'string' ? city.trim() : String(city);
        if (!cityName) return;
        const cityId = `city-${mi}-${ci}`;

        // match buildings
        const matched: { b: any; idx: number }[] = [];
        allBuildings.forEach((b, bi) => {
          if (used.has(bi)) return;
          
          const medLoc = b?.affiliation?.mediumLocation;
          const minLoc = b?.affiliation?.minorLocation;
          const bName = typeof b === 'string' ? b : (b?.name || '');
          
          let hit = false;
          // Check mediumLocation
          if (Array.isArray(medLoc)) hit = medLoc.some((l: any) => typeof l === 'string' && l.trim() === cityName);
          else if (typeof medLoc === 'string') hit = medLoc.trim() === cityName;
          
          // Check minorLocation (where stateTransforms often puts city names for buildings)
          if (!hit) {
            if (Array.isArray(minLoc)) hit = minLoc.some((l: any) => typeof l === 'string' && l.trim() === cityName);
            else if (typeof minLoc === 'string') hit = minLoc.trim() === cityName;
          }
          
          // Check name prefix (e.g. "Long Thành: Nhà Thuốc")
          if (!hit && bName.startsWith(`${cityName}:`)) {
            hit = true;
          }

          if (hit) { 
            used.add(bi); 
            matched.push({ b, idx: bi }); 
          }
        });

        const connectionNames = matched.map(({ b }) => {
          let bName = typeof b === 'string' ? b : (b?.name || '?');
          // Clean up prefix if it exists
          if (bName.startsWith(`${cityName}:`)) {
            bName = bName.substring(cityName.length + 1).trim();
          }
          return bName;
        });

        n.push({
          id: cityId,
          type: 'mediumNode',
          position: { x: 0, y: 0 },
          data: {
            label: cityName,
            buildingCount: matched.length,
            connections: connectionNames,
            type: 'Thành thị',
            typeColor: 'rgba(34, 197, 94, 0.2)',
            textColor: '#86efac',
            affiliation: map.name
          },
        });

        e.push({
          id: `${mapId}-${cityId}`,
          source: mapId,
          target: cityId,
          type: 'smoothstep',
          style: { stroke: '#f97316', strokeWidth: 1.5, opacity: 0.6 },
        });

        // ── Buildings under this city ──
        matched.forEach(({ b }, bi) => {
          const bId = `b-${mi}-${ci}-${bi}`;
          let bName = typeof b === 'string' ? b : (b?.name || '?');
          // Clean up prefix
          if (bName.startsWith(`${cityName}:`)) {
            bName = bName.substring(cityName.length + 1).trim();
          }
          const bDesc = typeof b === 'object' ? (b?.description || '') : '';

          n.push({
            id: bId,
            type: 'minorNode',
            position: { x: 0, y: 0 },
            data: { 
              label: bName, 
              description: bDesc,
              type: 'Kiến trúc',
              typeColor: 'rgba(59, 130, 246, 0.2)',
              textColor: '#93c5fd',
              affiliation: cityName
            },
          });

          e.push({
            id: `${cityId}-${bId}`,
            source: cityId,
            target: bId,
            type: 'smoothstep',
            style: { stroke: '#60a5fa', strokeWidth: 1, opacity: 0.5 },
          });
        });
      });

      // ── Orphan buildings → attach to map ──
      allBuildings.forEach((b, bi) => {
        if (used.has(bi)) return;
        const bId = `bo-${mi}-${bi}`;
        const bName = typeof b === 'string' ? b : (b?.name || '?');
        const bDesc = typeof b === 'object' ? (b?.description || '') : '';

        n.push({
          id: bId,
          type: 'minorNode',
          position: { x: 0, y: 0 },
          data: { 
            label: bName, 
            description: bDesc,
            type: 'Kiến trúc',
            typeColor: 'rgba(59, 130, 246, 0.2)',
            textColor: '#93c5fd',
            affiliation: map.name
          },
        });

        e.push({
          id: `${mapId}-${bId}`,
          source: mapId,
          target: bId,
          type: 'smoothstep',
          style: { stroke: '#60a5fa', strokeWidth: 1, opacity: 0.35, strokeDasharray: '5 3' },
        });
      });
    });

    const { nodes: laid, edges: laidE } = getLayoutedElements(n, e);
    setNodes(laid);
    setEdges(laidE);
  }, [maps]);

  // Stats
  const totalCities = maps.reduce((acc, m) => acc + (m.cities?.length || 0), 0);
  const totalBuildings = maps.reduce((acc, m) => acc + (m.internalBuildings?.length || 0), 0);

  return (
    <div className="w-full h-full rounded-b-xl overflow-hidden relative" style={{ minHeight: '600px', background: 'rgba(10, 12, 18, 0.95)' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.35 }}
        minZoom={0.03}
        maxZoom={2.5}
        attributionPosition="bottom-right"
      >
        <Background gap={30} size={1} color="rgba(255,255,255,0.04)" />
        <Controls className="!bg-stone-900/80 !backdrop-blur-md !border-white/10 !fill-stone-300 [&>button]:!border-white/10 hover:[&>button]:!bg-white/5 !rounded-lg !shadow-xl" />
      </ReactFlow>

      {/* Glassmorphism Stats Panel */}
      <div className="absolute top-4 left-4 pointer-events-none">
        <div
          className="p-3.5 rounded-xl border border-white/10 shadow-2xl"
          style={{
            background: 'rgba(15, 18, 25, 0.8)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
          }}
        >
          <p className="text-amber-400/90 font-bold mb-2.5 text-[10px] uppercase tracking-[0.15em]">Thống kê</p>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-sm" style={{ background: 'rgba(251, 146, 60, 0.7)' }} />
              <span className="text-stone-400 text-xs">Đại địa</span>
              <span className="text-stone-200 text-xs font-bold ml-auto">{maps.length}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-sm" style={{ background: 'rgba(74, 222, 128, 0.6)' }} />
              <span className="text-stone-400 text-xs">Thành thị</span>
              <span className="text-stone-200 text-xs font-bold ml-auto">{totalCities}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-sm" style={{ background: 'rgba(96, 165, 250, 0.6)' }} />
              <span className="text-stone-400 text-xs">Kiến trúc</span>
              <span className="text-stone-200 text-xs font-bold ml-auto">{totalBuildings}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 pointer-events-none">
        <div
          className="px-3 py-2 rounded-lg border border-white/10 flex items-center gap-4"
          style={{
            background: 'rgba(15, 18, 25, 0.7)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
        >
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-2 rounded-sm" style={{ background: 'rgba(251, 146, 60, 0.7)' }} />
            <span className="text-stone-500 text-[9px]">Đại địa</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-2 rounded-sm" style={{ background: 'rgba(74, 222, 128, 0.6)' }} />
            <span className="text-stone-500 text-[9px]">Thành thị</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-2 rounded-sm" style={{ background: 'rgba(96, 165, 250, 0.6)' }} />
            <span className="text-stone-500 text-[9px]">Kiến trúc</span>
          </div>
        </div>
      </div>
    </div>
  );
};
