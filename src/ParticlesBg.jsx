import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useCallback, useEffect, useState } from "react";

export default function ParticlesBg() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = useCallback((container) => {
    console.log("Particles loaded!");
  }, []);

  if (!init) {
    return null;
  }

  return (
    <Particles
      id="tsparticles"
      particlesLoaded={particlesLoaded}
      options={{
        fullScreen: { 
          enable: false,
          zIndex: -1
        },
        background: { 
          color: { value: "transparent" } 
        },
        fpsLimit: 60,
        particles: {
          // 🚀 MASSIVE PARTICLE COUNT
          number: { 
            value: 300,        // 2.5x more particles!
            density: { 
              enable: true, 
              area: 800         // Tighter density
            }
          },
          color: { 
            value: [
              "#00b4ff", "#ff0080", "#ff8c00", "#00ff88", "#8a2be2", "#ffffff"
            ] 
          },
          shape: {
            type: "circle"
          },
          opacity: {
            value: 0.5,        // Slightly lower for performance
            random: true,
            animation: {
              enable: true,
              speed: 1,
              minimumValue: 0.1
            }
          },
          size: {
            value: { min: 0.8, max: 4 },  // Smaller particles = more count
            random: true,
            animation: {
              enable: true,
              speed: 3,
              minimumValue: 0.3
            }
          },
          links: {
            enable: true,
            distance: 120,     // Shorter links for density
            color: "#ffffff",
            opacity: 0.2,
            width: 0.8,
            triangles: {
              enable: true,
              opacity: 0.03
            }
          },
          move: {
            enable: true,
            speed: 1.2,
            direction: "none",
            random: true,
            outModes: {
              default: "destroy"
            }
          }
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "repulse"
            },
            onClick: {
              enable: true,
              mode: "push"
            },
            resize: true
          },
          modes: {
            repulse: {
              distance: 150,
              duration: 0.4
            },
            push: {
              quantity: 6       // More particles on click!
            }
          }
        },
        detectRetina: true
      }}
      className="fixed inset-0 pointer-events-none"
    />
  );
}
