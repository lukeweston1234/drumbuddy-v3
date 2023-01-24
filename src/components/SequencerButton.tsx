import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";

export function SequencerButton(props: any) {
  const { nodes, materials } = useGLTF("/sequencerbutton.glb");
  const [hover, setHover] = useState(false);
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube001.geometry}
        position={[-2.88, 0.3, 0.82]}
        scale={hover ? 0.06 : 0.05}
        onPointerOver={() => {
          setHover(true);
        }}
        onPointerOut={() => {
          setHover(false);
        }}
        onClick={() => {
          //sigh
          props.playerArray.current.sequence[props.index][props.soundName] =
            !props.playerArray.current.sequence[props.index][props.soundName];
        }}
      >
        <meshStandardMaterial
          color={
            props.activeSequencerIndex == props.index ? "#8593de" : "#4a4f6b"
          }
          emissive={
            props.activeSoundIndex == props.index ? "#8593de" : "#4a4f6b"
          }
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("/sequencerbutton.glb");
