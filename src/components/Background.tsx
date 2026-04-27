import smoke from "src/assets/images/Smoke.svg";
import smoke1 from "src/assets/images/Smoke-1.svg";

function Background() {
  return (
    <div className="w-screen h-screen absolute top-0 left-0 -z-10 overflow-hidden" style={{ backgroundColor: '#020D19' }}>
      {/* Animated Smoke SVGs */}
      <img
        src={smoke}
        alt="Smoke"
        className="absolute left-[0] top-0 w-[550px] opacity-80 animate-smoke-move pointer-events-none select-none"
        draggable="false"
        aria-hidden="true"
      />
      <img
        src={smoke1}
        alt="Smoke 1"
        className="absolute right-[0] bottom-0 w-[700px] opacity-60 animate-smoke-move-reverse pointer-events-none select-none"
        draggable="false"
        aria-hidden="true"
      />
    </div>
  );
}

export default Background;