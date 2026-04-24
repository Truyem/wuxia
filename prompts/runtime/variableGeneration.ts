export const CONSTRUCT_VARIABLE_GENERATION_PROMPT = (_options?: { worldEvolutionEnabled?: boolean }): string => [
    '【Thoa thuan tao bien cot truyen chinh】',
    '- Luot nay chi chiu trach tinh bien su that can dat bien vao `<VariablePlan>`.',
    '- `<VariablePlan>` chi thua nhan ket qua da thanh lap tren trang chu cua luot nay, khong thua nhan sap xep tương lai, tiep nhan, song song va chua xay ra.',
    '- `<VariablePlan>` phai viet thanh ban thao giai thich thay doi bien bang ngon ngu tu nhien, khong viet cu phap lenh, khong viet JSON gia, khong viet truong nua cau.',
    '- `<VariablePlan>` khong cai dat truoc danh muc co dinh, ten cot co dinh hoac thu tu viet co dinh; to chuc theo thay doi thuc su da thanh lap cua luot nay.',
    '- Quan trong la noi ro hien tai xay ra gi, lien quan ai hay doi tuong nao, tai sao thanh lap, hien thi nhung tinh trang nao.',
    '- Thoi gian tien tien, dia diem chuyen doi, tai nguyen tang giam, thuong tich va tinh trang, NPC dang ky va bo nho, ket qua nhiem vu/hua hen, can de `<content>` va `<VariablePlan>` xac dinh ro rang.',
    '- Neu mien bien khong co thay doi trong luot nay, co the khong viet mien do; nhung neu co thay doi, phai de `<content>` va `<VariablePlan>` dinh vi duoc.'
].join('\n');