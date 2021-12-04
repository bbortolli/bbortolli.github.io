const allCards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const fade = (e) => {
  e.target.parentElement.classList.toggle('faded')
}

const getAllCards = () => document.querySelectorAll('.card')

const resetCards = () => {
  const cards = getAllCards()
  cards.forEach(card => {
    card.classList.remove('faded')
  })
  calcProbabilities()
}

const getSideCards = (side) => {
  const selector = `div[data-side="${side}"]`
  return document.querySelectorAll(selector)
}

const getSideValues = (side) => {
  const sideCards = getSideCards(side)
  let numCards = []

  sideCards.forEach(card => {
    if (!card.classList.contains('faded')) {
      numCards.push(parseInt(card.getAttribute('data-num')))
    }
  })
  return numCards
}

const cardWinProbability = (card, oppCards) => {
  const qOppCards = Math.max(oppCards.length, 1)
  let wins = 0

  oppCards.forEach(c => {
    if (card > c) {
      wins++
    }
  })

  return wins / qOppCards
}

const applyProbs = (youProbs, oppProbs) => {
  const youCards = getSideCards('Y')
  const oppCards = getSideCards('O')

  youCards.forEach((yc, idx) => {
    let value = (youProbs[idx] * 100).toFixed(2)
    yc.lastElementChild.textContent = `${value} %`
  })

  oppCards.forEach((oc, idx) => {
    let value = (oppProbs[idx] * 100).toFixed(2)
    oc.lastElementChild.textContent = `${value} %`
  })
}

const calcProbabilities = () => {
  const youValues = getSideValues('Y')
  const oppValues = getSideValues('O')
  const youProbs = allCards.map(card => cardWinProbability(card, oppValues))
  const oppProbs = allCards.map(card => cardWinProbability(card, youValues))
  applyProbs(youProbs, oppProbs)
}

window.onload = function() {
  const cards = getAllCards()
  cards.forEach(card => {
    card.addEventListener('click', fade)
    card.addEventListener('click', calcProbabilities)
  })
  calcProbabilities()
}
