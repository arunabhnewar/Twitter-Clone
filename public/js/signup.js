// Selector

const passwordInput = document.querySelector("#password");
const confirmPasswordInput = document.querySelector("#confirmPassword");
const pwdVisibleIcon = document.querySelector("#pwd_visible_icon");
const confirmPwdVisibleIcon = document.querySelector("#confirm_pwd_visible_icon");
const passwordCommonError = document.querySelector("#pwd-err");

passwordCommonError.hidden = true;

// Password visible & invisible function
function pwdVisibleAndInvisible(handler, field) {
    handler.addEventListener("click", function (e) {
        const i = handler.querySelector("i");

        if (i.className === "fas fa-eye-slash") {
            i.className = "fas fa-eye";
            field.type = "text";
        } else {
            i.className = "fas fa-eye-slash";
            field.type = "password";
        }
    })
}

pwdVisibleAndInvisible(pwdVisibleIcon, passwordInput);
pwdVisibleAndInvisible(confirmPwdVisibleIcon, confirmPasswordInput);


// Password validator
function pwdValidate(p) {
    let errs = [];

    if (p.length < 8) {
        errs.push("8 characters");
    }
    else if (p.search(/[a-z]/) < 0) {
        errs.push("1 small letter");
    }
    else if (p.search(/[A-Z]/) < 0) {
        errs.push("1 capital letter");
    }
    else if (p.search(/[0-9]/) < 0) {
        errs.push("1 number")
    }
    else if (p.search(/[\!\@\#\$\%\^\&\*\(\)\_\+\.\,\;\:\-]/) < 0) {
        errs.push("1 special character")
    }

    return errs;
}


// Password Check
const pwdCheck = (pwd) => {
    let validationOutput = [];

    if (pwd) {
        validationOutput = pwdValidate(pwd);
    } else {
        return;
    }

    if (validationOutput.length > 0) {
        const errMsg = "Your password must contain " + validationOutput.join(", ");

        if (pwd) {
            passwordCommonError.hidden = false;
            passwordCommonError.textContent = errMsg;
        } else {
            return;
        }
    } else {
        confirmPwdCheck();
    }
}


// confirm password check
function confirmPwdCheck() {
    if (!(passwordInput.value === confirmPasswordInput.value)) {
        passwordCommonError.hidden = false;
        passwordCommonError.textContent = "Your password doesn't matched";

    } else {
        pwdCheck(passwordInput.value);
    }
}


// Specify when to display error messages
let typingTime;
const typingDoneInterval = 500;

passwordInput.addEventListener("keyup", function () {
    clearTimeout(typingTime);
    passwordCommonError.hidden = true;

    const pwdElement = passwordInput.value;
    if (pwdElement) {
        typingTime = setTimeout(() => pwdCheck(passwordInput.value), typingDoneInterval);
    }
})


// Time countdown stop event handler
passwordInput.addEventListener("keydown", function () {
    clearTimeout(typingTime);
})



// 
confirmPasswordInput.addEventListener("keyup", function () {
    clearTimeout(typingTime);
    passwordCommonError.hidden = true;

    const confirmPwdElement = confirmPasswordInput.value;
    if (confirmPwdElement) {
        typingTime = setTimeout(() => confirmPwdCheck(), typingDoneInterval);
    } else {
        return;
    }
})


// 
confirmPasswordInput.addEventListener("keydown", function () {
    clearTimeout(typingTime);
})