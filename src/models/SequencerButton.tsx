import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function SequencerButton(props: any) {
  const { nodes, materials } = useGLTF("/sequencerbutton.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube001.geometry}
        material={materials["Material.001"]}
        position={[-2.88, 0.3, 0.82]}
        scale={0.05}
      />
    </group>
  );
}

useGLTF.preload("/sequencerbutton.glb");
