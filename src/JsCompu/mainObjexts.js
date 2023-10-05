/*
    author: Santiago Fonseca
    last date of creation: 30/09/2023 4:00 pm
    last modification: 30/09/2023 8:30 pm
*/

// creation elements

var scene = null,
    camera = null,
    renderer = null,
    control = null,
    timer = 0;

//Avatar
var myPlayer = null,
    myPlayerMesh = null;
input = { left: 0, right: 0, rightb: 0, up: 0, down: 0 },
    rootSpeed = 0.05,
    speed = 0.5;



function startScene() {
    // Scene, Camera, Renderer
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000); //33FFC5
    camera = new THREE.PerspectiveCamera(
        75,                                        //Angulo de visión(Abajo o arriba) 
        window.innerWidth / window.innerHeight,    //Relación de aspecto 16:9
        0.1,                                       //Mas cerca (no renderiza)
        1000);                                    //Mas lejos ()

    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('Models3d') });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    //Orbit controls
    //controls = new THREE.OrbitControls(camera, renderer.domElement);
    camera.position.set(0, 8, 0);
    camera.rotation.y = 1.5;
    // controls.update();

    //Grid Helper
    // const gridHelper = new THREE.GridHelper(size, divisions);
    // scene.add(gridHelper);

    //Axes Helper
    // const axesHelper = new THREE.AxesHelper(5);
    // scene.add(axesHelper);

    const lightAmbient = new THREE.AmbientLight(0xFFFFFF); // soft white light
    scene.add(lightAmbient);

    // const light = new THREE.PointLight( 0xffffff, 1, 100 );
    // light.position.set( 5,10,10 );
    // scene.add( light );





    animate();
    // Escenario
    loadModel_objMtl("../src/models/obj_mtl/Escenario/", "escenario.obj", "escenario.mtl");
    // Human Model
    loadModel_objMtl("../src/models/obj_mtl/Personaje/", "PersonajeOso2.obj", "PersonajeOso2.mtl");
    // Robot Model
    loadModel_objMtl("../src/models/obj_mtl/Personaje/", "PersonajeRobot2.obj", "PersonajeRobot2.mtl");
    //Duck Model
    loadDuck_Gltf("../src/models/gltf", "../src/models/gltf/Duck.gltf");
    //mousemove camera
    //document.getElementById("Models3d").addEventListener("mousemove", moveCamera);

    timer = 30;
    createCollectibles();
    stateGame();
    createAvatar();
}

function animate() {

    requestAnimationFrame(animate);
    // controls.update();
    renderer.render(scene, camera);
    //console.log(camera.position);
    moveAvatar();
    // console.log(object.position);
    //myPlayer.position.set(myPlayer.position.x, 0, myPlayer.position.z);
    document.getElementById("Models3d").addEventListener("mousemove", moveCamera);
    Models3d.addEventListener("mousemove", function(evt) {
        var mousePos = oMousePos(testPosRaton, evt);
        marcarCoords(output, mousePos.x, mousePos.y)
      }, false);


}

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

}

function loadModel_objMtl(path, nameObj, nameMtl) {
    //load Mtl
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setResourcePath(path);
    mtlLoader.setPath(path);
    mtlLoader.load(nameMtl, function (materials) {
        materials.preload();

        //load OBJ
        var objLoader = new THREE.OBJLoader();
        objLoader.setPath(path);
        objLoader.setMaterials(materials);
        objLoader.load(nameObj, function (object) {
            scene.add(object);
            object.scale.set(2, 2, 2);
            if (nameObj == "PersonajeOso2.obj") {
                myPlayerMesh = object;
                myPlayerMesh.rotation.y = Math.PI;
                myPlayer.position.set(myPlayer.position.x, 0, myPlayer.position.z);
                console.log(object.position);
                
            }
        })
    })
    

}

function loadDuck_Gltf(path, nameGltf) {
    // Instantiate a loader DUCK
    const loader = new THREE.GLTFLoader();

    // Optional: Provide a DRACOLoader instance to decode compressed mesh data
    const dracoLoader = new THREE.DRACOLoader();
    dracoLoader.setDecoderPath(path);
    loader.setDRACOLoader(dracoLoader);

    // Load a glTF resource
    loader.load(
        // resource URL
        nameGltf,
        // called when the resource is loaded
        function (gltf) {

            scene.add(gltf.scene);

            gltf.animations; // Array<THREE.AnimationClip>
            gltf.scene.position.set(10, 1, 10);
            gltf.scene.scale.set(2, 2, 2);// THREE.Group
            gltf.scenes; // Array<THREE.Group>
            gltf.cameras; // Array<THREE.Camera>
            gltf.asset; // Object

        },
        // called while loading is progressing
        function (xhr) {

            console.log((xhr.loaded / xhr.total * 100) + '% loaded');

        },
        // called when loading has errors
        function (error) {

            console.log('An error happened');

        }
    );


}

function createCollectibles() {

    const max = 5;
    const min = -5;

    for (let i = 0; i < 9; i++) {
        var positionx = Math.floor((Math.random() * (max - (min) + 1)) + (min));
        var positionz = Math.floor((Math.random() * (max - (min) + 1)) + (min));

        const texture = new THREE.TextureLoader().load("../src/recursos-imagen/textures/textureGift.png")
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const material = new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            map: texture
        });
        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(positionx, 4.2, positionz);
        scene.add(cube);
    }

}

function stateGame(state) {

    switch (state) {
        case 'win':
            //audio & show img
            document.getElementById("winpage").style.display = "block";

            break;

        case 'lose':
            //audio & show img
            document.getElementById("lostpage").style.display = "block";

            break;
        default:
            document.getElementById("winpage").style.display = "none";
            document.getElementById("winpage").style.display = "none";
            break;
    }

}

//funcion temporizador mas audios de ambiente y perdida del juego
function temporizador() {
    let audiolose = document.getElementById('losegame');
    let audioambient = document.getElementById('audioambient');
    let idnav = document.getElementById('navba');
    document.getElementById('timer').innerHTML = "Time: " + timer;
    let Idbuton = document.getElementById('StartB');
    Idbuton.style.display = "none";
    if (timer == 0) {
        stateGame('lose');
        //reproduccion de audio perder cuando se acaba el tiempo
        audioambient.pause();
        audiolose.play();
        Idbuton.style.display = "block";
        //IdbutonAgain.style.display = "block";
        //console.log(id);
        idnav.style.display = "none";

    } else {
        timer -= 1;

    }
    setTimeout('temporizador()', 1000);
}

function createAvatar() {
    console.log("crear Personaje");
    const texture = new THREE.TextureLoader().load("../src/recursos-imagen/textures/textureGift.png")
    const geometry = new THREE.BoxGeometry(5, 7, 5);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    myPlayer = new THREE.Mesh(geometry, material);
    //cube.position.set(0,1,0.009);
    scene.add(myPlayer);
    myPlayer.position.y = 6.8;

    
    myPlayer.position.set(camera.position.x, camera.position.y, camera.position.z);

}

function moveAvatar() {
    if (input.right == 1) { // Rotation Right
        //camera.rotation.y -= rootSpeed;
        myPlayer.rotation.y -= rootSpeed;
        myPlayerMesh.rotation.y -= rootSpeed;
    } else if (input.left == 1) { // Rotation left
        //camera.rotation.y += rootSpeed;
        myPlayer.rotation.y += rootSpeed;
        myPlayerMesh.rotation.y += rootSpeed;
    } else if (input.up == 1) { // movement up
        camera.position.z -= Math.cos(camera.rotation.y) * speed;
        camera.position.z -= Math.sin(camera.rotation.y) * speed;
        myPlayer.position.z -= Math.cos(camera.rotation.y) * speed;
        myPlayer.position.z -= Math.sin(camera.rotation.y) * speed;
        myPlayerMesh.position.z -= Math.cos(camera.rotation.y) * speed;
        myPlayerMesh.position.z -= Math.sin(camera.rotation.y) * speed;

    } else if (input.down == 1) { // movement down
        camera.position.z += Math.cos(camera.rotation.y) * speed;
        camera.position.z += Math.sin(camera.rotation.y) * speed;
        myPlayer.position.z += Math.cos(camera.rotation.y) * speed;
        myPlayer.position.z += Math.sin(camera.rotation.y) * speed;
        myPlayerMesh.position.z += Math.cos(camera.rotation.y) * speed;
        myPlayerMesh.position.z += Math.sin(camera.rotation.y) * speed;
    }else if (input.rightb == 1) { // movement down
        camera.position.x += Math.cos(camera.rotation.y) * speed;
        camera.position.x += Math.sin(camera.rotation.y) * speed;
        myPlayer.position.x += Math.cos(camera.rotation.y) * speed;
        myPlayer.position.x += Math.sin(camera.rotation.y) * speed;
        myPlayerMesh.position.x += Math.cos(camera.rotation.y) * speed;
        myPlayerMesh.position.x += Math.sin(camera.rotation.y) * speed;
    }
}

document.addEventListener('keydown', (e) => {
    console.log("undi: " + e.keyCode);

    switch (e.keyCode) {
        case 87:
            input.up = 1;
            break;

        case 83:
            input.down = 1;
            break;

        case 65:
            input.left = 1;
            break;

        case 68:
            input.right = 1;
            break;
        case 70:
            input.rightb = 1;
            break;

    }
});

document.addEventListener('keyup', (e) => {
    console.log("undi: " + e.keyCode);

    switch (e.keyCode) {
        case 87:
            input.up = 0;
            break;

        case 83:
            input.down = 0;
            break;

        case 65:
            input.left = 0;
            break;

        case 68:
            input.right = 0;
            break;
        case 70:
            input.rightb = 0;
            break;

    }
});

function moveCamera(e) {
    let x = e.clientX;
    let z = e.clientZ;
    camera.rotation.z = z;
    camera.rotation.x = x;
    console.log(camera.rotation.z+" y "+camera.rotation.x);
}