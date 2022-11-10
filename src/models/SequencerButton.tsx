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
        position={[-2.88, 0.3, 0.82]}
        scale={0.05}
      >
        <meshStandardMaterial
          color={
            props.activeSequencerIndex == props.index ? "#8593de" : "#4a4f6b"
          }
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("/sequencerbutton.glb");
