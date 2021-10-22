import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows, OrbitControls } from '@react-three/drei';

import './IndexPage.scss';
import Model from '../../model/Mac-draco';

export default function IndexPage() {
    return (
        <section className='IndexPage'>
            <Canvas dpr={[1, 2]} camera={{ position: [-10, 0, -25], fov: 30 }}>
                <pointLight position={[10, 10, 10]} intensity={0.7} />
                <Suspense fallback={null}>
                    <group rotation={[0, Math.PI, 0]}>
                        <Model />
                    </group>
                    <Environment preset="studio" />
                </Suspense>
                <ContactShadows
                    rotation-x={Math.PI / 2}
                    position={[0, -4.5, 0]}
                    opacity={1}
                    width={20}
                    height={20}
                    blur={2}
                    far={4.5}
                />
                <OrbitControls
                    enablePan={false}
                    enableZoom={false}
                    minPolarAngle={Math.PI / 2}
                    maxPolarAngle={Math.PI / 2}
                />
            </Canvas>
        </section>
    );
}
