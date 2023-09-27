/*
    author: Santiago Fonseca
    last date of creation: 26/09/2023 4:00 pm
    last modification: 26/09/2023 11:54 pm
*/

// creation elements

var scene = null,
    camera = null,
    renderer = null,
    control = null;

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
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    camera.position.set(43, 25, 40);
    controls.update();

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

    createCollectibles();
}

function animate() {

    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);


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

            document.getElementById("winpage").style.display = "block";

            break;

        case 'lose':

            document.getElementById("lostpage").style.display = "block";

            break;
    }

}