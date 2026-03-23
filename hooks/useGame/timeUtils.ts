export const normalizeCanonicalGameTime = (input?: any): string | null => {
    if (!input) return null;
    
    let year, month, day, hour, minute;
    
    if (typeof input === 'object' && input !== null) {
        year = input.Year ?? input.year;
        month = input.Month ?? input.month;
        day = input.Day ?? input.day;
        hour = input.Hour ?? input.hour;
        minute = input.Minute ?? input.minute;
        
        if (year === undefined || month === undefined || day === undefined || hour === undefined || minute === undefined) {
             return null;
        }
    } else if (typeof input === 'string') {
        const match = input.trim().match(/^(\d{1,6}):(\d{1,2}):(\d{1,2}):(\d{1,2}):(\d{1,2})$/);
        if (!match) return null;
        year = Number(match[1]);
        month = Number(match[2]);
        day = Number(match[3]);
        hour = Number(match[4]);
        minute = Number(match[5]);
    } else {
        return null;
    }

    if (
        month < 1 || month > 12 ||
        day < 1 || day > 31 ||
        hour < 0 || hour > 23 ||
        minute < 0 || minute > 59
    ) {
        return null;
    }
    return `${year}:${month.toString().padStart(2, '0')}:${day.toString().padStart(2, '0')}:${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
};

export const extractMonthAndDay = (input?: string): { month: number; day: number } | null => {
    const canonical = normalizeCanonicalGameTime(input);
    if (!canonical) return null;
    const m = canonical.match(/^\d{1,6}:(\d{2}):(\d{2}):/);
    if (!m) return null;
    const month = Number(m[1]);
    const day = Number(m[2]);
    if (!Number.isFinite(month) || !Number.isFinite(day)) return null;
    return { month, day };
};
