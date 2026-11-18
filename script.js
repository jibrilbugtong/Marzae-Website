/* =========================================================
   MARZÉ — interactions & gown catalogue
   Edit the GOWNS list below to change the collection.
   Put dress photos in assets/gowns/ and point "photo" at them.
   ========================================================= */

const CURRENCY = "$";

const GOWNS = [
  {
    id: "versailles", name: "Versailles", tag: "Tiered tulle ruffle gown", category: "gown",
    price: 220, badge: "Most Loved", photo: "assets/gowns/versailles.jpg",
    fabric: "Shimmer tulle, ruched bodice, antique gold brooch", length: "Floor length",
    desc: "Cascading tiers of glittering tulle and a gilded brooch at the neckline. Made for grand entrances and long staircases."
  },
  {
    id: "duchesse", name: "Duchesse", tag: "Bordeaux satin strapless gown", category: "gown",
    price: 200, photo: "assets/gowns/duchesse.jpg",
    fabric: "Heavy duchess satin with box pleats", length: "Tea length",
    desc: "A folded cuff neckline, a sculpted bodice and a full pleated skirt. Quiet, rich and impossibly elegant."
  },
  {
    id: "nocturne", name: "Nocturne", tag: "Sequin corset mermaid gown", category: "gown",
    price: 210, badge: "New", photo: "assets/gowns/nocturne.jpg",
    fabric: "Sequined lace corset, draped liquid satin", length: "Floor length",
    desc: "A glittering corset bodice over a draped satin mermaid skirt with ribbon ties at the hips. For candlelit galas."
  },
  {
    id: "dentelle", name: "Dentelle", tag: "Rose lace corset mini", category: "mini",
    price: 150, photo: "assets/gowns/dentelle.jpg",
    fabric: "Floral Chantilly-style lace over nude lining", length: "Mini",
    desc: "Boned rose lace with a basque waist and a full ruffled skirt. Our love letter to lace."
  },
  {
    id: "bijou", name: "Bijou", tag: "Velvet halter mini with crystal bow", category: "mini",
    price: 130, photo: "assets/gowns/bijou.jpg",
    fabric: "Shimmer velvet with a crystal bow brooch", length: "Mini",
    desc: "Starlit velvet, a plunging halter and a crystal bow, finished with a double ruffle hem."
  },
  {
    id: "cascade", name: "Cascade", tag: "Draped satin strapless mini", category: "mini",
    price: 120, photo: "assets/gowns/cascade.jpg",
    fabric: "Liquid satin with a side waterfall drape", length: "Mini",
    desc: "Hand-gathered satin that falls into a long waterfall drape at the side. Effortless and a little dramatic."
  },
];

const CATEGORY_LABEL = { gown: "Long Gown", mini: "Mini Dress" };

/* ---------- Render grid ---------- */
const grid = document.getElementById("grid");
const select = document.getElementById("gownSelect");
const photoTag = (g) => `<img class="gown__photo" src="${g.photo}" alt="${g.name}, ${g.tag}" loading="lazy">`;

GOWNS.forEach((g) => {
  const card = document.createElement("button");
  card.className = "gown reveal";
  card.type = "button";
  card.dataset.category = g.category;
  card.innerHTML = `
    <div class="gown__frame">
      ${g.badge ? `<span class="gown__badge">${g.badge}</span>` : ""}
      ${photoTag(g)}
    </div>
    <h3 class="gown__name">${g.name}</h3>
    <p class="gown__tag">${g.tag}</p>
    <p class="gown__price">Rent from ${CURRENCY}${g.price}</p>`;
  card.addEventListener("click", () => openGown(g));
  grid.appendChild(card);

  const opt = document.createElement("option");
  opt.value = g.name;
  opt.textContent = `${g.name} (${g.tag})`;
  select.appendChild(opt);
});

/* ---------- Filters ---------- */
document.querySelectorAll(".filter").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    const f = btn.dataset.filter;
    grid.querySelectorAll(".gown").forEach((card) => {
      const show = f === "all" || card.dataset.category === f;
      card.classList.toggle("is-hidden", !show);
      if (show) card.classList.add("is-visible");
    });
  });
});

/* ---------- Modal ---------- */
const modal = document.getElementById("modal");
function openGown(g) {
  modal.querySelector(".modal__art").innerHTML = photoTag(g);
  modal.querySelector(".modal__tag").textContent = CATEGORY_LABEL[g.category];
  modal.querySelector(".modal__name").textContent = g.name;
  modal.querySelector(".modal__desc").textContent = g.desc;
  modal.querySelector(".modal__meta").innerHTML = `
    <dt>Fabric</dt><dd>${g.fabric}</dd>
    <dt>Length</dt><dd>${g.length}</dd>
    <dt>Sizing</dt><dd>Fitted to you at the atelier</dd>
    <dt>Rental</dt><dd>3 days, cleaning included</dd>`;
  modal.querySelector(".modal__price").textContent = `Rent from ${CURRENCY}${g.price}`;
  modal.querySelector(".modal__book").onclick = () => {
    select.value = g.name;
    modal.close();
  };
  modal.showModal();
}
modal.querySelector(".modal__close").addEventListener("click", () => modal.close());
modal.addEventListener("click", (e) => { if (e.target === modal) modal.close(); });

/* ---------- Nav ---------- */
const nav = document.querySelector(".nav");
const toggle = document.querySelector(".nav__toggle");
const mobile = document.querySelector(".nav__mobile");
window.addEventListener("scroll", () => nav.classList.toggle("is-scrolled", window.scrollY > 10), { passive: true });
toggle.addEventListener("click", () => {
  const open = toggle.getAttribute("aria-expanded") === "true";
  toggle.setAttribute("aria-expanded", String(!open));
  mobile.hidden = open;
});
mobile.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => {
  toggle.setAttribute("aria-expanded", "false");
  mobile.hidden = true;
}));

/* ---------- Reveal on scroll ---------- */
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

/* ---------- Form ---------- */
const form = document.getElementById("form");
const dateInput = form.querySelector('input[type="date"]');
dateInput.min = new Date().toISOString().split("T")[0];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let ok = true;
  form.querySelectorAll("[required]").forEach((field) => {
    const valid = field.value.trim() && field.checkValidity();
    field.classList.toggle("is-invalid", !valid);
    if (!valid) ok = false;
  });
  if (!ok) return;
  // NOTE: Not connected to a backend yet. Hook this up to Formspree, Netlify Forms,
  // Google Forms or an email service to actually receive bookings.
  form.querySelectorAll("label, .form__row, button").forEach((el) => (el.style.display = "none"));
  form.querySelector(".form__success").hidden = false;
});

document.getElementById("year").textContent = new Date().getFullYear();
