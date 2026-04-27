import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function toDMS(deg: number, isLat: boolean) {
  const absolute = Math.abs(deg);
  const degrees = Math.floor(absolute);
  const minutes = Math.floor((absolute - degrees) * 60);
  const direction = isLat
    ? deg >= 0 ? 'N' : 'S'
    : deg >= 0 ? 'E' : 'W';
  return `${degrees}°${minutes}'${direction}`;
}

function SciBorder() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  const [coords, setCoords] = useState<string>('Getting location...');
  const [clock, setClock] = useState<string>('10:00:00');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const latStr = toDMS(latitude, true);
          const lonStr = toDMS(longitude, false);
          setCoords(`${latStr} ${lonStr}`);
        },
        () => setCoords('LOCATION UNAVAILABLE')
      );
    } else {
      setCoords('GEOLOCATION NOT SUPPORTED');
    }
  }, []);

  // Clock effect
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      setClock(`${h}:${m}:${s}`);
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='absolute w-full h-auto z-0 pointer-events-none'>
      <div className="flex justify-center items-center text-xs text-[#283963] gap-4 w-full px-16">
        <span>{coords}</span>
        <div
          className="flex-grow min-w-0 border-b-2 border-[#283963] mx-4"
          style={{
            height: 0,
            borderStyle: 'dashed',
            borderImage: 'repeating-linear-gradient(to right, #283963 0 8px, transparent 8px 16px) 30',
          }}
        ></div>
        <span className="flex items-center gap-6">
          <span className="inline-block w-3 h-3 rounded-full bg-yellow-200"></span>
          UNDER DEVELOPMENT
        </span>
      </div>


      <div className="relative w-auto h-[68dvh] pointer-events-none z-0 mt-4  mb-4 mx-24">
        {/* Top left corner */}
        <div className="absolute top-0 left-0">
          <svg width="20" height="20" className="text-[#283963]" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="0,20 0,0 20,0" />
          </svg>
        </div>
        {/* Top right corner */}
        <div className="absolute top-0 right-0">
          <svg width="20" height="20" className="text-[#283963]" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="0,0 20,0 20,20" />
          </svg>
        </div>
        {/* Bottom left corner */}
        <div className="absolute bottom-0 left-0">
          <svg width="20" height="20" className="text-[#283963]" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="0,0 0,20 20,20" />
          </svg>
        </div>
        {/* Bottom right corner */}
        <div className="absolute bottom-0 right-0">
          <svg width="20" height="20" className="text-[#283963]" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="0,20 20,20 20,0" />
          </svg>
        </div>
        {/* Left vertical text - perfectly centered */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 -rotate-90 text-[#283963] text-xs md:text-sm select-none w-max">
          PORTFOLIO • 2026
        </div>
        {/* Right vertical time - perfectly centered */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-90 origin-center text-[#283963] text-xs md:text-sm select-none w-max">
          {clock}
        </div>
        {/* Decorative X bottom left */}
        <div className="absolute bottom-20 left-20">
          <svg width="20" height="20" className="text-[#283963] opacity-70" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="15" x2="15" y2="5" />
            <line x1="5" y1="5" x2="15" y2="15" />
          </svg>
        </div>
        {/* Decorative plus top right */}
        <div className="absolute top-20 right-20">
          <svg width="20" height="20" className="text-[#283963] opacity-70" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="10" y1="4" x2="10" y2="16" />
            <line x1="4" y1="10" x2="16" y2="10" />
          </svg>
        </div>
      </div>

      {isHome && (
        <div className="flex justify-between items-center text-xs text-[#283963] w-full px-4 md:px-16 mt-4 pointer-events-none">
          <span>NUEVA ECIJA, PHILIPPINES</span>
          <span>Copyright © 2026 Renz Censon</span>
        </div>
      )}
    </div>
  );
}

export default SciBorder;