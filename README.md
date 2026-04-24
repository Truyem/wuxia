# 🗡️ Wuxia AI-RPG Engine

Dự án **Wuxia AI-RPG Engine** được lấy cảm hứng và phát triển dựa trên [MoRanJiangHu](https://github.com/MikuLXK/MoRanJiangHu) - một dự án mã nguồn mở tuyệt vời về tiểu thuyết võ hiệp, trò chơi văn bản dài và AI workflow. Xin cảm ơn tác giả MikuLXK đã chia sẻ mã nguồn truyền cảm hứng cho cộng đồng!

---

## 🌟 Key Features

### 📜 AI-Driven Storytelling
Powered by Cloudflare Workers and advanced LLMs (like Nemotron-70B), the engine generates unique, context-aware stories based on player actions. No two journeys through the *Jianghu* are the same.

### 🎨 Dynamic Portrait & World Generation
- **Character Portraits**: Automatic generation of high-quality avatars for the protagonist and NPCs based on their descriptions, gender, and realm.
- **Visual Assets**: Dynamically generated items, maps, and backgrounds that bring the world to life.
- **Aesthetic**: Premium "Wuxia" design with gold accents, traditional patterns, and a dark, moody interface.

### 🤝 Deep Social & Affection System
- **NPC Interaction**: Meet a diverse cast of characters, each with unique identities and motivations.
- **Favorability**: Build relationships, gain affection, and unlock special story paths or "Agreements" (Promises).
- **Team Management**: Form a party of allies to accompany you on your quest.

### ⚔️ RPG Mechanics
- **Character Progression**: Attributes (STR, AGI, etc.), Realms (from Mortal to Immortal), and Fame.
- **Martial Arts (Kungfu)**: Learn and equip powerful techniques.
- **Inventory & Equipment**: Manage items, weapons, and mysterious artifacts.
- **Sects & Missions**: Join powerful martial arts sects and complete challenging tasks.
- **Battle System**: Interactive battle overlay for high-stakes encounters.

### 🌍 Living World
- **World Events**: A real-time ticker showing major events happening across the *Jianghu*.
- **Map System**: Explore diverse regions, each with its own generated lore and visuals.

---

## 🛠️ Technology Stack

- **Frontend**: 
  - [React 19](https://reactjs.org/) & [Vite](https://vitejs.dev/)
  - [TypeScript](https://www.typescriptlang.org/) for type safety
  - [Lucide React](https://lucide.dev/) for iconography
  - [i18next](https://www.i18next.com/) for multi-language support (Vietnamese, English, etc.)
- **AI Infrastructure**:
  - [Cloudflare Workers](https://workers.cloudflare.com/) for serverless AI execution
  - **Text Generation**: Nemotron-70B via custom workers
  - **Image Generation**: Stable Diffusion (SDXL/Flux/Schnell) for portraits and assets
- **Styling**:
  - Custom Vanilla CSS Design System
  - Responsive layout (optimized for both Desktop and Mobile)

---

## 📂 Project Structure

- `/src` & `/components`: React UI components and core application logic.
- `/services`: Interface with Cloudflare Workers (AI, Image Gen, Transformation).
- `/hooks`: Custom React hooks (including the core `useGame` hook).
- `/prompts`: Structured AI prompts for world initialization and story generation.
- `/cloudflare`: Source code for the Cloudflare AI workers.
- `/public`: Static assets, images, and fonts.

---

## 🚀 Getting Started

### 1. Installation
Clone the repository and install dependencies:
```bash
npm install
```

### 2. Configure AI Workers
The application requires connection to Cloudflare Workers for AI functionality. Ensure your `visualConfig` (usually in `initialState` or settings) points to valid worker URLs.

### 3. Local Development
Run the Vite development server:
```bash
npm run dev
```

### 4. Build for Production
Create an optimized production bundle:
```bash
npm run build
```

---

## 🙏 Acknowledgments

- [MoRanJiangHu](https://github.com/MikuLXK/MoRanJiangHu) - Source of inspiration for this project

---

## 📜 License
This project is for educational and creative purposes. All AI-generated content follows the terms of the underlying models used.

---

*May your path through the Jianghu be legendary.* 🗡️✨
