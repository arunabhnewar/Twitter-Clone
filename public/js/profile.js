// Image upload reference
const newTweetContainer = document.querySelector(".newTweetContainer");

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

        if (tab === "tweets") {
            const pinPostResult = await fetch(`${window.location.origin}/posts?tweetedBy=${profileUser._id}&pinned=true`);

            const pinPosts = await pinPostResult.json();
            pinPosts?.forEach(post => {
                const tweetElement = createNewTweet(post, true);
                newTweetContainer.insertAdjacentElement("afterbegin", tweetElement)
            })
        }


    } catch (error) {
        console.log(error)
    }
}

allPostLoad();


// followers n following data handle
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