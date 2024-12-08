document.addEventListener("DOMContentLoaded", ()=>{
  console.log("hey");

  let elementosAtivos = [];

  let allElementos = document.querySelectorAll(".getPoster");
  console.log(allElementos);

  let elementoPos = 0; 
  let elementoF = 0;
  let elementoI = 0;

  let wheelDirection = 0;

  let intervalNoise;
  let count = 0;
  let countRolls = 0;

  const noise = document.querySelector("#noise");
  let loadedImages = 0;
  
  const nAllNoiseImageEffect = 54;
  const zeroPad = (num, places) => String(num).padStart(places, '0');
  
  const loadImages = document.querySelectorAll(".LoadImage");
  const loadImagesSize = loadImages.length + (nAllNoiseImageEffect - 2) + 1;

  //Resulta pk estou a carregar o stylesheet antes
  //Para ser mais correto deveria carregar para a cache usando o working service
  //Que ainda não entendi como funciona....

  function fetchAndAttachStylesheet(url) {
    // Cria o elemento <link>
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = url;

    link.onload = () => {
        loadedImages++;
        updateProgressBar();
    };
    link.onerror = () => {
        console.error(`stylesheet: ${img.src}`);
        loadedImages++;
        updateProgressBar();
    };
    document.head.appendChild(link);
    // Adiciona ao <head> do documento
}

fetchAndAttachStylesheet('/font.css');

        //Dar load das imagens 
        for(let i=2; i<=nAllNoiseImageEffect; i++){
            const childNoise = document.createElement("img");
            childNoise.src = `Imgs/effects/noise/ezgif-frame-${zeroPad(i, 3)}.jpg`;
            childNoise.alt = `ezgif-frame-${zeroPad(i, 3)}.jpg`;
            
            childNoise.classList.add("hidden");
            childNoise.classList.add("LoadImage");
            childNoise.classList.add("image");
            childNoise.classList.add("user-drag-none");

            childNoise.onload = () => {
                loadedImages++;
                updateProgressBar();
            };
            childNoise.onerror = () => {
                console.error(`Erro ao carregar a imagem: ${img.src}`);
                loadedImages++;
                updateProgressBar();
            };
            noise.appendChild(childNoise);
        }

        const noiseImgs = document.querySelectorAll("#noise>img"); 
  //console.log(noiseImgs);

  const paralaxElements = document.querySelectorAll(".paralax"); 
  console.log(paralaxElements);
  

  const progressPercent = document.getElementById("NumberPerc");
  const ProcessingFilling = document.querySelector(".ProcessingFilling");
 
  const loadingScreen = document.querySelector ("#LoadingScreen"); 

  const handler = document.querySelector("#Handle");

  // Atualiza a barra de progresso e o texto
      function updateProgressBar() {
        const percent = Math.round((loadedImages / loadImagesSize) * 100);
        progressPercent.innerText = percent;
        ProcessingFilling.style.width = `${percent}%`;

        if (loadedImages === loadImagesSize) {
            // Esconde a tela de loading e exibe a galeria
            loadingScreen.style.display = "none";
            intervalNoise = setInterval(SwitchNoiseImage,60);
        }

        console.log(loadedImages);
    }

    //Carregar imagens do atributo data-src , sem o lazyloading 
    loadImages.forEach((img) => {
    const src = img.getAttribute("data-src");
        if (src) {
            img.src = src;
        img.onload = () => {
            loadedImages++;
            updateProgressBar();
        };
        img.onerror = () => {
            console.error(`Erro ao carregar a imagem: ${img.src}`);
            loadedImages++;
            updateProgressBar();
        };
    };
    });

    console.log(handler);

    handler.addEventListener("mouseenter",(event) => {
        console.log("estou em cima oh boi!");
    });



    //SCROLL
            window.addEventListener("wheel", function(event) {
                if (event.deltaY > 0) {
                    countRolls += 1; // Incrementa para baixo
                    wheelDirection = 1;
                } else if (event.deltaY < 0 && countRolls-1>0) {
                    countRolls -= 1; // Decrementa para cima
                    wheelDirection = -1;
                }

                dActiveElements();
                updateActive();
                console.log(elementosAtivos);
                console.log(`Contador ajustado: ${countRolls}`);
            });

    //window.addEventListener("mousemove", paralaxUpdate, false);

    //Paralax 
    /*
    function paralaxUpdate(e){    
         paralaxElements.forEach(par => {
            let imgParalx = par.querySelector(".aux");

            //let bottomValue = parseInt(style.bottom) || 0;
            //let leftValue = parseInt(style.left) || 0;

            //console.log(par, leftValue);

            var rect = par.getBoundingClientRect();
            console.log(rect.top, rect.right, rect.bottom, rect.left);
    
            //console.log(c.getAttribute("value") + c.className);
            imgParalx.style.position = "absolute";
            imgParalx.style.bottom = (rect.bottom - e.clientY) * par.getAttribute("value") + "px";
            imgParalx.style.left = (rect.left  - e.clientX) * par.getAttribute("value")+ "px" ;
         });
    }*/
    


    function SwitchNoiseImage (){
        count = (count+1)%nAllNoiseImageEffect;
        if(!noiseImgs[count].classList.contains("hidden")) noiseImgs[count].classList.add("hidden");
        if(noiseImgs[(count+1)%nAllNoiseImageEffect].classList.contains("hidden")) noiseImgs[(count+1)%nAllNoiseImageEffect].classList.remove("hidden");
      }

      function updateRotation(params) {
        
      }

      function updatePos(params) {
        
      }

      function updateVisibility(params) {
        
      }

      function updateAnimation(params) {
        
      }

      function getkey(input, r){
        const startIndex = input.indexOf(r);
        if (startIndex !== -1) {
            // Pega o trecho a partir do final de "numa-"
            const subString = input.slice(startIndex + r.length);

            const number = parseInt(subString.split(" ")[0], 10);

            console.log(number);
            return number;
        } else {
            console.log("String não encontrada.");
        }
     }

      function checkInside(element){
        if(element != undefined){
             const scrolling = element.getAttribute("scrolling");

            //Obter o ponto de entrada para surgir e o ponto de entrada para desaparecer
             const A = getkey(scrolling,"A-");
             //const S = getkey(scrolling,"S-");
             const D = getkey(scrolling,"D-");

             if(countRolls >= A && countRolls <= D){
                 console.log("Adicionado à Verificação");
                 elementosAtivos.push(element);
             }else{
                console.log("Não Adicionado à Verificação");
             }

        }else{
            console.log("Error Falta de elemento");
        }
      }

      function dActiveElements(){
        elementosAtivos.forEach(element => {
             const scrolling = element.getAttribute("scrolling");
             //Obter o ponto de entrada para surgir e o ponto de entrada para desaparecer
             const A = getkey(scrolling,"A-");
             //const S = getkey(scrolling,"S-");
             const D = getkey(scrolling,"D-");
                
            if(countRolls < A || countRolls > D){
                console.log("removido à Verificação");
                const index = elementosAtivos.indexOf(element);
                if (index > -1) { 
                    elementosAtivos.splice(index, 1); 
                }
            }else{
               console.log("Não Adicionado à Verificação");
            }

        });
      }

      function updateActive(){
         if(elementosAtivos.length > 0){
             
             const posF = getkey(elementosAtivos[elementosAtivos.length-1].getAttribute("id"),"p_")+1;
             const posI = getkey(elementosAtivos[0].getAttribute("id"),"p_")-1;

             console.log(`allElements:${allElementos.length}`);
             console.log(`posF:${posF}`);
             console.log(`posI:${posI}`);

             if(posF < allElementos.length){
                checkInside(document.querySelector(`#p_${posF}`));
                console.log(document.querySelector(`#p_${posF}`));
             }
             if(posI > 0){
                checkInside(document.querySelector(`#p_${posI}`));
             }
         }else{
            checkInside(document.querySelector(`#p_${1}`));
            checkInside(document.querySelector(`#p_${allElementos.length}`));
         }

      }

      function mapping(num, minNum, maxNum, minOut, maxOut){
        return minOut + (maxOut - minOut) * (num - minNum) / (maxNum - minNum);
      }

})


