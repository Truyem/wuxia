import { PromptStructure } from '../../types';

const cfg = [
    {name:"Relaxed", e:"0.7x mệt, hồi 1.5x"},
    {name:"Easy", e:"0.85x mệt, hồi 1.2x"},
    {name:"Normal", e:"1x mệt, hồi 1x"},
    {name:"Hard", e:"1.3x mệt, hồi 0.8x"},
    {name:"Extreme", e:"2x mệt, hồi 0.5x"}
];

export const Difficulty_Physiology: PromptStructure[] = cfg.map((c,i) => ({
    id: `diff_phys_${i}`,
    title: `Sinh lý ${c.name}`,
    content: `<SINH LÝ ${c.name.toUpperCase()}>\nMệt: ${c.e} | Chảy máu: -10~-25 | Nhiễm: thấp | Chết: cận tử\nAn toàn: hồi ${i<2?"nhanh":"chậm"} | Nguy hiểm: ${i>2?"khó":"dễ"} hồi`,
    type: 'diff',
    enabled: false
}));