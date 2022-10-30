let mins = 1;
let secs = 59;


// Reference
const countdown = document.getElementById("countdown");
const countTime = document.querySelector("#countdown span");


const timer = setInterval(() => {
    if (!(mins === 0 && secs === 0)) {
        secs--;
    }
    else {
        clearInterval(timer);
        countdown.innerText = "Oops!! Your OTP expired!";
        countdown.style.setProperty('color', "#ba3a3a", "important")
    }


    if (secs === 0) {
        if (!(mins === 0 && secs === 0)) {
            secs = 59;
            mins = 0;
        }
    }


    if (!(mins === 0 && secs === 0)) {
        countTime.textContent = "0" + mins + " : " + (secs.toString().length === 1 ? "0" + secs : secs);
    }
}, 1000)


// Evenet Handler
document.getElementById("otp-resend-btn").onclick = () => {
    window.location.reload();
}