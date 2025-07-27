# 🌍 Globe Teller

**Globe Teller** is an interactive 3D globe that shows details of every country on Earth. Powered by `react-globe.gl`, it allows users to explore countries, view national flags, and experience a world of immersive geography and culture.

![Globe Teller Preview](https://your-demo-link.vercel.app/preview.png)

---

## 🚀 Live Demo

🔗 **[Explore Globe Teller Live](https://your-demo-link.vercel.app)**  
📁 **[View GitHub Repository](https://github.com/your-username/GlobeTeller)**

---

## 📷 Screenshot
![Globe Teller Banner](Images/Banner.png)

---

## ✨ Features

- 🌐 **3D Interactive Globe** — Navigate the Earth with realistic country boundaries.
- 🔍 **Smart Search with Dropdown** — Type and select countries from a modern, dynamic search bar.
- 📖 **Country-Based Details** — Each country reveals a unique detail.
- 🏳️ **Flag Display** — National flags enhance the  experience.
- 💡 **On-Load Instruction Modal** — New users get guided on how to explore the globe.
- 🎨 **Modern UI/UX** — Smooth transitions, popups, and elegant modals.

---

## 🛠️ Tech Stack

- **Frontend**: React + Vite
- **3D Globe**: [react-globe.gl](https://github.com/vasturiano/react-globe.gl)
- **Data Processing**: JavaScript (JSON, Fetch API)
- **Styling**: Tailwind CSS, custom modals & transitions

---

## 🧠 How It Works

1. Countries are rendered using `topojson` and `react-globe.gl`.
2. On search or click, the globe rotates to that country.
3. A detail is fetched from a JSON dataset.
5. Flags and info are displayed in a sleek popup.
6. One country is "active" at a time with a highlight color.

---

## 📂 Folder Structure

```
Globe Teller/
├── node_modules/
├── public/
│   ├── audio/              
│   └── favicon/
├── src/
│   ├── components/
│   │   └── GlobeTeller.jsx
│   ├── data
│   │   └── countryStories.json
│   ├── styles
│   │   └── index.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── LICENSE
├── README.md
├── vite.config.js
├── postcss.config.js
└── tailwaind.config.js
```

---

## ✨ Creator

Made with love by **Md. Tasnim Ferdous**  
💌 [tasnimferdous2007@gmail.com]  
🔗 [LinkedIn](https://www.linkedin.com/in/md-tasnimferdous/)

---

## 🧪 Run Locally

```bash
git clone https://github.com/Tasnim-Ferdous/Websites.git
cd Websites/Globe\ Teller
npm install
npm run dev
```

To build for production:

```bash
npm run build
```

---

## 🐛 Contributing & Feedback

Have an idea? Found a bug?  
Feel free to [open an issue](https://github.com/Tasnim-Ferdous/Websites/tree/Website/Globe%20Teller) or fork the project and submit a PR.

---

## 📌 Future Features (Coming Soon)

- 🗺️ Region & continent filtering
- 🎶 Country-themed background music
- 📸 Real-time satellite view integration
- 💬 Multilingual storytelling
- 🧩 Quiz mode with geographical challenges

---

## 📜 License

[MIT License](LICENSE) © 2025 MD. Tasnim Ferdous
