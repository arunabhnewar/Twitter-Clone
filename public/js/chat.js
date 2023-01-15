// Reference
const chatHeader = document.querySelector(".chat_header ");
const chatImage = document.querySelector(".chatImage");
const chatName = document.querySelector(".chatName");


const url = `${location.origin}/chat/${chatId}`;
fetch(url)
    .then(res => res.json())
    .then(chatData => {

        if (!chatData._id) {
            return (chatHeader.innerHTML = `<h4>${chatData.error}</h4>`)
        }

        showChatDetails(chatData)
    })



function showChatDetails(chatData) {

    // Get another users & exclude signed in user
    const anotherUsers = chatData?.users?.filter(au => {
        au._id !== user._id
    });


    // Get chat name
    let chatNameString = chatData.chatName;
    chatNameString = chatNameString ? chatNameString : getChatName(anotherUsers);


    // Get user chat image
    let chatImage = chatData.chatImage;

    const remainUsers = anotherUsers.length === 2 ? "" : <span> ${anotherUsers.length - 2}+ </span>

    chatImage = chatImage ? `<img src="/uploads/chat/${chatImage}" class="chat_userImg" >`
        : anotherUsers.length === 1
            ? `<img src="${anotherUsers[0].avatarProfile ? '/uploads/' + anotherUsers[0].avatarProfile : '/uploads/avatar.png'}">`
            : `<img src="${anotherUsers[0].avatarProfile ? '/uploads/' + anotherUsers[0].avatarProfile : '/uploads/avatar.png'}"> 
            <img src="${anotherUsers[anotherUsers.length - 1].avatarProfile ? '/uploads/' + }">`
}