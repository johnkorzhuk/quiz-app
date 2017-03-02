$(function () {
  let state = {
    questions: [{
      question: 'How do we give a border to an element rounded corners?',
      answer: 'border-radius',
      wrong: [
        'border-edge',
        'border-roundness',
        'border-corner'
      ]
    }, {
      question: 'How do you set the background of an element?',
      answer: 'background-color',
      wrong: [
        'bgc',
        'bg-color',
        'back-ground-color'
      ]
    }, {
      question: 'How do you set the font size of a text element?',
      answer: 'font-size',
      wrong: [
        'fontSize',
        'text-size',
        'textSize'
      ]
    }, {
      question: 'How do you center align a block element?',
      answer: 'margin: 0 auto;',
      wrong: [
        'text-align: center',
        'align-items: center',
        'margin: auto 0'
      ]
    }, {
      question: 'How do you center align an inline-block element?',
      answer: 'text-align: center;',
      wrong: [
        'margin: 0 auto',
        'align-items: center',
        'display: center'
      ]
    }, {
      question: 'What\'s the syntax to set a blue border of 5px with dashed lines?',
      answer: 'border: 5px dashed blue',
      wrong: [
        'blue-border: 5px dashed',
        'border: 5px dashy-lines blue',
        'border: 5px dashed red'
      ]
    }],
    miss: 0,
    current: 0,
    started: false
  }

  const $start = $('.js-start')
  const $infoContainer = $('.js-start-container')
  const $quizContainer = $('.quiz')

  $start.on('click', function () {
    toggleStartState(state)
    renderQuizState(state.started, $infoContainer, $quizContainer)
    renderQuestion(state, $quizContainer)

    $('.option').on('click', 'button', function () {
      const target = $(this)
      target.blur()
      if (!(state.questions[state.current].answer === target.text())) {
        updateMiss(state, node)
      }
      $('.js-options').each()
    })
  })
})

function updateMiss (state) {
  state.miss++
}

function toggleStartState (state) {
  state.started = !state.started
}

function renderQuizState (state, infoNode, quizNode) {
  if (state) {
    infoNode.addClass('hidden')
    quizNode.removeClass('hidden')
  }else {
    infoNode.removeClass('hidden')
    quizNode.addClass('hidden')
  }
}

function renderMiss (state, node) {
  
}

function renderQuestion (state, node) {
  let {
    questions,
    current,
    miss
  } = state

  const { 
    question,
    answer,
    wrong
  } = questions[current++]

  const options = genQuestions(
    wrong,
    answer,
    Math.floor(Math.random() * (4 - 0) + 0)
  )

  const totalQuestions = questions.length

  node.html(`
    <div class="question-container">
      <div>
          <h2>${question}</h2>
        </div>
        <div class="js-options">
          ${renderOptionSet(options)}
        </div>
      </div>
      <div class="container info-container">
        <span class="info">
          Correct: ${(current - 1)  - miss}
          Incorrect: ${miss}
        </span>
        <span class="info">
          Question ${current} of ${totalQuestions}
        </span>
      </div>
    </div>
  `)
}

function renderAnswer (state, node, guess) {
  let answerHtml = ''
  options.forEach((option) => {
    answerHtml += `<div class="option"><button>${option}</button></div>`
  })
}

function renderOptionSet (options) {
  let optionsHtml = ''
  options.forEach((option) => {
    optionsHtml += `<div class="option"><button>${option}</button></div>`
  })

  return optionsHtml
}

function genQuestions (wrong, answer, index) {
  let options = [...wrong]
  options.splice(index, 0, answer)
  return options
}

// <div class="choices">
  // <div class="choice answer"><i class="fa fa-check icon"></i><button>border-radius</button></div>
  // <div class="choice wrong"><i class="fa fa-times icon"></i><button>border-edge</button></div>
  // <div class="choice"><button>border-roundness</button></div>
  // <div class="choice"><button>border-corner</button></div>
// </div>
