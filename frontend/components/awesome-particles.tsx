"use client";

import * as React from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { type ISourceOptions, MoveDirection, OutMode } from "@tsparticles/engine";
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
          enable: true,
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
          quantity: 4,
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
        opacity: isLight ? 0.5 : 0.1,
        width: 1,
      },
      move: {
        direction: MoveDirection.none,
        enable: true,
        outModes: {
          default: OutMode.out,
        },
        random: true,
        speed: 0.5,
        straight: false,
      },
      number: {
        density: {
          enable: true,
        },
        value: 500,
        limit: { value: 1000 },
      },
      opacity: {
        value: 1,
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
  const [init, setInit] = React.useState(false);

  const options = useAwesomeParticlesOptions();

  React.useEffect(() => {
    initParticlesEngine(async (engine) => {
      return await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  if (!init) {
    return <></>;
  }

  return <Particles id="tsparticles" options={options} />;
}
