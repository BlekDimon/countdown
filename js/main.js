// localStorage.setItem("fallingBlocksScore", highscore);

const time = {
    years: localStorage.getItem("years"),
    days: localStorage.getItem("days"),
    hours: localStorage.getItem("hours"),
    minuts: localStorage.getItem("minuts"),
    seconds: localStorage.getItem("seconds"),

    updateTime: function() {
        if (
            time.years == null ||
            time.years == undefined ||
            time.days == null ||
            time.days == undefined ||
            time.hours == null ||
            time.hours == undefined ||
            time.minuts == null ||
            time.minuts == undefined ||
            time.seconds == null ||
            time.seconds == undefined
        ) {
            time.years = 0;
            time.days = 0;
            time.hours = 1;
            time.minuts = 0;
            time.seconds = 0;
        }
        if (
            !(
                time.years == 0 &&
                time.days == 0 &&
                time.hours == 0 &&
                time.minuts == 0 &&
                time.seconds == 0
            )
        ) {
            // Decrement
            if (time.days <= 0 && time.years != 0) {
                if (time.years > 0) {
                    time.years--;
                }
                time.days = 365;
            }
            if (time.hours <= 0 && time.days != 0) {
                if (time.days > 0) {
                    time.days--;
                }
                time.hours = 24;
            }
            if (time.minuts <= 0 && time.hours != 0) {
                if (time.hours > 0) {
                    time.hours--;
                }
                time.minuts = 60;
            }
            if (time.seconds <= 0 && time.minuts != 0) {
                if (time.minuts > 0) {
                    time.minuts--;
                }
                time.seconds = 60;
            }
            if (time.seconds > 0) {
                time.seconds--;
            }
            //fix
            if (time.hours == 24) {
                time.minuts = 0;
            }
            if (time.days == 365) {
                time.hours = 0;
            }
            if (time.minuts == 60) {
                time.seconds = 0;
            }
            //save
            localStorage.setItem("years", time.years);
            localStorage.setItem("days", time.days);
            localStorage.setItem("hours", time.hours);
            localStorage.setItem("minuts", time.minuts);
            localStorage.setItem("seconds", time.seconds);
        }
        time.rewriteTime();
    },

    rewriteTime: function() {
        const yrsDiv = document.querySelector(".ages");
        const daysDiv = document.querySelector(".days");
        const hrsDiv = document.querySelector(".hours");
        const minDiv = document.querySelector(".minuts");
        const secDiv = document.querySelector(".seconds");
        if (time.years < 10) {
            yrsDiv.innerHTML = `0${time.years}`;
        } else {
            yrsDiv.innerHTML = time.years;
        }
        if (time.days < 10) {
            daysDiv.innerHTML = `0${time.days}`;
        } else {
            daysDiv.innerHTML = time.days;
        }
        if (time.hours < 10) {
            hrsDiv.innerHTML = `0${time.hours}`;
        } else {
            hrsDiv.innerHTML = time.hours;
        }
        if (time.minuts < 10) {
            minDiv.innerHTML = `0${time.minuts}`;
        } else {
            minDiv.innerHTML = time.minuts;
        }
        if (time.seconds < 10) {
            secDiv.innerHTML = `0${time.seconds}`;
        } else {
            secDiv.innerHTML = time.seconds;
        }
    }
};

let interval;
const selects = document.querySelectorAll("select");
selects.forEach((item, i) => {
    item.addEventListener("change", function() {
        let keys = [];
        for (let key in time) {
            keys.push(key);
        }
        time[keys[i]] = this.value;
    });
});

const elem = document.documentElement;
const openFullscreen = () => {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }
};
const closeFullscreen = () => {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
};

const stopButt = document.querySelector(".stop");
let active = false;
stopButt.addEventListener("click", () => {
    if (active) {
        clearInterval(interval);
        active = false;
        closeFullscreen();
    } else if (!active) {
        interval = setInterval(time.updateTime, 1000);
        active = true;
        openFullscreen();
    }
});
