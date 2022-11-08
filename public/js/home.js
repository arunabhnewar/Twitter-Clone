// Reference
const txtFieldTweetContent = document.querySelector("textarea#tweetContent");
const tweetBtn = document.querySelector("button.tweet_post_btn");




txtFieldTweetContent.addEventListener("input", function (e) {
    const value = this.value;

    if (value) {
        tweetBtn.removeAttribute("disabled")
    } else {
        tweetBtn.setAttribute("disabled", true);
    }
})