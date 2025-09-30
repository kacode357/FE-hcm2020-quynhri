// components/scene/Environment.tsx
"use client";

import * as THREE from "three";
import { useEffect, useMemo, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

function Exposure({ value }: { value: number }) {
  const { gl } = useThree();
  useEffect(() => {
    const prev = gl.toneMappingExposure;
    gl.toneMappingExposure = value;
    return () => { gl.toneMappingExposure = prev; };
  }, [gl, value]);
  return null;
}

/** ====== DEFAULT ====== */
const ROOM = {
  width: 14,
  depth: 10,
  height: 6.5,
  wallThickness: 0.2,
  colors: { wall: "#facc15", floor: "#0b0f14" },
  brightness: 1.25,
};
const LIGHTING = {
  hemiIntensity: 0.7,
  dirIntensity: 1.2,
  fillIntensity: 0.8,
  ambIntensity: 0.35,
  exposure: 1.15,
};

/** ====== CEILING (GLB được neo “sát trần” và lọt tường) ====== */
function CeilingGLB({
  url,
  roomWidth,
  roomDepth,
  roomHeight,
  wallThickness,
  inset = 0.02,             // thụt vào mỗi bên để không chạm tường
  yOffset = -0.005,         // chống z-fighting
  rotate = [Math.PI / 2, 0, 0] as [number, number, number], // đa số trần cần xoay X 90°
  fit = "cover" as "cover" | "contain" | "stretch",
  materialOverride,
}: {
  url: string;
  roomWidth: number;
  roomDepth: number;
  roomHeight: number;
  wallThickness: number;
  inset?: number;
  yOffset?: number;
  rotate?: [number, number, number];
  fit?: "cover" | "contain" | "stretch";
  materialOverride?: (m: THREE.Material) => void;
}) {
  const gltf = useGLTF(url) as unknown as { scene: THREE.Object3D };
  // clone để không sửa scene gốc
  const model = useMemo(() => gltf.scene.clone(true), [gltf.scene]);

  // Bật shadow + override vật liệu
  useMemo(() => {
    model.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if ((mesh as any).isMesh) {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        mats?.forEach((m) => materialOverride?.(m));
      }
    });
  }, [model, materialOverride]);

  // Một group trung gian để dễ tính bbox sau khi xoay/scale
  const holderRef = useRef<THREE.Group>(null);

  // Tính scale theo kích thước *lọt tường*
  const scaleVec = useMemo<[number, number, number]>(() => {
    // kích thước phủ được bên trong tường
    const targetW = Math.max(0.01, roomWidth - wallThickness * 2 - inset * 2);
    const targetD = Math.max(0.01, roomDepth - wallThickness * 2 - inset * 2);

    // bbox gốc (chưa xoay/scale)
    const box = new THREE.Box3().setFromObject(model);
    const size = new THREE.Vector3(); box.getSize(size);
    if (size.x < 1e-4) size.x = 1;
    if (size.z < 1e-4) size.z = 1;

    const sx = targetW / size.x;
    const sz = targetD / size.z;

    if (fit === "stretch") return [sx, (sx + sz) / 2, sz];
    if (fit === "contain") {
      const s = Math.min(sx, sz);
      return [s, s, s];
    }
    // cover
    const s = Math.max(sx, sz);
    return [s, s, s];
  }, [model, roomWidth, roomDepth, wallThickness, inset, fit]);

  // Sau khi áp xoay + scale, neo đỉnh trần = 0 (local) để đặt vào y=roomHeight
  useEffect(() => {
    const g = holderRef.current;
    if (!g) return;

    // reset
    g.rotation.set(0, 0, 0);
    g.scale.set(1, 1, 1);
    g.position.set(0, 0, 0);

    // áp xoay + scale
    g.rotation.set(rotate[0], rotate[1], rotate[2]);
    g.scale.set(scaleVec[0], scaleVec[1], scaleVec[2]);

    // tính bbox sau transform
    const box = new THREE.Box3().setFromObject(g);
    const maxY = box.max.y; // “đỉnh” (top) của trần trong local holder
    // dịch model xuống sao cho top nằm đúng y=0
    g.position.y -= maxY;
  }, [rotate, scaleVec]);

  // Group parent sẽ đặt ở cao độ roomHeight + yOffset
  return (
    <group position={[0, roomHeight + yOffset, 0]}>
      <group ref={holderRef}>
        <primitive object={model} />
      </group>
    </group>
  );
}
useGLTF.preload("/model_3d/staircase_ceiling.glb");

export default function Environment({
  roomWidth = ROOM.width,
  roomDepth = ROOM.depth,
  roomHeight = ROOM.height,
  wallThickness = ROOM.wallThickness,
  wallColor = ROOM.colors.wall,
  floorColor = ROOM.colors.floor,
  brightness = ROOM.brightness,

  ceilingUrl = "/model_3d/staircase_ceiling.glb",
  ceilingFit = "cover",
  ceilingInset = 0.02,
  ceilingYOffset = -0.005,
  ceilingRotate = [Math.PI / 2, 0, 0] as [number, number, number],
  ceilingMaterial,
}: {
  roomWidth?: number;
  roomDepth?: number;
  roomHeight?: number;
  wallThickness?: number;
  wallColor?: string;
  floorColor?: string;
  brightness?: number;

  ceilingUrl?: string;
  ceilingFit?: "cover" | "contain" | "stretch";
  ceilingInset?: number;
  ceilingYOffset?: number;
  ceilingRotate?: [number, number, number];
  ceilingMaterial?: (m: THREE.Material) => void;
}) {
  const halfW = roomWidth / 2;
  const halfD = roomDepth / 2;

  return (
    <>
      {/* môi trường */}
      <Exposure value={LIGHTING.exposure * brightness} />
      <color attach="background" args={["#0e141b"]} />
      <fog attach="fog" args={["#0e141b", Math.max(roomWidth, roomDepth), Math.max(roomWidth, roomDepth) * 3]} />

      <hemisphereLight intensity={LIGHTING.hemiIntensity * brightness} groundColor={"#2a2a2a"} />
      <directionalLight
        castShadow
        position={[halfW * 0.8, roomHeight + 4, halfD * 0.8]}
        intensity={LIGHTING.dirIntensity * brightness}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <directionalLight position={[-halfW * 0.7, roomHeight + 2, -halfD * 0.7]} intensity={LIGHTING.fillIntensity * brightness} />
      <ambientLight intensity={LIGHTING.ambIntensity * brightness} />

      {/* sàn */}
      <mesh rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[roomWidth, roomDepth]} />
        <meshStandardMaterial color={floorColor} roughness={0.86} metalness={0.04} />
      </mesh>

      {/* tường */}
      <mesh castShadow receiveShadow position={[-halfW + wallThickness / 2, roomHeight / 2, 0]}>
        <boxGeometry args={[wallThickness, roomHeight, roomDepth]} />
        <meshStandardMaterial color={wallColor} roughness={0.95} metalness={0} />
      </mesh>
      <mesh castShadow receiveShadow position={[halfW - wallThickness / 2, roomHeight / 2, 0]}>
        <boxGeometry args={[wallThickness, roomHeight, roomDepth]} />
        <meshStandardMaterial color={wallColor} roughness={0.95} metalness={0} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, roomHeight / 2, -halfD + wallThickness / 2]}>
        <boxGeometry args={[roomWidth, roomHeight, wallThickness]} />
        <meshStandardMaterial color={wallColor} roughness={0.95} metalness={0} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, roomHeight / 2, halfD - wallThickness / 2]}>
        <boxGeometry args={[roomWidth, roomHeight, wallThickness]} />
        <meshStandardMaterial color={wallColor} roughness={0.95} metalness={0} />
      </mesh>

      {/* TRẦN LỌT PHÒNG */}
      <CeilingGLB
        url={ceilingUrl}
        roomWidth={roomWidth}
        roomDepth={roomDepth}
        roomHeight={roomHeight}
        wallThickness={wallThickness}
        inset={ceilingInset}
        yOffset={ceilingYOffset}
        rotate={ceilingRotate}
        fit={ceilingFit}
        materialOverride={ceilingMaterial}
      />
    </>
  );
}
