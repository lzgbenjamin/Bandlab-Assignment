//initializations
const postsTemplate = document.querySelector("[data-posts-template]");
const postsContainer = document.getElementById("posts-container");
const reqPostBtn = document.getElementById("reqPosts");
const sortPostBtn = document.getElementById("sortPosts");
const groupBtn = document.getElementById("groupBtn");
const userID = document.getElementById("userID");

let posts = [];
var grouped = false;

//store JSON to array so that the data can be easily manipulated
fetch("https://jsonplaceholder.typicode.com/posts")
    .then((res) => res.json())
    .then((data) => {
        posts = data;
    });

//----------------------------------EVENT LISTENERS---------------------------------------
reqPostBtn.addEventListener("click", _ => {
    userID.value = 0;
    posts.sort((a, b) => a.id - b.id);
    showPosts();
    grouped = false;
});

sortPostBtn.addEventListener("click", _ => {
    if (!grouped) {
        sortPosts();
        showPosts();
    } else {
        const { value } = userID
        sortPosts();
        groupPosts(value);
    }

});

userID.addEventListener("change", _ => {
    const { value } = userID
    if (value == 0) {
        showPosts();
        grouped = false;
    } else {
        groupPosts(value);
        grouped = true;
    }
});

//----------------------------------FUNCTIONS---------------------------------------
function showPosts() {
    postsContainer.textContent = "";
    posts.forEach((posts) => {
        const box = postsTemplate.content.cloneNode(true).children[0];
        const title = box.querySelector("[data-title]");
        const body = box.querySelector("[data-body]");
        title.textContent = posts.title;
        body.textContent = posts.body;
        postsContainer.append(box);
    });
}

function sortPosts() {
    posts.sort((a, b) => a.title.localeCompare(b.title))
}

function groupPosts(x) {
    postsContainer.textContent = ""
    posts.forEach((posts) => {
        if (posts.userId == x) {
            const box = postsTemplate.content.cloneNode(true).children[0];
            const title = box.querySelector("[data-title]");
            const body = box.querySelector("[data-body]");
            title.textContent = posts.title;
            body.textContent = posts.body;
            postsContainer.append(box);
        }
    });
}
