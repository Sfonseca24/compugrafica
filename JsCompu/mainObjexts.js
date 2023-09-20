/*
    author: Santiago Fonseca
    last date of creation: 23/08/2023 9:20 pm
    last modification: 29/08/2023 11:54 pm
*/

// creation elements

var scene = null,
    camera = null,
    renderer = null,
    control = null;

function startScene() {



}

function animate() {
}

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {


}

function loadModel_objMtl() {
    //load Mtl
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setResourcePath("../recursos-imagen/models/obj_mtl/Escenario");
    mtlLoader.setPath("../recursos-imagen/models/obj_mtl/Escenario");
    mtlLoader.load("MyplaceofcharacterWithCharacter-2.mtl", function (materials) {
        materials.preload();

        //load OBJ
        var objLoader = new THREE.OBJLoader();
        objLoader.setPath("../recursos-imagen/models/obj_mtl/Escenario");
        objLoader.setMaterials(materials);
        objLoader.load("MyplaceofcharacterWithCharacter-2.obj", function (object) {
            scene.add(object);
        })
    })


}
