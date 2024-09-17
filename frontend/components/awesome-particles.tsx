"use client";

import * as React from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { type ISourceOptions, MoveDirection, OutMode } from "@tsparticles/engine";

const defaultOptions: ISourceOptions = {
  fullScreen: {
    enable: true,
    zIndex: 0,
  },
  background: {
    color: {
      value: "#0D001A",
    },
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
      value: "#ffffff",
    },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.25,
      width: 1,
    },
    move: {
      direction: MoveDirection.none,
      enable: true,
      outModes: {
        default: OutMode.out,
      },
      random: true,
      speed: 1.5,
      straight: false,
    },
    number: {
      density: {
        enable: true,
      },
      value: 100,
      limit: { value: 200 },
    },
    opacity: {
      value: 0.3,
    },
    shape: {
      type: "circle",
    },
    size: {
      value: { min: 1, max: 5 },
    },
  },
  detectRetina: true,
  smooth: true,
};

export default function AwesomeParticles() {
  const [init, setInit] = React.useState(false);

  React.useEffect(() => {
    initParticlesEngine(async (engine) => {
      return await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  if (!init) {
    return <></>;
  }

  return <Particles id="tsparticles" options={defaultOptions} />;
}