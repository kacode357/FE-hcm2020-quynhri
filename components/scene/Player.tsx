// components/scene/Player.tsx
"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { PointerLockControls } from "@react-three/drei";
import * as THREE from "three";

export default function Player({
  noclip = true,
  speed = 4,
  sprintMultiplier = 2.2,
  mouseLookSpeed = 0.16,
  accel = 32,
  damping = 16,
  startHeight = 2.6,
}: {
  noclip?: boolean;
  speed?: number;
  sprintMultiplier?: number;
  mouseLookSpeed?: number;
  accel?: number;
  damping?: number;
  startHeight?: number;
}) {
  const { camera, gl } = useThree();

  // Initialize camera position
  useEffect(() => {
    camera.position.y = startHeight;
  }, [camera, startHeight]);

  // Track keyboard state
  const keys = useRef<Record<string, boolean>>({});
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      keys.current[e.code] = true;
      if (e.code === "Space") e.preventDefault();
    };
    const up = (e: KeyboardEvent) => {
      keys.current[e.code] = false;
    };
    window.addEventListener("keydown", down, { passive: false });
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down as any);
      window.removeEventListener("keyup", up as any);
    };
  }, []);

  // Movement vectors
  const forward = useMemo(() => new THREE.Vector3(), []);
  const right = useMemo(() => new THREE.Vector3(), []);
  const up = useMemo(() => new THREE.Vector3(0, 1, 0), []);
  const wish = useMemo(() => new THREE.Vector3(), []);
  const vel = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((_, rawDt) => {
    if (document.pointerLockElement !== gl.domElement) return;
    const dt = Math.min(rawDt, 1 / 30);

    // Update direction vectors
    forward.set(0, 0, -1).applyQuaternion(camera.quaternion).normalize();
    right.set(1, 0, 0).applyQuaternion(camera.quaternion);
    right.y = 0;
    if (right.lengthSq() > 0) right.normalize();

    // Read input
    const s = keys.current;
    const pressed = (...codes: string[]) => codes.some((c) => s[c]);
    let fwd = 0,
      str = 0,
      upDown = 0;
    if (pressed("KeyW", "ArrowUp")) fwd += 1;
    if (pressed("KeyS", "ArrowDown")) fwd -= 1;
    if (pressed("KeyA")) str -= 1;
    if (pressed("KeyD")) str += 1;
    if (pressed("Space", "KeyE")) upDown += 1;
    if (pressed("KeyQ", "ControlLeft", "ControlRight")) upDown -= 1;

    // Compute wish vector
    wish.set(0, 0, 0);
    if (fwd !== 0) wish.addScaledVector(forward, fwd);
    if (str !== 0) wish.addScaledVector(right, str);
    if (noclip && upDown !== 0) wish.addScaledVector(up, upDown);
    if (wish.lengthSq() > 0) wish.normalize();

    // Apply speed and sprint
    const maxSpeed = speed * (pressed("ShiftLeft", "ShiftRight") ? sprintMultiplier : 1);
    const target = wish.multiplyScalar(maxSpeed);
    vel.current.lerp(target, 1 - Math.exp(-accel * dt));

    // Apply damping
    if (wish.lengthSq() === 0 && vel.current.lengthSq() > 0) {
      const damp = Math.exp(-damping * dt);
      vel.current.multiplyScalar(damp);
      if (vel.current.lengthSq() < 1e-6) vel.current.set(0, 0, 0);
    }

    // Update camera position
    if (vel.current.lengthSq() > 0) {
      camera.position.addScaledVector(vel.current, dt);
    }
  });

  return (
    <PointerLockControls
      pointerSpeed={mouseLookSpeed}
      enabled={true}
      camera={camera as THREE.Camera}
      domElement={gl.domElement as unknown as HTMLElement}
    />
  );
}