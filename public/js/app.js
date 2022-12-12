
// Create new tweet post
function createNewTweet(data) {

    let newData = data;
    let reTweetedPost = '';
    let replyTo = "";
    let removeBtn = "";

    if (data.postData) {
        newData = data.postData;
        reTweetedPost = `
        <p class="reTweeted_post">
        <i class="fas fa-retweet"></i>
        <span class="retweeted_user_link"> ${data.tweetedBy.userName === user.userName ? "You Retweeted" : "<a href='/profile/" + data.tweetedBy.userName + ">" + data.tweetedBy.userName + " </a> Retweeted"} </span>
        </p>
        `;
    };


    if (data.replyTo?.tweetedBy?.userName) {
        replyTo = `
        <div class="replyUser">
            <p>Replying to <span>@</span><a href="/profile/${data.replyTo.tweetedBy.userName}">${data.replyTo.tweetedBy.userName}</a>
            </p>
        </div>`;
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
        replyTweets
    } = newData;


    if (data?.tweetedBy?._id === user?._id) {
        removeBtn = `
        <button onclick="removeTweet('${data._id}')" class="remove_btn" >
        <i class="fas fa-trash" ></i>
        Remove Your Tweet
        </button>
        `
    }

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

    div.innerHTML = `
    
    ${reTweetedPost}

    <div class="newTweet" onclick="openTweet(event, '${postId}')">
        <div class="avatar_image">
            <div class="image">
            <img class="avatar" src="${window.location.origin}/uploads/${avatarProfile}"  />
            </div>
        </div>

        <div class="newTweet_body">
            <div class="newTweet_header">
                <div class="header_items">
                    <a href="/profile/${userName}" class="show_name"> ${firstName + " " + lastName} </a>
                    <span class="show_username"> @${userName} .</span>
                    <div class="timeAgo">${timeAgo}</div>
                </div>

                <div class="dropleft">
                    <button class="posted_more " data-toggle="dropdown" aria-expanded="false"><i class="fas fa-ellipsis-h"></i></button>

                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="#">
                        ${removeBtn}
                        </a>
                    </div>
                </div>
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
                        console.log(data);
                        location.reload();
                    } else {
                        location.href = "/"
                    }
                })
        }
    })
}

