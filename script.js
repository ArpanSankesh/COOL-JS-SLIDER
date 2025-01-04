const slider = document.querySelector(".slider");
const cards = document.querySelectorAll(".cards");
const ease = 0.1;

let currentX = 0;
let targetX = 0;

const getScaleFactor = (position, viewportWidth) => {
  const quaterWidth = viewportWidth / 4;
  if (position < 0 || position > viewportWidth) {
    return 0;
  } else if (position < quaterWidth) {
    return lerp(0, 0.45, position / quaterWidth);
  } else if (position < 2 * quaterWidth) {
    return lerp(0.45, 1.5, (position - quaterWidth) / quaterWidth);
  } else if (position < 3 * quaterWidth) {
    return lerp(1.5, 0.45, (position - 2 * quaterWidth) / quaterWidth);
  } else {
    return lerp(0.45, 0, (position - 3 * quaterWidth) / quaterWidth);
  }
};

const updateScales = () => {
  const viewportWidth = window.innerWidth;
  cards.forEach((card) => {
    const cardRect = card.getBoundingClientRect();
    const cardCenter = cardRect.left + cardRect.width / 2;
    const scaleFactor = getScaleFactor(cardCenter, viewportWidth);
    const imgScaleFactor = scaleFactor * 1.1;
    const img = card.querySelector("img");
    card.style.transform = `scale(${scaleFactor})`;
    img.style.transform = `scale(${imgScaleFactor})`;
  });
};

const lerp = (start, end, t) => {
  return start * (1 - t) + end * t;
};

const update = () => {
  currentX = lerp(currentX, targetX, ease);
  slider.style.transform = `translate(${currentX}px)`;
  updateScales();
  requestAnimationFrame(update);
};

window.addEventListener("scroll", () => {
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  const scrollProgress = window.scrollY / maxScroll;
  targetX = -scrollProgress * 75;
});

update();
