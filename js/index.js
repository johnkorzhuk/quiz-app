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
  const $startContainer = $('.js-start-container')
  const $quizContainer = $('.js-quiz')

  $start.on('click', function () {
    toggleStartState(state)
    renderQuizState(state, $startContainer, $quizContainer)
    renderQuestion(state, $quizContainer)
    renderInfo(state, $('.js-info'))

    $('.js-next').prop('disabled', true)

    $('.js-restart').click(() => {
      restart(state)
      renderQuizState(state, $startContainer, $quizContainer, $('.js-results-heading'))
    })

    $('.js-next').click(() => {
      if (state.current + 1 <= state.questions.length) {
        renderQuestion(state, $quizContainer)
      }else {
        const $restart =  $('.js-restart').clone(true)
        renderResults(state, $quizContainer)
        $('.js-results-heading').append($restart)
      }
    })
  })

  $quizContainer.on('click', 'button.button', function () {
    const text = $(this).text()

    $('.js-next').prop('disabled', false)
    updateMiss(state, text)
    renderInfo(state, $('.js-info'))
    renderAnswerSet(state, $('.js-options'), text)

    if (state.current === state.questions.length) {
      $('.js-next').text('Results')
    }
    $('.js-next').focus()
  })
})

function restart (state) {
  state.current = 0
  state.miss = 0
  toggleStartState(state)
}

function updateMiss (state, guess) {
  if(!(state.questions[state.current].answer === guess)) {
    state.miss++
  }
  state.current++
}

function toggleStartState (state) {
  state.started = !state.started
}

function renderResults (state, node) {
  const {
    miss,
    questions,
  } = state

  const score = (((state.questions.length - state.miss) / state.questions.length) * 100).toFixed(2)

  node.html(`
    <div class="main-heading js-results-heading">
      <h2>
        Your score: ${score}%
      </h2>
    </div>
  `)
}

function renderQuizState (state, startNode, quizNode, resultNode) {
  if (resultNode) resultNode.remove()

  if (state.started) {
    startNode.addClass('hidden')
    quizNode.removeClass('hidden')
    renderInfo(state, $('.js-info'))
  }else {
    startNode.removeClass('hidden')
    quizNode.addClass('hidden')
  }
}

function renderInfo (state, node) {
  node.html(`
    <div>
      Correct: ${state.current - state.miss}
    </div>
    <div>
      Incorrect: ${state.miss}
    </div>
  `)
}

function renderQuestion (state, node) {
  let {
    questions,
    current,
  } = state
  const { 
    question,
    answer,
    wrong
  } = questions[current]
  const options = genQuestions(
    wrong,
    answer,
    Math.floor(Math.random() * 4)
  )
  const $questions = node.children('.js-questions')

  if ($questions.length > 0) {
    $questions.html(`
      <div>
        <div class="question-heading-container">
          <h2>${question}</h2>
          <span>Question ${state.current + 1} of ${state.questions.length}</span>
        </div>
        </div>
        <div class="js-options">
          ${renderOptionSet(options)}
        </div>
      </div>
    `)
  }else {
    node.prepend(`
      <div class="question-container js-questions">
        <div>
          <div class="question-heading-container">
            <h2>${question}</h2>
            <span>Question ${state.current + 1} of ${state.questions.length}</span>
          </div>
          </div>
          <div class="js-options">
            ${renderOptionSet(options)}
          </div>
        </div>
      </div>
      <div class="question-container info-container">
        <div class="js-info"></div>
        <div class="progress-toggle">
          <button class="progress-button js-restart">Restart</button>
          <button class="progress-button js-next">Next</button>
        </div>
      </div>
    `)
  }
}

function renderAnswerSet (state, node, guess) {
  const { 
    questions,
    current
  } = state
  const { answer } = questions[current - 1]
  let answerHtml = ''

  node.children().each(function () {
    const text = $(this).text()

    if (text === guess && text === answer) {
      answerHtml += `<div class="option answer"><i class="fa fa-check icon"></i><div class="button">${text}</div></div>`
    }else if (text === guess && text !== answer) {
      answerHtml += `<div class="option wrong"><i class="fa fa-times icon"></i><div class="button">${text}</div></div>`
    }else if (text !== guess && text === answer) {
      answerHtml += `<div class="option answer"><div class="button">${text}</div></div>`
    }else {
      answerHtml += `<div class="option"><div class="button">${text}</div></div>`
    }
  })

  node.html(answerHtml)
}

function renderOptionSet (options) {
  let optionsHtml = ''

  options.forEach((option) => {
    optionsHtml += `<div class="option"><button class="button">${option}</button></div>`
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
