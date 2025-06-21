# 🌱 Plant Watering Reminder App

Keep your houseplants happy!  
This React app lets you add plants, set how often they need water, and get gentle reminders when it’s time to pick up the watering can.

<img width="546" alt="Screenshot 2025-06-21 at 13 12 34" src="https://github.com/user-attachments/assets/10d64b2b-b7a0-494e-85fd-7dcd17a34923" />

---

## ✨ Features
- **Add unlimited plants** with a custom watering frequency (in days)
- **Live countdown** of days left until each plant needs water
- **One-click simulation** of day-by-day time passing (great for testing)
- **Reminders banner** whenever at least one plant is thirsty
- **Persisted data** in `localStorage` – close the tab and come back later
- **Toggle** to enable/disable all reminders
- **Responsive, clean UI** styled in plain CSS

---

## 🛠 Tech Stack
- **React 18** – functional components & hooks
- **CSS** – no frameworks, just lightweight styles
- **localStorage** – client-side persistence

---

## 🔍 Main React Hooks Used
- `useState` – store plants list, form inputs, and reminder toggle
- `useEffect` – load/save data to `localStorage`
- `useRef` – track simulated-day counter without re-rendering
- `useMemo` – efficiently compute which plants need water
- `createContext / useContext` – global reminder setting

---

## 🚀 Getting Started (Development)

```bash
# 1 Clone the repo (or download the ZIP)
git clone https://github.com/LucaciuTabita/ICA.git
cd "YEAR 1/SEM 2/FD/plant-watering-reminder-app"

# 2 Install dependencies
npm install    # or yarn

# 3 Start dev server
npm start      # http://localhost:3000
