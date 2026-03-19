
import { PromptStructure } from '../../types';

export const coreWorldview: PromptStructure = {
    id: 'core_world',
    title: 'Bối cảnh thế giới',
    content: `
【Bối cảnh thế giới】
Sau khi bắt đầu, phần này sẽ được thay thế hoàn toàn bằng gợi ý bối cảnh thế giới của tệp lưu hiện tại (chỉ nội dung bối cảnh).
    `.trim(),
    type: 'core setting',
    enabled: true
};
