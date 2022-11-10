import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";

export function DrumButton(props: any) {
  const { nodes, materials } = useGLTF("/drumbutton.glb");
  const [hover, setHover] = useState(false);
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube002.geometry}
        position={[-2.65, 0.3, -0.56]}
        scale={hover ? [0.2, 0.1, 0.2] : [0.18, 0.05, 0.18]}
        onPointerOver={() => {
          setHover(true);
        }}
        onPointerOut={() => {
          setHover(false);
        }}
        onClick={() => {
          props.setActiveSoundIndex(props.index);
        }}
      >
        <meshStandardMaterial
          color={props.activeSoundIndex == props.index ? "#8593de" : "#4a4f6b"}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("/drumbutton.glb");
