const posts = [
  {
    id: 1,
    content:
      "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    media: "https://unsplash.it/600/300?image=171",
    author: {
      name: "Phil Mangione",
      image: "https://unsplash.it/300/300?image=15",
    },
    likes: 80,
    created: "2021-06-25",
  },
  {
    id: 2,
    content:
      "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    media: "https://unsplash.it/600/400?image=112",
    author: {
      name: "Sofia Perlari",
      image: "https://unsplash.it/300/300?image=10",
    },
    likes: 120,
    created: "2021-09-03",
  },
  {
    id: 3,
    content:
      "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    media: "https://unsplash.it/600/400?image=234",
    author: {
      name: "Chiara Passaro",
      image: "https://unsplash.it/300/300?image=20",
    },
    likes: 78,
    created: "2021-05-15",
  },
  {
    id: 4,
    content:
      "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    media: "https://unsplash.it/600/400?image=24",
    author: {
      name: "Luca Formicola",
      image: null,
    },
    likes: 56,
    created: "2021-04-03",
  },
  {
    id: 5,
    content:
      "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    media: "https://unsplash.it/600/400?image=534",
    author: {
      name: "Alessandro Sainato",
      image: "https://unsplash.it/300/300?image=29",
    },
    likes: 95,
    created: "2021-03-05",
  },
];

const userLikes = [];
function getInitials(name) {
  const nameParts = name.split(" ");
  const initials = nameParts[0].charAt(0) + nameParts[1].charAt(0);
  return initials.toUpperCase();
}

//disegno gli item
function drawGridItem(post) {
    const postElm = document.createElement('div');
    postElm.setAttribute('class', 'post');
  const template = `
    <div class="post__header">
        <div class="post-meta">                    
            <div class="post-meta__icon">
                ${
                  post.author.image
                    ? `<img class="profile-pic" src="${post.author.image}" alt="${post.author.name}">`
                    : `<div class="profile-pic-default"><span>${getInitials(
                        post.author.name
                      )}</span></div>`
                }                 
            </div>
            <div class="post-meta__data">
                <div class="post-meta__author">${post.author.name}</div>
                <div class="post-meta__time">${new Date(
                  post.created
                ).toLocaleDateString()}</div>
            </div>                    
        </div>
    </div>
    <div class="post__text">${post.content}</div>
    <div class="post__image">
        <img src="${post.media}" alt="Immagine post di ${post.author.name}">
    </div>
    <div class="post__footer">
        <div class="likes js-likes">
            <div class="likes__cta">
                <a class="like-button  js-like-button" href="#" data-postid="${
                  post.id
                }">
                    <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                    <span class="like-button__label">Mi Piace</span>
                </a>
            </div>
            <div class="likes__counter">
                Piace a <b id="like-counter-${
                  post.id
                }" class="js-likes-counter">${post.likes}</b> persone
            </div>
        </div> 
    `;
    postElm.innerHTML=template;
    const button = postElm.querySelector("[data-postid]");
    button.addEventListener("click", function (event) {
        event.preventDefault();
        this.classList.toggle("like-button--liked");
        const check = this.classList.contains("like-button--liked");
        setLikes(check, this.dataset.postid);
      });
  return postElm;
}

//disegno la griglia
function drawGrid() {
  const container = document.getElementById("container");
  posts.forEach((post) => {
    const card = drawGridItem(post);
    container.append(card);
  });
  
}

function setLikes(check, postid) {
  const counter = document.getElementById(`like-counter-${postid}`);
  let likeValue = parseInt(counter.innerText);
  if (check) {
    userLikes.push(postid);
    counter.innerText = likeValue + 1;
  } else {
    const index = userLikes.indexOf(postid);
    if (index !== -1) userLikes.splice(index, 1);
    counter.innerText = likeValue - 1;
  }
}

drawGrid();
