import data from './data.json' assert {type: 'json'};

const daily = document.getElementById('daily-toggle')
const weekly = document.getElementById('weekly-toggle')
const monthly = document.getElementById('monthly-toggle')
const workHrs = document.getElementById('work-hours')
const prevWorkHrs = document.getElementById('previous-work-hours')
const studyHrs = document.getElementById('study-hours')
const prevStudyHrs = document.getElementById('previous-study-hours')
const playHrs = document.getElementById('play-hours')
const prevPlayHrs = document.getElementById('previous-play-hours')
const socialHrs = document.getElementById('social-hours')
const prevSocialHrs = document.getElementById('previous-social-hours')
const selfcareHrs = document.getElementById('selfcare-hours')
const prevSelfcareHrs = document.getElementById('previous-selfcare-hours')
const exerciseHrs = document.getElementById('exercise-hours')
const prevExerciseHrs = document.getElementById('previous-exercise-hours')


// Code works, needs severe refactoring before publishing
const boxArr = [[workHrs, prevWorkHrs], [playHrs, prevPlayHrs], [studyHrs, prevStudyHrs],
                [exerciseHrs, prevExerciseHrs], [socialHrs, prevSocialHrs], [selfcareHrs, prevSelfcareHrs]]
            
function toggleFunction(toggleType) {
    if (document.querySelector('.toggle-active')) {
        document.querySelector('.toggle-active').classList.remove('toggle-active');
    }
    document.getElementById(`${toggleType}-toggle`).classList.add('toggle-active');
         
    for (let i = 0; i < 6; i++) {
        boxArr[i][0].innerText = data[i].timeframes[toggleType].current;
        boxArr[i][1].innerText = data[i].timeframes[toggleType].previous;
    }
}

daily.addEventListener('click', () => {
    toggleFunction('daily')
    localStorage.setItem('currentToggle', 'daily')
})

weekly.addEventListener('click', () => {
    toggleFunction('weekly')
    localStorage.setItem('currentToggle', 'weekly')
})

monthly.addEventListener('click', () => {
    toggleFunction('monthly')
    localStorage.setItem('currentToggle', 'monthly')
})

window.onload = toggleFunction(localStorage.getItem('currentToggle'))

