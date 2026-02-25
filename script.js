document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("img[data-fallback]").forEach((img) => {
    const fallback = img.getAttribute("data-fallback");
    const local = img.getAttribute("src");
    const onErr = function () {
      if (fallback && img.src !== fallback) {
        img.src = fallback;
      }
      img.removeEventListener("error", onErr);
    };
    img.addEventListener("error", onErr);
    void local;
  });

  const reveal = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("in-view");
          io.unobserve(e.target);
        }
      }
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
  );
  reveal.forEach((el) => io.observe(el));
});
