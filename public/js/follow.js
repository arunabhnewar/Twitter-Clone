function followHandler(e, userId) {
    const url = `${window.location.origin}/profile/${userId}/follow`;
    fetch(url, {
        method: "PUT",
    }).then(res => res.json())
        .then(data => {

            followBtn = e.target;
            const isFollowing = data.followers.includes(user._id);

            const following = document.querySelector("a.following .value");
            const followers = document.querySelector("a.followers .value");

            if (isFollowing) {
                if (profileUser._id === user._id) {
                    following.textContent = parseInt(following.textContent) + 1
                }
                followBtn.classList.add("active");
                followBtn.textContent = "Following";
            }
            else {
                if (profileUser._id === user._id) {
                    following.textContent = parseInt(following.textContent) - 1;
                }
                followBtn.classList.remove("active");
                followBtn.textContent = "Follow";
            }

        })
}

const newFollowContainer = document.querySelector(".newFollowContainer")

const following = (profileUser && profileUser.following) || [];
const followers = (profileUser && profileUser.followers) || [];


if (tab === "followers") {
    followers.forEach((follower) => {
        const html = createFollowElement(follower);
        newFollowContainer.appendChild(html)
    })
} else {
    following.forEach((followingUser) => {
        const html = createFollowElement(followingUser);
        newFollowContainer.appendChild(html)
    })
};



function createFollowElement(data) {
    const name = data.firstName + " " + data.lastName;
    const isFollowing = data.followers.includes(user._id);

    const avatarUrl = data.avatarProfile ? `/uploads/${data.avatarProfile}` : `/uploads/avatar.png`;

    let followDiv = "";

    if (data._id !== user._id) {
        followDiv = `
        <button class="follow ${isFollowing ? "active" : ""}" id="followBtn" onclick= "followHandler(event, '${data._id}')" >
        ${isFollowing ? "Following" : "Follow"}
        </button>
        `
    }

    const div = document.createElement('div');
    div.classList.add("follow_section");
    div.innerHTML = `
    <div class="social_connection">
        <div class="avatar">
            <div class="onlineStatus" data-onlineStatus="Offline"></div>
            <img src="${avatarUrl}">
        </div>

        <div class="userNameDisplay" >
            <a href="/profile/${data.userName}">
            <h4>${name}</h4>
            </a>
            <h6>@${data.userName}</h6>
        </div>
    </div>

    <div class="" >
        ${followDiv}
    </div>

    `
    return div;
}