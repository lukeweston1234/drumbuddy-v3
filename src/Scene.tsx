import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { DrumMachine } from "./components/DrumMachine";
import {
  Environment,
  Backdrop,
  OrbitControls,
  PresentationControls,
} from "@react-three/drei";

function Box(props: any) {
  const mesh = useRef<any>(null);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}

function Scene() {
  return (
    <div className="h-full">
      <Canvas camera={{ position: [0, 4, 1.5], fov: 80 }}>
        <pointLight position={[10, 10, 10]} />
        <PresentationControls
          global
          config={{ mass: 2, tension: 500 }}
          snap={{ mass: 4, tension: 300 }}
          rotation={[-0.3, 0, 0]}
          polar={[-Math.PI / 3, Math.PI / 3]}
          azimuth={[-Math.PI / 1.4, Math.PI / 2]}
        >
          <DrumMachine position={[0, 0, 0]} />
        </PresentationControls>
        <Backdrop
          receiveShadow
          scale={[40, 5, 5]}
          floor={1.5}
          position={[0, -1, -4]}
        >
          <meshPhysicalMaterial roughness={0.8} color="#0a0817" />
        </Backdrop>
        <Environment
          files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/peppermint_powerplant_2_1k.hdr"
          background
          blur={0.7}
        />
      </Canvas>
    </div>
  );
}
export { Scene };
