import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";

export function StopButton(props: any) {
  const { nodes, materials } = useGLTF("/stopbutton.glb");
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube002.geometry}
        material={nodes.Cube002.material}
        position={[0, 0, 0]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={hover ? [0.12, 0.12, 0.12] : [0.1, 0.1, 0.1]}
        onPointerEnter={() => {
          setHover(true);
        }}
        onPointerLeave={() => {
          setHover(false);
        }}
        onClick={() => {
          props.setActiveControlButton("stop");
        }}
      >
        <meshStandardMaterial
          color={props.activeControlButton == "stop" ? "#8593de" : "#4a4f6b"}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("/stopbutton.glb");
