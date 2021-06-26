import '../scss/app.scss';

/* Your JS Code goes here */
import { data } from "./data.js"

const quiz = document.querySelector(".js-quiz")
const questionSet = document.querySelector(".js-set-current")
const questionSetAll = document.querySelector(".js-set-all")
const setName = document.querySelector(".js-question")
const resultTitle = document.querySelector('.js-set')

let resultArray = []
let current = 0
let result = 0
let currentAnswer = ``

questionSetAll.innerHTML = data.questions.length

const sum = (value) => {
    if (current === data.questions.length - 1) {
        showResult()
    } else {
        resultArray.push(value)
        current += 1
        currentAnswer = ``
        pushAnswers()
    }
}

const back = () => {
    resultArray.pop()
    current = current - 1
    currentAnswer = ``
    pushAnswers()
}

const pushAnswers = () => {
    questionSet.innerHTML = data.questions[current].key
    setName.innerHTML = data.questions[current].name
    data.questions[current].answers.forEach(element => {
        currentAnswer += `
    <button type="button"
        
    " class="quiz-box__btn js-answer-btn">
    <span>${element.letter}</span>
    ${element.text}
    </button>
`    });

    quiz.innerHTML = currentAnswer + `${current > 0 ? `<button type="button" class="quiz-back js-quiz-back">
    <span>
        &lt; </span>Назад
    </button>` : ""}`

    if (current > 0) {
        const backBtn = document.querySelector(".js-quiz-back")
        backBtn.addEventListener("click", () => {
            back()
        })
    }

    const btns = document.querySelectorAll(".js-answer-btn")
    data.questions[current].answers.forEach((element, index) => {
        btns[index].addEventListener("click", () => {
            sum(element.value)
        })
    })
}
pushAnswers()

const showResultText = (arg) => {
    if (result <= data.result[0].value) {
        return arg === 0 ? data.result[0].text : data.result[0].desc
    } else if (result > data.result[0].value && result <= data.result[1].value) {
        return arg === 0 ? data.result[1].text : data.result[1].desc
    } else if (result > data.result[1].value && result <= data.result[2].value) {
        return arg === 0 ? data.result[2].text : data.result[2].desc
    }
}

const showResultSvg = () => {
    if (result <= data.result[0].value) {
        return "transform: rotate(-69deg) translate(-232px, 50px)"
    } else if (result > data.result[0].value && result <= data.result[1].value) {
        return "transform: none"
    } else if (result > data.result[1].value && result <= data.result[2].value) {
        return "transform: rotate(59deg) translate(44px, -220px)"
    }
}

const restartQuiz = () => {
    current = 0
    result = 0
    resultArray = []
    currentAnswer = ``
    pushAnswers()
}

const showResult = () => {
    resultArray.map(num => {
        result += num
    })
    resultTitle.innerHTML = "РЕЗУЛЬТАТЫ ТЕСТА НА РИСК-ПРОФИЛЬ"
    setName.innerHTML = `Ваша склонность к риску ${showResultText(0)}`
    quiz.innerHTML = `
    <div class="quiz-result">
    <svg class="jss101" width="313" height="191" viewBox="0 0 313 191" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
            d="M288.615 97.776A142.998 142.998 0 0 1 299.478 150h-89.556a53.499 53.499 0 0 0-15.606-35.316 53.475 53.475 0 0 0-58.282-11.593 53.475 53.475 0 0 0-28.943 28.943A53.499 53.499 0 0 0 103.078 150H13.522a143 143 0 0 1 275.093-52.224z"
            fill="#00D190" stroke="#FAFAFA" stroke-width="5"></path>
        <path
            d="M279.401 79.394A142.994 142.994 0 0 1 299.479 150h-89.557a53.47 53.47 0 0 0-27.896-44.495 53.474 53.474 0 0 0-52.51.822L80.763 31.204A143.001 143.001 0 0 1 279.4 79.394z"
            fill="#F8A000" stroke="#FAFAFA" stroke-width="5"></path>
        <path
            d="M280.316 80.957A142.997 142.997 0 0 1 299.478 150h-89.557a53.481 53.481 0 0 0-24.577-42.534l44.725-77.59a142.993 142.993 0 0 1 50.247 51.081z"
            fill="#F93839" stroke="#FAFAFA" stroke-width="5"></path>
        <path
            d="M302 152.5A145.496 145.496 0 0 0 100.82 18.076 145.496 145.496 0 0 0 11 152.5h22.676a122.82 122.82 0 0 1 75.821-113.474 122.83 122.83 0 0 1 94.006 0 122.825 122.825 0 0 1 75.82 113.474H302z"
            fill="#C4C4C4"></path>
        <path
            d="M302 152.5A145.496 145.496 0 0 0 100.82 18.076 145.496 145.496 0 0 0 11 152.5h22.676a122.82 122.82 0 0 1 75.821-113.474 122.83 122.83 0 0 1 94.006 0 122.825 122.825 0 0 1 75.82 113.474H302z"
            fill="url(#paint0_linear)"></path>
        <path
            d="M302 152.5A145.496 145.496 0 0 0 100.82 18.076 145.496 145.496 0 0 0 11 152.5h22.676a122.82 122.82 0 0 1 75.821-113.474 122.83 122.83 0 0 1 94.006 0 122.825 122.825 0 0 1 75.82 113.474H302z"
            fill="url(#paint1_radial)"></path>
        <path
            d="M279 152.5a122.507 122.507 0 0 0-35.879-86.62A122.514 122.514 0 0 0 156.5 30a122.503 122.503 0 0 0-113.175 75.621A122.503 122.503 0 0 0 34 152.5h245z"
            fill="url(#paint2_radial)" style="mix-blend-mode: multiply;" filter="url(#filter0_d)"></path>
        <path fill="#FAFAFA" d="M10 143h296v36H10z"></path>
        <path style="${showResultSvg()}"
            d="M159.617 60.862c-1.349-.004-2.485 1.078-2.561 2.484l-5.252 83.574 14.017.131-3.683-83.656c-.062-1.403-1.153-2.52-2.521-2.533z"
            fill="url(#paint3_linear)"></path>
        <path style="${showResultSvg()}" opacity=".15"
            d="M159.617 60.862c-1.349-.004-2.485 1.078-2.561 2.484l-5.252 83.574 7.013.079.8-86.137z"
            fill="#fff"></path>
        <path
            d="M158.655 162.11c11.408 0 20.656-9.248 20.656-20.655 0-11.408-9.248-20.656-20.656-20.656-11.407 0-20.655 9.248-20.655 20.656 0 11.407 9.248 20.655 20.655 20.655z"
            fill="url(#paint4_linear)"></path>
        <path
            d="M158.656 156.946c8.555 0 15.491-6.936 15.491-15.491 0-8.556-6.936-15.492-15.491-15.492-8.556 0-15.492 6.936-15.492 15.492 0 8.555 6.936 15.491 15.492 15.491z"
            fill="url(#paint5_linear)"></path>
        <defs>
            <filter id="filter0_d" x="0" y="0" width="313" height="190.5" filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
                <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0">
                </feColorMatrix>
                <feOffset dy="4"></feOffset>
                <feGaussianBlur stdDeviation="17"></feGaussianBlur>
                <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
                <feBlend in2="BackgroundImageFix" result="effect1_dropShadow"></feBlend>
                <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"></feBlend>
            </filter>
            <linearGradient id="paint0_linear" x1="156.5" y1="7" x2="156.5" y2="298"
                gradientUnits="userSpaceOnUse">
                <stop stop-color="#fff"></stop>
                <stop offset="1" stop-color="#fff" stop-opacity="0"></stop>
            </linearGradient>
            <radialGradient id="paint1_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                gradientTransform="matrix(0 165 -165 0 157 152)">
                <stop offset=".806" stop-color="#696868" stop-opacity="0"></stop>
                <stop offset="1" stop-color="#fff" stop-opacity=".36"></stop>
            </radialGradient>
            <radialGradient id="paint2_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                gradientTransform="rotate(90 7 150) scale(119)">
                <stop offset=".584" stop-color="#fff"></stop>
                <stop offset="1" stop-color="#D2D1D1"></stop>
            </radialGradient>
            <linearGradient id="paint3_linear" x1="159.638" y1="59.406" x2="158.817" y2="146.918"
                gradientUnits="userSpaceOnUse">
                <stop stop-color="#4D4D4D"></stop>
                <stop offset="1" stop-color="#1A1A1A"></stop>
            </linearGradient>
            <linearGradient id="paint4_linear" x1="143.613" y1="124.403" x2="175.23" y2="160.202"
                gradientUnits="userSpaceOnUse">
                <stop stop-color="#4D4D4D"></stop>
                <stop offset="1" stop-color="#1A1A1A"></stop>
            </linearGradient>
            <linearGradient id="paint5_linear" x1="157.609" y1="158.468" x2="159.827" y2="122.714"
                gradientUnits="userSpaceOnUse">
                <stop stop-color="#4D4D4D"></stop>
                <stop offset="1" stop-color="#1A1A1A"></stop>
            </linearGradient>
        </defs>
    </svg>
    <p class="quiz-result-text js-result-text">
        ${showResultText(1)}
    </p>
    <div class="quiz-result-actions">
        <a href="#" class="quiz-result-link">
            Подберите портфель из ETF
        </a>
        <button type="button" class="quiz-result-btn js-restart-btn">
            Пройти тест ещё раз
        </button>
    </div>
</div>
    `
    const restartBtn = document.querySelector(".js-restart-btn")
    restartBtn.addEventListener("click", () => {
        restartQuiz()
    })
}
