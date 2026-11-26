/* =========================================================
   STORE LINKS — edit these two lines only.
   - play: your Google Play listing URL.
   - appStore: leave empty until the iOS app is live; paste the
     App Store URL here and every "Coming soon" button on the
     site turns into a real "Download on the App Store" button.
   ========================================================= */
var STORE_LINKS = {
  play: "https://play.google.com/store/apps/details?id=com.najeebkhan.docfinder",
  appStore: ""
};

(function () {
  // Store links
  document.querySelectorAll('[data-store="play"]').forEach(function (a) {
    if (STORE_LINKS.play) a.href = STORE_LINKS.play;
  });
  if (STORE_LINKS.appStore) {
    document.querySelectorAll('[data-store="ios"]').forEach(function (a) {
      a.href = STORE_LINKS.appStore;
      a.target = "_blank";
      a.rel = "noopener";
      a.classList.remove("soon");
      a.setAttribute("aria-label", "Download DocFinder on the App Store");
      var small = a.querySelector("small");
      if (small) small.textContent = "Download on the";
      var tag = a.querySelector(".tag");
      if (tag) tag.remove();
    });
    document.querySelectorAll("[data-ios-badge]").forEach(function (b) {
      b.textContent = "Available now";
      b.className = "badge live";
    });
    var eyebrow = document.querySelector(".eyebrow");
    if (eyebrow) eyebrow.lastChild.textContent = " Now on Android & iPhone";
  }

  // Year
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Header border on scroll
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () { header.classList.toggle("scrolled", window.scrollY > 8); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // Theme toggle
  var root = document.documentElement;
  var toggle = document.querySelector(".theme-toggle");
  var mq = window.matchMedia("(prefers-color-scheme: dark)");
  function isDark() {
    var t = root.getAttribute("data-theme");
    return t ? t === "dark" : mq.matches;
  }
  function syncIcon() {
    if (!toggle) return;
    var use = toggle.querySelector("use");
    if (use) use.setAttribute("href", isDark() ? "#i-sun" : "#i-moon");
    toggle.setAttribute("aria-label", isDark() ? "Switch to light mode" : "Switch to dark mode");
  }
  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = isDark() ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
      syncIcon();
    });
    if (mq.addEventListener) mq.addEventListener("change", syncIcon);
    syncIcon();
  }

  // Reveal on scroll
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var items = document.querySelectorAll(".reveal");
  if (reduce || !("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  }

  // Hero phone: cycle through example searches
  var q = document.getElementById("mock-query");
  if (!q || reduce) return;
  var el = {
    hit: document.getElementById("mock-hit"),
    title: document.getElementById("mock-title"),
    cat: document.getElementById("mock-cat"),
    why: document.getElementById("mock-why"),
    thumb: document.getElementById("mock-thumb"),
    icon: document.querySelector("#mock-icon use")
  };
  var demos = [
    { q: "35202 1234567 1", title: "National ID card", cat: "Identity & Civil · Photo", why: "National ID 35202-1234567-1", color: "#0f766e", icon: "#i-id" },
    { q: "1234567", title: "National ID card", cat: "Identity & Civil · Photo", why: "National ID 35202-1234567-1", color: "#0f766e", icon: "#i-id" },
    { q: "PK36 SCBL", title: "Bank statement", cat: "Money & Bills · PDF", why: "IBAN PK36 SCBL 0000 0011 2345 6702", color: "#2563eb", icon: "#i-wallet" },
    { q: "passport sara", title: "Passport", cat: "Identity & Civil · Photo", why: "Name SARA AHMED", color: "#0f766e", icon: "#i-id" },
    { q: "lab report 2026", title: "Blood test results", cat: "Health · PDF", why: "Lab Report · 12 Feb 2026", color: "#dc2626", icon: "#i-heart" }
  ];
  var i = 0;

  function type(text, done) {
    var n = 0;
    q.textContent = "";
    (function step() {
      q.textContent = text.slice(0, n);
      if (n++ < text.length) setTimeout(step, 70 + Math.random() * 60);
      else done();
    })();
  }

  function show(d) {
    el.title.textContent = d.title;
    el.cat.textContent = d.cat;
    el.why.textContent = d.why;
    el.thumb.style.background = d.color;
    el.icon.setAttribute("href", d.icon);
    el.hit.style.opacity = "1";
    el.hit.style.transform = "none";
  }

  function loop() {
    var d = demos[i % demos.length];
    el.hit.style.opacity = "0";
    el.hit.style.transform = "translateY(6px)";
    type(d.q, function () {
      setTimeout(function () { show(d); }, 250);
      setTimeout(function () { i++; loop(); }, 3200);
    });
  }
  setTimeout(function () { i = 1; loop(); }, 3000);
})();
