// ===== VARIÁVEIS GLOBAIS =====
let openedCards = 0 // Contador de cartas abertas
const totalCards = 16 // Total de cartas (10 pequenas + 6 médias)

// ===== INICIALIZAÇÃO QUANDO A PÁGINA CARREGA =====
document.addEventListener("DOMContentLoaded", () => {
  // Iniciar animações da página 1
  createSunflowers()
  createFloatingHearts()

  // Configurar botão para ir para página 2
  setupGiftButton()

  // Configurar cartas da página 2
  setupCards()

  // Iniciar corações da página 2
  createFloatingHeartsPage2()
})

// ===== FUNÇÃO PARA CRIAR GIRASSÓIS ANIMADOS =====
function createSunflowers() {
  const container = document.querySelector(".sunflowers-container")

  // Criar girassóis continuamente
  setInterval(() => {
    const sunflower = document.createElement("div")
    sunflower.className = "sunflower"
    sunflower.innerHTML = "🌻"

    // Posição aleatória horizontal
    sunflower.style.left = Math.random() * 100 + "%"

    // Delay aleatório para variação
    sunflower.style.animationDelay = Math.random() * 2 + "s"

    container.appendChild(sunflower)

    // Remover girassol após animação
    setTimeout(() => {
      if (sunflower.parentNode) {
        sunflower.parentNode.removeChild(sunflower)
      }
    }, 4000)
  }, 800)
}

// ===== FUNÇÃO PARA CRIAR CORAÇÕES FLUTUANTES PÁGINA 1 =====
function createFloatingHearts() {
  const container = document.querySelector(".floating-hearts")

  setInterval(() => {
    const heart = document.createElement("div")
    heart.className = "heart"
    heart.innerHTML = "💖"

    // Posição aleatória horizontal
    heart.style.left = Math.random() * 100 + "%"

    // Delay aleatório
    heart.style.animationDelay = Math.random() * 3 + "s"

    container.appendChild(heart)

    // Remover coração após animação
    setTimeout(() => {
      if (heart.parentNode) {
        heart.parentNode.removeChild(heart)
      }
    }, 6000)
  }, 500)
}

// ===== FUNÇÃO PARA CRIAR CORAÇÕES FLUTUANTES PÁGINA 2 =====
function createFloatingHeartsPage2() {
  const container = document.querySelector(".floating-hearts-page2")

  setInterval(() => {
    const heart = document.createElement("div")
    heart.className = "heart-page2"
    heart.innerHTML = "💕"

    // Posição aleatória horizontal
    heart.style.left = Math.random() * 100 + "%"

    // Delay aleatório
    heart.style.animationDelay = Math.random() * 4 + "s"

    container.appendChild(heart)

    // Remover coração após animação
    setTimeout(() => {
      if (heart.parentNode) {
        heart.parentNode.removeChild(heart)
      }
    }, 8000)
  }, 1000)
}

// ===== CONFIGURAR BOTÃO "VER PRESENTE" =====
function setupGiftButton() {
  const giftButton = document.getElementById("giftButton")

  giftButton.addEventListener("click", () => {
    // Transição suave entre páginas
    const page1 = document.getElementById("page1")
    const page2 = document.getElementById("page2")

    page1.classList.remove("active")
    page2.classList.add("active")
  })
}

// ===== CONFIGURAR CARTAS INTERATIVAS =====
function setupCards() {
  const cards = document.querySelectorAll(".card")

  cards.forEach((card) => {
    card.addEventListener("click", function () {
      // Verificar se a carta já foi aberta
      if (this.classList.contains("flipped")) {
        return // Não fazer nada se já estiver aberta
      }

      // Animar abertura da carta
      this.classList.add("flipped")

      // Criar corações que sobem
      createRisingHearts(this)

      // Atualizar contador
      openedCards++
      updateCounter()

      // Verificar se todas as cartas foram abertas
      if (openedCards === totalCards) {
        setTimeout(() => {
          alert("🎉 Parabéns! Você abriu todas as cartas! 💖")
        }, 500)
      }
    })
  })
}

// ===== FUNÇÃO PARA CRIAR CORAÇÕES QUE SOBEM =====
function createRisingHearts(clickedCard) {
  const container = document.querySelector(".rising-hearts")
  const cardRect = clickedCard.getBoundingClientRect()

  // Criar múltiplos corações
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      const heart = document.createElement("div")
      heart.className = "rising-heart"
      heart.innerHTML = "💖"

      // Posicionar próximo à carta clicada
      heart.style.left = cardRect.left + cardRect.width / 2 + (Math.random() - 0.5) * 100 + "px"
      heart.style.top = cardRect.top + cardRect.height / 2 + "px"

      container.appendChild(heart)

      // Remover coração após animação
      setTimeout(() => {
        if (heart.parentNode) {
          heart.parentNode.removeChild(heart)
        }
      }, 2000)
    }, i * 100)
  }
}

// ===== ATUALIZAR CONTADOR =====
function updateCounter() {
  const counterText = document.getElementById("counterText")
  counterText.textContent = `${openedCards}/${totalCards}`

  // Animação do contador
  counterText.style.transform = "scale(1.2)"
  setTimeout(() => {
    counterText.style.transform = "scale(1)"
  }, 200)
}

// ===== PERSONALIZAÇÃO FÁCIL =====
/*
COMO PERSONALIZAR:

1. FRASES ROMÂNTICAS:
   - Vá até o HTML e encontre as cartas pequenas (small-card)
   - Dentro de cada .card-back > p, troque o texto pelas suas frases

2. IMAGENS:
   - Vá até o HTML e encontre as cartas médias (medium-card)
   - Dentro de cada .card-back > img, troque o src="/placeholder.svg..." pela URL da sua imagem
   - Exemplo: src="caminho/para/sua/foto.jpg"

3. CORES:
   - No CSS, procure por cores como #ff69b4 (rosa) e #ff1493 (rosa escuro)
   - Troque pelas cores de sua preferência

4. VELOCIDADE DAS ANIMAÇÕES:
   - No CSS, procure por "animation:" e ajuste os tempos (ex: 4s, 6s, 8s)
   - Números menores = mais rápido, números maiores = mais lento

5. QUANTIDADE DE ELEMENTOS:
   - No JavaScript, ajuste os intervalos (setInterval) para criar mais ou menos elementos
   - Números menores = mais elementos, números maiores = menos elementos
*/
