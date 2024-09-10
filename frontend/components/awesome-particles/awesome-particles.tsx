"use client";

import * as React from "react";
import Particles, { initParticlesEngine, IParticlesProps } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export interface AwesomeParticlesProps {
  options?: IParticlesProps["options"];
}
export default function AwesomeParticles ({options}: AwesomeParticlesProps) {
  const [init, setInit] = React.useState(false);
  React.useEffect(() => {
    initParticlesEngine(async (engine) => await loadSlim(engine)).then(() => setInit(true));
  }, []);

  if (!init) {
    return <></>;
  }

  return (
    <Particles id="tsparticles" options={ options } />
  );
}

