const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const gameOverEl = document.getElementById('game-over');
const finalScoreEl = document.getElementById('final-score');
const restartBtn = document.getElementById('restart');

const W = 400;
const H = 600;
canvas.width = W;
canvas.height = H;

const GRAVITY = 0.45;
const JUMP_FORCE = -14;
const MOVE_SPEED = 6;
const PLATFORM_WIDTH = 70;
const PLATFORM_HEIGHT = 14;
const PLATFORM_GAP_Y_MIN = 50;
const PLATFORM_GAP_Y_MAX = 120;
const DOODLE_SIZE = 36;
const WORLD_WRAP_LEFT = 0;
const WORLD_WRAP_RIGHT = W;

let player = {
  x: W / 2 - DOODLE_SIZE / 2,
  y: H - 120,
  vy: 0,
  vx: 0,
  width: DOODLE_SIZE,
  height: DOODLE_SIZE,
};

let platforms = [];
let cameraY = 0;
let score = 0;
let bestScore = 0;
let gameRunning = true;
let keys = { left: false, right: false };

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

function createPlatform(x, y, type = 'normal') {
  return { x, y, w: PLATFORM_WIDTH, h: PLATFORM_HEIGHT, type };
}

function generatePlatformsUpTo(minY) {
  const lastP = platforms[platforms.length - 1];
  let lastY = lastP ? lastP.y : player.y - 80;
  let lastX = lastP ? lastP.x : W / 2 - PLATFORM_WIDTH / 2;
  while (lastY > minY - H) {
    const gapY = randomBetween(PLATFORM_GAP_Y_MIN, PLATFORM_GAP_Y_MAX);
    const gapX = randomBetween(-100, 100);
    lastY -= gapY;
    lastX = lastX + gapX;
    if (lastX < 0) lastX = 0;
    if (lastX + PLATFORM_WIDTH > W) lastX = W - PLATFORM_WIDTH;
    const roll = Math.random();
    const type = roll < 0.2 ? 'moving' : roll < 0.4 ? 'breakable' : 'normal';
    platforms.push(createPlatform(lastX, lastY, type));
  }
}

function initPlatforms() {
  platforms = [];
  const firstY = player.y - 60;
  platforms.push(createPlatform(W / 2 - PLATFORM_WIDTH / 2, firstY, 'normal'));
  generatePlatformsUpTo(player.y - H * 2);
}

function drawDoodle() {
  const screenY = player.y - cameraY;
  if (screenY < -DOODLE_SIZE || screenY > H + DOODLE_SIZE) return;
  ctx.save();
  ctx.fillStyle = '#ffd93d';
  ctx.beginPath();
  ctx.ellipse(
    player.x + player.width / 2,
    screenY + player.height / 2,
    player.width / 2,
    player.height / 2,
    0, 0, Math.PI * 2
  );
  ctx.fill();
  ctx.strokeStyle = '#b8860b';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.restore();
}

function drawPlatform(p) {
  const screenY = p.y - cameraY;
  if (screenY < -PLATFORM_HEIGHT || screenY > H + PLATFORM_HEIGHT) return;
  if (p.removed) return;

  const colors = {
    normal: { fill: '#4ade80', stroke: '#22c55e' },
    moving: { fill: '#60a5fa', stroke: '#3b82f6' },
    breakable: { fill: '#d4a574', stroke: '#a0785a' },
  };
  const c = colors[p.type] || colors.normal;
  ctx.fillStyle = c.fill;
  ctx.strokeStyle = c.stroke;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(p.x, screenY, p.w, p.h, 4);
  ctx.fill();
  ctx.stroke();
}

let movePhase = 0;
function updateMovingPlatforms() {
  movePhase += 0.02;
  platforms.forEach((p) => {
    if (p.type !== 'moving' || p.removed) return;
    const baseX = p.baseX ?? p.x;
    p.baseX = baseX;
    p.x = baseX + Math.sin(movePhase + p.y * 0.01) * 40;
    p.x = Math.max(0, Math.min(W - PLATFORM_WIDTH, p.x));
  });
}

function checkPlatformCollision() {
  const footY = player.y + player.height;
  const footCenterX = player.x + player.width / 2;
  if (player.vy <= 0) return;

  for (const p of platforms) {
    if (p.removed) continue;
    const platformTop = p.y;
    const platformBottom = p.y + p.h;
    const platformLeft = p.x;
    const platformRight = p.x + p.w;

    if (
      footY >= platformTop - 4 &&
      footY <= platformBottom + 10 &&
      footCenterX >= platformLeft - 5 &&
      footCenterX <= platformRight + 5
    ) {
      player.vy = JUMP_FORCE;
      if (p.type === 'breakable') {
        p.removed = true;
      }
      return;
    }
  }
}

function updateScore() {
  const heightScore = Math.max(0, Math.floor((H - 120 - player.y) / 2));
  if (heightScore > bestScore) bestScore = heightScore;
  score = bestScore;
  scoreEl.textContent = score;
}

function gameOver() {
  gameRunning = false;
  finalScoreEl.textContent = 'Score : ' + score;
  gameOverEl.classList.add('visible');
}

function update(dt) {
  if (!gameRunning) return;

  if (keys.left) player.vx = -MOVE_SPEED;
  else if (keys.right) player.vx = MOVE_SPEED;
  else player.vx = 0;

  player.x += player.vx * (dt / 16);
  player.vy += GRAVITY * (dt / 16);

  if (player.x < -player.width / 2) player.x = W - player.width / 2;
  if (player.x + player.width > W + player.width / 2) player.x = -player.width / 2 + player.width / 2;

  checkPlatformCollision();
  updateMovingPlatforms();

  player.y += player.vy * (dt / 16);

  if (player.y - cameraY > H * 0.6) {
    cameraY = player.y - H * 0.6;
  }
  generatePlatformsUpTo(player.y);

  updateScore();

  if (player.y - cameraY > H + 50) {
    gameOver();
  }
}

function draw() {
  ctx.clearRect(0, 0, W, H);
  platforms.forEach(drawPlatform);
  drawDoodle();
}

let lastTime = performance.now();
function loop(now) {
  const dt = now - lastTime;
  lastTime = now;
  update(dt);
  draw();
  requestAnimationFrame(loop);
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keys.left = true;
  if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keys.right = true;
});

document.addEventListener('keyup', (e) => {
  if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keys.left = false;
  if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keys.right = false;
});

restartBtn.addEventListener('click', () => {
  gameOverEl.classList.remove('visible');
  gameRunning = true;
  player.x = W / 2 - DOODLE_SIZE / 2;
  player.y = H - 120;
  player.vy = 0;
  player.vx = 0;
  cameraY = 0;
  bestScore = score;
  initPlatforms();
  lastTime = performance.now();
});

initPlatforms();
requestAnimationFrame(loop);
