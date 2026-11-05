const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");

if (menuButton && navigation) {
  const closeMenu = () => {
    menuButton.setAttribute("aria-expanded", "false");
    navigation.classList.remove("is-open");
  };

  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    navigation.classList.toggle("is-open", !isOpen);
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

document.querySelectorAll("[data-career-tab]").forEach((tab) => {
  tab.addEventListener("click", () => {
    const tabList = tab.closest('[role="tablist"]');
    const panelId = tab.getAttribute("data-career-tab");
    if (!tabList || !panelId) return;

    const panel = document.getElementById(panelId);
    if (!panel) return;

    tabList.querySelectorAll("[data-career-tab]").forEach((candidate) => {
      const isSelected = candidate === tab;
      candidate.setAttribute("aria-selected", String(isSelected));
      candidate.tabIndex = isSelected ? 0 : -1;
    });

    document.querySelectorAll("[data-career-panel]").forEach((candidate) => {
      candidate.hidden = candidate !== panel;
    });
  });
});

document.querySelectorAll("[data-demo-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const feedback = form.querySelector("[data-form-feedback]");
    if (feedback) {
      feedback.textContent = form.classList.contains("newsletter-form")
        ? "Thanks for subscribing! This demo form is ready to connect to your inbox."
        : "Thanks! This demo form is ready to connect to your inbox.";
      feedback.hidden = false;
    }
    form.reset();
  });
});

document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});
