// Menu mobile
const burger = document.getElementById("burger");
const menu = document.getElementById("menu");
burger.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  burger.setAttribute("aria-expanded", open);
});
menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => menu.classList.remove("open")));

// Animasi muncul saat scroll + hitung angka statistik
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add("in");
    e.target.querySelectorAll("[data-count]").forEach(hitung);
    io.unobserve(e.target);
  });
}, { threshold: 0.15 });
document.querySelectorAll(".sec .wrap, .band .wrap").forEach((el) => { el.classList.add("reveal"); io.observe(el); });

function hitung(el) {
  const target = +el.dataset.count; let n = 0;
  const step = Math.max(1, Math.round(target / 50));
  const t = setInterval(() => {
    n = Math.min(target, n + step);
    el.textContent = n.toLocaleString("id-ID");
    if (n >= target) clearInterval(t);
  }, 25);
}

// Kalkulator APAR sederhana: 1 APAR per luas cakupan sesuai tingkat risiko
document.getElementById("aparForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const luas = parseFloat(document.getElementById("luas").value);
  const cakupan = parseFloat(document.getElementById("risiko").value);
  const out = document.getElementById("aparHasil");
  if (!(luas > 0)) { out.textContent = "Masukkan luas ruangan yang valid."; return; }
  out.textContent = "Perkiraan kebutuhan: " + Math.ceil(luas / cakupan) + " unit APAR (1 unit per " + cakupan + " m²).";
});
