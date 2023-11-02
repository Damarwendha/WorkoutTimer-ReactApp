import { useEffect, useMemo, useState } from "react";
import Calculator from "./components/Calculator";
import ToggleSounds from "./components/ToggleSounds";
import music from "./sounds/music.m4a";
import ClickSound from "./sounds/ClickSound.m4a";
import Header from "./components/Header";

const sound = new Audio(music);
const clickSound = new Audio(ClickSound);

function formatTime(date) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);
}

function App() {
  const [allowSound, setAllowSound] = useState(false);
  const [time, setTime] = useState(formatTime(new Date()));

  useEffect(function () {
    const id = setInterval(function () {
      setTime(formatTime(new Date()));
    }, 1000);

    return () => clearInterval(id);
  }, []);

  // Will be be AM or PM
  const partOfDay = time.slice(-2);

  const workouts = useMemo(() => {
    return [
      {
        name: "Full-body workout",
        numExercises: partOfDay === "AM" ? 9 : 8,
      },
      {
        name: "Arms + Legs",
        numExercises: 6,
      },
      {
        name: "Arms only",
        numExercises: 3,
      },
      {
        name: "Legs only",
        numExercises: 4,
      },
      {
        name: "Core only",
        numExercises: partOfDay === "AM" ? 5 : 4,
      },
    ];
  }, [partOfDay]);

  return (
    <main>
      <Header time={time} />
      <ToggleSounds
        allowSound={allowSound}
        setAllowSound={setAllowSound}
        sound={sound}
        clickSound={clickSound}
      />
      <Calculator
        workouts={workouts}
        allowSound={allowSound}
        clickSound={clickSound}
      />
    </main>
  );
}

export default App;
