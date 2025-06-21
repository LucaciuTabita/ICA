import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useMemo,
  createContext,
} from "react";
 
import './App.css';

// --- Context for global settings (like reminder toggle)
const SettingsContext = createContext();

const SettingsProvider = ({ children }) => {
  const [remindersEnabled, setRemindersEnabled] = useState(true);
  return (
    <SettingsContext.Provider value={{ remindersEnabled, setRemindersEnabled }}>
      {children}
    </SettingsContext.Provider>
  );
};

const useSettings = () => useContext(SettingsContext);

// --- Plant App
function PlantApp() {
  const [plants, setPlants] = useState([]);
  const [name, setName] = useState("");
  const [frequency, setFrequency] = useState(3);
  const dayCountRef = useRef(0);
  const { remindersEnabled } = useSettings();

  useEffect(() => {
    // Save to localStorage
    localStorage.setItem("plants", JSON.stringify(plants));
  }, [plants]);

  useEffect(() => {
    // Load from localStorage on first mount
    const stored = JSON.parse(localStorage.getItem("plants"));
    if (stored) setPlants(stored);
  }, []);

  const addPlant = () => {
    if (!name || frequency <= 0) return;
    setPlants([...plants, { name, frequency, daysLeft: frequency }]);
    setName("");
    setFrequency(3);
  };

  const simulateDay = () => {
    setPlants((prev) =>
      prev.map((plant) => ({
        ...plant,
        daysLeft: plant.daysLeft > 0 ? plant.daysLeft - 1 : 0,
      }))
    );
    dayCountRef.current += 1;
  };

  const waterPlant = (index) => {
    const updated = [...plants];
    updated[index].daysLeft = updated[index].frequency;
    setPlants(updated);
  };

  const plantsNeedingWater = useMemo(
    () => plants.filter((p) => p.daysLeft === 0),
    [plants]
  );

  return (
    <div className="App">
      <div className="container">
        <h1>🌱 Plant Watering Reminder</h1>

        <div className="inputGroup">
          <input
            type="text"
            placeholder="Plant name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
          />
          <input
            type="number"
            value={frequency}
            onChange={(e) => setFrequency(Number(e.target.value))}
            min={1}
            className="numberInput"
          />
          <div>
            <button onClick={addPlant} className="button">Add Plant</button>
            <button onClick={simulateDay} className="button">Simulate 1 Day ⏩</button>
          </div>
          <p>Days simulated: {dayCountRef.current}</p>
        </div>

        {remindersEnabled && plantsNeedingWater.length > 0 && (
          <div className="reminder">
            🔔 Reminder: You have {plantsNeedingWater.length} plant(s) to water!
          </div>
        )}

        <h2>🌿 Your Plants</h2>
        {plants.length === 0 ? (
          <p>No plants yet. Add some!</p>
        ) : (
          <ul style={{ paddingLeft: 0 }}>
            {plants.map((plant, i) => (
              <li key={i} className="listItem">
                <strong>{plant.name}</strong> – Water every {plant.frequency} days. <br />
                Days left: {plant.daysLeft}
                {plant.daysLeft === 0 && (
                  <button onClick={() => waterPlant(i)} className="waterBtn">
                    💧 Water
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}

        <ReminderToggle />
      </div>
    </div>
  );
}

// --- Settings toggle
function ReminderToggle() {
  const { remindersEnabled, setRemindersEnabled } = useSettings();
  return (
    <div style={{ marginTop: "2rem" }}>
      <label>
        <input
          type="checkbox"
          checked={remindersEnabled}
          onChange={(e) => setRemindersEnabled(e.target.checked)}
        />
        Enable reminders
      </label>
    </div>
  );
}

// --- App wrapper
export default function App() {
  return (
    <SettingsProvider>
      <PlantApp />
    </SettingsProvider>
  );
}
