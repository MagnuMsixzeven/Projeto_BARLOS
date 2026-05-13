// Relógio de mensalidade (simulação)
let dias = 12, horas = 4, minutos = 32;
function atualizarMensalidade() {
  minutos--;
  if (minutos < 0) { minutos = 59; horas--; }
  if (horas < 0) { horas = 23; dias--; }
  if (dias < 0) { dias = 0; horas = 0; minutos = 0; }
  document.getElementById('mensalidade-timer').textContent = `${dias}d ${('0'+horas).slice(-2)}h ${('0'+minutos).slice(-2)}min`;
}
setInterval(atualizarMensalidade, 60000);
document.addEventListener('DOMContentLoaded', atualizarMensalidade);

// Simulação de slots de agenda (poderia ser dinâmico via backend)
// ...

// Simulação de posts do Instagram
const posts = [
  { id: 1, texto: 'Promo Corte Sexta' },
  { id: 2, texto: 'Barba + Cabelo' },
  { id: 3, texto: 'Novo horário!' },
  { id: 4, texto: 'Agende pelo site!' }
];
window.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('instagram-grid');
  if (grid) {
    grid.innerHTML = posts.map(p => `<div class='instagram-post'>${p.texto}</div>`).join('');
  }
});