import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function TechGlobe() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;

    // SCENE
    const scene = new THREE.Scene();

    // CAMERA
    const camera = new THREE.PerspectiveCamera(
      70,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 4;

    // RENDERER
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // GEOMETRY (esfera)
    const geometry = new THREE.SphereGeometry(1.5, 64, 64);

    // MATERIAL (puntos tech)
    const material = new THREE.PointsMaterial({
      color: "#8c2bee", // azul tech
      size: 0.02,
      transparent: true,
      opacity: 0.85,
    });

    // POINTS
    const globe = new THREE.Points(geometry, material);
    scene.add(globe);

    // ANIMATION
    const animate = () => {
      globe.rotation.y += 0.0012;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // RESIZE
    const handleResize = () => {
      camera.aspect =
        container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        container.clientWidth,
        container.clientHeight
      );
    };
    window.addEventListener("resize", handleResize);

    // CLEANUP
    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-full"
    />
  );
}
