const btnCat = document.getElementById("btnCat");
const catImage = document.getElementById("catImage");
const errorMsg = document.getElementById("error");

async function fetchCat() {
  errorMsg.textContent = ""; // Limpa erros anteriores
  try {
    const response = await fetch("https://api.thecatapi.com/v1/images/search");
    const data = await response.json();
    catImage.src = data[0].url; // Define a imagem
  } catch (error) {
    errorMsg.textContent = "Erro ao carregar imagem do gato";
  }
}

// Carrega uma imagem ao abrir a página
fetchCat();

// E toda vez que clicar no botão, carrega outra
btnCat.addEventListener("click", fetchCat);
