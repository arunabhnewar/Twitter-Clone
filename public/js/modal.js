// Reference 
const openModalBtn = document.getElementById("open_modal_btn");
const modal = document.getElementById("modall");
const mainSection = document.getElementById("main_section");

const leftSideContainer = document.querySelector(".left_side_container");
const midSideContainer = document.querySelector(".mid_side_container");
const rightSideContainer = document.querySelector(".right_side_container");

modal.hidden = true;

// Event Handler
openModalBtn.addEventListener("click", function (e) {
    if (this.id === "open_modal_btn") {

        if (modal.hidden) {
            modal.hidden = false;
        } else {
            modal.hidden = true;
        }
    }
});


// Mid side container & right side container event handle
[midSideContainer, rightSideContainer].forEach(element => {
    element.addEventListener("click", function (e) {

        if (this.className === "mid_side_container") {
            modal.hidden = true;
        }
        else if (this.className === "right_side_container") {
            modal.hidden = true;
        }
    })
})


// Left side container event handle
leftSideContainer.children[0].addEventListener('click', function (e) {

    if (this.className === "top_left_section") {
        modal.hidden = true;
    }
})