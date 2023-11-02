import { memo, useState } from "react";
import music from "./music.m4a";

const sound = new Audio(music);

function ToggleSounds() {
  const [allowSound, setAllowSound] = useState(false);

  if (allowSound) sound.play();
  else sound.pause();

  return (
    <button
      className="btn-sound"
      onClick={() => setAllowSound((allow) => !allow)}
    >
      {allowSound ?  "🔈" : "🔇"}
    </button>
  );
};

export default memo(ToggleSounds);
