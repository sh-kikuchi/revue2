<template>
  <canvas ref="canvas"></canvas>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';

const canvas = ref(null);

onMounted(() => {
  // シーンを作成
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x111111); // 暗めの背景

  // カメラ設定
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 5);

  // レンダラー設定
  const renderer = new THREE.WebGLRenderer({ canvas: canvas.value });
  renderer.setSize(window.innerWidth, window.innerHeight);

  // テクスチャを読み込む
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load('https://threejs.org/examples/textures/uv_grid_opengl.jpg'); // 好きな画像URLを指定

  // 球体の作成
  const geometry = new THREE.SphereGeometry(2, 64, 64);
  const material = new THREE.MeshStandardMaterial({ map: texture });
  const sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);

  // ライト追加
  const light = new THREE.PointLight(0xffffff, 1, 100);
  light.position.set(5, 5, 5);
  scene.add(light);

  // カメラの360度回転アニメーション
  gsap.to(camera.position, {
    x: 5 * Math.sin(Math.PI * 2),
    z: 5 * Math.cos(Math.PI * 2),
    duration: 5,
    repeat: -1,
    ease: "power1.inOut",
    onUpdate: () => {
      camera.lookAt(sphere.position);
    }
  });

  // ユーザーが自由にカメラを動かせるようにする
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  // レンダリングループ
  const animate = () => {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  };
  animate();
});
</script>
