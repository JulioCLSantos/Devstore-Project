// 1. ENCONTRANDO AS PEÇAS NA PÁGINA
// ---------------------------------
// Estamos pegando todos os botões, imagens e indicadores da página
const prevButton = document.getElementById('prev');    // Botão de voltar
const nextButton = document.getElementById('next');    // Botão de avançar
const items = document.querySelectorAll('.item');      // Todos os produtos
const dots = document.querySelectorAll('.dot');        // Bolinhas indicadoras
const numberIndicator = document.querySelector('.numbers'); // Número (01, 02...)
const list = document.querySelector('.list');          // Área do carrossel

// 2. CONFIGURANDO O SISTEMA
// -------------------------
let active = 0;                 // Produto atual (começa no primeiro)
const total = items.length;     // Total de produtos
let timer;                      // Temporizador para mudança automática

// 3. FUNÇÃO QUE MUDA OS PRODUTOS
// ------------------------------
function update(direction) {
  // Remove o destaque do produto e bolinha atuais
  document.querySelector('.item.active').classList.remove('active');
  document.querySelector('.dot.active').classList.remove('active');

  // Decide para onde vai: próximo ou anterior
  if (direction > 0) {
    active = (active + 1) % total;     // Vai para o próximo (se chegar no final, volta pro início)
  } else if (direction < 0) {
    active = (active - 1 + total) % total; // Vai para o anterior (se chegar no início, vai pro final)
  }

  // Destaca o novo produto e bolinha
  items[active].classList.add('active');
  dots[active].classList.add('active');

  // Atualiza o número (01, 02, 03...)
  numberIndicator.textContent = (active + 1).toString().padStart(2, '0');
}

// 4. MUDANÇA AUTOMÁTICA
// ---------------------
function startAutoPlay() {
  timer = setInterval(() => {
    update(1);  // Muda para o próximo produto a cada 5 segundos
  }, 5000);
}

// Inicia a mudança automática
startAutoPlay();

// 5. INTERAÇÃO DO USUÁRIO
// -----------------------
// Quando o mouse entra no carrossel, para a mudança automática
list.addEventListener('mouseenter', () => clearInterval(timer));

// Quando o mouse sai, volta a mudar automaticamente
list.addEventListener('mouseleave', startAutoPlay);

// Quando clica no botão "voltar"
prevButton.addEventListener('click', () => {
  clearInterval(timer);  // Para o automático
  update(-1);            // Mostra produto anterior
  startAutoPlay();       // Reinicia o automático
});

// Quando clica no botão "avançar"
nextButton.addEventListener('click', () => {
  clearInterval(timer);  // Para o automático
  update(1);             // Mostra próximo produto
  startAutoPlay();       // Reinicia o automático
});