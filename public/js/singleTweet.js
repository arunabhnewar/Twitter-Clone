// Reference
const newTweetContainer = document.querySelector(".newTweetContainer");


// All Post loaded
const allPostLoad = async () => {
    try {
        const result = await fetch(`${window.location.origin}/posts/status/${postId}`);
        const post = await result.json();

        const tweetElement = createNewTweet(post);
        console.log(tweetElement)
        newTweetContainer.appendChild(tweetElement);

        post.replyTweets?.forEach(pst => {
            const tweetElement = createNewTweet(pst);
            newTweetContainer.appendChild(tweetElement);
        })

    } catch (error) { }
}

allPostLoad();




// Reply post button enable or disable handle
// txtFieldReplyContent.addEventListener("input", function (e) {
//     const value = this.value.trim();

//     if (value || replyImages.length) {
//         replyBtn.removeAttribute("disabled")
//     } else {
//         replyBtn.setAttribute("disabled", true);
//     }
// })



// Single or multiple reply images post handle
// replyImgInput.addEventListener("change", function (e) {
//     const files = this.files;
//     replyImages = [];


//     [...files].forEach(file => {
//         if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type)) return;

//         replyBtn.removeAttribute("disabled");
//         replyImages.push(file);

//         const fileReader = new FileReader();
//         fileReader.onload = function () {

//             const div = document.createElement("div");
//             div.classList.add("img");
//             div.dataset.name = file.name;
//             div.innerHTML = `
//             <span id="cls_btn">
//             <i class="fas fa-times"></i>
//             </span><img>
//             `;

//             const img = div.querySelector("img");
//             img.src = fileReader.result;
//             replyImageContainer.appendChild(div)
//         }
//         fileReader.readAsDataURL(file)
//     })
// })



// Reply Image Container event handle
// replyImageContainer.addEventListener("click", function (e) {

//     const clsBtn = e.target.id === "cls_btn" ? e.target : null;
//     if (!clsBtn) return;

//     const imgElement = clsBtn.parentElement;
//     const fileName = imgElement.dataset.name;

//     replyImages.forEach((file, i) => {
//         if (fileName === file.name) {
//             replyImages.splice(i, 1);
//             imgElement.remove();

//             if (!replyImages.length && !txtFieldReplyContent?.value?.trim()) {
//                 replyBtn.setAttribute("disabled", true);
//             }
//         }
//     })
// })




