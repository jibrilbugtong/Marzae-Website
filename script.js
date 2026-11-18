/* =========================================================
   MARZÉ — interactions & gown catalogue
   Edit the GOWNS list below to change the collection.
   Put dress photos in assets/gowns/ and point "photo" at them.
   ========================================================= */

const PRICE = "₱500";
const PERIOD = "3 days";

const GOWNS = [
  {
    id: "versailles", name: "Versailles", tag: "Tiered tulle ruffle gown", category: "gown",
    badge: "Most Loved", photo: "assets/gowns/versailles.jpg",
    fabric: "Shimmer tulle, ruched bodice, antique gold brooch", length: "Floor length",
    desc: "Cascading tiers of glittering tulle and a gilded brooch at the neckline. Made for grand entrances and long staircases."
  },
  {
    id: "duchesse", name: "Duchesse", tag: "Bordeaux satin strapless gown", category: "gown",
    photo: "assets/gowns/duchesse.jpg",
    fabric: "Heavy duchess satin with box pleats", length: "Tea length",
    desc: "A folded cuff neckline, a sculpted bodice and a full pleated skirt. Quiet, rich and impossibly elegant."
  },
  {
    id: "nocturne", name: "Nocturne", tag: "Sequin corset mermaid gown", category: "gown",
    badge: "New", photo: "assets/gowns/nocturne.jpg",
    fabric: "Sequined lace corset, draped liquid satin", length: "Floor length",
    desc: "A glittering corset bodice over a draped satin mermaid skirt with ribbon ties at the hips. For candlelit galas."
  },
  {
    id: "dentelle", name: "Dentelle", tag: "Rose lace corset mini", category: "mini",
    photo: "assets/gowns/dentelle.jpg",
    fabric: "Floral Chantilly-style lace over nude lining", length: "Mini",
    desc: "Boned rose lace with a basque waist and a full ruffled skirt. Our love letter to lace."
  },
  {
    id: "bijou", name: "Bijou", tag: "Velvet halter mini with crystal bow", category: "mini",
    photo: "assets/gowns/bijou.jpg",
    fabric: "Shimmer velvet with a crystal bow brooch", length: "Mini",
    desc: "Starlit velvet, a plunging halter and a crystal bow, finished with a double ruffle hem."
  },
  {
    id: "cascade", name: "Cascade", tag: "Draped satin strapless mini", category: "mini",
    photo: "assets/gowns/cascade.jpg",
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
    <p class="gown__price">${PRICE} · ${PERIOD}</p>`;
  card.addEventListener("click", () => openGown(g));
  grid.appendChild(card);

  const opt = document.createElement("option");
  opt.value = g.name;
  opt.textContent = `${g.name} (${g.tag})`;
  select.appendChild(opt);
});

/* ---------- Filters (cards fade out, the rest glide in) ---------- */
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
document.querySelectorAll(".filter").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    const f = btn.dataset.filter;
    const cards = [...grid.querySelectorAll(".gown")];
    cards.forEach((card) => card.classList.add("is-leaving"));
    setTimeout(() => {
      let n = 0;
      cards.forEach((card) => {
        const show = f === "all" || card.dataset.category === f;
        card.classList.remove("is-leaving", "pre", "is-entering");
        card.classList.toggle("is-hidden", !show);
        if (show) {
          card.style.animationDelay = `${n++ * 90}ms`;
          void card.offsetWidth; // restart the animation
          card.classList.add("is-entering");
        }
      });
    }, reduceMotion ? 0 : 280);
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
    <dt>Rental</dt><dd>${PRICE} for ${PERIOD}, cleaning included</dd>`;
  modal.querySelector(".modal__price").textContent = `${PRICE} for ${PERIOD}`;
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

/* ---------- Reveal on scroll ----------
   Only elements that start below the fold are hidden, so the first screen is
   always complete. Siblings in a grid get a small stagger. */
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) { const el = e.target;
      el.classList.remove("pre");
      el.classList.add("is-visible");
      io.unobserve(el);
      setTimeout(() => (el.style.transitionDelay = ""), 1500); // keep hovers snappy afterwards
    }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

document.querySelectorAll(".grid, .steps, .notes__grid").forEach((group) => {
  [...group.children].forEach((el, i) => (el.style.transitionDelay = `${(i % 3) * 120}ms`));
});
document.querySelectorAll(".reveal").forEach((el) => {
  if (!reduceMotion && el.getBoundingClientRect().top > window.innerHeight * 0.9) {
    el.classList.add("pre");
    io.observe(el);
  } else {
    el.classList.add("is-visible");
  }
});

/* ---------- Floating sparkles in the hero ---------- */
const sparkles = document.querySelector(".sparkles");
if (sparkles && !reduceMotion) {
  const glyphs = ["✦", "✧", "•", "♡", "✦"];
  for (let i = 0; i < 22; i++) {
    const s = document.createElement("span");
    s.textContent = glyphs[i % glyphs.length];
    const dur = 9 + Math.random() * 9;
    s.style.left = `${Math.random() * 100}%`;
    s.style.fontSize = `${8 + Math.random() * 12}px`;
    s.style.animationDuration = `${dur}s, ${2 + Math.random() * 2}s`;
    s.style.animationDelay = `${-Math.random() * dur}s, ${-Math.random() * 3}s`;
    s.style.setProperty("--drift", `${(Math.random() - 0.5) * 120}px`);
    if (i % 3 === 0) s.style.color = "var(--rose-deep)";
    sparkles.appendChild(s);
  }
}

/* ---------- Gentle parallax on the hero wallpaper ---------- */
const damask = document.querySelector(".hero__damask");
let ticking = false;
if (!reduceMotion) {
  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = Math.min(window.scrollY, 1200);
      damask.style.transform = `translate3d(0, ${y * 0.25}px, 0)`;
      ticking = false;
    });
  }, { passive: true });
}

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
