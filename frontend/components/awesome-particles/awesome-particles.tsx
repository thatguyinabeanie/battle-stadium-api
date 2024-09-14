"use client";

import * as React from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useTheme } from "next-themes";

import getAwesomeParticlesOptions from "./getAwesomeParticlesOptions";

export default function AwesomeParticles() {
  const options = getAwesomeParticlesOptions();

  const theme = useTheme();
  const [init, setInit] = React.useState(false);

  React.useEffect(() => {
    initParticlesEngine(async (engine) => {
      return await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  if (!init || !theme.resolvedTheme?.includes("dark")) {
    return <></>;
  }

  // Rest of the code goes here
  return <Particles id="tsparticles" options={options} />;
}
