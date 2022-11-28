import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";

export function PauseButton(props: any) {
  const { nodes, materials } = useGLTF("/pausebutton.glb");
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        material={nodes.Cube.material}
        position={[-0.18, 0, 0]}
        rotation={[0, 0, -Math.PI]}
        scale={hover ? [0.04, 0.04, 0.4] : [0.03, 0.03, 0.3]}
        onPointerEnter={() => {
          setHover(true);
        }}
        onPointerLeave={() => {
          setHover(false);
        }}
        onClick={() => {
          props.setActiveControlButton("pause");
        }}
      >
        <meshStandardMaterial
          color={props.activeControlButton == "pause" ? "#8593de" : "#4a4f6b"}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube001.geometry}
        material={nodes.Cube001.material}
        position={[0.17, 0, 0]}
        rotation={[0, 0, -Math.PI]}
        scale={hover ? [0.04, 0.04, 0.4] : [0.03, 0.03, 0.3]}
        onPointerEnter={() => {
          setHover(true);
        }}
        onPointerLeave={() => {
          setHover(false);
        }}
        onClick={() => {
          props.setActiveControlButton("pause");
        }}
      >
        <meshStandardMaterial
          color={props.activeControlButton == "pause" ? "#8593de" : "#4a4f6b"}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("/pausebutton.glb");
