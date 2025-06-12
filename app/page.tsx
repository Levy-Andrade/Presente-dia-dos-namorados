"use client"

import { useEffect, useState } from "react"

export default function RomanticPages() {
  const [currentPage, setCurrentPage] = useState(1)
  const [openedCards, setOpenedCards] = useState(0)
  const [flippedCards, setFlippedCards] = useState(new Set())
  const [showFinalHeart, setShowFinalHeart] = useState(false)
  const [zoomedCard, setZoomedCard] = useState(null) // Para controlar qual carta está ampliada

  // Estados para as perguntas
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [nameAnswer, setNameAnswer] = useState("")
  const [showBeautyError, setShowBeautyError] = useState(false)
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 50, y: 50 })

  // Frases românticas expandidas (15 frases)
  const romanticPhrases = [
    "Você é a razão do meu sorriso todos os dias! 💖",
    "Meu coração bate mais forte quando você está por perto! 💓",
    "Você faz meus dias mais coloridos e especiais! 🌈",
    "Com você, cada momento se torna uma memória preciosa! ✨",
    "Você é meu sol em dias nublados! ☀️",
    "Meu amor por você cresce a cada dia que passa! 🌱",
    "Você é a melodia mais doce da minha vida! 🎵",
    "Obrigado(a) por tornar minha vida mais feliz! 😊",
    "Você é meu lugar favorito no mundo! 🏠",
    "Para sempre e sempre, você será meu amor! 💍",
    "Você ilumina minha vida como ninguém! 🌟",
    "Cada dia ao seu lado é uma nova aventura! 🚀",
    "Você é meu sonho que se tornou realidade! 💫",
    "Minha vida ficou completa quando você chegou! 🧩",
    "Você é a poesia mais bela que já li! 📖",
  ]

  useEffect(() => {
    // Criar girassóis animados para todas as páginas
    const createSunflowers = () => {
      const containers = [
        ".sunflowers-container",
        ".sunflowers-container-page2",
        ".sunflowers-container-page3",
        ".sunflowers-container-page4",
      ]

      containers.forEach((containerClass) => {
        const container = document.querySelector(containerClass)
        if (!container) return

        for (let i = 0; i < 3; i++) {
          setTimeout(() => {
            const sunflower = document.createElement("div")
            sunflower.className = "sunflower"
            sunflower.innerHTML = "🌻"
            sunflower.style.left = Math.random() * 100 + "%"
            sunflower.style.animationDelay = Math.random() * 2 + "s"

            container.appendChild(sunflower)

            setTimeout(() => {
              if (sunflower.parentNode) {
                sunflower.parentNode.removeChild(sunflower)
              }
            }, 4000)
          }, i * 200)
        }
      })
    }

    // Criar corações flutuantes para todas as páginas
    const createHearts = (containerClasses) => {
      return setInterval(() => {
        containerClasses.forEach((containerClass) => {
          const container = document.querySelector(containerClass)
          if (!container) return

          for (let i = 0; i < 2; i++) {
            setTimeout(() => {
              const heart = document.createElement("div")
              heart.className = "heart"
              heart.innerHTML = "💖"
              heart.style.left = Math.random() * 100 + "%"
              heart.style.animationDelay = Math.random() * 3 + "s"

              container.appendChild(heart)

              setTimeout(() => {
                if (heart.parentNode) {
                  heart.parentNode.removeChild(heart)
                }
              }, 6000)
            }, i * 100)
          }
        })
      }, 250)
    }

    let sunflowerInterval, heartsInterval

    if (currentPage === 1) {
      sunflowerInterval = setInterval(createSunflowers, 400)
      heartsInterval = createHearts([".floating-hearts"])
    } else if (currentPage === 2) {
      sunflowerInterval = setInterval(createSunflowers, 400)
      heartsInterval = createHearts([".floating-hearts-page2"])
    } else if (currentPage === 3) {
      sunflowerInterval = setInterval(createSunflowers, 400)
      heartsInterval = createHearts([".floating-hearts-page3"])
    } else if (currentPage === 4) {
      sunflowerInterval = setInterval(createSunflowers, 400)
      heartsInterval = createHearts([".floating-hearts-page4"])
    }

    return () => {
      if (sunflowerInterval) clearInterval(sunflowerInterval)
      if (heartsInterval) clearInterval(heartsInterval)
    }
  }, [currentPage])

  // Função para lidar com clique nas cartas
  const handleCardClick = (cardIndex, event) => {
    event.stopPropagation()

    // Se a carta já está ampliada, apenas feche o zoom
    if (zoomedCard === cardIndex) {
      setZoomedCard(null)
      return
    }

    // Se a carta não está aberta, abra ela primeiro
    if (!flippedCards.has(cardIndex)) {
      const newFlippedCards = new Set([...flippedCards, cardIndex])
      setFlippedCards(newFlippedCards)

      const newCount = newFlippedCards.size
      setOpenedCards(newCount)

      createRisingHearts()

      // Verificar se todas as cartas foram abertas
      if (newCount === 26) {
        setTimeout(() => {
          setShowFinalHeart(true)
          setTimeout(() => {
            setShowFinalHeart(false)
          }, 4000)
        }, 500)
      }
    }

    // Ampliar a carta
    setTimeout(
      () => {
        setZoomedCard(cardIndex)
      },
      flippedCards.has(cardIndex) ? 0 : 600,
    ) // Delay se a carta está sendo aberta
  }

  // Função para fechar o zoom ao clicar fora
  const handleBackgroundClick = (event) => {
    // Só fechar se não clicou em um envelope
    if (!event.target.closest(".envelope")) {
      setZoomedCard(null)
    }
  }

  const createRisingHearts = () => {
    const container = document.querySelector(".rising-hearts")
    if (!container) return

    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        const heart = document.createElement("div")
        heart.className = "rising-heart"
        heart.innerHTML = "💖"
        heart.style.left = Math.random() * 100 + "%"
        heart.style.top = "50%"

        container.appendChild(heart)

        setTimeout(() => {
          if (heart.parentNode) {
            heart.parentNode.removeChild(heart)
          }
        }, 2000)
      }, i * 100)
    }
  }

  // POSIÇÕES FIXAS E BEM ESPAÇADAS
  const generateOrganizedPositions = () => {
    const positions = []

    // Definir áreas organizadas da tela
    const areas = [
      // Linha superior
      { top: 15, left: 10 },
      { top: 15, left: 25 },
      { top: 15, left: 40 },
      { top: 15, left: 55 },
      { top: 15, left: 70 },
      { top: 15, left: 85 },
      // Segunda linha
      { top: 30, left: 5 },
      { top: 30, left: 20 },
      { top: 30, left: 35 },
      { top: 30, left: 50 },
      { top: 30, left: 65 },
      { top: 30, left: 80 },
      // Terceira linha
      { top: 45, left: 10 },
      { top: 45, left: 25 },
      { top: 45, left: 40 },
      { top: 45, left: 55 },
      { top: 45, left: 70 },
      { top: 45, left: 85 },
      // Quarta linha
      { top: 60, left: 15 },
      { top: 60, left: 30 },
      { top: 60, left: 45 },
      { top: 60, left: 60 },
      { top: 60, left: 75 },
      // Quinta linha
      { top: 75, left: 20 },
      { top: 75, left: 35 },
      { top: 75, left: 50 },
      { top: 75, left: 65 },
    ]

    for (let i = 0; i < 26; i++) {
      const area = areas[i] || { top: 50, left: 50 }
      positions.push({
        top: area.top,
        left: area.left,
        rotation: ((i % 4) - 2) * 5, // Rotação fixa baseada no índice
      })
    }

    return positions
  }

  const [envelopePositions] = useState(generateOrganizedPositions())

  // Funções para as perguntas
  const handleNameSubmit = (e) => {
    e.preventDefault()
    if (nameAnswer.toLowerCase().includes("lorraini") || nameAnswer.toLowerCase().includes("lorrainni")) {
      setCurrentQuestion(2)
    } else {
      alert("Hmm... tem certeza? 🤔")
    }
  }

  const handleBeautyAnswer = (level) => {
    if (level === 3) {
      setCurrentQuestion(3)
      setShowBeautyError(false)
    } else {
      setShowBeautyError(true)
      setTimeout(() => setShowBeautyError(false), 3000)
    }
  }

  const moveNoButton = () => {
    setNoButtonPosition({
      x: Math.random() * 70 + 10,
      y: Math.random() * 70 + 10,
    })
  }

  const handleLoveAnswer = () => {
    setCurrentPage(3) // Ir para a página dos envelopes
  }

  return (
    <>
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: "Arial", sans-serif;
          overflow-x: hidden;
        }

        .page {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          opacity: 0;
          visibility: hidden;
          transition: all 0.8s ease-in-out;
          z-index: 1;
        }

        .page.active {
          opacity: 1;
          visibility: visible;
          z-index: 2;
        }

        /* TODAS AS PÁGINAS COM FUNDO PRETO */
        .page1, .page2, .page3, .page4 {
          background: linear-gradient(135deg, #000000, #1a1a1a);
        }

        .center-content {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 10;
        }

        .gift-button {
          background: linear-gradient(45deg, #ff69b4, #ff1493);
          border: none;
          padding: 20px 40px;
          font-size: 24px;
          color: white;
          border-radius: 50px;
          cursor: pointer;
          box-shadow: 0 8px 25px rgba(255, 105, 180, 0.4);
          transition: all 0.3s ease;
          font-weight: bold;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }

        .gift-button:hover {
          transform: scale(1.1);
          box-shadow: 0 12px 35px rgba(255, 105, 180, 0.6);
        }

        /* BOTÕES FIXOS */
        .end-button, .back-button {
          position: fixed;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1000;
          background: linear-gradient(45deg, #ff69b4, #ff1493);
          border: none;
          padding: 15px 30px;
          font-size: 18px;
          color: white;
          border-radius: 50px;
          cursor: pointer;
          box-shadow: 0 8px 25px rgba(255, 105, 180, 0.4);
          transition: all 0.3s ease;
          font-weight: bold;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }

        .end-button:hover, .back-button:hover {
          transform: translateX(-50%) scale(1.1);
          box-shadow: 0 12px 35px rgba(255, 105, 180, 0.6);
        }

        /* ESTILOS DA PÁGINA DE PERGUNTAS */
        .questions-container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(255, 255, 255, 0.95);
          padding: 40px;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          text-align: center;
          max-width: 500px;
          width: 90%;
          z-index: 10;
        }

        .question-title {
          font-size: 28px;
          color: #ff1493;
          margin-bottom: 30px;
          font-weight: bold;
        }

        .question-input {
          width: 100%;
          padding: 15px;
          font-size: 18px;
          border: 2px solid #ff69b4;
          border-radius: 10px;
          margin-bottom: 20px;
          text-align: center;
        }

        .question-button {
          background: linear-gradient(45deg, #ff69b4, #ff1493);
          border: none;
          padding: 15px 30px;
          font-size: 18px;
          color: white;
          border-radius: 10px;
          cursor: pointer;
          margin: 10px;
          transition: all 0.3s ease;
          font-weight: bold;
        }

        .question-button:hover {
          transform: scale(1.05);
          box-shadow: 0 5px 15px rgba(255, 105, 180, 0.4);
        }

        .error-message {
          color: #ff1493;
          font-size: 18px;
          font-weight: bold;
          margin-top: 15px;
          animation: shake 0.5s ease-in-out;
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }

        .no-button {
          position: absolute;
          background: linear-gradient(45deg, #ff69b4, #ff1493);
          border: none;
          padding: 15px 30px;
          font-size: 18px;
          color: white;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: bold;
        }

        .sunflowers-container, .sunflowers-container-page2, .sunflowers-container-page3, .sunflowers-container-page4 {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 1;
        }

        .sunflower {
          position: absolute;
          font-size: 80px;
          animation: growSunflower 4s ease-out infinite;
          opacity: 0;
        }

        @keyframes growSunflower {
          0% {
            transform: translateY(100vh) scale(0) rotate(0deg);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          50% {
            transform: translateY(20vh) scale(1) rotate(180deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-20vh) scale(1.2) rotate(360deg);
            opacity: 0;
          }
        }

        .floating-hearts, .floating-hearts-page2, .floating-hearts-page3, .floating-hearts-page4 {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 1;
        }

        .heart {
          position: absolute;
          font-size: 35px;
          color: #ff69b4;
          animation: floatHeart 6s linear infinite;
          opacity: 0.6;
        }

        @keyframes floatHeart {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
          }
        }

        /* CONTADOR MELHORADO */
        .counter {
          position: fixed;
          top: 20px;
          right: 20px;
          background: rgba(255, 255, 255, 0.95);
          padding: 15px 25px;
          border-radius: 25px;
          font-size: 28px;
          font-weight: bold;
          color: #ff1493;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
          z-index: 100;
          border: 3px solid #ff69b4;
          animation: counterPulse 2s ease-in-out infinite;
        }

        @keyframes counterPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .envelopes-container {
          position: relative;
          width: 100%;
          height: 100vh;
          z-index: 10;
          padding: 20px;
        }

        /* ENVELOPES COM POSIÇÕES FIXAS */
        .envelope {
          position: absolute;
          width: 110px;
          height: 75px;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 10;
        }

        .envelope:hover:not(.zoomed) {
          transform: scale(1.15) !important;
          z-index: 50;
          filter: drop-shadow(0 8px 16px rgba(255, 105, 180, 0.4));
        }

        /* ENVELOPE AMPLIADO - SEM OVERLAY ESCURO */
        .envelope.zoomed {
          position: fixed !important;
          top: 50% !important;
          left: 50% !important;
          transform: translate(-50%, -50%) scale(3) !important;
          z-index: 2000 !important;
          width: 110px;
          height: 75px;
          filter: drop-shadow(0 15px 35px rgba(255, 105, 180, 0.6));
        }

        .medium-envelope.zoomed {
          transform: translate(-50%, -50%) scale(2.5) !important;
          width: 140px;
          height: 95px;
        }

        .envelope-back {
          position: absolute;
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, #fff, #f8f8ff);
          border: 2px solid #ff69b4;
          border-radius: 8px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        .envelope-flap {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 50%;
          background: linear-gradient(45deg, #ff69b4, #ff1493);
          clip-path: polygon(0 0, 100% 0, 50% 100%);
          transform-origin: 50% 0%;
          transition: transform 0.6s ease;
          z-index: 2;
        }

        .envelope-content {
          position: absolute;
          top: 8px;
          left: 8px;
          right: 8px;
          bottom: 8px;
          background: white;
          border-radius: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease;
          padding: 6px;
          text-align: center;
          overflow: hidden;
        }

        .envelope.opened .envelope-flap {
          transform: rotateX(180deg);
        }

        .envelope.opened .envelope-content {
          opacity: 1;
          transform: translateY(0);
        }

        .envelope-content p {
          font-size: 9px;
          line-height: 1.1;
          color: #ff1493;
          font-weight: bold;
        }

        .envelope-content img {
          max-width: 100%;
          max-height: 100%;
          border-radius: 3px;
          object-fit: cover;
        }

        .envelope-heart {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 18px;
          color: #ff69b4;
          z-index: 3;
          transition: opacity 0.6s ease;
        }

        .envelope.opened .envelope-heart {
          opacity: 0;
        }

        .medium-envelope {
          width: 140px;
          height: 95px;
        }

        .medium-envelope .envelope-content p {
          font-size: 11px;
        }

        /* CORAÇÃO GIGANTE FINAL SEM FUNDO BRANCO */
        .final-heart {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 200px;
          color: #ff1493;
          z-index: 2000;
          animation: finalHeartAnimation 4s ease-in-out;
          text-align: center;
          padding: 50px;
          text-shadow: 0 0 20px rgba(255, 20, 147, 0.8);
        }

        .final-heart-text {
          font-size: 48px;
          font-weight: bold;
          color: #ff1493;
          margin-top: 20px;
          text-shadow: 0 0 15px rgba(255, 20, 147, 0.8);
        }

        .final-heart-subtitle {
          font-size: 32px;
          font-weight: bold;
          color: #ff69b4;
          margin-top: 15px;
          text-shadow: 0 0 10px rgba(255, 105, 180, 0.8);
        }

        @keyframes finalHeartAnimation {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
          }
          20% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 1;
          }
          80% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(0.8);
            opacity: 0;
          }
        }

        /* PÁGINA FINAL COM FUNDO ANIMADO */
        .final-message {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          color: #ff69b4;
          z-index: 10;
          background: rgba(255, 255, 255, 0.9);
          padding: 50px;
          border-radius: 30px;
          box-shadow: 0 15px 40px rgba(255, 105, 180, 0.3);
        }

        .final-message h1 {
          font-size: 60px;
          margin-bottom: 30px;
          text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.3);
          animation: pulse 2s ease-in-out infinite;
          color: #ff1493;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        .rising-hearts {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1000;
        }

        .rising-heart {
          position: absolute;
          color: #ff69b4;
          font-size: 25px;
          animation: riseUp 2s ease-out forwards;
          pointer-events: none;
        }

        @keyframes riseUp {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(-200px) scale(1.5);
            opacity: 0;
          }
        }

        /* OTIMIZAÇÕES PARA MOBILE */
        @media (max-width: 768px) {
          .gift-button, .end-button, .back-button {
            padding: 15px 25px;
            font-size: 18px;
          }

          .questions-container {
            padding: 25px 15px;
            max-width: 320px;
          }

          .question-title {
            font-size: 22px;
          }

          .question-input {
            padding: 12px;
            font-size: 16px;
          }

          .question-button {
            padding: 12px 20px;
            font-size: 16px;
            margin: 8px;
          }

          .envelope {
            width: 85px;
            height: 60px;
          }

          .medium-envelope {
            width: 110px;
            height: 75px;
          }

          .envelope-content p {
            font-size: 6px;
            line-height: 1.0;
          }

          .medium-envelope .envelope-content p {
            font-size: 8px;
          }

          .envelope.zoomed {
            transform: translate(-50%, -50%) scale(2.8) !important;
          }

          .medium-envelope.zoomed {
            transform: translate(-50%, -50%) scale(2.2) !important;
          }

          .counter {
            top: 10px;
            right: 10px;
            padding: 10px 15px;
            font-size: 20px;
          }

          .final-heart {
            font-size: 100px;
            padding: 30px;
          }

          .final-heart-text {
            font-size: 28px;
          }

          .final-heart-subtitle {
            font-size: 20px;
          }

          .final-message {
            padding: 25px 15px;
            max-width: 320px;
          }

          .final-message h1 {
            font-size: 32px;
          }

          .sunflower {
            font-size: 50px;
          }

          .heart {
            font-size: 25px;
          }

          /* MELHOR DISTRIBUIÇÃO MOBILE */
          .envelopes-container {
            padding: 10px;
          }

          .end-button, .back-button {
            bottom: 20px;
            padding: 12px 20px;
            font-size: 16px;
          }
        }

        /* OTIMIZAÇÕES PARA TELAS MUITO PEQUENAS */
        @media (max-width: 480px) {
          .envelope {
            width: 70px;
            height: 50px;
          }

          .medium-envelope {
            width: 90px;
            height: 65px;
          }

          .envelope-content p {
            font-size: 5px;
          }

          .medium-envelope .envelope-content p {
            font-size: 6px;
          }

          .envelope.zoomed {
            transform: translate(-50%, -50%) scale(3.5) !important;
          }

          .medium-envelope.zoomed {
            transform: translate(-50%, -50%) scale(2.8) !important;
          }

          .questions-container {
            padding: 20px 10px;
            max-width: 280px;
          }

          .question-title {
            font-size: 20px;
          }

          .final-message {
            padding: 20px 10px;
            max-width: 280px;
          }

          .final-message h1 {
            font-size: 28px;
          }
        }
      `}</style>

      {/* PÁGINA 1 - INICIAL */}
      <div className={`page page1 ${currentPage === 1 ? "active" : ""}`}>
        <div className="sunflowers-container"></div>
        <div className="floating-hearts"></div>
        <div className="center-content">
          <button className="gift-button" onClick={() => setCurrentPage(2)}>
            💝 Ver Presente 💝
          </button>
        </div>
      </div>

      {/* PÁGINA 2 - PERGUNTAS */}
      <div className={`page page2 ${currentPage === 2 ? "active" : ""}`}>
        <div className="sunflowers-container-page2"></div>
        <div className="floating-hearts-page2"></div>

        <div className="questions-container">
          {currentQuestion === 1 && (
            <form onSubmit={handleNameSubmit}>
              <h2 className="question-title">Qual o seu nome? 💕</h2>
              <input
                type="text"
                className="question-input"
                value={nameAnswer}
                onChange={(e) => setNameAnswer(e.target.value)}
                placeholder="Digite seu nome..."
                required
              />
              <button type="submit" className="question-button">
                Confirmar ✨
              </button>
            </form>
          )}

          {currentQuestion === 2 && (
            <div>
              <h2 className="question-title">Qual o seu nível de beleza? 😍</h2>
              <button className="question-button" onClick={() => handleBeautyAnswer(1)}>
                0 a 5 ⭐
              </button>
              <button className="question-button" onClick={() => handleBeautyAnswer(2)}>
                5 a 10 ⭐⭐
              </button>
              <button className="question-button" onClick={() => handleBeautyAnswer(3)}>
                A mulher mais linda do universo! 🌟✨
              </button>
              {showBeautyError && <div className="error-message">Será mesmo? Tente novamente! 😏💖</div>}
            </div>
          )}

          {currentQuestion === 3 && (
            <div>
              <h2 className="question-title">Você me ama? 💖</h2>
              <button className="question-button" onClick={handleLoveAnswer}>
                Sim! 💕
              </button>
              <button
                className="no-button"
                style={{
                  top: `${noButtonPosition.y}%`,
                  left: `${noButtonPosition.x}%`,
                }}
                onClick={moveNoButton}
              >
                Não 😢
              </button>
            </div>
          )}
        </div>
      </div>

      {/* PÁGINA 3 - ENVELOPES */}
      <div className={`page page3 ${currentPage === 3 ? "active" : ""}`} onClick={handleBackgroundClick}>
        <div className="sunflowers-container-page3"></div>
        <div className="floating-hearts-page3"></div>

        {/* CONTADOR */}
        <div className="counter">{openedCards}/26</div>

        <div className="envelopes-container">
          {/* 15 envelopes pequenos */}
          {romanticPhrases.map((phrase, index) => (
            <div
              key={`small-${index}`}
              className={`envelope ${flippedCards.has(index) ? "opened" : ""} ${zoomedCard === index ? "zoomed" : ""}`}
              style={{
                top: `${envelopePositions[index].top}%`,
                left: `${envelopePositions[index].left}%`,
                transform: `rotate(${envelopePositions[index].rotation}deg)`,
              }}
              onClick={(e) => handleCardClick(index, e)}
            >
              <div className="envelope-back"></div>
              <div className="envelope-flap"></div>
              <div className="envelope-heart">💕</div>
              <div className="envelope-content">
                <p>{phrase}</p>
              </div>
            </div>
          ))}

          {/* 11 envelopes médios */}
          {Array.from({ length: 11 }, (_, index) => (
            <div
              key={`medium-${index + 15}`}
              className={`envelope medium-envelope ${flippedCards.has(index + 15) ? "opened" : ""} ${
                zoomedCard === index + 15 ? "zoomed" : ""
              }`}
              style={{
                top: `${envelopePositions[index + 15].top}%`,
                left: `${envelopePositions[index + 15].left}%`,
                transform: `rotate(${envelopePositions[index + 15].rotation}deg)`,
              }}
              onClick={(e) => handleCardClick(index + 15, e)}
            >
              <div className="envelope-back"></div>
              <div className="envelope-flap"></div>
              <div className="envelope-heart">📸</div>
              <div className="envelope-content">
                <img
                  src={`/placeholder.svg?height=200&width=200&text=Foto+${index + 1}`}
                  alt={`Foto especial ${index + 1}`}
                />
              </div>
            </div>
          ))}
        </div>

        <button className="end-button" onClick={() => setCurrentPage(4)}>
          Fim 💖
        </button>

        <div className="rising-hearts"></div>

        {/* CORAÇÃO GIGANTE FINAL MELHORADO */}
        {showFinalHeart && (
          <div className="final-heart">
            💖<div className="final-heart-text">TE AMO!</div>
            <div className="final-heart-subtitle">Parabéns! Você abriu todas as cartas! 🎉</div>
          </div>
        )}
      </div>

      {/* PÁGINA 4 - FINAL */}
      <div className={`page page4 ${currentPage === 4 ? "active" : ""}`}>
        <div className="sunflowers-container-page4"></div>
        <div className="floating-hearts-page4"></div>

        <div className="final-message">
          <h1>💖 Te Amo Meu Amor 💖</h1>
          <div style={{ fontSize: "80px", marginTop: "30px", color: "#ff1493" }}>💕💖💕💖💕</div>
        </div>

        <button className="back-button" onClick={() => setCurrentPage(3)}>
          💌 Ver Cartas Novamente 💌
        </button>
      </div>
    </>
  )
}
