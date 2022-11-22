// Tweet text field Reference
const txtFieldTweetContent = document.querySelector("textarea#tweetContent");
const tweetBtn = document.querySelector("button.tweet_post_btn");

// Image upload reference
const imageContainer = document.querySelector(".image_container");
const imagePostInput = document.querySelector("#imagePost");
const newTweetContainer = document.querySelector(".newTweetContainer")
let postedImages = [];



// Create new tweet post
function createNewTweet(data) {
    const { _id: postId,
        tweetTxtContent,
        images: tweetImages,
        tweetedBy: { _id, firstName, lastName, userName, avatarProfile },
        createdAt,
        loves } = data;


    // Time ago function
    function timeSince(date) {

        let seconds = Math.floor((new Date() - date) / 1000);

        let interval = seconds / 31536000;

        if (interval > 1) {
            return Math.floor(interval) + " years";
        }
        interval = seconds / 2592000;
        if (interval > 1) {
            return Math.floor(interval) + " months";
        }
        interval = seconds / 86400;
        if (interval > 1) {
            return Math.floor(interval) + " days";
        }
        interval = seconds / 3600;
        if (interval > 1) {
            return Math.floor(interval) + " hours";
        }
        interval = seconds / 60;
        if (interval > 1) {
            return Math.floor(interval) + " minutes";
        }
        return Math.floor(seconds) + " seconds";
    }

    const timeAgo = timeSince(new Date(createdAt).getTime());

    const div = document.createElement("div");
    div.classList.add("newTweet");

    div.innerHTML = `
    <div class="avatar_image">
        <div class="image">
        <img class="avatar" src="${window.location.origin}/uploads/${avatarProfile}"  />
        </div>
    </div>

    <div class="newTweet_body">
        <div class="newTweet_header">
            <div class="header_items">
                <a href="/uploads/${userName}" class="show_name"> ${firstName + " " + lastName} </a>
                <span class="show_username"> @${userName} .</span>
                <div class="timeAgo">${timeAgo}</div>
            </div>
            <div class="posted_more" data-toggle='tooltip', data-placement='bottom', title='more'><i class="fas fa-ellipsis-h"></i></div>
        </div>

        <div class="newTweet_content">${tweetTxtContent}</div>

        <div class="newTweet_images"></div>

        <div class="newTweet_footer">
            <button class="comment">
                <i class="fas fa-comment"></i>
            </svg> <span>3</span>
            </button>

            <button class="retweet">
            <i class="fas fa-retweet"></i>
            <span>0</span>
            </button>

            <button class="love ${user.loves.includes(postId) ? "lovedIt" : ""}" onclick="loveHandler(event, '${postId}')" >
            <i class="fas fa-heart"></i>
            <span>${loves.length ? loves.length : ""}</span>
            </button>
        </div>
    </div>
    `;

    const imageContainer = div.querySelector("div.newTweet_images");
    tweetImages?.forEach(img => {
        const imageDiv = document.createElement("div");
        imageDiv.classList.add("newTweet_img");
        imageDiv.innerHTML = `
        <img src="${window.location.origin}/uploads/${_id}/tweetsImg/${img}" alt="" />
        `;

        imageContainer.appendChild(imageDiv);

    })
    return div;
}


// All Post loaded
const allPostLoad = async () => {
    try {
        const result = await fetch(`${window.location.origin}/posts`);
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

    if (value) {
        tweetBtn.removeAttribute("disabled")
    } else {
        tweetBtn.setAttribute("disabled", true);
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



// Image delete event handle
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


