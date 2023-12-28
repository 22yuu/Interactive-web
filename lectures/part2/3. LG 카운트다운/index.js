//@ts-nocheck
import Particle from "./js/Particle.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const dpr = window.devicePixelRatio;
let canvasWidth = innerWidth;
let canvasHeight = innerHeight;
const interval = 1000 / 60;

const particles = [];

function init() {
  canvasWidth = innerWidth;
  canvasHeight = innerHeight;
  canvas.style.width = canvasWidth + "px";
  canvas.style.height = canvasHeight + "px";
  canvas.width = canvasWidth * dpr;
  canvas.height = canvasHeight * dpr;
  ctx.scale(dpr, dpr);
}

function createRing() {
  const PARTICLE_NUM = 1500;
  for (let i = 0; i < PARTICLE_NUM; i++) {
    particles.push(new Particle());
  }
}

function render() {
  let now, delta;
  let then = Date.now();

  const frame = () => {
    requestAnimationFrame(frame);
    now = Date.now();
    delta = now - then;
    if (delta < interval) return;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // 애니메이션이 반짝거림 -> 파티클의 forEach를 돌면서 opacity가 0 미만인 값을 인덱스 위치에서 1개만큼
    // splice로 제거하면 기존 배열에 값을 직접 수정하기 때문에 다음 인덱스의 파티클이 제거된 파티클의 인덱스로 이동이
    // 되면서 리렌더링이 되어 반짝거림이 발생...!
    // 쉽게 말해서 splice는 새로운 배열을 생성하기 때문?
    // particles.forEach((particle, index) => {
    //   particle.update();
    //   particle.draw(ctx);

    //   if (particle.opacity < 0) particles.splice(index, 1);
    // });

    // 이를 해결할 수 있는 방법은 다양함. 그 중 하나는 for문을 이용해 거꾸로 순회!
    // 배열이 직접 수정이 되어도 거꾸로 순회하기 때문에 항상 마지막 배열 원소가 없어져
    // 화면 상 보기에는 아무 이상이 없는 것처럼 보일 수 있음
    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].draw(ctx);

      if (particles[i].opacity < 0) particles.splice(i, 1);
    }

    then = now - (delta % interval);
  };

  requestAnimationFrame(frame);
}

window.addEventListener("load", () => {
  init();
  render();
});

window.addEventListener("resize", init);
window.addEventListener("click", () => {
  createRing();
});
