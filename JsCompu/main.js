/*
    author: Santiago Fonseca
    last date of creation: 23/08/2023 9:20 pm
    last modification: 23/08/2023 11:54 pm
*/

// creation elements

var scene = null,
    camera = null,
    renderer = null,
    control = null,
    torus = null,
    cono = null,
    cube = null;

function startScene() {

    //scene, camera, render

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, //Angulo de vision (arriba, abajo)
        window.innerWidth / window.innerHeight, //Relacion de aspecto 16:9
        0.1, // mas cercana (no renderiza)
        1000); // mas lejos (no renderiza)

    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("app") });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    //---orbit controls-----
    control = new THREE.OrbitControls(camera, renderer.domElement);
    camera.position.set(0, 0, 5);
    control.update();

    //GRIDHELPER
    const size = 10;
    const divisions = 10;

    const gridHelper = new THREE.GridHelper(size, divisions);
    scene.add(gridHelper);

    //AXESHELPER

    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    animate();
    onWindowResize();
}

function createGeometry(typeForm) {

        //---objects---
    //to delete
    switch (typeForm) {
        case 'cube':

            //CUBE
        const geometrycube = new THREE.BoxGeometry(1, 1, 1);
        const materialcube = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
        cube = new THREE.Mesh(geometrycube, materialcube);
        scene.add(cube);
        cube.position.x=Math.floor(Math.random() * 10);
        cube.position.z=Math.floor(Math.random() * 10);
        
        let positionx = cube.position.x;
        if (cube.position.x != 0 && cube.position.z != 0) {
            cube.position.x += 5;
            cube.position.z += 5;
        }else{
            cube.position.x=Math.random() * 10;
            cube.position.z=Math.random() * 10;
        }
        console.log("posicion x solo: "+positionx);
            break;
        case 'torus':

            //TORUS
        const geometrytorus = new THREE.TorusGeometry(0, 0, 5, 10);
        const materialtorus = new THREE.MeshBasicMaterial({ color: 0xffff00, wireframe: true });
        torus = new THREE.Mesh(geometrytorus, materialtorus);
        scene.add(torus);
        torus.position.x=Math.random() * 10;
        torus.position.z=Math.random() * 10+15;
            break;
        case 'cone':
            
         //CONE
        const geometrycono = new THREE.ConeGeometry(0.8, 1, 0.8);
        const materialcono = new THREE.MeshBasicMaterial({ color: 0xffff00, wireframe: true });
        cono = new THREE.Mesh(geometrycono, materialcono);
        scene.add(cono);
        cono.position.x=Math.random() * 10;
        cono.position.z=Math.random() * 10+15;
            break;
    }


    //SETTINGS POSITION

    
}


function animate() {
    requestAnimationFrame(animate);
    control.update();
    renderer.render(scene, camera);

    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;

    // torus.rotation.z += 0.01;
    // torus.rotation.y += 0.01;

    // cono.rotation.z += 0.01;
    // cono.rotation.y += 0.01;
}

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

