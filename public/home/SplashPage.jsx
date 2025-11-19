import { useEffect, useRef, useState } from 'react';

const SplashPage = () => {
  const starsContainerRef = useRef(null);
  const splashContainerRef = useRef(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  // Create animated stars
  const createStars = () => {
    const starsContainer = starsContainerRef.current;
    if (!starsContainer) return;
    
    const starCount = 500;
    
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.className = 'absolute bg-white rounded-full shadow-[0_0_3px_rgba(255,255,255,0.6)] animate-twinkle';
      
      if (i % 25 === 0) {
        star.className += ' shooting-star bg-gradient-to-r from-white to-transparent w-0.5 h-0.5 animate-shooting-star';
      } else {
        const sizeRandom = Math.random();
        let size;
        if (sizeRandom > 0.9) {
          size = Math.random() * 2 + 2;
        } else if (sizeRandom > 0.7) {
          size = Math.random() * 1 + 1.5;
        } else {
          size = Math.random() * 0.5 + 1;
        }
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
      }
      
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.animationDelay = `${Math.random() * 5}s`;
      star.style.animationDuration = `${Math.random() * 3 + 2}s`;
      
      const opacityRandom = Math.random();
      let opacity;
      if (opacityRandom > 0.95) {
        opacity = Math.random() * 0.3 + 0.7;
      } else if (opacityRandom > 0.8) {
        opacity = Math.random() * 0.2 + 0.5;
      } else {
        opacity = Math.random() * 0.3 + 0.2;
      }
      star.style.opacity = opacity;
      
      starsContainer.appendChild(star);
    }
  };

  // Create floating particles
  const createParticles = () => {
    const container = splashContainerRef.current;
    if (!container) return;
    
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle absolute w-[3px] h-[3px] bg-radial-gradient rounded-full pointer-events-none z-15 shadow-[0_0_6px_rgba(255,255,255,0.6)] animate-particle-float';
      particle.style.background = 'radial-gradient(circle, rgba(255, 255, 255, 0.9), rgba(255, 200, 150, 0.5))';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.bottom = '-10px';
      particle.style.animationDelay = `${Math.random() * 5}s`;
      particle.style.animationDuration = `${Math.random() * 4 + 4}s`;
      container.appendChild(particle);
    }
  };

  // Handle age gate buttons
  const handleYesClick = (e) => {
    e.preventDefault();
    setAlertMessage("Access Granted! Navigating to /products/ ...");
    setShowAlert(true);
  };

  const handleNoClick = (e) => {
    e.preventDefault();
    setAlertMessage("Access Denied. Redirecting to Google Earth...");
    setShowAlert(true);
    
    setTimeout(() => {
      window.location.href = "https://earth.google.com/";
    }, 100);
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  // Add parallax effect
  const handleMouseMove = (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    const planet = document.querySelector('.planet-bg');
    const planetSurface = document.querySelector('.planet-surface');
    const rocks = document.querySelector('.floating-rocks');
    const astronaut = document.querySelector('.astronaut');
    
    if (planet) {
      planet.style.transform = `translateX(calc(-50% + ${mouseX * 20 - 10}px))`;
    }
    
    if (planetSurface) {
      planetSurface.style.transform = `translateX(calc(-50% + ${mouseX * 30 - 15}px))`;
    }
    
    if (rocks) {
      rocks.style.transform = `translate(${mouseX * 10 - 5}px, ${mouseY * 10 - 5}px)`;
    }
    
    if (astronaut) {
      astronaut.style.transform = `translate(calc(-50% + ${mouseX * 15 - 7.5}px), calc(-50% + ${mouseY * 15 - 7.5}px))`;
    }
  };

  useEffect(() => {
    // Initialize dynamic elements
    createStars();
    createParticles();

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div id="main-content" className="w-full h-full">
      {/* Header */}
      <header className="fixed top-10 left-12 right-12 z-50 flex justify-center items-center pointer-events-none animate-fade-in-down">
        <div className="logo pointer-events-auto">
          <span className="text-white opacity-95 text-sm font-medium transition-all duration-300 ease-in-out relative z-10 text-shadow-lg hover:scale-110 hover:text-shadow-xl">
            COPILOT
          </span>
        </div>
      </header>

      {/* Main Splash Container */}
      <div 
        ref={splashContainerRef}
        className="relative w-screen h-screen overflow-hidden bg-[#5d101f] bg-cover bg-center bg-no-repeat bg-blend-overlay"
        style={{
          backgroundImage: `linear-gradient(circle at 50% 30%,rgb(238, 37, 15) 0%,rgb(241, 29, 54) 80%,rgb(248, 0, 50) 100%), url('https://hellocopilot.com/wp-content/themes/copilot/img/touchdown/webp/1.png.webp')`
        }}
      >
        {/* Glow Overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none animate-glow-pulse bg-radial-gradient" 
             style={{background: 'radial-gradient(ellipse at 50% 20%, rgba(255, 150, 50, 0.3) 0%, transparent 50%)'}} />

        {/* Stars Background */}
        <div ref={starsContainerRef} className="absolute inset-0 z-0" />

        {/* Planet Background */}
        <img 
          src="https://hellocopilot.com/wp-content/themes/copilot/img/home-page/webp/home-planet-bg.png.webp" 
          className="planet-bg absolute top-[5%] left-1/2 w-3/5 max-w-[800px] -translate-x-1/2 z-20 opacity-80 blur-xl animate-pulse-custom"
          alt="Red planet background"
        />

        {/* Planet Surface */}
        <img 
          src="https://hellocopilot.com/wp-content/themes/copilot/img/takeoff/webp/planet-yellow-sativa.png.webp" 
          className="planet-surface absolute top-[5%] left-[65%] w-[30%] max-w-[800px] -translate-x-1/2 z-25 animate-slow-spin animate-planet-glow"
          style={{
            filter: 'drop-shadow(0 0 40px rgba(255, 165, 0, 0.6)) drop-shadow(0 0 80px rgba(255, 100, 0, 0.3))'
          }}
          alt="Crated planet surface"
        />

        {/* Floating Rocks */}
        <img 
          src="https://hellocopilot.com/wp-content/themes/copilot/img/home-page/webp/home-rocks.png.webp" 
          className="floating-rocks absolute inset-0 object-cover object-center z-30 opacity-90 animate-float-rocks"
          style={{
            filter: 'drop-shadow(0 5px 15px rgba(0, 0, 0, 0.5))'
          }}
          alt="Floating rocks in space"
        />

        {/* Marquee Text */}
        <div className="marquee absolute top-[20%] left-0 w-full z-40 whitespace-nowrap overflow-hidden opacity-100 pointer-events-none">
          <div className="marquee-inner inline-block font-rustea text-[15vw] font-semibold bg-gradient-to-b from-white to-[#ffcccc] bg-clip-text text-transparent animate-marquee text-shadow-lg text-shadow-white tracking-tighter">
            <span>MEDHA 2K25 &nbsp;&nbsp;</span>
            <span>MEDHA 2K25 &nbsp;&nbsp;</span>
            <span>MEDHA 2K25 &nbsp;&nbsp;</span>
          </div>
        </div>

        {/* Astronaut */}
        <img 
          src="https://hellocopilot.com/wp-content/themes/copilot/img/home-page/webp/home-astronaut.png.webp" 
          className="astronaut absolute top-[110%] left-[60%] h-[90%] w-auto -translate-x-1/2 -translate-y-1/2 z-40 min-h-[400px] animate-float-astronaut"
          style={{
            filter: 'drop-shadow(0 15px 40px rgba(0, 0, 0, 0.6)) drop-shadow(0 0 30px rgba(255, 100, 150, 0.2))'
          }}
          alt="Astronaut in a pink spacesuit"
        />

        {/* Spaceship Floor */}
        <img 
          src="https://hellocopilot.com/wp-content/themes/copilot/img/home-page/webp/home-spaceship-page.png.webp" 
          className="spaceship-floor absolute bottom-0 left-0 w-full h-[120%] object-contain object-bottom z-35 animate-fade-in"
          style={{
            filter: 'drop-shadow(0 -10px 40px rgba(0, 0, 0, 0.7))'
          }}
          alt="Interior of a spaceship cockpit"
        />

        

        {/* Orbit Rings */}
        <div className="orbit-ring absolute w-[300px] h-[300px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-white/10 rounded-full animate-rotate-orbit pointer-events-none"></div>
        <div className="orbit-ring absolute w-[450px] h-[450px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-white/10 rounded-full animate-rotate-orbit pointer-events-none" 
             style={{animationDuration: '35s', animationDirection: 'reverse'}}></div>
      </div>

      {/* Alert Modal */}
      {showAlert && (
        <div 
          className="fixed inset-0 z-100 flex items-center justify-center p-5 bg-black/85 backdrop-blur-sm animate-fade-in"
          onClick={closeAlert}
        >
          <div 
            className="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 text-white p-12 rounded-2xl text-center border border-white/20 shadow-2xl shadow-black/90 backdrop-blur-xl max-w-[90%] w-[450px] relative animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/5 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <p className="mb-8 text-[clamp(1.05rem,3vw,1.3rem)] font-medium leading-relaxed">
              {alertMessage}
            </p>
            <button 
              onClick={closeAlert}
              className="px-10 py-3 bg-gradient-to-br from-[#d93a3e] via-[#ff6b6b] to-[#ff8888] border-none text-white rounded-full font-bold cursor-pointer transition-all duration-400 text-[clamp(0.95rem,2.5vw,1.05rem)] uppercase tracking-widest shadow-lg shadow-[#d93a3e]/50 relative overflow-hidden hover:-translate-y-0.5"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SplashPage;