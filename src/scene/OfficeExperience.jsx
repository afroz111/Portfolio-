import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, ContactShadows, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function Building() {
  const doorL = useRef(), doorR = useRef(), visitor = useRef(), receptionistArm = useRef();
  const legA = useRef(), legB = useRef(), armA = useRef(), armB = useRef();
  const deskGlow = useRef();
  useFrame(({ clock, camera }) => {
    const t = clock.getElapsedTime();
    const open = THREE.MathUtils.smoothstep(t, 2.2, 4.4);
    if (doorL.current) doorL.current.rotation.y = -open * 1.12;
    if (doorR.current) doorR.current.rotation.y = open * 1.12;
    const walk = (from, to, a, b) => THREE.MathUtils.lerp(from, to, THREE.MathUtils.clamp((t-a)/(b-a),0,1));
    let z = 6.5, moving = false;
    if (t > 4.4 && t < 8.2) { z = walk(6.5, -3.1, 4.4, 8.2); moving = true; }
    else if (t >= 8.2 && t < 10.1) z = -3.1;
    else if (t >= 10.1 && t < 14.3) { z = walk(-3.1, -9.8, 10.1, 14.3); moving = true; }
    else if (t >= 14.3 && t < 15.2) z = -9.8;
    else if (t >= 15.2) { z = walk(-9.8, -18.4, 15.2, 21); moving = t < 21; }
    if (visitor.current) visitor.current.position.z = z;
    const gait = moving ? Math.sin(t*8.5)*.48 : 0;
    if (legA.current) legA.current.rotation.x = gait;
    if (legB.current) legB.current.rotation.x = -gait;
    if (armA.current) armA.current.rotation.x = -gait*.55;
    if (armB.current) armB.current.rotation.x = gait*.55;
    if (receptionistArm.current) receptionistArm.current.rotation.z = t > 8.15 && t < 10.2 ? -.85*Math.sin((t-8.15)*Math.PI/2.05) : 0;
    if (deskGlow.current) deskGlow.current.material.emissiveIntensity = .5 + Math.sin(t*1.6)*.18;
    const targetZ = t < 4.4 ? 1.8 : t < 8.2 ? z+7.2 : t < 10.1 ? -1.5 : t < 14.3 ? z+7.2 : z+7.2;
    const desired = new THREE.Vector3(0, 4.4, targetZ);
    camera.position.lerp(desired, .026);
    camera.lookAt(0, 1.65, Math.min(-1, z-3.5));
  });

  return <group>
    <mesh receiveShadow position={[0,-.22,-6]}><boxGeometry args={[27,.35,34]}/><meshStandardMaterial color="#111b2b" roughness={.8}/></mesh>
    <gridHelper args={[27,27,'#27435a','#1b2c40']} position={[0,-.035,-6]}/>
    {Array.from({length:12},(_,i)=><mesh key={i} position={[0,.01,7-i*2.25]}><boxGeometry args={[2.3,.025,.035]}/><meshBasicMaterial color="#61dce9"/></mesh>)}
    {/* entrance portal */}
    <group position={[0,0,-1]}>
      <mesh castShadow position={[-3.3,2.6,0]}><boxGeometry args={[.42,5.4,.55]}/><meshStandardMaterial color="#25364b" metalness={.5}/></mesh>
      <mesh castShadow position={[3.3,2.6,0]}><boxGeometry args={[.42,5.4,.55]}/><meshStandardMaterial color="#25364b" metalness={.5}/></mesh>
      <mesh castShadow position={[0,5.25,0]}><boxGeometry args={[6.9,.42,.62]}/><meshStandardMaterial color="#25364b" metalness={.5}/></mesh>
      <mesh position={[0,4.9,.34]}><boxGeometry args={[5.8,.055,.06]}/><meshBasicMaterial color="#64e7f1"/></mesh>
      <mesh position={[0,4.08,.38]}><planeGeometry args={[3.5,.52]}/><meshBasicMaterial color="#102338"/></mesh>
      <mesh position={[0,4.08,.405]}><planeGeometry args={[3.2,.22]}/><meshBasicMaterial color="#68e4ef"/></mesh>
      <mesh ref={doorL} position={[-.73,1.8,.12]}><boxGeometry args={[1.42,3.5,.12]}/><meshPhysicalMaterial color="#8edbe7" transparent opacity={.28} roughness={.12} metalness={.35}/></mesh>
      <mesh ref={doorR} position={[.73,1.8,.12]}><boxGeometry args={[1.42,3.5,.12]}/><meshPhysicalMaterial color="#8edbe7" transparent opacity={.28} roughness={.12} metalness={.35}/></mesh>
    </group>
    {/* reception */}
    <group position={[0,0,-8.6]}>
      <mesh receiveShadow position={[0,1.95,-3.4]}><boxGeometry args={[10,4,.22]}/><meshStandardMaterial color="#18263a"/></mesh>
      <mesh castShadow position={[0,.7,-.35]}><boxGeometry args={[3.15,1.25,1.35]}/><meshStandardMaterial color="#735d4d" roughness={.6}/></mesh>
      <mesh ref={deskGlow} position={[0,1.35,-.35]}><boxGeometry args={[3.22,.08,1.4]}/><meshStandardMaterial color="#58dce9" emissive="#087a91" emissiveIntensity={.6}/></mesh>
      <mesh position={[0,2.45,-3.1]}><boxGeometry args={[2.5,1.35,.12]}/><meshStandardMaterial color="#0d1728" emissive="#122d45"/></mesh>
      <mesh position={[0,2.45,-3.02]}><boxGeometry args={[2.22,1.08,.035]}/><meshBasicMaterial color="#1c5368"/></mesh>
      <mesh position={[0,2.45,-2.98]}><planeGeometry args={[1.75,.32]}/><meshBasicMaterial color="#b7f5fa"/></mesh>
      <mesh position={[-3,.55,-1.35]}><boxGeometry args={[1.5,.75,.85]}/><meshStandardMaterial color="#8d79ba"/></mesh>
      <mesh position={[3,.55,-1.35]}><boxGeometry args={[1.5,.75,.85]}/><meshStandardMaterial color="#8d79ba"/></mesh>
    </group>
    {/* cabin at end of corridor */}
    <group position={[0,0,-19]}>
      <mesh receiveShadow position={[0,1.9,-3.9]}><boxGeometry args={[10,4,.2]}/><meshStandardMaterial color="#172438"/></mesh>
      {[-4.85,4.85].map(x=><mesh key={x} position={[x,1.9,0]}><boxGeometry args={[.2,4,8]}/><meshStandardMaterial color="#26364d"/></mesh>)}
      <mesh castShadow position={[0,1.35,-1.2]}><boxGeometry args={[3.8,.18,1.7]}/><meshStandardMaterial color="#775f4c"/></mesh>
      <mesh position={[0,2.35,-2.3]}><boxGeometry args={[2.4,1.55,.12]}/><meshStandardMaterial color="#0b1424" emissive="#123b51"/></mesh>
      <mesh position={[0,2.35,-2.22]}><planeGeometry args={[2.05,1.18]}/><meshBasicMaterial color="#16455a"/></mesh>
      <mesh position={[0,2.35,-2.19]}><planeGeometry args={[1.65,.22]}/><meshBasicMaterial color="#8cecf1"/></mesh>
      <mesh castShadow position={[0,.65,.7]}><boxGeometry args={[1.25,1.1,.2]}/><meshStandardMaterial color="#a78bfa"/></mesh>
    </group>
    {/* visitor character */}
    <group ref={visitor} position={[0,0,6.5]}>
      <mesh castShadow position={[0,1.3,0]}><capsuleGeometry args={[.31,.68,5,10]}/><meshStandardMaterial color="#245a79" roughness={.8}/></mesh>
      <mesh castShadow position={[0,2.02,0]}><sphereGeometry args={[.24,18,14]}/><meshStandardMaterial color="#bd896d"/></mesh>
      <mesh castShadow position={[0,2.15,.02]}><sphereGeometry args={[.245,16,8,0,Math.PI*2,0,Math.PI*.56]}/><meshStandardMaterial color="#1b202b"/></mesh>
      <group ref={armA} position={[-.39,1.55,0]}><mesh rotation={[0,0,.08]} position={[0,-.28,0]}><capsuleGeometry args={[.095,.43,4,8]}/><meshStandardMaterial color="#245a79"/></mesh></group>
      <group ref={armB} position={[.39,1.55,0]}><mesh rotation={[0,0,-.08]} position={[0,-.28,0]}><capsuleGeometry args={[.095,.43,4,8]}/><meshStandardMaterial color="#245a79"/></mesh></group>
      <group ref={legA} position={[-.17,.82,0]}><mesh position={[0,-.35,0]}><capsuleGeometry args={[.12,.52,4,8]}/><meshStandardMaterial color="#182236"/></mesh><mesh position={[0,-.68,-.1]}><boxGeometry args={[.26,.14,.4]}/><meshStandardMaterial color="#080e18"/></mesh></group>
      <group ref={legB} position={[.17,.82,0]}><mesh position={[0,-.35,0]}><capsuleGeometry args={[.12,.52,4,8]}/><meshStandardMaterial color="#182236"/></mesh><mesh position={[0,-.68,-.1]}><boxGeometry args={[.26,.14,.4]}/><meshStandardMaterial color="#080e18"/></mesh></group>
    </group>
    {/* receptionist */}
    <group position={[0,0,-10.6]} rotation={[0,Math.PI,0]}>
      <mesh position={[0,1.3,0]}><capsuleGeometry args={[.3,.65,5,10]}/><meshStandardMaterial color="#8972b7"/></mesh>
      <mesh position={[0,2.02,0]}><sphereGeometry args={[.235,16,12]}/><meshStandardMaterial color="#d3a083"/></mesh>
      <mesh position={[0,2.15,.02]}><sphereGeometry args={[.24,16,8,0,Math.PI*2,0,Math.PI*.57]}/><meshStandardMaterial color="#28202b"/></mesh>
      <group ref={receptionistArm} position={[.38,1.55,0]}><mesh position={[0,-.28,0]}><capsuleGeometry args={[.09,.46,4,8]}/><meshStandardMaterial color="#8972b7"/></mesh></group>
      <mesh position={[-.16,.45,0]}><capsuleGeometry args={[.12,.55,4,8]}/><meshStandardMaterial color="#28253a"/></mesh>
      <mesh position={[.16,.45,0]}><capsuleGeometry args={[.12,.55,4,8]}/><meshStandardMaterial color="#28253a"/></mesh>
    </group>
    <Sparkles count={90} scale={[18,7,32]} size={1.5} speed={.22} color="#69dce8" opacity={.45}/>
  </group>;
}

export default function OfficeExperience() {
  return <Canvas shadows dpr={[1,1.6]} camera={{position:[0,4.4,1.8],fov:48}} gl={{antialias:true,alpha:false}} onCreated={({gl})=>{gl.setClearColor('#080e19');gl.toneMapping=THREE.ACESFilmicToneMapping;gl.toneMappingExposure=1.1}}>
    <color attach="background" args={['#080e19']}/>
    <fog attach="fog" args={['#080e19',18,39]}/>
    <ambientLight intensity={1.25}/>
    <hemisphereLight args={['#b6d9ff','#11172a',1.3]}/>
    <directionalLight position={[6,11,6]} intensity={3} castShadow shadow-mapSize={[1024,1024]}/>
    <pointLight position={[0,4,-8]} color="#5addeb" intensity={28} distance={16}/>
    <pointLight position={[0,3,-20]} color="#a78bfa" intensity={18} distance={12}/>
    <Building/>
    <ContactShadows position={[0,-.035,-6]} opacity={.42} scale={28} blur={2.5} far={10}/>
    <Environment preset="city"/>
  </Canvas>;
}