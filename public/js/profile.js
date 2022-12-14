// Image upload reference
const newTweetContainer = document.querySelector(".newTweetContainer");

// Reply reference
const txtFieldReplyContent = document.querySelector("textarea#replyContent");
const replyImageContainer = document.querySelector(".reply_img_container");
const replyImgInput = document.querySelector("#replyImg");
const replyBtn = document.querySelector(".replyBtn");


let postedImages = [];



// Reply post button enable or disable handle
txtFieldReplyContent.addEventListener("input", function (e) {
    const value = this.value.trim();

    if (value || replyImages.length) {
        replyBtn.removeAttribute("disabled")
    } else {
        replyBtn.setAttribute("disabled", true);
    }
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


// Love handler
function loveHandler(event, postId) {
    const loveBtn = event.target;
    const span = loveBtn.querySelector("span")


    const url = `${window.location.origin}/posts/love/${postId}`

    fetch(url, {
        method: "PUT",
    }).then(res => res.json())
        .then(data => {

            if (data.loves.includes(user._id)) {
                loveBtn.classList.add('lovedIt');
            } else {
                loveBtn.classList.remove('lovedIt');
            };
            span.innerText = data.loves.length ? data.loves.length : "";
        })
}




// Retweet handler
function retweetHandler(event, postId) {
    const retweetBtn = event.target;
    const span = retweetBtn.querySelector("span")


    const url = `${window.location.origin}/posts/retweet/${postId}`

    fetch(url, {
        method: "POST",
    }).then(res => res.json())
        .then(data => {

            if (data._id) {
                window.location.reload()
            }
            // if (data?.retweetUsers?.includes(user._id)) {
            //     retweetBtn.classList.add('active');
            // } else {
            //     retweetBtn.classList.remove('active');
            // };
            // span.innerText = data.retweetUsers.length ? data.retweetUsers.length : "";
        })
}



// Reply handler
function replyhandler(event, postId) {
    const replyButton = event.target;
    const postObj = JSON.parse(replyButton.dataset?.post);

    const modal = document.querySelector("#replyModal");
    const modalBody = modal.querySelector(".modal-body");
    modalBody.innerHTML = "";

    const tweetElement = createNewTweet(postObj);
    modalBody.appendChild(tweetElement);


    replyBtn.addEventListener("click", function (e) {
        const replyTextContent = txtFieldReplyContent.value;

        if (!(replyImages.length || replyTextContent)) return;

        const formData = new FormData();
        formData.append("replyTextContent", replyTextContent);

        replyImages.forEach((file) => {
            formData.append(file.name, file)
        });


        const url = `${window.location.origin}/posts/reply/${postId}`
        fetch(url, {
            method: "POST",
            body: formData,
        }).then(result => result.json())
            .then(data => {
                if (data._id) {
                    window.location.reload();
                }
            })
            .catch(err => {
                console.log(err);
            })
    })

    // $("#replyModal").modal("toggle");

}



// Delete reply files
function deleteReplyData() {
    txtFieldReplyContent.value = "";
    replyImageContainer.innerHTML = "";
    replyImgInput.setAttribute("disabled", "");
}



// Tweet open in another page
function openTweet(event, postId) {
    const targetElement = event.target;
    console.log(targetElement)
    if (targetElement.localName === "button" || targetElement.localName === "a") return;

    window.location.href = `${window.location.origin}/posts/${postId}`
}



// All Post loaded
const allPostLoad = async () => {
    try {
        const result = await fetch(`${window.location.origin}/posts?tweetedBy=${profileUser._id}&replyTo=${tab == "replies"}`);
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


function followHandler(e, userId) {
    const url = `${window.location.origin}/profile/${userId}/follow`;
    fetch(url, {
        method: "PUT",
    }).then(res => res.json())
        .then(data => {

            followBtn = e.target;
            const isFollowing = data.followers.includes(user._id);

            const following = document.querySelector("a.following span");
            const followers = document.querySelector("a.followers span");

            if (isFollowing) {
                followBtn.classList.add("active");
                followBtn.textContent = "Following";
                followers.textContent = data.followers?.length;
                following.textContent = data.following?.length;
            }
            else {
                followBtn.classList.remove("active");
                followBtn.textContent = "Follow";
                followers.textContent = data.followers?.length;
                following.textContent = data.following?.length;
            }

        })
}