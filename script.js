let countDown = document.getElementById('countdown')
let start = document.getElementById('sessionInput').value 
let time =  start * 60

setInterval(updateCountdown, 1000)

function updateCountdown() {
    
    console.log(`time: ${time}`)
    console.log(`True`)
    let minutes = Math.floor(time/60)
    console.log(`minutes: ${minutes}`)
    let seconds = time % 60 
    console.log(`seconds: ${seconds}`)
    seconds = seconds < 10 ? '0' + seconds : seconds 
    countDown.innerHTML = `${minutes}:${seconds}`
    time--
    return 
}

