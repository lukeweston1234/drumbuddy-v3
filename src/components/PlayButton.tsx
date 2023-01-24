import React, { useRef, useState, useEffect } from "react";
import { useGLTF } from "@react-three/drei";

export function PlayButton(props: any) {
  const { nodes, materials } = useGLTF("/playbutton.glb");
  const [hover, setHover] = useState(false);
  const interval = useRef<number>(0);

  useEffect(() => {
    //This should probably be refactored
    const playSound = () => {
      if (props.playerArray.current.sequence[props.activeSequencerIndex].kick) {
        props.kick.play();
      }
      if (
        props.playerArray.current.sequence[props.activeSequencerIndex].snare
      ) {
        props.snare.play();
      }
      if (props.playerArray.current.sequence[props.activeSequencerIndex].tom) {
        props.tom.play();
      }
      if (
        props.playerArray.current.sequence[props.activeSequencerIndex].openHat
      ) {
        props.openHat.play();
      }
      if (
        props.playerArray.current.sequence[props.activeSequencerIndex].closedHat
      ) {
        props.closedHat.play();
      }
      if (
        props.playerArray.current.sequence[props.activeSequencerIndex].glitch
      ) {
        props.glitch.play();
      }
    };
    if (props.isPlaying) {
      interval.current = setInterval(() => {
        playSound();
        if (
          props.activeSequencerIndex ===
          props.playerArray.current.sequence.length - 1
        ) {
          props.setActiveSequencerIndex(0);
        } else {
          props.setActiveSequencerIndex((state: number) => {
            return state + 1;
          });
        }
      }, 60000 / (120 * 4));
    } else {
      clearInterval(interval.current);
    }
    return () => clearInterval(interval.current);
  }, [props.isPlaying, props.activeSequencerIndex]);

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
          props.setIsPlaying(true);
        }}
      >
        <meshStandardMaterial
          color={props.activeControlButton == "play" ? "#8593de" : "#4a4f6b"}
          emmisive={props.activeControlButton == "play" ? "#8593de" : "#4a4f6b"}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("/playbutton.glb");
