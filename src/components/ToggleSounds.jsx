import { memo } from "react";

function ToggleSounds({ allowSound, setAllowSound, sound, clickSound }) {
  if (allowSound) sound.play();
  else sound.pause();

  function handleOnToggle() {
    setAllowSound((allow) => !allow);
    clickSound.play();
  }

  return (
    <button className="btn-sound" onClick={handleOnToggle}>
      {allowSound ? "🔈" : "🔇"}
    </button>
  );
}

export default memo(ToggleSounds);
