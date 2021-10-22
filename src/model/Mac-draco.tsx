import React, { useRef } from 'react';
import {useFrame} from '@react-three/fiber';
// eslint-disable-next-line import/no-extraneous-dependencies
import {Html, useGLTF} from '@react-three/drei';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as THREE from 'three';

import LaptopScreenPage from '../routes/LaptopScreenPage/LaptopScreenPage';

export default function Model({ ...props }) {
    const group = useRef();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { nodes, materials } = useGLTF('./mac-draco.glb');

    // Делает модельку плавающей

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, Math.cos(t / 2) / 10 + 0.25, 0.1);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, Math.sin(t / 4) / 10, 0.1);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, Math.sin(t / 4) / 20, 0.1);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, (-5 + Math.sin(t)) / 5, 0.1);
    });

    return (
        <group ref={group} {...props} dispose={null}>
            <group position={[0, -0.04, 0.41]} rotation={[-0.425, 0, 0]}>
                <group position={[0, 2.96, -0.13]} rotation={[Math.PI / 2, 0, 0]}>
                    <mesh geometry={nodes.Cube008.geometry} material={nodes.Cube008.material} />
                    <mesh geometry={nodes.Cube008_1.geometry} material={materials['matte.001']} />
                    <mesh geometry={nodes.Cube008_2.geometry} material={materials['screen.001']}>
                        {/*Перед тем как вставить какой либо HTML-тэг, нужно это обернуть в Html из библиотеки Drei*/}
                        <Html
                            className='container'
                            rotation-x={-Math.PI / 2}
                            position={[0, 0.05, -0.09]}
                            transform
                            occlude
                        >
                            <div className='wrapper'>
                                <LaptopScreenPage />
                            </div>
                        </Html>
                    </mesh>
                </group>
            </group>
            <mesh geometry={nodes.keyboard.geometry} material={materials.keys} position={[1.79, 0, 3.45]} />
            <group position={[0, -0.1, 3.39]}>
                <mesh geometry={nodes.Cube002.geometry} material={nodes.Cube002.material} />
                <mesh geometry={nodes.Cube002_1.geometry} material={materials.trackpad} />
            </group>
            <mesh geometry={nodes.touchbar.geometry} material={materials.touchbar} position={[0, -0.03, 1.2]} />
        </group>
    );
}

useGLTF.preload('/mac-draco.glb');
