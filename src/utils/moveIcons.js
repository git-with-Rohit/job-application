const icons = [];

function getRandomVelocity() {
  const speed = 0.5; // Base speed for more readable movement
  const angle = Math.random() * 2 * Math.PI;
  return { x: speed * Math.cos(angle), y: speed * Math.sin(angle) };
}

function getRandomPosition(containerWidth, containerHeight, iconWidth, iconHeight) {
  const x = Math.random() * (containerWidth - iconWidth);
  const y = Math.random() * (containerHeight - iconHeight);
  return { x, y };
}

function updatePosition(icon, containerWidth, containerHeight) {
  const rect = icon.getBoundingClientRect();
  const iconWidth = rect.width;
  const iconHeight = rect.height;

  if (rect.top <= 0 || rect.bottom >= containerHeight) {
    icon.velocity.y *= -1;
    icon.style.top = `${Math.min(containerHeight - iconHeight, Math.max(0, icon.offsetTop + icon.velocity.y))}px`;
  }
  if (rect.left <= 0 || rect.right >= containerWidth) {
    icon.velocity.x *= -1;
    icon.style.left = `${Math.min(containerWidth - iconWidth, Math.max(0, icon.offsetLeft + icon.velocity.x))}px`;
  }
  icon.velocity.x += (Math.random() - 0.5) * 0.1; // Slight randomness to x velocity
  icon.velocity.y += (Math.random() - 0.5) * 0.1; // Slight randomness to y velocity
  icon.velocity.x *= 0.99; // Damping factor for x velocity
  icon.velocity.y *= 0.99; // Damping factor for y velocity

  icon.style.top = `${icon.offsetTop + icon.velocity.y}px`;
  icon.style.left = `${icon.offsetLeft + icon.velocity.x}px`;
}

export function initIconMovement() {
  const containerWidth = window.innerWidth;
  const containerHeight = window.innerHeight;

  document.querySelectorAll('.icon').forEach(icon => {
    const iconRect = icon.getBoundingClientRect();
    const initialPosition = getRandomPosition(containerWidth, containerHeight, iconRect.width, iconRect.height);
    icon.style.top = `${initialPosition.y}px`;
    icon.style.left = `${initialPosition.x}px`;
    icon.velocity = getRandomVelocity();
    icons.push(icon);
  });

  function animate() {
    icons.forEach(icon => {
      updatePosition(icon, containerWidth, containerHeight);
    });
    requestAnimationFrame(animate);
  }

  animate();
}
