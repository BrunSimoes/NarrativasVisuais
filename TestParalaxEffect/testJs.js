const intensidades = [0.01,0.03,0.05,0.07,0.09];
let posters;
const main =  this.document.querySelector("main"); ;
//let px;
//let py;

//Check para ver se o script esta a correr;
window.addEventListener("load",function(){
console.log("loaded");
})

//Loading Screen 
//TODO
/*Fazer um fetch das imagens para confirmar que as imagens estão a ser carregadas e o processo das mesmas
por conta do loading screen*/

/*document.addEventListener("start",function(){
});*/


/*Paralax Effect*/
posters = document.querySelectorAll(".poster");
console.log(posters);


window.addEventListener("mousemove", updateDisplay, false );

function updatePosParalax(poster, c){
    var rect = poster.getBoundingClientRect();
    console.log(rect.top, rect.right, rect.bottom, rect.left);

    //console.log(c.getAttribute("value") + c.className);

    c.style.left = (rect.left - px) * c.getAttribute("value") + "px";
    c.style.top = (rect.top - py) * c.getAttribute("value")+ "px" ;

    //Consultar cada imagem por camada
    /*for (const child of c.children){
        var imgRect = child.getBoundingClientRect();
        console.log(imgRect.top, imgRect.right, imgRect.bottom, imgRect.left);
        
        //Mover as imagens 
        child.style.left = (rect.left - 100) * intensidades[3] + "px";
        child.style.top = (rect.top - 100) * intensidades[3] + "px" ;
    }*/
}

function updateParalax () {
    console.log(posters.length);

    for(let i = 0; i<posters.length; i++){
        console.log(i);
        if(posters[i]!== undefined && posters.length>0){
            console.log("updateParalax");
            for (const child of posters[i].children) {
                
                updatePosParalax(posters[i] ,child);
                if(child.className !== "poster_shadow" )console.log(child.className);
            }
        }
        else{
            console.log("erro: erro a carregar o poster " + i);
        }
    }
}

function updateDisplay(e) {
    console.log(main);

    px = e.clientX;
    py = e.clientY;

    console.log(px,py);

    updateParalax();
}

