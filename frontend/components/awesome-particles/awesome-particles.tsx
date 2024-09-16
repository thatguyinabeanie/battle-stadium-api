"use client";

import * as React from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

import getAwesomeParticlesOptions from "./getAwesomeParticlesOptions";

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

  const options = getAwesomeParticlesOptions();

  return <Particles id="tsparticles" options={options} />;
}
