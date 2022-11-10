import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { DrumButton } from "./DrumButton";
import { SequencerButton } from "./SequencerButton";

export function DrumMachine(props: any) {
  const { nodes, materials } = useGLTF("/drummachine.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        material={materials.Material}
        rotation={[0, 0, -Math.PI]}
        scale={[1.94, 0.3, 1]}
      />
      {[...Array(3).keys()].map((n) => {
        const x = n * 0.5 + 1.25;
        const y = 0;
        const z = 0.1;
        return <DrumButton key={n} position={[x, y, z]} />;
      })}
      {[...Array(3).keys()].map((n) => {
        const x = n * 0.5 + 1.25;
        const y = 0;
        const z = 0.6;
        return <DrumButton key={n * 2} position={[x, y, z]} />;
      })}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane.geometry}
        material={materials["Material.004"]}
        position={[0.92, 0.31, -0.44]}
        scale={[0.81, 0.41, 0.31]}
      />
    </group>
  );
}

useGLTF.preload("/drummachine.glb");
