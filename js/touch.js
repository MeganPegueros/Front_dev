document.addEventListener('DOMContentLoaded', () => {
  const tips = document.querySelectorAll('.tips-section ol li');

  tips.forEach(tip => {
    tip.addEventListener('mouseenter', () => {
      tip.classList.add('highlighted');
    });
    tip.addEventListener('mouseleave', () => {
      tip.classList.remove('highlighted');
    });

    // Para dispositivos táctiles: toggle con tap
    tip.addEventListener('touchstart', () => {
      tips.forEach(t => t.classList.remove('highlighted')); // quita otros highlights
      tip.classList.toggle('highlighted');
    });
  });
});
