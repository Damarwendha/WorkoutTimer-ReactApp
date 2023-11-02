import { memo, useEffect, useState } from "react";

function toHoursAndMinutes(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return { hours, minutes };
}

function Calculator({ workouts, allowSound, clickSound }) {
  const [number, setNumber] = useState(workouts.at(0).numExercises);
  const [sets, setSets] = useState(3);
  const [speed, setSpeed] = useState(90);
  const [durationBreak, setDurationBreak] = useState(5);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    setDuration((number * sets * speed) / 60 + (sets - 1) * durationBreak);
  }, [number, sets, speed, durationBreak]);

  useEffect(() => {
    allowSound ? clickSound.play() : clickSound.pause();
  }, [allowSound, clickSound, duration]);

  function handleIncrement() {
    setDuration((d) => d + 1);
  }

  function handleDecrement() {
    setDuration((d) => d - 1);
  }

  const mins = Math.floor(duration);

  let { hours, minutes } = toHoursAndMinutes(mins);
  if (minutes < 10) minutes = "0" + minutes;

  return (
    <>
      <form>
        <div>
          <label>Type of workout</label>
          <select value={number} onChange={(e) => setNumber(+e.target.value)}>
            {workouts.map((workout) => (
              <option value={workout.numExercises} key={workout.name}>
                {workout.name} ({workout.numExercises} exercises)
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>How many sets?</label>
          <input
            type="range"
            min="1"
            max="5"
            value={sets}
            onChange={(e) => setSets(e.target.value)}
          />
          <span>{sets}</span>
        </div>
        <div>
          <label>How fast are you?</label>
          <input
            type="range"
            min="30"
            max="180"
            step="30"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
          />
          <span>{speed} sec/exercise</span>
        </div>
        <div>
          <label>Break length</label>
          <input
            type="range"
            min="1"
            max="10"
            value={durationBreak}
            onChange={(e) => setDurationBreak(e.target.value)}
          />
          <span>{durationBreak} minutes/set</span>
        </div>
      </form>
      <section>
        <button onClick={handleDecrement}>-</button>
        <p>
          {hours === 0 && minutes + " : 00"}
          {hours !== 0 && hours + " : " + minutes + " : 00"}
        </p>
        <button onClick={handleIncrement}>+</button>
      </section>
    </>
  );
}

export default memo(Calculator);
