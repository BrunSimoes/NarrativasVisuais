document.addEventListener("DOMContentLoaded", ()=>{
  //console.log("hey");

  let elementosAtivos = [];

  let allElementos = document.querySelectorAll(".getPoster");
  console.log(allElementos);

  const crank_01 = document.querySelector(".crank_01");
  //constructor(steps, elementCrank, maxHeight)
  const crankC = new Manivela(14,crank_01,20,0,42);

  //constructor(start, end, maxLevel, minLevel, elementLuz)
  const b = document.querySelector("body");
  const oxiLigth = new oxiLuz(0.8,1.5, b ,60);
  oxiLigth.start();

  let elementoPos = 0; 
  let elementoF = 0;
  let elementoI = 0;

  let wheelDirection = 0;

  let intervalNoise;
  let count = 0;
  let countRolls = 0;

  //Stain
  let countStain = 0;
  let intervalB;

  const noise = document.querySelector("#noise");
  let loadedImages = 0;
  
  const nAllNoiseImageEffect = 54;
  const zeroPad = (num, places) => String(num).padStart(places, '0');
  
  const loadImages = document.querySelectorAll(".LoadImage");
  const loadImagesSize = loadImages.length + (nAllNoiseImageEffect - 2) + 4;

  const phonograph = document.querySelector("#Phonograph");

  const progessBarN =  document.querySelector(".NarrativeProgressBarFilling");
  

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

        //Corrigir futuramente este codigo a metro 
        const stain = document.querySelector("#stains");  
        let stainImg = [];
        for(let i=1; i<=3; i++){
            const childNoise = document.createElement("img");
            childNoise.src = `Imgs/effects/stain/stain_effect_03_T_${zeroPad(i, 1)}.jpg`;
            childNoise.alt = `stain${zeroPad(i, 1)}.jpg`;

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
            stain.appendChild(childNoise);
            stainImg.push(childNoise);
        }

        const noiseImgs = document.querySelectorAll("#noise>img"); 
  //console.log(noiseImgs);

  const paralaxElements = document.querySelectorAll(".paralax"); 
  //console.log(paralaxElements);
  

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
        //console.log("estou em cima oh boi!");
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
                updateActiveElements();
                
                crankC.updateCount(countRolls);
                crankC.roda();

                progessBarN.style.width = `${mapping(countRolls,0,1000,0,100)}%`;
                //oxiLigth.oxilacao();

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

      function updateRotation(element) {
        
      }

      function updatePos(element) {
        
      }

      function updateVisibility(element) {
        
      }

      function updateAnimation(element) {
        
      }

      function updateActiveElements(){
        let Phonorect = phonograph.getBoundingClientRect();
        //remover add new Elements

        //Update Ative Elements 
        elementosAtivos.forEach(element => {
            const A = getkey(element.getAttribute("scrolling"),"A-");
            const S = getkey(element.getAttribute("scrolling"),"S-");

            if(countRolls>=A && countRolls<=S){
                const EPB = getkey(element.getAttribute("scrolling"),"EPB-");
                const EPL = getkey(element.getAttribute("scrolling"),"EPL-");
                const W = getkey(element.getAttribute("scrolling"),"W-");
                const R = getkey(element.getAttribute("scrolling"),"R-");

                const D0 = [getkey(element.getAttribute("scrolling"),"DW0-"),getkey(element.getAttribute("scrolling"),"DH0-")];
                const D1 = [getkey(element.getAttribute("scrolling"),"DW1-"),getkey(element.getAttribute("scrolling"),"DH1-")];
                
                const P0 = [(Phonorect.left+Phonorect.width/2)*100/window.innerWidth,(window.innerHeight-Phonorect.bottom+Phonorect.height*0.75)*100/window.innerHeight];
                const P1 = [P0[0]+D0[0],P0[1]+D0[1]];
                const P2 = [P1[0]+D0[0],P1[1]+D1[1]];
                const P3 = [EPL, EPB];

                //console.log(P0);
                //console.log(P1);
                //console.log(P2);
                //console.log(P3);

                //console.log(mapping(countRolls,A,S,0.,1.));

                const PA = cubicBezier(mapping(countRolls,A,S,0.01,1.),P0,P1,P2,P3);
         
            
                element.style.width = mapping(countRolls,A,S,0,W) + "px"; 
                element.style.transform = `translate(-50%,50%) rotate(${mapping(countRolls,A,S,0,R)}deg)`; 
                //element.style.transform = `scale (${mapping(countRolls,A,S,0,1)}) translate(-50%, 50%)`; 
                //cubicBezier();

                element.style.left = PA[0] + "%";
                element.style.bottom =  PA[1] + "%";
                
                //element.style.left = mapping(countRolls,A,S,(Phonorect.left+Phonorect.width/2)*100/window.innerWidth, EPL)+"%";
                //element.style.bottom = mapping(countRolls,A,S,(window.innerHeight-Phonorect.bottom+Phonorect.height*0.75)*100/window.innerHeight, EPB)+"%";  
                //element.style.bottom = mapping(countRolls,A,S,(window.innerHeight-Phonorect.bottom)*100/window.innerHeight, EPB)+"%";  
                
                //console.log(mapping(countRolls,A,S,Phonorect.left*100/window.innerWidth,EPL)+"%");
            }else {
                const DI = getkey(element.getAttribute("scrolling"),"DI-");
                const D = getkey(element.getAttribute("scrolling"),"D-");
                const B = getkey(element.getAttribute("scrolling"),"B-");

                element.style.filter= `blur(${mapping(countRolls,DI,D,0,B)}px)`;
                element.style.opacity = mapping(countRolls,DI,D,1,0);
            }
            //console.log(Phonorect.top-Phonorect.height);
        });


      } 

      function getkey(input, r){
        const startIndex = input.indexOf(r);
        if (startIndex !== -1) {
            // Pega o trecho a partir do final de "numa-"
            const subString = input.slice(startIndex + r.length);

            const number = parseInt(subString.split(" ")[0], 10);

            //console.log(number);
            return number;
        } else {
            console.log("String não encontrada.");
        }
     }

      function checkInside(element){
        if(element != undefined){
             const scrolling = element.getAttribute("scrolling");

            //Obter o ponto de entrada para surgir e o ponto de entrada para desaparecer
            if(scrolling != null || scrolling != undefined){
                    const A = getkey(scrolling,"A-");
                    //const S = getkey(scrolling,"S-");
                    const D = getkey(scrolling,"D-");

                    if(countRolls >= A && countRolls <= D){
                        //console.log("Adicionado à Verificação");
                        element.classList.remove("hidden");
                        elementosAtivos.push(element);
                    }else{
                        //console.log("Não Adicionado à Verificação");
                    }

                }else{
                    console.log("Error Falta de elemento");
                }
            }
      }

      function dActiveElements(){
        elementosAtivos.forEach(element => {
             const scrolling = element.getAttribute("scrolling");
             //Obter o ponto de entrada para surgir e o ponto de entrada para desaparecer
             
        if(scrolling != null || scrolling != undefined){
             const A = getkey(scrolling,"A-");
             //const S = getkey(scrolling,"S-");
             const D = getkey(scrolling,"D-");
                
            if(countRolls < A || countRolls > D){
                //console.log("removido à Verificação");
                const index = elementosAtivos.indexOf(element);
                if (index > -1) { 
                    element.classList.add("hidden");
                    elementosAtivos.splice(index, 1); 
                }
            }else{
               //console.log("Não Adicionado à Verificação");
            }
        }

        });
      }

      function updateActive(){
         if(elementosAtivos.length > 0){
             
             const posF = getkey(elementosAtivos[elementosAtivos.length-1].getAttribute("id"),"p_")+1;
             
             /*
             let posInfD = 0;

                          //Adicinar uma funcao para buscar o D mais a baixo dentro dos existentes
             allElementos.forEach(element => {
            
             });*/


             const posI = getkey(elementosAtivos[0].getAttribute("id"),"p_")-1;

             console.log(`allElements:${allElementos.length}`);
             console.log(`posF:${posF}`);
             console.log(`posI:${posI}`);

             if(posF < allElementos.length){
                console.log(document.querySelector(`#p_${posF}`));
                checkInside(document.querySelector(`#p_${posF}`));
             }
             if(posI > 0){
                checkInside(document.querySelector(`#p_${posI}`));
             }
         }else{
            checkInside(document.querySelector(`#p_${1}`));
            checkInside(document.querySelector(`#p_${allElementos.length}`));
         }

      }


      //cubic Bezier powerd by Chatgpt 
        function cubicBezier(t, p0, p1, p2, p3) {
            const u = 1. - t;
            const tt = t * t;
            const uu = u * u;
            const uuu = uu * u;
            const ttt = tt * t;
        
            // Fórmula da curva Bézier cúbica
            const x = uuu * p0[0] + 3 * uu * t * p1[0] + 3 * u * tt * p2[0] + ttt * p3[0];
            const y = uuu * p0[1] + 3 * uu * t * p1[1] + 3 * u * tt * p2[1] + ttt * p3[1];
        
            return [ x, y ];
        }

        dynamicTimeout();

        function dynamicTimeout() {
            const delay = Math.floor(Math.random() * 10000) + 10000; // Novo atraso entre 500ms e 2000ms
            setTimeout(dynamicTimeout, delay); // Configura o próximo timeout com o novo atraso
            intervalB = setInterval(burrao, 60);
        }

        function dTPulo() {
            const delay = Math.floor(Math.random() * 10000) + 10000; // Novo atraso entre 500ms e 2000ms
            setTimeout(dynamicTimeout, delay); // Configura o próximo timeout com o novo atraso
            intervalB = setInterval(burrao, 60);
        }
        
        function burrao(){
            if(countStain < 3){
                console.log(countStain);
                if(!stainImg[countStain].classList.contains("hidden"))stainImg[countStain].classList.add("hidden");
                if(stainImg[(countStain+1)%3].classList.contains("hidden"))stainImg[(countStain+1)%3].classList.remove("hidden");
            }
        
            countStain++;
        
            if(countStain === 4){
                countStain = 0;
                if(!stainImg[0].classList.contains("hidden"))stainImg[countStain].classList.add("hidden");
                clearInterval(intervalB);
            }
        } 

})



///////////////////////////CLASSES
class oxiLuz{
    constructor(maxLevel, minLevel, elementLuz, taxaAtualizacao){
       //this.start = start;
       //this.end = end;

       this.intervalOL;

       this.maxLevel = maxLevel;
       this.minLevel = minLevel;
       this.atualExp = 1;  

       this.vel = 0.01;

       this.taxaAtualizacao = taxaAtualizacao;
       this.elementLuz = elementLuz;
    }

    oxilacao(){ 
       //this.prob
       if(Math.random(0,1)<mapping(this.atualExp,this.minLevel,this.maxLevel,0,1)){
          this.atualExp += this.vel; 
       }else{
          this.atualExp -= this.vel;
       }

       //console.log(this.elementLuz);

       this.elementLuz.style.filter = `brightness(${this.atualExp})`;
    }

    start(){
        this.intervalOL  = setInterval(this.oxilacao.bind(this), this.taxaAtualizacao);
    }

    end(){
        clearInterval(this.intervalOL);
    }
}


//////////////MANIVELA
class Manivela {
    constructor(steps, elementCrank, maxHeight, minLim, maxLim) {
      this.steps = steps; 
      this.lastCrankH = 0;
      this.countRolls = 0;
      this.elementCrank  = elementCrank;
      this.crankH = 0;
      this.maxHeight = maxHeight; // 20

      //Lims 
      this.maxLim = maxLim;
      this.minLim = minLim;
    }
      roda(){
        if(this.countRolls>this.minLim && this.countRolls<this.maxLim){
            this.crankH = getCircleX(mapping(this.countRolls,0,this.steps,0,Math.PI*2),this.maxHeight);

            console.log("height:" + this.crankH);

            //dar a ilusão de rotação da
            if(this.crankH<=0){
                this.elementCrank.style.transform = ` translate(0,-100%) rotateX(180deg)`;
                console.log("bbbb");
            }else if(this.crankH>0){
                console.log("aaaa");
                this.elementCrank.style.transform = `translate(0,0) rotateX(0deg)`;
            }

            //Verificar se a alanvaca esta a em cima ou em baixo depois da rotação
            this.dir = (this.lastCrankH - this.crankH); 
            console.log("crank:" + this.dir);

            if(this.dir > 0){
                this.elementCrank.style.zIndex = 0; 
            }else{
                this.elementCrank.style.zIndex = -5; 
            }

            //Atribuir last crankH
            this.lastCrankH = this.crankH;
            //tamanho da alanvanca
            this.elementCrank.style.height = `${Math.abs(this.crankH)}%`;
       }
        
      }

      updateCount(countR){
        this.countRolls = countR;
      }
  }

      //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/cos
      function getCircleX(radians, radius) {
        return Math.cos(radians) * radius;
      }

      function mapping(num, minNum, maxNum, minOut, maxOut){
        return minOut + (maxOut - minOut) * (num - minNum) / (maxNum - minNum);
      }


