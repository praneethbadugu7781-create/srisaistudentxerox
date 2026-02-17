// Three.js Xerox Shop Background - Documents, Pages, Cards, Pens
(function() {
    const canvas = document.getElementById('three-canvas');
    if (!canvas) return;

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.onload = initThree;
    document.head.appendChild(script);

    function initThree() {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);

        camera.position.z = 30;

        const colorPalette = [
            new THREE.Color(0x6366f1),
            new THREE.Color(0x0ea5e9),
            new THREE.Color(0xa855f7),
            new THREE.Color(0x10b981),
        ];

        const shapes = [];

        // --- Floating Document Pages (flat rectangles) ---
        for (let i = 0; i < 10; i++) {
            const w = Math.random() * 2 + 1.5;
            const h = w * 1.4;
            const geo = new THREE.PlaneGeometry(w, h);
            const mat = new THREE.MeshBasicMaterial({
                color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
                transparent: true,
                opacity: Math.random() * 0.15 + 0.08,
                side: THREE.DoubleSide,
            });
            const page = new THREE.Mesh(geo, mat);
            page.position.set((Math.random() - 0.5) * 70, (Math.random() - 0.5) * 70, (Math.random() - 0.5) * 30);
            page.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * 0.5 - 0.25);
            page.userData = {
                rotSpeed: { x: (Math.random() - 0.5) * 0.003, y: (Math.random() - 0.5) * 0.005, z: (Math.random() - 0.5) * 0.002 },
                floatSpeed: Math.random() * 0.4 + 0.3,
                floatOffset: Math.random() * Math.PI * 2,
                driftX: (Math.random() - 0.5) * 0.005,
            };
            shapes.push(page);
            scene.add(page);
        }

        // --- Document pages with "text lines" ---
        for (let i = 0; i < 6; i++) {
            const group = new THREE.Group();
            const w = 2.2; const h = 3;
            const bgGeo = new THREE.PlaneGeometry(w, h);
            const bgMat = new THREE.MeshBasicMaterial({
                color: 0xffffff, transparent: true, opacity: 0.12, side: THREE.DoubleSide,
            });
            group.add(new THREE.Mesh(bgGeo, bgMat));
            for (let l = 0; l < 5; l++) {
                const lineW = w * (Math.random() * 0.3 + 0.5);
                const lineGeo = new THREE.PlaneGeometry(lineW, 0.1);
                const lineMat = new THREE.MeshBasicMaterial({
                    color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
                    transparent: true, opacity: 0.2,
                });
                const line = new THREE.Mesh(lineGeo, lineMat);
                line.position.set((lineW - w) / 2 * 0.3, h * 0.35 - l * 0.55, 0.01);
                group.add(line);
            }
            group.position.set((Math.random() - 0.5) * 60, (Math.random() - 0.5) * 60, (Math.random() - 0.5) * 25);
            group.rotation.set(Math.random() * 0.3, Math.random() * Math.PI, Math.random() * 0.2);
            group.userData = {
                rotSpeed: { x: (Math.random() - 0.5) * 0.002, y: (Math.random() - 0.5) * 0.004, z: 0 },
                floatSpeed: Math.random() * 0.3 + 0.2,
                floatOffset: Math.random() * Math.PI * 2,
                driftX: (Math.random() - 0.5) * 0.003,
            };
            shapes.push(group);
            scene.add(group);
        }

        // --- ID Card shapes (rounded rectangles) ---
        for (let i = 0; i < 5; i++) {
            const cw = 1.8; const ch = 1.1;
            const cardShape = new THREE.Shape();
            const r = 0.15;
            cardShape.moveTo(-cw/2 + r, -ch/2);
            cardShape.lineTo(cw/2 - r, -ch/2);
            cardShape.quadraticCurveTo(cw/2, -ch/2, cw/2, -ch/2 + r);
            cardShape.lineTo(cw/2, ch/2 - r);
            cardShape.quadraticCurveTo(cw/2, ch/2, cw/2 - r, ch/2);
            cardShape.lineTo(-cw/2 + r, ch/2);
            cardShape.quadraticCurveTo(-cw/2, ch/2, -cw/2, ch/2 - r);
            cardShape.lineTo(-cw/2, -ch/2 + r);
            cardShape.quadraticCurveTo(-cw/2, -ch/2, -cw/2 + r, -ch/2);
            const cardGeo = new THREE.ShapeGeometry(cardShape);
            const cardMat = new THREE.MeshBasicMaterial({
                color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
                transparent: true, opacity: 0.18, side: THREE.DoubleSide,
            });
            const card = new THREE.Mesh(cardGeo, cardMat);
            card.position.set((Math.random() - 0.5) * 65, (Math.random() - 0.5) * 65, (Math.random() - 0.5) * 20);
            card.rotation.set(Math.random() * Math.PI * 0.3, Math.random() * Math.PI, Math.random() * 0.4);
            card.userData = {
                rotSpeed: { x: (Math.random() - 0.5) * 0.004, y: (Math.random() - 0.5) * 0.006, z: (Math.random() - 0.5) * 0.002 },
                floatSpeed: Math.random() * 0.5 + 0.3,
                floatOffset: Math.random() * Math.PI * 2,
                driftX: (Math.random() - 0.5) * 0.004,
            };
            shapes.push(card);
            scene.add(card);
        }

        // --- Printer-like boxes (wireframe) ---
        for (let i = 0; i < 3; i++) {
            const geo = new THREE.BoxGeometry(3, 1.5, 2);
            const mat = new THREE.MeshBasicMaterial({
                color: colorPalette[i % colorPalette.length],
                wireframe: true, transparent: true, opacity: 0.12,
            });
            const printer = new THREE.Mesh(geo, mat);
            printer.position.set((Math.random() - 0.5) * 55, (Math.random() - 0.5) * 55, (Math.random() - 0.5) * 20);
            printer.rotation.set(Math.random() * 0.5, Math.random() * Math.PI, 0);
            printer.userData = {
                rotSpeed: { x: 0, y: (Math.random() - 0.5) * 0.003, z: 0 },
                floatSpeed: Math.random() * 0.2 + 0.15,
                floatOffset: Math.random() * Math.PI * 2,
                driftX: 0,
            };
            shapes.push(printer);
            scene.add(printer);
        }

        // --- Pen / Pencil shapes (thin cylinders) ---
        for (let i = 0; i < 4; i++) {
            const geo = new THREE.CylinderGeometry(0.06, 0.06, 3.5, 8);
            const mat = new THREE.MeshBasicMaterial({
                color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
                transparent: true, opacity: 0.2,
            });
            const pen = new THREE.Mesh(geo, mat);
            pen.position.set((Math.random() - 0.5) * 60, (Math.random() - 0.5) * 60, (Math.random() - 0.5) * 20);
            pen.rotation.set(Math.random() * Math.PI, 0, Math.random() * Math.PI * 0.5);
            pen.userData = {
                rotSpeed: { x: 0, y: 0, z: (Math.random() - 0.5) * 0.008 },
                floatSpeed: Math.random() * 0.4 + 0.2,
                floatOffset: Math.random() * Math.PI * 2,
                driftX: (Math.random() - 0.5) * 0.002,
            };
            shapes.push(pen);
            scene.add(pen);
        }

        // --- Scissors shape (two small cones) ---
        for (let i = 0; i < 2; i++) {
            const group = new THREE.Group();
            const bladeGeo = new THREE.ConeGeometry(0.12, 2, 4);
            const bladeMat = new THREE.MeshBasicMaterial({
                color: colorPalette[2], transparent: true, opacity: 0.15,
            });
            const blade1 = new THREE.Mesh(bladeGeo, bladeMat);
            blade1.position.set(0, 0.8, 0);
            blade1.rotation.z = 0.2;
            const blade2 = new THREE.Mesh(bladeGeo, bladeMat.clone());
            blade2.position.set(0, 0.8, 0);
            blade2.rotation.z = -0.2;
            group.add(blade1, blade2);
            group.position.set((Math.random() - 0.5) * 50, (Math.random() - 0.5) * 50, (Math.random() - 0.5) * 15);
            group.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random());
            group.userData = {
                rotSpeed: { x: (Math.random() - 0.5) * 0.003, y: (Math.random() - 0.5) * 0.005, z: 0 },
                floatSpeed: Math.random() * 0.3 + 0.2,
                floatOffset: Math.random() * Math.PI * 2,
                driftX: (Math.random() - 0.5) * 0.003,
            };
            shapes.push(group);
            scene.add(group);
        }

        // Mouse interaction
        let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0;
        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
        });

        // Animation
        let time = 0;
        function animate() {
            requestAnimationFrame(animate);
            time += 0.008;

            targetX += (mouseX * 4 - targetX) * 0.015;
            targetY += (mouseY * 4 - targetY) * 0.015;
            camera.position.x = targetX;
            camera.position.y = targetY;
            camera.lookAt(scene.position);

            shapes.forEach((obj) => {
                const d = obj.userData;
                if (d.rotSpeed) {
                    obj.rotation.x += d.rotSpeed.x;
                    obj.rotation.y += d.rotSpeed.y;
                    if (d.rotSpeed.z) obj.rotation.z += d.rotSpeed.z;
                }
                obj.position.y += Math.sin(time * d.floatSpeed + d.floatOffset) * 0.015;
                if (d.driftX) obj.position.x += d.driftX;

                // Wrap around if drifted too far
                if (obj.position.x > 40) obj.position.x = -40;
                if (obj.position.x < -40) obj.position.x = 40;
            });

            renderer.render(scene, camera);
        }

        animate();

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }
})();
