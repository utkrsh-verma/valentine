const grid = document.getElementById("grid");
const game = document.getElementById("game");
const proposal = document.getElementById("proposal");

const yesBtn = document.getElementById("yes");
const noBtn = document.getElementById("no");
const result = document.getElementById("result");
const reaction = document.getElementById("reaction");

/* FIREWORKS */
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

let particles = [];

function launchFirework() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height * 0.4;

  for (let i = 0; i < 28; i++) {
    particles.push({
      x,
      y,
      dx: Math.cos(i) * Math.random() * 3,
      dy: Math.sin(i) * Math.random() * 3,
      life: 60
    });
  }
}

(function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p, i) => {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(p.x, p.y, 2, 2);
    p.x += p.dx;
    p.y += p.dy;
    p.life--;
    if (p.life <= 0) particles.splice(i, 1);
  });
  requestAnimationFrame(animate);
})();

/* PHOTO CARDS */
const photos = [
  "assets/photos/1.jpeg",
  "assets/photos/2.jpeg",
  "assets/photos/3.jpeg",
  "assets/photos/4.jpeg",
  "assets/photos/5.jpeg",
  "assets/photos/6.jpg",
  "assets/photos/7.jpeg",
  "assets/photos/8.jpeg",
  "assets/photos/9.jpeg",
  "assets/photos/10.jpeg"
];

let cards = [...photos, ...photos].sort(() => 0.5 - Math.random());

let first = null;
let lock = false;
let matched = 0;

cards.forEach(src => {
  const card = document.createElement("div");
  card.className = "card";

  const img = document.createElement("img");
  img.src = src;

  card.appendChild(img);

  card.onclick = () => {
    if (lock || card.classList.contains("flipped")) return;

    card.classList.add("flipped");

    if (!first) {
      first = card;
    } else {
      lock = true;

      if (first.querySelector("img").src === img.src) {
        matched += 2;
        first = null;
        lock = false;

        if (matched === cards.length) {
          setTimeout(showProposal, 700);
        }
      } else {
        setTimeout(() => {
          first.classList.remove("flipped");
          card.classList.remove("flipped");
          first = null;
          lock = false;
        }, 800);
      }
    }
  };

  grid.appendChild(card);
});

/* SHOW PROPOSAL */
function showProposal() {
  game.classList.add("hidden");
  proposal.classList.remove("hidden");
}

/* YES */
yesBtn.onclick = () => {
  reaction.src = "assets/reactions/sad.png";
  result.innerText = "That makes me very happy.";
  noBtn.style.display = "none";

  launchFirework();
  setInterval(launchFirework, 900);
};

/* NO */
noBtn.onmouseover = () => {
  reaction.src = "assets/reactions/happy.png";
  const x = Math.random() * 180 - 90;
  const y = Math.random() * 80 - 40;
  noBtn.style.transform = `translate(${x}px, ${y}px)`;
};
