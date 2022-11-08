// Reference
const passwordElement = document.querySelector("#password");
const visibleIcon = document.querySelector("#pass_visible_icon");

visibleIcon.addEventListener("click", function (e) {
    const i = this.querySelector("i");

    if (i.className === "fas fa-eye-slash") {
        i.className = "fas fa-eye"
        passwordElement.type = "text";
    } else {
        i.className = "fas fa-eye-slash";
        passwordElement.type = "password"
    }
})