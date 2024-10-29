"use client";

import { useState, useEffect } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { type ISourceOptions, MoveDirection } from "@tsparticles/engine";
import { useTheme } from "next-themes";

const useAwesomeParticlesOptions = (): ISourceOptions => {
  const { theme } = useTheme();

  const isLight = theme?.includes("light");

  return {
    fullScreen: {
      enable: true,
      zIndex: 0,
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: {
          enable: false,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "repulse",
        },
      },
      modes: {
        push: {
          quantity: 20,
        },
        repulse: {
          distance: 100,
          quantity: 3,
        },
      },
    },
    particles: {
      color: {
        value: isLight ? "#555" : "#fff",
      },
      links: {
        color: isLight ? "#555" : "#fff",
        distance: 150,
        enable: true,
        opacity: 0.3,
        width: 0.5,
      },
      move: {
        direction: MoveDirection.none,
        enable: true,
        random: true,
        speed: 1,
        straight: false,
      },
      number: {
        density: {
          enable: true,
        },
        value: 500,
        limit: { value: 600 },
      },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 0.2, max: 1.5 },
      },
    },
    detectRetina: true,
    smooth: true,
  };
};

export default function AwesomeParticles() {
  const [init, setInit] = useState(false);

  const options = useAwesomeParticlesOptions();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      return await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  if (!init) {
    return <></>;
  }

  return <Particles id="tsparticles" options={options} />;
}
