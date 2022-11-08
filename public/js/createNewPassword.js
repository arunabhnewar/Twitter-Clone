// Reference
const passwordInputElements = document.querySelector("#password");
const visibleIcon = document.querySelector("#pass_visible_icon");
const confirmPasswordInputElements = document.querySelector("#confirmPassword");
const confirmVisibleIcon = document.querySelector("#confirm_pass_visible_icon");


function passwordVisibleAndInvisible(handler, eventElement) {
    handler.addEventListener("click", function (e) {
        const i = this.querySelector("i");

        if (i.className === "fas fa-eye-slash") {
            i.className = "fas fa-eye"
            eventElement.type = "text";
        } else {
            i.className = "fas fa-eye-slash";
            eventElement.type = "password"
        }
    })
}


passwordVisibleAndInvisible(visibleIcon, passwordInputElements)
passwordVisibleAndInvisible(confirmVisibleIcon, confirmPasswordInputElements)