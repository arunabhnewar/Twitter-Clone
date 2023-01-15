// Reference
const userSearch = document.querySelector("#userSearch");
const selectedUsersContainer = document.querySelector("#selectedUsers");
const createChatBtn = document.querySelector("button#createChat");
const newFollowContainer = document.querySelector(".newFollowContainer");

let selectedUsers = [];
let timer;

newFollowContainer.innerHTML = `<h4>You need a search keyword </h4>`;


userSearch.addEventListener("input", function (e) {
    clearTimeout(timer);

    const searchingText = this.value.trim();
    if (searchingText) {

        timer = setTimeout(() => {
            const url = `${window.location.origin}/users?searchingText=${searchingText}`;

            newFollowContainer.innerHTML = `
            <div style="text-align:center">
                    <div class="spinner-border text-primary mt-4" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            `;
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    newFollowContainer.innerHTML = "";

                    if (!data.length) {
                        return (newFollowContainer.innerHTML = `
                            <h4 class="no_result">Nothing result found. Search again</h4>
                        `)
                    }

                    data.forEach(userData => {
                        console.log(userData)
                        if (selectedUsers.some((selectedUser) => selectedUser._id === userData._id) ||
                            userData._id === user._id) {
                            return
                        }

                        const html = createFollowElement(userData, true);
                        html.addEventListener("click", function () {
                            selectedUsers.push(userData);
                            html.remove();
                            userSearch.value = "";
                            userSearch.focus();
                            newFollowContainer.innerHTML = "";

                            showSelectedUsers(selectedUsers);
                        });
                        newFollowContainer.appendChild(html);
                    })
                })
        }, 1000)
    }
});


function showSelectedUsers(selectedUsers) {

    if (selectedUsers.length) {
        createChatBtn.disabled = false;
    } else {
        createChatBtn.disabled = true;
    }

    selectedUsersContainer.innerHTML = "";

    selectedUsers.forEach((selectedUser) => {
        const userName = selectedUser.userName;

        const avatarImg = selectedUser.avatarProfile ? `/uploads/${selectedUser.avatarProfile}` : `/uploads/avatar.png`;

        const div = document.createElement("div");
        div.classList.add("selectedUser")

        div.innerHTML = `
            <img src=${avatarImg}>
            <span>${userName}</span>
            <button onclick="unSelectUser(event, '${selectedUser._id}')" >
                <i class="fas fa-times" ></i>
            </button>`;

        selectedUsersContainer.appendChild(div);
    })
}


function unSelectUser(event, userId) {
    selectedUsers = selectedUsers.filter(selectedUser => {
        selectedUser._id !== userId
    })

    showSelectedUsers(selectedUsers);
    userSearch.focus();

    // event.target.remove();
}


// Chat Button event handle
createChatBtn.addEventListener("click", function (e) {
    const url = `${location.origin}/chat`;
    fetch(url, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(selectedUsers),
    })
        .then(res => res.json())
        .then(data => {
            if (data._id) {
                location.href = `${location.origin}/messages/${data._id}`
            }
            else {
                alert("Something went wrong!")
            }
        })
})




function createFollowElement(data, hideFollowBtn) {
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

    let onlineTxt = data?.onlineStatus ? "Online now" : new Date(data?.lastSeen)?.toLocaleString() != "Invalid date" ? "Last seen: " + new Date(data?.lastSeen)?.toLocaleString() : "Not seen recently";

    const isOnline = data?._id.toString() == user._id.toString() || onlineTxt == "Online now";

    onlineTxt = isOnline ? "Online now" : onlineTxt;

    div.innerHTML = `
    <div class="social_connection">
        <div class="avatar">
            <div class="onlineStatus ${isOnline && 'active'}" data-onlineStatus="${onlineTxt}"></div>
            <img src="${avatarUrl}">
        </div>

        <div class="userNameDisplay" >
            <a href="/profile/${data.userName}">
            <h5>${name}</h4>
            </a>
            <h6>@${data.userName}</h6>
        </div>
    </div>

    <div class="" >
        ${hideFollowBtn ? "" : followDiv}
    </div>

    `
    return div;
}
