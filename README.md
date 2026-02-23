# RitLog - Ritten Registratie App

Een web-app voor het bijhouden van ritten en declaraties voor Jekel Dienstverlening.

## Features

- 📝 Ritten invoeren (handmatig of via spraak)
- 🚐 Automatische km-schatting op basis van route
- 💰 Automatische bedragberekening (€0,55/km of €32/uur)
- 📊 Maandoverzicht met totalen
- 📥 Export naar CSV (Excel-compatible)
- 💾 Backup & restore functie
- 📱 Mobile-friendly design

## Tarieven (uit analyse declaraties)

- **Per kilometer:** €0,55/km (6% correctie wordt toegepast)
- **Per uur:** €32/uur (geen correctie)

---

## 🚀 App Werkend Krijgen - Stap voor Stap

### Optie 1: Via Vercel (Aanbevolen - Gratis)

1. **Maak een GitHub account** (als je die nog niet hebt)
   - Ga naar https://github.com
   - Klik "Sign up"

2. **Maak een nieuwe repository**
   - Klik op "+" rechtsboven → "New repository"
   - Naam: `ritlog`
   - Kies "Public"
   - Vink aan: "Add a README file"
   - Klik "Create repository"

3. **Upload de bestanden**
   - In je nieuwe repo, klik "Add file" → "Upload files"
   - Sleep deze bestanden erin:
     - `RitLog_v2.1.jsx` → hernoem naar `src/App.jsx`
     - `package.json` (zie hieronder)
     - `index.html` (zie hieronder)
     - `vite.config.js` (zie hieronder)

4. **Deploy via Vercel**
   - Ga naar https://vercel.com
   - Klik "Sign up" → kies "Continue with GitHub"
   - Klik "New Project"
   - Selecteer je `ritlog` repository
   - Klik "Deploy"
   - Wacht 1-2 minuten...
   - Je krijgt een URL zoals `ritlog-xyz.vercel.app`

5. **App installeren op telefoon**
   - Open de URL in Safari (iPhone) of Chrome (Android)
   - iPhone: Tik op "Delen" → "Zet op beginscherm"
   - Android: Menu → "Toevoegen aan startscherm"

---

## 📁 Benodigde Bestanden

### package.json
```json
{
  "name": "ritlog",
  "version": "2.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32",
    "tailwindcss": "^3.4.0",
    "vite": "^5.0.0"
  }
}
```

### index.html
```html
<!DOCTYPE html>
<html lang="nl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <meta name="theme-color" content="#E65100" />
    <title>RitLog</title>
    <link rel="manifest" href="/manifest.json" />
    <link rel="apple-touch-icon" href="/icon-192.png" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

### src/main.jsx
```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

### src/index.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
}
```

### tailwind.config.js
```js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: { extend: {} },
  plugins: [],
}
```

### postcss.config.js
```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### vite.config.js
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

### manifest.json (in public folder)
```json
{
  "name": "RitLog",
  "short_name": "RitLog",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#E65100",
  "theme_color": "#E65100",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

---

## 📱 Data Opslag

De app slaat data op via `localStorage`. Dit betekent:
- ✅ Data blijft bewaard op het apparaat
- ✅ Werkt offline
- ⚠️ Data is per browser/apparaat (sync tussen apparaten via backup/restore)
- ⚠️ Wissen van browserdata = data kwijt → maak backups!

---

## 🔧 Lokaal Ontwikkelen

```bash
# Clone de repo
git clone https://github.com/JOUW_USERNAME/ritlog.git
cd ritlog

# Installeer dependencies
npm install

# Start development server
npm run dev

# Build voor productie
npm run build
```

---

## 📊 Tarieven Aanpassen

In `App.jsx`, pas deze waarden aan:

```javascript
const TARIEF_PER_KM = 0.55;  // €0,55 per km
const TARIEF_PER_UUR = 32;   // €32 per uur
```

---

## 🆘 Hulp Nodig?

- **GitHub:** https://docs.github.com/en/get-started
- **Vercel:** https://vercel.com/docs

---

*RitLog v2.1 - Gemaakt voor Jekel Dienstverlening*
