import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Torus, Sphere } from '@react-three/drei';

function Core(){
 const group=useRef(), ring1=useRef(),ring2=useRef(),orb=useRef();
 useFrame(({clock, pointer})=>{
   const t=clock.getElapsedTime();
   if(group.current){group.current.rotation.y=t*.12+pointer.x*.12;group.current.rotation.x=Math.sin(t*.2)*.12+pointer.y*.08}
   if(ring1.current)ring1.current.rotation.z=t*.18;
   if(ring2.current)ring2.current.rotation.x=t*.14;
   if(orb.current)orb.current.position.y=Math.sin(t*.7)*.12;
 });
 return <group ref={group} position={[1.7,.15,0]} scale={1.12}>
  <Float speed={1.2} rotationIntensity={.12} floatIntensity={.3}>
   <mesh><icosahedronGeometry args={[1.5,2]}/><meshPhysicalMaterial color="#d5c9ee" metalness={.88} roughness={.13} clearcoat={1} clearcoatRoughness={.06}/></mesh>
   <mesh scale={.72}><icosahedronGeometry args={[1.5,2]}/><meshStandardMaterial color="#171125" metalness={.9} roughness={.2} emissive="#39245d" emissiveIntensity={.9} wireframe/></mesh>
  </Float>
  <Torus ref={ring1} args={[2.1,.014,12,180]} rotation={[.7,.3,.2]}><meshBasicMaterial color="#b69cff"/></Torus>
  <Torus ref={ring2} args={[2.42,.009,10,180]} rotation={[1.15,.4,.8]}><meshBasicMaterial color="#ff806b"/></Torus>
  <Sphere ref={orb} args={[.12,24,24]} position={[2.15,.5,.1]}><meshStandardMaterial color="#ff806b" emissive="#ff806b" emissiveIntensity={2}/></Sphere>
 </group>
}
export default function ExperienceScene(){return <><Core/><mesh position={[1.8,-2.9,-1]} rotation={[-Math.PI/2,0,0]}><circleGeometry args={[4.8,64]}/><meshBasicMaterial color="#b69cff" transparent opacity={.06}/></mesh></>}
