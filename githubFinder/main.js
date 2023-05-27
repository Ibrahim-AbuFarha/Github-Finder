const profileName = document.querySelector(".profile-name");
const profileImg = document.querySelector(".profile-img");
const mainImg = document.querySelector(".main-img");
const repoTitles = document.querySelectorAll(".repo-title");
const searchInput = document.querySelector(".search-input");
const bio = document.querySelector(".bio");
const followers = document.querySelector(".followers");
const following = document.querySelector(".following");
const reposContainer = document.querySelector(".repo-projects");
const searchForm = document.querySelector(".search-form");
const repoNum=document.querySelector('.repo-num')

const getData = async (user) => {
  try {
    const res1 = await fetch(`https://api.github.com/users/${user}`);
    if (res1.ok === false) throw new Error("user is not found");
    const userInfo = await res1.json();
    updateUserInfo(userInfo);

    const res2 = await fetch(`https://api.github.com/users/${user}/repos`);
    const userRepos = await res2.json();
    updateRepo(userRepos);
  } catch (err) {
    alert(err);
  }
};

const updateUserInfo = (data) => {
  profileName.innerText = data.login;
  profileImg.src = data.avatar_url;
  mainImg.src = data.avatar_url;
  bio.innerText = data.bio;
repoNum.innerText=data.public_repos;
  followers.innerText = data.followers;
  following.innerText = data.following;
};

const updateRepo = (repos) => {
  reposContainer.innerHTML = "";
  const colorsObj = {
    HTML: "red",
    JavaScript: "yellow",
    CSS: "blue",
    PHD: "blueViolet",
  };
  repos.slice(0, 6).forEach((repo) => {
    const color = colorsObj[repo.language] || "green";

    const repoElement = ` <li class="repo-project">
          <div>
            <p class="repo-title">${repo.name}</p>
  
            <p class="lang"><span class="circle ${color}"></span>${repo.language}</p>
          </div>
          <p class="repo-public">Public</p>
        </li>`;

    reposContainer.innerHTML += repoElement;
  });
};

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const enterValue = searchInput.value.trim();
  if (enterValue === "") {
    return;
  }
  getData(enterValue);
});

getData("Ibrahim-AbuFarha");
