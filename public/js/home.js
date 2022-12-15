// Tweet text field Reference
const txtFieldTweetContent = document.querySelector("textarea#tweetContent");
const tweetBtn = document.querySelector("button.tweet_post_btn");

// Image upload reference
const imageContainer = document.querySelector(".image_container");
const imagePostInput = document.querySelector("#imagePost");
const newTweetContainer = document.querySelector(".newTweetContainer");

// Reply reference
const txtFieldReplyContent = document.querySelector("textarea#replyContent");
const replyImageContainer = document.querySelector(".reply_img_container");
const replyImgInput = document.querySelector("#replyImg");
const replyBtn = document.querySelector(".replyBtn");

let postedImages = [];
let replyImages = [];



// All Post loaded
const allPostLoad = async () => {
    try {
        const result = await fetch(`${window.location.origin}/posts?followingOnly=true`);
        // const result = await fetch(`${window.location.origin}/posts`);
        const posts = await result.json();

        if (!posts.length) {
            return (newTweetContainer.innerHTML = `<h6 class="nonePost_show">Nothing to show</h6>`)
        };

        posts.forEach(post => {
            const tweetElement = createNewTweet(post);
            newTweetContainer.insertAdjacentElement("afterbegin", tweetElement)
        })
    } catch (error) { }
}

allPostLoad();



// Tweet post button enable or disable handle
txtFieldTweetContent.addEventListener("input", function (e) {
    const value = this.value.trim();

    if (value || postedImages.length) {
        tweetBtn.removeAttribute("disabled")
    } else {
        tweetBtn.setAttribute("disabled", true);
    }
})



// Reply post button enable or disable handle
txtFieldReplyContent.addEventListener("input", function (e) {
    const value = this.value.trim();

    if (value || replyImages.length) {
        replyBtn.removeAttribute("disabled")
    } else {
        replyBtn.setAttribute("disabled", true);
    }
})




// Single or multiple images post handle
imagePostInput.addEventListener("change", function (e) {
    const files = this.files;

    [...files].forEach(file => {
        if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type)) return;

        tweetBtn.removeAttribute("disabled");
        postedImages.push(file);

        const fileReader = new FileReader();
        fileReader.onload = function () {

            const div = document.createElement("div");
            div.classList.add("img");
            div.dataset.name = file.name;
            div.innerHTML = `
            <span id="cls_btn">
            <i class="fas fa-times"></i>
            </span><img>
            `;

            const img = div.querySelector("img");
            img.src = fileReader.result;
            imageContainer.appendChild(div)
        }
        fileReader.readAsDataURL(file)
    })
})



// Single or multiple reply images post handle
replyImgInput.addEventListener("change", function (e) {
    const files = this.files;
    replyImages = [];


    [...files].forEach(file => {
        if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type)) return;

        replyBtn.removeAttribute("disabled");
        replyImages.push(file);

        const fileReader = new FileReader();
        fileReader.onload = function () {

            const div = document.createElement("div");
            div.classList.add("img");
            div.dataset.name = file.name;
            div.innerHTML = `
            <span id="cls_btn">
            <i class="fas fa-times"></i>
            </span><img>
            `;

            const img = div.querySelector("img");
            img.src = fileReader.result;
            replyImageContainer.appendChild(div)
        }
        fileReader.readAsDataURL(file)
    })
})



// Image Container event handle
imageContainer.addEventListener("click", function (e) {
    const clsBtn = e.target.id === "cls_btn" ? e.target : null;
    if (!clsBtn) return;

    const imgElement = clsBtn.parentElement;
    const fileName = imgElement.dataset.name;

    postedImages.forEach((file, i) => {
        if (fileName === file.name) {
            postedImages.splice(i, 1);
            imgElement.remove();

            if (!postedImages.length && !txtFieldTweetContent?.value?.trim()) {
                tweetBtn.setAttribute("disabled", true);
            }
        }
    })
})




// Reply Image Container event handle
replyImageContainer.addEventListener("click", function (e) {

    const clsBtn = e.target.id === "cls_btn" ? e.target : null;
    if (!clsBtn) return;

    const imgElement = clsBtn.parentElement;
    const fileName = imgElement.dataset.name;

    replyImages.forEach((file, i) => {
        if (fileName === file.name) {
            replyImages.splice(i, 1);
            imgElement.remove();

            if (!replyImages.length && !txtFieldReplyContent?.value?.trim()) {
                replyBtn.setAttribute("disabled", true);
            }
        }
    })
})




// Tweet post button event handle
tweetBtn.addEventListener("click", function () {
    const tweetTxtContent = txtFieldTweetContent.value;

    if (!(postedImages.length || tweetTxtContent)) return;

    const formData = new FormData();
    formData.append("tweetTxtContent", tweetTxtContent);

    postedImages.forEach((file) => {
        formData.append(file.name, file)
    });

    const url = `${window.location.origin}/posts`
    fetch(url, {
        method: "POST",
        body: formData,
    }).then(result => result.json())
        .then(data => {
            const newPostElement = createNewTweet(data);
            newTweetContainer.insertAdjacentElement("afterbegin", newPostElement);

            txtFieldTweetContent.value = ""
            imageContainer.innerHTML = "";
            tweetBtn.setAttribute("disabled", true);
            postedImages = [];

        })
        .catch(err => {
            console.log(err);
        })
})


