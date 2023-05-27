const searchInput1 = document.querySelector(".search-input1");
const searchInput2 = document.querySelector(".search-input2");
const btn1 = document.querySelector(".btn1");
const btn2 = document.querySelector(".btn2");
const space1 = document.querySelector(".space-1");
const space2 = document.querySelector(".space-2");
const btn = document.querySelector(".btn");
let user1Followers;
let user1RepsNum;
let user2Followers;
let user2RepsNum;

const getData = async (user, container) => {
  try {
    // req1
    const res1 = await fetch(`https://api.github.com/users/${user}`);
    if (res1.ok === false) throw new Error("This user is not found");
    const userInfo = await res1.json();
    const elementUserInfo = ` <img src="${userInfo.avatar_url}" alt="" />
    <span>Name: ${userInfo.login}</span>
    <span>Repositories: ${userInfo.public_repos}</span>
    <span>Followers: ${userInfo.followers}</span>
    `;
    
    container.innerHTML = "";
    

    container.innerHTML = elementUserInfo;
   

    
    

    return { length: userInfo.public_repos, followers: userInfo.followers };
  } catch (err) {
    alert(err);
    window.location.reload();
  }
};

btn1.addEventListener("click", async (e) => {
  e.preventDefault();

  const enteredValue = searchInput1.value;
  if (!enteredValue) return;
  reset();

  const value = await getData(searchInput1.value, space1);
  user1Followers = value.followers;
  user1RepsNum = value.length;
});

btn2.addEventListener("click", async (e) => {
  e.preventDefault();
  const enteredValue = searchInput2.value;

  if (!enteredValue) return;
  reset();

  const value = await getData(enteredValue, space2);
  user2Followers = value.followers;
  user2RepsNum = value.length;
});

btn.addEventListener("click", (e) => {
  if (user1RepsNum === undefined || user2RepsNum === undefined) {
    return;
  }

  if (user1RepsNum > user2RepsNum) {
    space1.classList.add("green");
    space2.classList.add("red");
  } else if (user1RepsNum < user2RepsNum) {
    space1.classList.add("red");
    space2.classList.add("green");
  }
  if (user1RepsNum === user2RepsNum) {
    if (user1Followers > user2Followers) {
      space1.classList.add("green");
      space2.classList.add("red");
    } else if (user1Followers < user2Followers) {
      space1.classList.add("red");
      space2.classList.add("green");
    } else {
      space1.classList.add("blue");
      space2.classList.add("blue");
    }
  }
});

const reset = () => {
  space1.classList.remove("red");
  space1.classList.remove("green");
  space1.classList.remove("blue");
  space2.classList.remove("red");
  space2.classList.remove("green");
  space2.classList.remove("blue");
};
