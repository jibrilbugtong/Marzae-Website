/* =========================================================
   MARZÉ — interactions & gown catalogue
   Edit the GOWNS list below to change the collection.
   To use real photos, add  photo: "assets/your-photo.jpg"  to a gown.
   ========================================================= */

const CURRENCY = "$";

const GOWNS = [
  {
    id: "versailles", name: "Versailles", tag: "Rose brocade ball gown", category: "ball",
    price: 180, badge: "Most Loved",
    colors: { base: "#f2b8c2", shade: "#d98d9c", light: "#fde3e7", trim: "#e8d3a6", bow: "#c09a5f" },
    sleeves: "puff", length: "long", tiers: 3, skirtBows: true,
    fabric: "Silk taffeta with gold brocade trim", sizes: "XS – L", desc: "Our signature gown. A corseted sweetheart bodice, puffed sleeves and a skirt that moves like candlelight through a hall of mirrors."
  },
  {
    id: "trianon", name: "Petit Trianon", tag: "Ribboned cocktail dress", category: "cocktail",
    price: 95,
    colors: { base: "#f7cfd6", shade: "#e3a6b1", light: "#fff0f2", trim: "#ffffff", bow: "#c4838b" },
    sleeves: "puff", length: "short", tiers: 2, skirtBows: true,
    fabric: "Satin with tulle underlay", sizes: "XS – M", desc: "Sweet, short and dotted with satin bows — made for garden soirées and birthday dinners."
  },
  {
    id: "duchesse", name: "Duchesse", tag: "Ivory Chantilly lace gown", category: "bridal",
    price: 240, badge: "New",
    colors: { base: "#fbf3ea", shade: "#e4d3c0", light: "#ffffff", trim: "#e8d3a6", bow: "#e8d3a6" },
    sleeves: "off", length: "long", tiers: 4, skirtBows: false,
    fabric: "Chantilly lace over duchess satin", sizes: "XS – XL", desc: "Off-shoulder lace, hand-finished scallops and a cathedral-worthy skirt. For brides, civil ceremonies and pre-nup shoots."
  },
  {
    id: "bonbon", name: "Bonbon", tag: "Tiered tulle débutante gown", category: "debut",
    price: 210,
    colors: { base: "#f8c6d3", shade: "#e89aae", light: "#ffe6ee", trim: "#ffffff", bow: "#ffffff" },
    sleeves: "off", length: "long", tiers: 5, skirtBows: true,
    fabric: "Layered soft tulle", sizes: "XS – L", desc: "Five tiers of spun-sugar tulle. Your eighteenth, your entrance, your cotillion — sorted."
  },
  {
    id: "marie", name: "Marie", tag: "Powder blue court gown", category: "ball",
    price: 220,
    colors: { base: "#c9dcec", shade: "#98b6d0", light: "#eef5fb", trim: "#ffffff", bow: "#f2b8c2" },
    sleeves: "puff", length: "long", tiers: 3, skirtBows: true,
    fabric: "Silk faille with pink ribbon rosettes", sizes: "S – L", desc: "Powder blue silk scattered with blush bows, straight from a queen's wardrobe."
  },
  {
    id: "madeleine", name: "Madeleine", tag: "Champagne corset mini", category: "cocktail",
    price: 110,
    colors: { base: "#efdcc1", shade: "#d2b58c", light: "#fbf1e2", trim: "#ffffff", bow: "#c09a5f" },
    sleeves: "strap", length: "short", tiers: 1, skirtBows: false,
    fabric: "Satin corset with lace hem", sizes: "XS – M", desc: "A boned champagne corset and a softly flared skirt, edged in delicate lace."
  },
  {
    id: "bordeaux", name: "Nocturne", tag: "Bordeaux velvet gown", category: "ball",
    price: 230,
    colors: { base: "#7d2b3e", shade: "#561827", light: "#a84a5f", trim: "#e8d3a6", bow: "#e8d3a6" },
    sleeves: "off", length: "long", tiers: 2, skirtBows: false,
    fabric: "Silk velvet with gold lace", sizes: "XS – L", desc: "Deep bordeaux velvet with gilded lace — for winter balls and evenings lit by chandeliers."
  },
  {
    id: "fleur", name: "Fleur de Lys", tag: "Blush-ivory débutante gown", category: "debut",
    price: 200,
    colors: { base: "#fbe6e4", shade: "#ecc2c0", light: "#ffffff", trim: "#f2b8c2", bow: "#f2b8c2" },
    sleeves: "puff", length: "long", tiers: 4, skirtBows: true,
    fabric: "Organza with embroidered lace", sizes: "XS – L", desc: "Blush-kissed ivory organza, embroidered lace and tiny bows trailing down the skirt."
  },
];

const CATEGORY_LABEL = { ball: "Ball Gown", cocktail: "Cocktail", bridal: "Bridal & White", debut: "Débutante" };

/* ---------- Gown illustration (SVG) ---------- */
function gownSVG(g, uid) {
  const c = g.colors;
  const long = g.length === "long";
  const waistY = 112;
  const hemY = long ? 290 : 205;
  const hemHW = long ? 80 : 58;
  const hw = (y) => 16 + (hemHW - 16) * Math.pow((y - waistY) / (hemY - waistY), 0.9);
  const gid = `sat-${uid}`;

  const skirt = long
    ? `M84 ${waistY} C70 170 40 230 ${100 - hemHW} ${hemY} Q100 ${hemY + 12} ${100 + hemHW} ${hemY} C160 230 130 170 116 ${waistY} Z`
    : `M84 ${waistY} C72 140 52 175 ${100 - hemHW} ${hemY} Q100 ${hemY + 11} ${100 + hemHW} ${hemY} C148 175 128 140 116 ${waistY} Z`;

  // Ruffle tiers
  let tiers = "";
  for (let i = 1; i <= g.tiers; i++) {
    const y = waistY + ((hemY - waistY) * i) / (g.tiers + 1);
    const w = hw(y);
    const n = Math.max(4, Math.round(w / 7));
    const step = (w * 2) / n;
    let d = `M${100 - w} ${y}`;
    for (let k = 0; k < n; k++) {
      const x = 100 - w + step * (k + 1);
      d += ` Q${x - step / 2} ${y + 7} ${x} ${y}`;
    }
    tiers += `<path d="${d}" fill="none" stroke="${c.shade}" stroke-width="1.4" opacity=".9"/>`;
    // tiny lace dots under each tier
    for (let k = 0; k < n; k++) {
      const x = 100 - w + step * (k + 0.5);
      tiers += `<circle cx="${x.toFixed(1)}" cy="${(y + 6).toFixed(1)}" r="1" fill="${c.trim}" opacity=".9"/>`;
    }
  }

  // Lace hem scallops
  let hem = "";
  const hn = Math.round(hemHW / 5);
  const hs = (hemHW * 2) / hn;
  for (let k = 0; k < hn; k++) {
    const x = 100 - hemHW + hs * (k + 0.5);
    const t = (x - 100) / hemHW;
    const y = hemY + 6 * (1 - t * t) + 1;
    hem += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(hs / 2).toFixed(1)}" fill="${c.trim}"/>`;
    hem += `<circle cx="${x.toFixed(1)}" cy="${(y + 0.6).toFixed(1)}" r="1" fill="${c.shade}" opacity=".6"/>`;
  }

  // Sleeves
  let sleeves = "";
  if (g.sleeves === "puff") {
    sleeves = `
      <ellipse cx="73" cy="54" rx="14" ry="11" fill="url(#${gid})" stroke="${c.shade}" stroke-width="1"/>
      <ellipse cx="127" cy="54" rx="14" ry="11" fill="url(#${gid})" stroke="${c.shade}" stroke-width="1"/>
      <path d="M62 60 q11 6 22 0 M116 60 q11 6 22 0" fill="none" stroke="${c.trim}" stroke-width="2.2" stroke-dasharray="1 2.4" stroke-linecap="round"/>`;
  } else if (g.sleeves === "off") {
    sleeves = `
      <path d="M58 56 Q80 48 84 54 L84 62 Q74 58 60 66 Z" fill="url(#${gid})" stroke="${c.shade}" stroke-width="1"/>
      <path d="M142 56 Q120 48 116 54 L116 62 Q126 58 140 66 Z" fill="url(#${gid})" stroke="${c.shade}" stroke-width="1"/>`;
  } else if (g.sleeves === "strap") {
    sleeves = `<path d="M84 46 L86 28 M116 46 L114 28" stroke="${c.shade}" stroke-width="1.6"/>`;
  }

  // Bow shape helper
  const bow = (x, y, s, col) => `
    <g transform="translate(${x} ${y}) scale(${s})" fill="${col}" stroke="${c.shade}" stroke-width=".6">
      <path d="M0 0 C-8 -12 -26 -14 -28 -6 C-30 2 -16 8 0 2 Z"/>
      <path d="M0 0 C8 -12 26 -14 28 -6 C30 2 16 8 0 2 Z"/>
      <path d="M-3 2 L-12 22 L-6 20 L-3 24 L0 3 Z"/>
      <path d="M3 2 L12 22 L6 20 L3 24 L0 3 Z"/>
      <ellipse cx="0" cy="1" rx="4" ry="3.6"/>
    </g>`;

  let skirtBows = "";
  if (g.skirtBows) {
    const spots = long
      ? [[70, 175], [130, 175], [56, 240], [100, 222], [144, 240]]
      : [[80, 158], [120, 158], [100, 182]];
    skirtBows = spots.map(([x, y]) => bow(x, y, 0.32, c.bow)).join("");
  }

  // Neckline lace dots
  const neck = [[81, 46], [86, 43.5], [91, 43.5], [95.5, 46.5], [104.5, 46.5], [109, 43.5], [114, 43.5], [119, 46]]
    .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.2" fill="${c.trim}"/>`).join("");

  return `
  <svg viewBox="0 0 200 304" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${g.name} gown illustration">
    <defs>
      <linearGradient id="${gid}" x1="0" x2="1">
        <stop offset="0" stop-color="${c.shade}"/>
        <stop offset=".3" stop-color="${c.base}"/>
        <stop offset=".48" stop-color="${c.light}"/>
        <stop offset=".66" stop-color="${c.base}"/>
        <stop offset="1" stop-color="${c.shade}"/>
      </linearGradient>
    </defs>
    <!-- hanger -->
    <g fill="none" stroke="#c09a5f" stroke-width="2" stroke-linecap="round">
      <path d="M100 22 C100 14 106 12 106 7 C106 2 98 1 96 6"/>
      <path d="M100 22 L66 42 M100 22 L134 42"/>
    </g>
    <path d="${skirt}" fill="url(#${gid})" stroke="${c.shade}" stroke-width="1"/>
    ${tiers}
    ${hem}
    ${sleeves}
    <path d="M80 46 Q90 39 100 50 Q110 39 120 46 L116 ${waistY} Q100 ${waistY + 6} 84 ${waistY} Z" fill="url(#${gid})" stroke="${c.shade}" stroke-width="1"/>
    <path d="M90 50 L92 ${waistY + 2} M100 52 L100 ${waistY + 4} M110 50 L108 ${waistY + 2}" stroke="${c.shade}" stroke-width=".8" opacity=".55"/>
    <path d="M92 64 L108 64 M93 76 L107 76 M94 88 L106 88 M95 100 L105 100" stroke="${c.trim}" stroke-width="1" opacity=".8"/>
    ${neck}
    <path d="M84 ${waistY} Q100 ${waistY + 7} 116 ${waistY}" fill="none" stroke="${c.bow}" stroke-width="4"/>
    ${skirtBows}
    ${bow(100, waistY + 2, 0.62, c.bow)}
  </svg>`;
}

/* ---------- Render grid ---------- */
const grid = document.getElementById("grid");
const select = document.getElementById("gownSelect");

GOWNS.forEach((g, i) => {
  const card = document.createElement("button");
  card.className = "gown reveal";
  card.type = "button";
  card.dataset.category = g.category;
  card.style.setProperty("--card-bg", g.colors.light);
  card.innerHTML = `
    <div class="gown__frame" style="--card-bg:${g.colors.light}">
      ${g.badge ? `<span class="gown__badge">${g.badge}</span>` : ""}
      ${g.photo ? `<img src="${g.photo}" alt="${g.name}" style="position:relative;width:100%;height:100%;object-fit:cover">` : gownSVG(g, `c${i}`)}
    </div>
    <h3 class="gown__name">${g.name}</h3>
    <p class="gown__tag">${g.tag}</p>
    <p class="gown__price">Rent from ${CURRENCY}${g.price}</p>`;
  card.addEventListener("click", () => openGown(g, i));
  grid.appendChild(card);

  const opt = document.createElement("option");
  opt.value = g.name;
  opt.textContent = `${g.name} — ${g.tag}`;
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
function openGown(g, i) {
  modal.querySelector(".modal__art").style.setProperty("--card-bg", g.colors.light);
  modal.querySelector(".modal__art").innerHTML = g.photo
    ? `<img src="${g.photo}" alt="${g.name}" style="position:relative;width:100%;height:100%;object-fit:cover">`
    : gownSVG(g, `m${i}`);
  modal.querySelector(".modal__tag").textContent = CATEGORY_LABEL[g.category];
  modal.querySelector(".modal__name").textContent = g.name;
  modal.querySelector(".modal__desc").textContent = g.desc;
  modal.querySelector(".modal__meta").innerHTML = `
    <dt>Fabric</dt><dd>${g.fabric}</dd>
    <dt>Sizes</dt><dd>${g.sizes}</dd>
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
