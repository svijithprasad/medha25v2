import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import "./TeamHeadsComponent.css";

const ChromaGrid = ({
  items,
  className = "",
  radius = 300,
  damping = 0.45,
  fadeOut = 0.6,
  ease = "power3.out",
}) => {
  const rootRef = useRef(null);
  const fadeRef = useRef(null);
  const setX = useRef(null);
  const setY = useRef(null);
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    setX.current = gsap.quickSetter(el, "--x", "px");
    setY.current = gsap.quickSetter(el, "--y", "px");
    const { width, height } = el.getBoundingClientRect();
    pos.current = { x: width / 2, y: height / 2 };
    setX.current(pos.current.x);
    setY.current(pos.current.y);
  }, []);

  const moveTo = (x, y) => {
    gsap.to(pos.current, {
      x,
      y,
      duration: damping,
      ease,
      onUpdate: () => {
        setX.current?.(pos.current.x);
        setY.current?.(pos.current.y);
      },
      overwrite: true,
    });
  };

  const handleMove = (e) => {
    const r = rootRef.current.getBoundingClientRect();
    moveTo(e.clientX - r.left, e.clientY - r.top);
    gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });
  };

  const handleLeave = () => {
    gsap.to(fadeRef.current, {
      opacity: 1,
      duration: fadeOut,
      overwrite: true,
    });
  };

  const handleSocialClick = (e, url) => {
    e.stopPropagation();
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleCardMove = (e) => {
    const c = e.currentTarget;
    const rect = c.getBoundingClientRect();
    c.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    c.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  const handleTouchStart = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const touch = e.touches[0];

    // Set mouse position for spotlight effect
    card.style.setProperty("--mouse-x", `${touch.clientX - rect.left}px`);
    card.style.setProperty("--mouse-y", `${touch.clientY - rect.top}px`);

    // Add touched class for color effect
    card.classList.add("touched");
  };

  const handleTouchMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const touch = e.touches[0];

    // Update spotlight position as finger moves
    card.style.setProperty("--mouse-x", `${touch.clientX - rect.left}px`);
    card.style.setProperty("--mouse-y", `${touch.clientY - rect.top}px`);
  };

  const handleTouchEnd = (e) => {
    const card = e.currentTarget;

    // Keep colored for 1200ms after touch ends for better visibility
    setTimeout(() => {
      card.classList.remove("touched");
    }, 1200);
  };

  return (
    <div
      ref={rootRef}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={`chroma-grid-container ${className}`}
      style={{
        "--r": `${radius}px`,
        "--x": "50%",
        "--y": "50%",
        position: "relative",
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "start",
        gap: "1rem",
      }}
    >
      {items.map((c, i) => (
        <article
          key={i}
          onMouseMove={handleCardMove}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={`chroma-card ${c.className || ""}`}
          style={{
            "--card-border": c.borderColor || "transparent",
            background: c.gradient,
            "--spotlight-color": "rgba(255,255,255,0.3)",
          }}
        >
          <div className="chroma-card-spotlight" />
          <div className="chroma-card-image-container">
            <img
              src={c.image}
              alt={c.title}
              loading="lazy"
              className="chroma-card-image "
            />
          </div>
          <footer className="chroma-card-footer">
            <h3 className="chroma-card-title">{c.title}</h3>
            {(c.github || c.linkedin) && (
              <div className="chroma-card-social">
                {c.github && (
                  <a
                    href={c.github}
                    onClick={(e) => handleSocialClick(e, c.github)}
                    className="chroma-social-icon"
                    aria-label="GitHub"
                  >
                    <FaGithub />
                  </a>
                )}
                {c.linkedin && (
                  <a
                    href={c.linkedin}
                    onClick={(e) => handleSocialClick(e, c.linkedin)}
                    className="chroma-social-icon"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin />
                  </a>
                )}
              </div>
            )}
            <p className="chroma-card-subtitle">{c.subtitle}</p>
            {c.handle && <span className="chroma-card-handle">{c.handle}</span>}
          </footer>
        </article>
      ))}
      <div
        className="chroma-mask-outer"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 30,
          backdropFilter: "grayscale(1) brightness(0.78)",
          WebkitBackdropFilter: "grayscale(1) brightness(0.78)",
          background: "rgba(0,0,0,0.001)",
          maskImage:
            "radial-gradient(circle var(--r) at var(--x) var(--y),transparent 0%,transparent 15%,rgba(0,0,0,0.10) 30%,rgba(0,0,0,0.22)45%,rgba(0,0,0,0.35)60%,rgba(0,0,0,0.50)75%,rgba(0,0,0,0.68)88%,white 100%)",
          WebkitMaskImage:
            "radial-gradient(circle var(--r) at var(--x) var(--y),transparent 0%,transparent 15%,rgba(0,0,0,0.10) 30%,rgba(0,0,0,0.22)45%,rgba(0,0,0,0.35)60%,rgba(0,0,0,0.50)75%,rgba(0,0,0,0.68)88%,white 100%)",
        }}
      />
      <div
        ref={fadeRef}
        className="chroma-mask-inner"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          transition: "opacity 250ms",
          zIndex: 40,
          backdropFilter: "grayscale(1) brightness(0.78)",
          WebkitBackdropFilter: "grayscale(1) brightness(0.78)",
          background: "rgba(0,0,0,0.001)",
          maskImage:
            "radial-gradient(circle var(--r) at var(--x) var(--y),white 0%,white 15%,rgba(255,255,255,0.90)30%,rgba(255,255,255,0.78)45%,rgba(255,255,255,0.65)60%,rgba(255,255,255,0.50)75%,rgba(255,255,255,0.32)88%,transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(circle var(--r) at var(--x) var(--y),white 0%,white 15%,rgba(255,255,255,0.90)30%,rgba(255,255,255,0.78)45%,rgba(255,255,255,0.65)60%,rgba(255,255,255,0.50)75%,rgba(255,255,255,0.32)88%,transparent 100%)",
          opacity: 1,
        }}
      />
    </div>
  );
};

export default ChromaGrid;
