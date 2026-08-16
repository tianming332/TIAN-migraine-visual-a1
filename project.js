(function () {
  "use strict";
  var dialog = document.getElementById("lightbox");
  var image = document.getElementById("lightboxImage");
  document.querySelectorAll("[data-lightbox]").forEach(function (button) {
    button.addEventListener("click", function () { image.src = button.dataset.lightbox; dialog.showModal(); });
  });
  document.getElementById("closeLightbox").addEventListener("click", function () { dialog.close(); });
  dialog.addEventListener("click", function (event) { if (event.target === dialog) dialog.close(); });
  function updateProgress() {
    var max = document.documentElement.scrollHeight - innerHeight;
    var progress = max > 0 ? scrollY / max : 0;
    var bar = document.getElementById("progressBar");
    if (bar) bar.style.transform = "scaleX(" + progress + ")";
  }
  updateProgress(); addEventListener("scroll", updateProgress, { passive: true });

  // A1 in-page chapter navigation
  var sectionLinks = Array.prototype.slice.call(document.querySelectorAll("[data-section-link]"));
  var projectSections = Array.prototype.slice.call(document.querySelectorAll("[data-project-section]"));
  function setActiveSection(id) {
    sectionLinks.forEach(function (link) {
      var active = link.dataset.sectionLink === id;
      link.classList.toggle("active", active);
      if (active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }
  if (sectionLinks.length && projectSections.length) {
    setActiveSection(projectSections[0].id);
    if ("IntersectionObserver" in window) {
      var sectionObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      }, { rootMargin: "-24% 0px -62% 0px", threshold: 0 });
      projectSections.forEach(function (section) { sectionObserver.observe(section); });
    }
  }
}());
