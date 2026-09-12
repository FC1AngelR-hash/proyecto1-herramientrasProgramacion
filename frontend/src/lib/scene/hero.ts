import * as THREE from 'three';

export function createHero(canvas: HTMLCanvasElement) {
	const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
	renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
	renderer.toneMapping = THREE.ACESFilmicToneMapping;

	const scene = new THREE.Scene();
	scene.fog = new THREE.FogExp2(0x14081f, 0.018);
	scene.background = new THREE.Color(0x14081f);

	const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 80);
	camera.position.set(0, 1.6, 9);

	scene.add(new THREE.HemisphereLight(0xd8b4fe, 0x1a0828, 0.75));
	const key = new THREE.PointLight(0xc084fc, 42, 30);
	key.position.set(0, 2.4, 1.2);
	scene.add(key);

	const cube = new THREE.Mesh(
		new THREE.BoxGeometry(1.7, 1.7, 1.7),
		new THREE.MeshStandardMaterial({
			color: 0x7c3aed,
			emissive: 0xa855f7,
			emissiveIntensity: 1.7,
			roughness: 0.16,
			metalness: 0.62
		})
	);
	cube.position.set(0, 2.15, 0);
	scene.add(cube);

	const ring = new THREE.Mesh(
		new THREE.RingGeometry(1.35, 1.42, 48),
		new THREE.MeshBasicMaterial({
			color: 0xe9d5ff,
			side: THREE.DoubleSide,
			transparent: true,
			opacity: 0.5
		})
	);
	ring.rotation.x = Math.PI / 2;
	ring.position.copy(cube.position);
	scene.add(ring);

	const waterGeo = new THREE.PlaneGeometry(40, 40, 48, 48);
	const water = new THREE.Mesh(
		waterGeo,
		new THREE.MeshStandardMaterial({ color: 0x2e1065, metalness: 0.88, roughness: 0.22 })
	);
	water.rotation.x = -Math.PI / 2;
	scene.add(water);
	const pos = waterGeo.attributes.position;

	const hill = (x: number, z: number, s: number, c: number) => {
		const m = new THREE.Mesh(
			new THREE.ConeGeometry(s, s * 1.6, 5),
			new THREE.MeshStandardMaterial({ color: c, roughness: 0.9 })
		);
		m.position.set(x, s * 0.45, z);
		scene.add(m);
	};
	hill(-9, -6, 6.5, 0x3b0764);
	hill(9.5, -7, 7.2, 0x2e1065);
	hill(-6, -10, 4.2, 0x4c1d95);
	hill(6.5, -11, 5, 0x5b21b6);

	const stars = new THREE.Points(
		new THREE.BufferGeometry().setAttribute(
			'position',
			new THREE.Float32BufferAttribute(
				Array.from({ length: 900 }, () => (Math.random() - 0.5) * 50),
				3
			)
		),
		new THREE.PointsMaterial({ color: 0xf5d0fe, size: 0.035 })
	);
	stars.position.y = 8;
	scene.add(stars);

	const ring2 = ring.clone();
	ring2.scale.setScalar(1.18);
	scene.add(ring2);

	cube.scale.setScalar(0.01);

	const mouse = { x: 0, y: 0 };
	const look = { x: 0, y: 0 };
	let scroll = 0;
	const onMove = (e: PointerEvent) => {
		mouse.x = (e.clientX / innerWidth) * 2 - 1;
		mouse.y = (e.clientY / innerHeight) * 2 - 1;
	};
	const onScroll = () => {
		scroll = Math.min(window.scrollY / innerHeight, 1.4);
	};
	window.addEventListener('pointermove', onMove);
	window.addEventListener('scroll', onScroll, { passive: true });

	const resize = () => {
		const w = canvas.clientWidth || innerWidth;
		const h = canvas.clientHeight || innerHeight;
		renderer.setSize(w, h, false);
		camera.aspect = w / h;
		camera.updateProjectionMatrix();
	};
	resize();
	window.addEventListener('resize', resize);

	let raf = 0;
	const tick = (t: number) => {
		const s = t * 0.001;
		cube.rotation.y = s * 0.35;
		cube.rotation.x = Math.sin(s * 0.4) * 0.12;
		cube.position.y = 2.15 + Math.sin(s) * 0.08;
		ring.rotation.z = s * 0.2;
		for (let i = 0; i < pos.count; i++) {
			pos.setZ(
				i,
				Math.sin(s * 1.4 + pos.getX(i) * 0.35) * 0.12 + Math.cos(s + pos.getY(i) * 0.3) * 0.08
			);
		}
		pos.needsUpdate = true;
		camera.position.x = mouse.x * 0.4;
		camera.position.y = 1.6 + mouse.y * 0.15;
		camera.lookAt(0, 1.8, 0);
		renderer.render(scene, camera);
		raf = requestAnimationFrame(tick);
	};
	raf = requestAnimationFrame(tick);

	return () => {
		cancelAnimationFrame(raf);
		window.removeEventListener('pointermove', onMove);
		window.removeEventListener('resize', resize);
		renderer.dispose();
	};
}
