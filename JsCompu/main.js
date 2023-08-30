/*
    author: Santiago Fonseca
    last date of creation: 23/08/2023 9:20 pm
    last modification: 29/08/2023 11:54 pm
*/

// creation elements

var scene = null,
    camera = null,
    renderer = null,
    control = null,
    torus = null,
    cono = null,
    cube = null;
max = 11,
    min = -11;
var arraylistPosition = [];
var suma = 0;
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
    const size = 20;
    const divisions = 30;

    const gridHelper = new THREE.GridHelper(size, divisions);
    scene.add(gridHelper);

    //AXESHELPER

    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    //Create light


    const pointLight2 = new THREE.PointLight(0xfff000, 1, 100);
    pointLight2.position.set(7, 10, 8);
    scene.add(pointLight2);

    const sphereSize2 = 1;
    const pointLightHelper2 = new THREE.PointLightHelper(pointLight2, sphereSize2);
    scene.add(pointLightHelper2);

    animate();
    onWindowResize();
}

//Create Lights with buttons

function CreateLight(typeLight) {
    switch (typeLight) {
        case "ambient":
            const light = new THREE.AmbientLight(0x404040); // soft white light
            scene.add(light);
            break;
        case "pointLight":
            const pointLight = new THREE.PointLight(0xff0000, 1, 100);
            pointLight.position.set(0, 10, 0);
            scene.add(pointLight);

            const sphereSize = 1;
            const pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
            scene.add(pointLightHelper);
            break;
        case "spotLight":
            const spotLight = new THREE.SpotLight(0xffffff);
            spotLight.position.set(10, 10, 10);
            scene.add(spotLight);

            const spotLightHelper = new THREE.SpotLightHelper(spotLight);
            scene.add(spotLightHelper);
            break;

    }
}


//creacion de objetos
function createGeometry(typeForm) {


    //arrays para posicones




    //---objects---
    //to delete
    switch (typeForm) {
        case 'cube':

            //CUBE
            const geometrycube = new THREE.BoxGeometry(1, 1, 1);
            const materialcube = new THREE.MeshBasicMaterial({
                color: 0x00ff00,
                wireframe: false,
                transparent: true,
                opacity: 0.5,
                wireframeLinwidth: 6
            });
            cube = new THREE.Mesh(geometrycube, materialcube);
            scene.add(cube);
            cube.position.x = Math.floor((Math.random() * (max - min + 1)) + min);
            cube.position.z = Math.floor((Math.random() * (max - min + 1)) + min);
            cube.position.y = 0;

            let positionx = cube.position.x;
            let positionz = cube.position.z;
            arraylistPosition.push(positionx, positionz);


            console.log("posicion x solo: " + positionx);
            console.log("posicion z solo: " + positionz);

            //verificacion de posicion para no repetir

            // arraylistPosition.forEach((i)=>{
            //     suma=suma+i;
            //     console.log("numeros son: "+i);
            //     console.log("suma es: "+suma);
            // })
            break;
        case 'torus':

            //TORUS
            const geometrytorus = new THREE.TorusGeometry(0, 0, 5, 10);
            const materialtorus = new THREE.MeshStandardMaterial({
                color: 0xffff00,
                roughness: 0.5,
                metalness: 0.5
            });
            torus = new THREE.Mesh(geometrytorus, materialtorus);
            scene.add(torus);
            torus.position.x = Math.floor((Math.random() * (max - min + 1)) + min);
            torus.position.z = Math.floor((Math.random() * (max - min + 1)) + min);

            let positionxt = torus.position.x;
            let positionzt = torus.position.z;
            posicionesX.add(positionx);
            posicionesZ.add(positionz);

            console.log("posicion x solo: " + positionxt);
            console.log("posicion z solo: " + positionzt);

            // if (positionx!=positionxt&&positionz!=positionzt) {
            //     torus.position.x=positionxt;
            //     torus.position.z=positionzt;

            // }else{
            //     torus.position.x=0;
            //     torus.position.z=0;
            // }

            break;
        case 'cone':

            //CONE
            const geometrycono = new THREE.ConeGeometry(1, 3, 8);
            const materialcono = new THREE.MeshBasicMaterial({
                color: 0xffff00,
                wireframe: true,
                wireframe: false,
                transparent: true,
                opacity: 0.5,
                wireframeLinwidth: 6
            });
            cono = new THREE.Mesh(geometrycono, materialcono);
            scene.add(cono);



            cono.position.x = Math.floor((Math.random() * (max - min + 1)) + min);
            cono.position.z = Math.floor((Math.random() * (max - min + 1)) + min);

            let positionxc = cono.position.x;
            let positionzc = cono.position.z;
            posicionesX.add(positionx);
            posicionesZ.add(positionz);

            console.log("posicion x solo: " + positionxc);
            console.log("posicion z solo: " + positionzc);

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

