# 📐 微積分視覺化筆記 (Visual Calculus Notes)

> **這不僅是一本筆記，而是一場數學的視覺盛宴。**

這是一個專為大學微積分初學者打造的「互動式線上參考手冊」。我們揚棄了傳統講義的靜態限制，結合了嚴謹的數學邏輯（如 $\epsilon-\delta$ 證明）與動態幾何視覺化，幫助你直觀地建立對微積分核心概念的深度理解。

🌐 **[點此進入互動學習空間](https://zhaohong04126.github.io/Calculus/)**

---

## ✨ 專案亮點 (Key Features)

*   **🕹️ 互動式幾何探索**：動態展示反函數對稱性、極限逼近過程、漸近線行為以及夾擠定理，讓抽象代數瞬間具象化。
*   **📑 網站目錄總覽 (NEW!)**：首頁新增「書本式目錄總覽」，一覽全站架構，並支援精準跳轉至各章節之核心小節。
*   **📍 智慧導覽體驗**：
    *   **全域側邊欄**：快速切換不同章節。
    *   **精準章節內容導覽**：每個章節頂部設有「快速導覽列」，支援磨砂玻璃視覺效果與平滑捲動，精準對位教學重點。
*   **🖋️ 教科書級公式渲染**：採用 KaTeX 呈現最優雅的 LaTeX 聖經級數學排版，完美呈現公式之美。
*   **📱 頂級響應式設計**：無論是桌機還是手機，均能自動調整排版與圖表大小，隨時隨地學習。


---

## 📚 知識地圖 (Course Sitemap)

目前專案涵蓋以下核心章節，內容持續高頻更新中：

### **第零章：微積分簡介 (Introduction)**
*   微分與積分的幾何本質對比
*   學習路徑全地圖探索

### **第一章：函數介紹 (Functions)**
*   **函數定義與特徵**：理解定義域、值域與映射本質。
*   **冪函數、超越函數與反函數**：涵蓋指數、對數、三角函數及其反函數之幾何解析。

### **第二章：極限 (Limits)**
*   極限的直觀與嚴格定義（$\epsilon-\delta$ 證明）
*   運算法則、夾擠定理、無窮極限與漸近線。

### **第三章：連續 (Continuity)**
*   連續性定義與常見不連續類型。
*   重要定理：中間值定理 (IVT) 之視覺化應用。

### **第四章：導數與微分 (Derivatives)**
*   切線斜率定義與基礎微分法則（鏈鎖律、高階導數）。
*   反函數微分與雙曲函數分析。

### **第五章：微分的應用 (Applications of Derivatives)**
*   均值定理 (MVT)、極值測試、凹凸性分析。
*   羅必達法則 (L'Hôpital's rule) 與最佳化問題。

### **第六章：反導數與積分 (Integrals)**
*   黎曼和、定積分之幾何解釋。
*   微積分基本定理 (FTC)。

### **第七章：積分技巧 (Integration Techniques)**
*   變數變換法 (u-Substitution) 與分部積分法 (IBP)。

### **第八章：積分的應用 (Applications of Integrals)**
*   面積、體積與物理應用（持續更新中）。

### **第九章：公式表 / 題庫 (Reference)**
*   全課程重要定理彙整、運算法則與精選題庫。


---

## 🛠️ 技術底層 (Tech Stack)

| 類別 | 使用技術 |
| :--- | :--- |
| **核心框架** | `React 18` |
| **建置工具** | `Vite` (極速啟動與 HMR) |
| **路由系統** | `React Router DOM v6` |
| **數學引擎** | `KaTeX` (原生自訂渲染封裝) |
| **視覺化元件** | `SVG` / `Canvas` 自研互動圖表 |
| **部署環境** | `Vercel` / `GitHub Actions` |

---

## 🚀 開發者指南 (Developer Guide)

若您想在本地端運行、測試或貢獻代碼：

1.  **複製專案**
    ```bash
    git clone https://github.com/ZhaoHong04126/visual-calculus.git
    ```
2.  **安裝依賴**
    ```bash
    npm install
    ```
3.  **啟動開發服務器**
    ```bash
    npm run dev
    ```

---

## 📁 檔案架構 (Structure)

```text
visual-calculus/
├── public/             # 靜態資源 (圖示、Service Worker)
│   └── sw.js           # PWA 離線緩存配置
├── src/                # 原始碼主目錄
│   ├── About/          # 首頁：目錄總覽與網站簡介
│   ├── Introduction/   # 第零章：簡介與學習地圖
│   ├── Functions/      # 第一章：各類基礎函數
│   ├── Limits/         # 第二章：極限理論
│   ├── Continuity/     # 第三章：連續性
│   ├── Derivatives/    # 第四章：導數與微分
│   ├── DerivativesApps/# 第五章：微分的應用
│   ├── Integrals/      # 第六章：反導數與積分
│   ├── Techniques/     # 第七章：積分技巧
│   ├── IntegralsApps/  # 第八章：積分的應用
│   ├── Reference/      # 第九章：公式表與題庫
│   ├── components/     # 全域組件 (ScrollToHash, SectionNav 等)
│   ├── App.jsx         # 路由配置與全站主框架佈局
│   ├── App.css         # 全站核心樣式與動畫定義
│   ├── index.css       # 基礎排版與原子化 CSS
│   └── main.jsx        # 程式進入點與 HashRouter 配置
├── index.html          # SPA 進入頁面
├── package.json        # 專案依賴與版本資訊
└── vite.config.js      # Vite 建置配置
```

---

**Made with ❤️ for Calculus Learners.**
