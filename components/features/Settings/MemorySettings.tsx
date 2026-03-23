
import React, { useState } from 'react';
import { MemoryConfig } from '../../../types';
import ParallelogramSaveButton from '../../ui/ParallelogramSaveButton';

interface Props {
    settings: MemoryConfig;
    onSave: (settings: MemoryConfig) => void;
}

const MemorySettings: React.FC<Props> = ({ settings, onSave }) => {
    const [form, setForm] = useState<MemoryConfig>(settings);

    const handleSave = () => {
        onSave(form);
    };

    return (
        <div className="space-y-8 animate-fadeIn">
            <div className="flex justify-between items-end border-b border-wuxia-gold/30 pb-4">
                <div className="space-y-1">
                    <h3 className="text-wuxia-gold font-sans font-black text-2xl tracking-tighter text-shadow-gold">Cấu hình nén bộ nhớ</h3>
                    <p className="text-[10px] text-wuxia-gold/60 tracking-[0.3em] font-bold uppercase pl-1">Memory Config</p>
                </div>
            </div>

            {/* Thresholds */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2 bg-white/5 p-4 rounded-xl border border-wuxia-gold/20">
                    <label className="text-xs text-wuxia-gold font-bold uppercase tracking-widest">Ngưỡng bộ nhớ ngắn hạn (Mục)</label>
                    <div className="flex items-center gap-3">
                        <input
                            type="number"
                            min="5" max="50"
                            value={form.shortTermThreshold}
                            onChange={(e) => setForm({ ...form, shortTermThreshold: parseInt(e.target.value) || 30 })}
                            className="bg-transparent border border-wuxia-gold/30 p-2 text-paper-white font-mono w-24 text-center focus:border-wuxia-gold outline-none"
                        />
                        <span className="text-wuxia-gold/60 text-xs text-balance">Kích hoạt tóm tắt khi đạt số lượng này.</span>
                    </div>
                </div>

                <div className="space-y-2 bg-white/5 p-4 rounded-xl border border-wuxia-gold/20">
                    <label className="text-xs text-wuxia-gold font-bold uppercase tracking-widest">Ngưỡng bộ nhớ trung hạn (Mục)</label>
                    <div className="flex items-center gap-3">
                        <input
                            type="number"
                            min="20" max="200"
                            value={form.midTermThreshold || 50}
                            onChange={(e) => setForm({ ...form, midTermThreshold: parseInt(e.target.value) || 50 })}
                            className="bg-transparent border border-wuxia-gold/30 p-2 text-paper-white font-mono w-24 text-center focus:border-wuxia-gold outline-none"
                        />
                        <span className="text-wuxia-gold/60 text-xs text-balance">Lưu trữ vào bộ nhớ dài hạn khi đạt số lượng này.</span>
                    </div>
                </div>

                <div className="space-y-2 bg-white/5 p-4 rounded-xl border border-wuxia-gold/20">
                    <label className="text-xs text-wuxia-gold font-bold uppercase tracking-widest">Số mục nhớ quan trọng cho nhân vật chính N</label>
                    <div className="flex items-center gap-3">
                        <input
                            type="number"
                            min="1" max="50"
                            value={form.keyNpcImportantMemoryLimitN || 20}
                            onChange={(e) => setForm({ ...form, keyNpcImportantMemoryLimitN: parseInt(e.target.value) || 20 })}
                            className="bg-transparent border border-wuxia-gold/30 p-2 text-paper-white font-mono w-24 text-center focus:border-wuxia-gold outline-none"
                        />
                        <span className="text-wuxia-gold/60 text-xs text-balance">Số mục nhớ ngữ cảnh cho nhân vật quan trọng.</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2 text-center p-3 rounded-lg bg-white/5 border border-wuxia-gold/10">
                    <label className="text-[10px] text-wuxia-gold/50 font-serif uppercase tracking-widest block">Tóm tắt lại sau</label>
                    <div className="flex items-center justify-center gap-2">
                        <input
                            type="number"
                            value={form.summaryInterval || 0}
                            onChange={(e) => setForm({ ...form, summaryInterval: parseInt(e.target.value) })}
                            className="bg-transparent border border-wuxia-gold/30 p-2 text-paper-white font-mono w-24 text-center focus:border-wuxia-gold outline-none rounded transition-all"
                        />
                        <span className="text-[10px] text-paper-white/40 font-serif">HÀNH ĐỘNG</span>
                    </div>
                </div>

                <div className="space-y-2 text-center p-3 rounded-lg bg-white/5 border border-wuxia-gold/10">
                    <label className="text-[10px] text-wuxia-gold/50 font-serif uppercase tracking-widest block">Ngưỡng tóm tắt</label>
                    <div className="flex items-center justify-center gap-2">
                        <input
                            type="number"
                            value={form.summaryThreshold || 0}
                            onChange={(e) => setForm({ ...form, summaryThreshold: parseInt(e.target.value) })}
                            className="bg-transparent border border-wuxia-gold/30 p-2 text-paper-white font-mono w-24 text-center focus:border-wuxia-gold outline-none rounded transition-all"
                        />
                        <span className="text-[10px] text-paper-white/40 font-serif">TỪ</span>
                    </div>
                </div>

                <div className="space-y-2 text-center p-3 rounded-lg bg-white/5 border border-wuxia-gold/10">
                    <label className="text-[10px] text-wuxia-gold/50 font-serif uppercase tracking-widest block">Cửa sổ bộ nhớ</label>
                    <div className="flex items-center justify-center gap-2">
                        <input
                            type="number"
                            value={form.contextWindow || 0}
                            onChange={(e) => setForm({ ...form, contextWindow: parseInt(e.target.value) })}
                            className="bg-transparent border border-wuxia-gold/30 p-2 text-paper-white font-mono w-24 text-center focus:border-wuxia-gold outline-none rounded transition-all"
                        />
                        <span className="text-[10px] text-paper-white/40 font-serif">MỤC</span>
                    </div>
                </div>
            </div>

            {/* Prompts */}
            <div className="space-y-6">
                <div className="bg-white/5 border border-wuxia-gold/20 rounded-xl p-5 backdrop-blur-sm">
                    <h4 className="text-wuxia-gold font-serif font-bold italic tracking-wider mb-4 border-b border-wuxia-gold/20 pb-2">Mẫu tóm tắt bộ nhớ</h4>
                    <p className="text-[11px] text-paper-white/50 leading-relaxed mb-4">
                        Hướng dẫn trí tuệ nhân tạo (AI) cách chắt lọc những điểm mấu chốt của câu chuyện khi nén bộ nhớ.
                    </p>
                    <textarea
                        className="w-full h-32 bg-transparent border border-wuxia-gold/20 focus:border-wuxia-gold p-4 text-paper-white font-serif text-sm leading-relaxed outline-none rounded-lg transition-all placeholder:text-wuxia-gold/10"
                        value={form.summaryPromptTemplate || ''}
                        onChange={(e) => setForm({ ...form, summaryPromptTemplate: e.target.value })}
                        placeholder="Ví dụ: Tóm tắt lại hành trình đã qua, nhấn mạnh các mốc tu vi, kẻ thù đã gặp và các đạo quả thu được..."
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs text-wuxia-gold/80 font-bold uppercase tracking-wide">Bộ nhớ ngắn → Trung hạn · Mẫu prompt tóm tắt</label>
                    <p className="text-[10px] text-paper-white/40">Hướng dẫn AI cách rút gọn các vòng hội thoại nhỏ thành sự kiện chính.</p>
                    <textarea
                        value={form.shortToMidPrompt}
                        onChange={(e) => setForm({ ...form, shortToMidPrompt: e.target.value })}
                        className="w-full h-24 bg-transparent border border-wuxia-gold/20 p-3 text-sm text-paper-white/70 focus:border-wuxia-gold outline-none custom-scrollbar resize-none font-mono"
                        placeholder="Ví dụ: Vui lòng tóm tắt thông tin chính của các sự kiện trên..."
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs text-wuxia-gold/80 font-bold uppercase tracking-wide">Bộ nhớ trung hạn → Dài hạn · Mẫu prompt sử thi</label>
                    <p className="text-[10px] text-paper-white/40">Hướng dẫn AI cách thăng hoa một loạt sự kiện thành kinh nghiệm dài hạn của nhân vật.</p>
                    <textarea
                        value={form.midToLongPrompt}
                        onChange={(e) => setForm({ ...form, midToLongPrompt: e.target.value })}
                        className="w-full h-24 bg-transparent border border-wuxia-gold/20 p-3 text-sm text-paper-white/70 focus:border-wuxia-gold outline-none custom-scrollbar resize-none font-mono"
                        placeholder="Ví dụ: Vui lòng tóm tắt những kinh nghiệm này thành..."
                    />
                </div>
            </div>

            <div className="pt-4 sticky bottom-0 bg-[#0a0a0a]/80 backdrop-blur-md pb-4 z-20">
                <ParallelogramSaveButton
                    onClick={handleSave}
                    className="w-full"
                />
            </div>
        </div>
    );
};

export default MemorySettings;
