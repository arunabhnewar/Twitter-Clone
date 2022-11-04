// Reference 
const openModalBtn = document.getElementById("open_modal_btn");
const modal = document.getElementById("modal");


openModalBtn.onclick = function () {
    modal.style.display = "block";
}

window.onclick = function (e) {
    if (e.target === modal) {
        modal.style.display = "none";
    }
}