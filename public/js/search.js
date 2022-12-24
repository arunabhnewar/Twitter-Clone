// Reference
const searchInputField = document.querySelector("input#searchInput");
const newSearchTweetContainer = document.querySelector(".newSearchTweetContainer");
const newUserContainer = document.querySelector(".newFollowContainer");


let timer;

newSearchTweetContainer.innerHTML = `
    <h4>You need a search keyword, UserF****r</h4>
`;


searchInputField.addEventListener("input", function (e) {
    clearTimeout(timer);

    const searchingText = this.value.trim();
    if (searchingText) {
        timer = setTimeout(() => {
            const url = `${window.location.origin}/${tab}?searchingText=${searchingText}`;
            console.log(url)
            newSearchTweetContainer.innerHTML = `
                <div style="text-align:center">
                    <div class="spinner-border text-primary mt-4" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>`;
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    newSearchTweetContainer.innerHTML = "";
                    newUserContainer.innerHTML = "";

                    if (tab === "posts") {
                        if (!data.length) {
                            return (newSearchTweetContainer.innerHTML = `
                            <h4 class="no_result">Nothing result found. Search again</h4>
                            `)
                        }

                        data.forEach(post => {
                            const tweetElement = createNewTweet(post);
                            newSearchTweetContainer.insertAdjacentElement("afterbegin", tweetElement)
                        })

                    } else {
                        if (!data.length) {
                            return (newSearchTweetContainer.innerHTML = `
                            <h4 class="no_result">Nothing result found. Search again</h4>
                            `)
                        }

                        data.forEach(user => {
                            const html = createFollowElement(user);
                            newUserContainer.appendChild(html)
                        })
                    }
                })
        }, 1000);
    } else {
        newSearchTweetContainer.innerHTML = `
            <h4>You need a search keyword, UserF****r</h4>
        `;

        newUserContainer.innerHTML = "";
    }
})


