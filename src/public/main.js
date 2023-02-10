window.addEventListener('load', () => {
  const endPoints = document.querySelectorAll('button[data-endpoint]');

  endPoints.forEach((endP) => {
    endP.addEventListener('click', (e) => {
      const endPoint = endP.dataset.endpoint;
      navigator.clipboard.writeText(endPoint).then(() => {
        endP.classList.remove('bg-yellow-500');
        endP.classList.remove('hover:bg-yellow-400');
        endP.classList.add('bg-green-custom');
        e.target.textContent = 'COPIADO';
        setTimeout(() => {
          endP.classList.remove('bg-green-custom');
          endP.classList.add('bg-yellow-500');
          endP.classList.add('hover:bg-yellow-400');
          e.target.textContent = 'COPIAR';
        }, 1500);
      });
    });
  });
});
