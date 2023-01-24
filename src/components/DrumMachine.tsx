import React, { useEffect, useRef, useState } from "react";
import { Howl } from "howler";
import { useGLTF } from "@react-three/drei";
import { DrumButton } from "./DrumButton";
import { PlayButton } from "./PlayButton";
import { PauseButton } from "./PauseButton";
import { StopButton } from "./StopButton";
import { SequencerButton } from "./SequencerButton";

interface Sequencer {
  sequence: Array<SequencerStep>;
}

interface SequencerStep {
  kick: boolean;
  snare: boolean;
  tom: boolean;
  closedHat: boolean;
  openHat: boolean;
  glitch: boolean;
}

export function DrumMachine(props: any) {
  const { nodes, materials } = useGLTF("/drummachine.glb");
  const [activeControlButton, setActiveControlButton] = useState("pause");
  const [activeSoundIndex, setActiveSoundIndex] = useState(0);
  const [activeSequencerIndex, setActiveSequencerIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const kick: Howl = new Howl({ src: "/sounds/Kick.wav" });
  const snare: Howl = new Howl({ src: "/sounds/Snare.wav" });
  const tom: Howl = new Howl({ src: "/sounds/Tom.wav" });
  const closedHat: Howl = new Howl({ src: "/sounds/ClosedHat.wav" });
  const openHat: Howl = new Howl({ src: "/sounds/OpenHat.wav" });
  const glitch: Howl = new Howl({ src: "/sounds/Glitch.wav" });

  const soundArray: Array<Howl> = [
    kick,
    snare,
    tom,
    closedHat,
    openHat,
    glitch,
  ];

  const soundNames: Array<String> = [
    "kick",
    "snare",
    "tom",
    "closedHat",
    "openHat",
    "glitch",
  ];

  const playerArray: React.MutableRefObject<Sequencer> = useRef({
    sequence: [...Array(16)].map(() => {
      let step: SequencerStep = {
        kick: false,
        snare: false,
        tom: false,
        closedHat: false,
        openHat: false,
        glitch: false,
      };
      return step;
    }),
  });

  useEffect(() => {
    console.log(activeControlButton);
    console.log(playerArray.current);
  }, [activeControlButton]);

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
      {[0, 1, 2].map((n) => {
        const x = n * 0.5 + 1.25;
        const y = 0;
        const z = 0.1;
        return (
          <DrumButton
            key={n}
            index={n}
            position={[x, y, z]}
            activeSoundIndex={activeSoundIndex}
            setActiveSoundIndex={setActiveSoundIndex}
            sound={soundArray[n]}
          />
        );
      })}
      {[0, 1, 2].map((n) => {
        const x = n * 0.5 + 1.25;
        const y = 0;
        const z = 0.6;
        return (
          <DrumButton
            key={3 + n}
            index={3 + n}
            position={[x, y, z]}
            activeSoundIndex={activeSoundIndex}
            setActiveSoundIndex={setActiveSoundIndex}
            sound={soundArray[n + 3]}
          />
        );
      })}
      {[...Array(16).keys()].map((n) => {
        const x = n * 0.23 + 1.15;
        const y = 0;
        const z = 0;
        return (
          <SequencerButton
            key={n}
            index={n}
            position={[x, y, z]}
            activeSequencerIndex={activeSequencerIndex}
            soundName={soundNames[activeSoundIndex]}
            playerArray={playerArray}
          />
        );
      })}
      <PlayButton
        position={[-0.3, 0.3, 0.5]}
        scale={[0.2, 0.2, 0.2]}
        activeControlButton={activeControlButton}
        setActiveControlButton={setActiveControlButton}
        playerArray={playerArray}
        activeSequencerIndex={activeSequencerIndex}
        setActiveSequencerIndex={setActiveSequencerIndex}
        setIsPlaying={setIsPlaying}
        isPlaying={isPlaying}
        kick={kick}
        snare={snare}
        tom={tom}
        openHat={openHat}
        closedHat={closedHat}
        glitch={glitch}
      />
      <PauseButton
        position={[-0.05, 0.3, 0.5]}
        scale={[0.25, 0.25, 0.25]}
        activeControlButton={activeControlButton}
        setActiveControlButton={setActiveControlButton}
        setIsPlaying={setIsPlaying}
        isPlaying={isPlaying}
      />
      <StopButton
        position={[0.17, 0.3, 0.5]}
        scale={[0.6, 0.3, 0.6]}
        activeControlButton={activeControlButton}
        setActiveControlButton={setActiveControlButton}
        setIsPlaying={setIsPlaying}
        isPlaying={isPlaying}
        setActiveSequencerIndex={setActiveSequencerIndex}
      />
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
