document.querySelector('.burger').addEventListener('click', () => {
  document.querySelector('nav').classList.toggle('open');
  document.querySelector('.burger').classList.toggle('open');
})