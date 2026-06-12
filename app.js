/* Mercado da Copa — shared frontend logic */
(function () {
  "use strict";

  /* ---------- Storage helpers ---------- */
  const KEY = "mdc:state:v1";
  const state = Object.assign(
    { cart: 3, user: null, favorites: [] },
    JSON.parse(localStorage.getItem(KEY) || "{}")
  );
  const save = () => localStorage.setItem(KEY, JSON.stringify(state));

  /* ---------- Cart badge on bottom-nav cart icon ---------- */
  function paintCartBadge() {
    document.querySelectorAll('a[href="carrinho.html"]').forEach((a) => {
      const icon = a.querySelector(".material-symbols-outlined");
      if (!icon || icon.textContent.trim() !== "shopping_cart") return;
      if (a.querySelector(".mdc-badge")) return;
      const b = document.createElement("span");
      b.className =
        "mdc-badge absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-tertiary text-white text-[10px] font-bold flex items-center justify-center";
      b.textContent = state.cart;
      icon.parentElement.style.position = "relative";
      icon.parentElement.appendChild(b);
    });
  }

  /* ---------- Make product cards on home clickable ---------- */
  function wireHomeCards() {
    if (!/telaprincipal\.html$|\/$/.test(location.pathname) &&
        !document.title.toLowerCase().includes("home")) return;
    document
      .querySelectorAll("main section.grid > div")
      .forEach((card) => {
        card.style.cursor = "pointer";
        card.addEventListener("click", () => {
          location.href = "detalhesproduto.html";
        });
      });
  }

  /* ---------- Login persistence ---------- */
  function wireLogin() {
    const form = document.querySelector('form[action="telaprincipal.html"]');
    if (!form) return;
    form.addEventListener("submit", () => {
      const email = form.querySelector('input[type="text"]')?.value || "colecionador";
      state.user = { email, name: email.split("@")[0] };
      save();
    });
  }

  /* ---------- Mark active bottom-nav item ---------- */
  function markActiveNav() {
    const here = location.pathname.split("/").pop() || "telaprincipal.html";
    document.querySelectorAll("nav a[href]").forEach((a) => {
      const h = a.getAttribute("href");
      if (h === here) {
        a.classList.add("bg-primary-container", "text-on-primary-container", "rounded-xl");
        const ic = a.querySelector(".material-symbols-outlined");
        if (ic) ic.style.fontVariationSettings = "'FILL' 1";
      }
    });
  }

  /* ---------- Quantity steppers on cart ---------- */
  function wireQtySteppers() {
    document.querySelectorAll(".active-state, .tactile-active").forEach(() => {});
    document.querySelectorAll("button").forEach((btn) => {
      const t = btn.textContent.trim();
      if (t !== "-" && t !== "+") return;
      btn.addEventListener("click", () => {
        const wrap = btn.parentElement;
        const span = wrap.querySelector("span, input");
        if (!span) return;
        let n = parseInt(span.textContent || span.value || "1", 10) || 1;
        n = Math.max(1, n + (t === "+" ? 1 : -1));
        if (span.tagName === "INPUT") span.value = n;
        else span.textContent = n;
      });
    });
  }

  /* ---------- Toast ---------- */
  window.mdcToast = function (msg) {
    const el = document.createElement("div");
    el.className =
      "fixed left-1/2 -translate-x-1/2 bottom-28 z-[100] bg-primary text-on-primary px-5 py-3 rounded-lg shadow-lg text-sm font-bold animate-pulse";
    el.textContent = msg;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1800);
  };

  /* ---------- Init ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    paintCartBadge();
    wireHomeCards();
    wireLogin();
    markActiveNav();
    wireQtySteppers();
  });
})();
