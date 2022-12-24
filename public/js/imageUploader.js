// Avatar  reference
const updateInputAvatar = document.querySelector("input#updateInputAvatar");
const previewAvatar = document.querySelector("img#previewAvatar");
const saveAvatarImage = document.querySelector("button#saveAvatarImage");

// Cover Reference
const updateInputCover = document.querySelector("input#updateInputCover");
const previewCover = document.querySelector("img#previewCover");
const saveCoverImage = document.querySelector("button#saveCoverImage");


let imgCropper;



// Avatar img resize handle
updateInputAvatar.addEventListener("change", function (e) {
    const files = this.files;

    if (files && files[0]) {
        const fsReader = new FileReader();

        fsReader.onload = function (e) {
            previewAvatar.src = e.target.result;

            imgCropper = new Cropper(previewAvatar, {
                aspectRatio: 1 / 1,
                background: false,
            });
        };

        fsReader.readAsDataURL(files[0]);
    } else {
        console.log("fuck!!");
    }
})



// Avatar img save n upload event handle
saveAvatarImage.addEventListener("click", function (e) {
    const canvas = imgCropper?.getCroppedCanvas();

    if (canvas) {
        canvas.toBlob((blob) => {
            const fileName = updateInputAvatar?.files[0]?.name;
            const formData = new FormData();
            formData.append("avatar", blob, fileName);

            const url = `${window.location.origin}/profile/avatar`;
            fetch(url, {
                method: "POST",
                body: formData,
            })
                .then(res => res.json())
                .then(data => {
                    if (data._id) {
                        location.reload()
                    }
                })
        });
    } else {
        alert("Please select your fucking avatar image.")
    }
})




// Cover img resize handle
updateInputCover.addEventListener("change", function (e) {
    const files = this.files;

    if (files && files[0]) {
        const fsReader = new FileReader();

        fsReader.onload = function (e) {
            previewCover.src = e.target.result;

            imgCropper = new Cropper(previewCover, {
                aspectRatio: 16 / 9,
                background: false,
            });
        };

        fsReader.readAsDataURL(files[0]);
    } else {
        console.log("fuck!!");
    }
})




// Cover img save n upload event handle
saveCoverImage.addEventListener("click", function (e) {
    const canvas = imgCropper?.getCroppedCanvas();

    if (canvas) {
        canvas.toBlob((blob) => {
            const fileName = updateInputCover?.files[0]?.name;
            const formData = new FormData();
            formData.append("cover", blob, fileName);

            const url = `${window.location.origin}/profile/cover`;
            fetch(url, {
                method: "POST",
                body: formData,
            })
                .then(res => res.json())
                .then(data => {
                    if (data._id) {
                        location.reload()
                    }
                })
        });
    } else {
        alert("Please select your fucking cover image.")
    }
})