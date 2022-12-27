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


// Create new tweet post
function createNewTweet(data, pinned) {
    if (pinned) {
        console.log(data)
    }
    let newData = data;
    let reTweetedPost = '';
    let replyTo = "";
    let removeBtn = "";
    let pinBtn = "";


    if (data?.tweetedBy?._id === user?._id) {

        if (!data.replyTo) {

            if (!data.pinned) {
                pinBtn = `
                <button onclick="pinTweet('${data._id}', ${data.pinned})" class="pin_btn ${data.pinned ? 'active' : ''}" >
                <i class="fas fa-thumbtack" ></i>
                Pin to your profile
                </button>`
            } else {
                pinBtn = `
                <button onclick="pinTweet('${data._id}', ${data.pinned})" class="pin_btn ${data.pinned ? 'active' : ''}" >
                <i class="fas fa-thumbtack" ></i>
                Unpin from profile
                </button>`
            }
        }

        removeBtn = `
        <div class="dropleft">
        <button class="posted_more " data-toggle="dropdown" aria-expanded="false" data-toggle='tooltip', data-placement='bottom', title='More'><i class="fas fa-ellipsis-h"></i></button>

        <div class="dropdown-menu">
            <a class="dropdown-item" href="#">
                <button onclick="removeTweet('${data._id}')" class="remove_btn" >
                    <i class="fas fa-trash" ></i>
                    Remove Your Tweet
                </button>
            </a>

            <a class="dropdown-item" href="#">
                ${pinBtn}
            </a>
        </div>
    </div>
            `
    }


    if (data.postData) {
        newData = data.postData;
        reTweetedPost = user.userName === data.tweetedBy.userName ? `
            <p class="reTweeted_post" >
                <i class="fas fa-retweet"></i>
                <span class="retweeted_user_link"> ${data.tweetedBy.userName === user.userName ? "You Retweeted" : "<a href='/profile/" + data.tweetedBy.userName + ">" + data.tweetedBy.userName + " </a> Retweeted"} </span>
            </p>
            ` :
            `<p class="retweetedHtml"><i class="fas fa-retweet"></i> <span class="retweeted_user_link"> Retwetted By <a href=${window.location.origin}/profile/${data.tweetedBy.userName}>${data.tweetedBy.userName} </a> </span> </p>`;
    };


    if (data.replyTo?.tweetedBy?.userName) {
        replyTo = `
            <div div class="replyUser" >
                <p>Replying to <span>@</span><a href="/profile/${data.replyTo.tweetedBy.userName}">${data.replyTo.tweetedBy.userName}</a>
                </p>
        </div> `;
    }

    const {
        _id: postId,
        tweetTxtContent,
        replyTextContent,
        images: tweetImages,
        tweetedBy: { _id, firstName, lastName, userName, avatarProfile },
        createdAt,
        loves,
        retweetUsers,
        replyTweets,
    } = newData;



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

    const avatarUrl = avatarProfile ? `/uploads/${avatarProfile}` : `/uploads/avatar.png`;



    const div = document.createElement("div");

    let pinTweet = '';

    if (pinned) {
        div.classList.add("tweetPin");
        pinTweet = `
        <div class="tweetPinIcon">
            <i class="fas fa-thumbtack" ></i> <span>Pinned Tweet</span>
        </div>
        `
    }
    div.innerHTML = `
    
    ${reTweetedPost}
    ${pinTweet}

    <div class="newTweet" onclick="openTweet(event, '${postId}')">
        <div class="avatar_image">
            <div class="image">
                <div class="onlineStatus" data-onlineStatus="Offline"></div>
                <img class="avatar" src="${avatarUrl}"  />
            </div>
        </div>

        <div class="newTweet_body">
            <div class="newTweet_header">
                <div class="header_items">
                    <a href="/profile/${userName}" class="show_name"> ${firstName + " " + lastName} </a>
                    <span class="show_username"> @${userName} .</span>
                    <div class="timeAgo">${timeAgo}</div>
                </div>

                ${removeBtn}
            </div>

           ${replyTo}
           <p class="reply_txt_content">${replyTextContent}</p>

            <div class="newTweet_content">${tweetTxtContent}</div>

            <div class="newTweet_images"></div>

            <div class="replyingUser">
                <a > <span>Replying to</span>  @${userName}</a>
            </div>

            <div class="newTweet_footer">

                <button class="reply" data-post='${JSON.stringify(data)}' onclick="replyhandler(event, '${postId}')"  
                data-toggle="modal" data-target="#replyModal" data-toggle='tooltip', data-placement='bottom', title='Reply' >
                    <i class="fas fa-comment"></i>
                <span>${replyTweets.length || ""}</span>
                </button>

                <button class="retweet ${retweetUsers.includes(user._id) ? "active" : ""}" onclick="retweetHandler(event, '${postId}')"  data-toggle='tooltip', data-placement='bottom', title='Retweet'>
                    <i class="fas fa-retweet"></i>
                    <span>${retweetUsers.length || ""}</span>
                </button>

                <button class="love ${user.loves.includes(postId) ? "lovedIt" : ""}" onclick="loveHandler(event, '${postId}')"  data-toggle='tooltip', data-placement='bottom', title='Like'>
                    <i class="fas fa-heart"></i>
                    <span>${loves.length ? loves.length : ""}</span>
                </button>

                <button class="share"  data-toggle='tooltip', data-placement='bottom', title='Share'>
                    <i class="fas fa-upload"></i>
                </button>
            </div>
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



// Tweet open in another page
function openTweet(event, postId) {
    const targetElement = event.target;

    if (targetElement.localName === "button" || targetElement.localName === "a") return;

    window.location.href = `${window.location.origin}/posts/${postId}`
}



// Remove Tweet
function removeTweet(postId) {

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#1A8CD8',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            const url = `${window.location.origin}/posts/${postId}`;
            fetch(url, {
                method: "DELETE",
            }).then(res => res.json())
                .then(data => {
                    if (data._id) {
                        location.reload();
                    } else {
                        location.href = "/"
                    }
                })
        }
    })
}



// Tweet Pinned
function pinTweet(postId, pinned) {
    Swal.fire({
        title: 'Are you sure?',
        text: pinned ? "This will no longer appear automatically at the top of your profile." : "This will appear at the top of your profile and replace any previously pinned Tweet.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#1A8CD8',
        cancelButtonColor: '#d33',
        confirmButtonText: pinned ? 'Unpin' : 'Pin'
    }).then((result) => {

        if (result.isConfirmed) {
            const url = `${window.location.origin}/posts/${postId}/pin`;
            fetch(url, {
                method: "PUT",
            }).then(res => res.json())
                .then(data => {
                    if (data?._id) {
                        console.log(data);
                        location.reload();
                    } else {
                        location.href = "/"

                    }
                })
        }
    })
}



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

