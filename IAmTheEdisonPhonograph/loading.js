document.addEventListener("DOMContentLoaded", ()=>{
  console.log("hey");
  
  let loadedImages = 0;

  const loadImages = document.querySelectorAll(".LoadImage");
  const loadImagesSize = loadImages.length;

  const progressPercent = document.getElementById("NumberPerc");
  const ProcessingFilling = document.querySelector(".ProcessingFilling");
 
  const loadingScreen = document.querySelector ("#LoadingScreen"); 

  // Atualiza a barra de progresso e o texto
      function updateProgressBar() {
        const percent = Math.round((loadedImages / loadImagesSize) * 100);
        progressPercent.innerText = percent;
        ProcessingFilling.style.width = `${percent}%`;

        if (loadedImages === loadImagesSize) {
            // Esconde a tela de loading e exibe a galeria
            loadingScreen.style.display = "none";
        }

        console.log(loadedImages);
    }

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

})
