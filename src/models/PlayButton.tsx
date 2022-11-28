import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";

export function PlayButton(props: any) {
  const { nodes, materials } = useGLTF("/playbutton.glb");
  const [hover, setHover] = useState(false);

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane.geometry}
        rotation={[0, Math.PI / 4, 0]}
        scale={hover ? [0.35, 0.6, 0.35] : [0.3, 0.5, 0.3]}
        onPointerEnter={() => {
          setHover(true);
        }}
        onPointerLeave={() => {
          setHover(false);
        }}
        onClick={() => {
          props.setActiveControlButton("play");
        }}
      >
        <meshStandardMaterial
          color={props.activeControlButton == "play" ? "#8593de" : "#4a4f6b"}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("/playbutton.glb");
