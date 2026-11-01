/* ==========================================================================
   DESIGN SHINOBI — PORTFOLIO SCRIPT
   Uses the image filenames already in the GitHub images folder.
   ========================================================================== */

const PROJECT_FILES = [
  "@design_shinobi5_20260804_104642_0000.png",
  "@design_shinobi5_20260804_105223_0000.png",
  "brand-dequenchers-social-01.png",
  "brand-sellify-introduction-.png",
  "brand-unilink-waitlist-01.png",
  "branding-fma-initiative-logo-01.png",
  "branding-icf26-logo-01.png",
  "branding-lightyear-solutions-logo-01.png",
  "branding-spaceclub-mission-badge-01.png",
  "editorial-altitude-magazine-01.png",
  "educational-aeczs-microsoft-linkedin-01.jpg",
  "educational-burhan-equal-q-01.png",
  "educational-burhan-free-tutorials-01.png",
  "educational-designshinobi-colour-combos-01.png",
  "educational-designshinobi-dos-donts-01.png",
  "educational-designshinobi-premium-fonts-01.png",
  "event-30-days-design-challenge-01.png",
  "event-ace-political-apath.png",
  "event-ace-political-apathy.jpg",
  "event-acs-industrial-visit-lasued-01.png",
  "event-icf26-coming-soon-01.png",
  "event-ieee-creative-bootcamp-01.png",
  "event-ieee-event-01.png",
  "event-ieee-meet-executives-01.png",
  "event-lagossolidworks-design-challenge-02.png",
  "event-lagossolidworks-event-01.png",
  "event-lagossolidworks-final-submission-0.png",
  "event-lagossolidworks-final-submission-01.png",
  "event-lagossolidworks-installation-drive-01.png",
  "event-lagossolidworks-launch-workshop-01.jpg",
  "event-lagossolidworks-recruiting-01.png",
  "event-lagossolidworks-recruiting-02.jpg",
  "event-nas-satellite-subsystem-01.png",
  "event-nas-webinar-01.png",
  "event-nimsa-com-speakers-0.png",
  "event-nimsa-com-suicide-webinar-01-01.png",
  "event-reigning-mini-webinar-01.jpg",
  "event-rotaract-convocation-01.png",
  "event-rotaract-ecology-of-peace-01.png",
  "event-rotaract-freshers-01.png",
  "event-rotaract-october-fest-01.png",
  "event-rotaract-purpose-driven-01.png",
  "event-waterarts-joint-fellowship-01.jpg",
  "membership-ece-community-members-01.jpg",
  "membership-ece-community-members-01.png",
  "membership-rotaract-call-0.png",
  "membership-rotaract-spotlight-01.png",
  "membership-rotaract-volunteers-01.png",
  "membership-waterclub-publicity-content-01.jpg",
  "social-aws-womens-day-01.png",
  "social-designshinobi-hello-monday-01.png",
  "social-designshinobi-just-start-01.png",
  "social-nas-did-you-know-01.png",
  "social-nieee-birthday-01.png",
  "social-nieee-engineering-day-01.jpg",
  "social-nimsa-earth-day-01.png",
  "social-nimsa-malaria-day-01.png",
  "social-nimsa-menstrual-hygiene-day-01.png",
  "social-nimsa-nurses-day-01.png",
  "social-rotaract-birthday-01.png",
  "social-rotaract-new-month-01.png",
  "social-toakid-idm-back-01.png",
  "web-brand-landing-page-0.jpg",
  "web-brand-landing-page-01.jpg"
];

/* PROJECT CATEGORIES */

function getCategory(filename) {
  if (
    filename.startsWith("branding-") ||
    filename.startsWith("brand-")
  ) return "Branding";

  if (filename.startsWith("social-")) {
    return "Social Media";
  }

  if (filename.startsWith("event-")) {
    return "Events & Campaigns";
  }

  if (filename.startsWith("educational-")) {
    return "Educational";
  }

  if (filename.startsWith("editorial-")) {
    return "Editorial & Creative";
  }

  if (filename.startsWith("membership-")) {
    return "Community & Membership";
  }

  if (filename.startsWith("web-")) {
    return "Web & Digital";
  }

  return "Selected Work";
}

/* CREATE READABLE PROJECT TITLES */

function readableTitle(filename) {
  return filename
    .replace(/\.[^.]+$/, "")
    .replace(/^@/, "")
    .replace(/-\d+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, letter => letter.toUpperCase());
}

/* BUILD PROJECT DATA */

const PROJECTS = PROJECT_FILES.map(filename => {
  const category = getCategory(filename);

  return {
    image: `images/${encodeURIComponent(filename)}`,
    alt: `${category} graphic design project`,
    title: readableTitle(filename),
    description: category,
    role: "Graphic Designer",
    tools: ["PixelLab", "Canva"],
    category: category
  };
});

/* FEEDBACK IMAGES */

const FEEDBACK = [
  "Screenshot_20261007-013858_1.jpg",
  "Screenshot_20261007-014254_1.jpg",
  "Screenshot_20261007-014319_1.jpg",
  "Screenshot_20261007-014817_1.jpg",
  "Screenshot_20261007-015114_1.jpg",
  "Screenshot_20261007-015215_1.jpg",
  "Screenshot_20261007-015220_1.jpg",
  "Screenshot_20261007-015407_1.jpg"
].map(filename => ({
  image: `images/${filename}`,
  title: "Client Feedback",
  role: "Design Feedback"
}));

/* HTML ELEMENT HELPER */

const gallery = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");

const lbImg = document.getElementById("lightbox-img");
const lbTitle = document.getElementById("lightbox-title");
const lbRole = document.getElementById("lightbox-role");

function el(tag, className, text) {
  const node = document.createElement(tag);

  if (className) node.className = className;

  if (text !== undefined && text !== null) {
    node.textContent = text;
  }

  return node;
}

/* IMAGE ERROR PLACEHOLDER */

function buildPlaceholder(path) {
  const box = el("div", "project-placeholder");

  box.append(
    el("span", null, "Image unavailable"),
    el("code", null, path)
  );

  return box;
}

/* PROJECT INFORMATION */

function metaRow(label, content) {
  const row = el("div");
  const dd = el("dd");

  dd.append(content);

  row.append(
    el("dt", null, label),
    dd
  );

  return row;
}

/* LIGHTBOX */

function openLightbox(item, img) {
  if (!lightbox || typeof lightbox.showModal !== "function") {
    return;
  }

  if (!lbImg || !lbTitle || !lbRole) {
    return;
  }

  lbImg.src = img.currentSrc || img.src;
  lbImg.alt = img.alt || item.title || "";

  lbTitle.textContent = item.title || "";
  lbRole.textContent = item.role || "";

  lightbox.showModal();
}

/* BUILD PROJECT CARD */

function buildProject(project) {
  const card = el("figure", "project");

  const media = el("button", "project-media");
  media.type = "button";

  media.setAttribute(
    "aria-label",
    `View larger: ${project.title}`
  );

  const img = el("img");

  img.alt = project.alt || project.title;
  img.loading = "lazy";
  img.decoding = "async";

  img.addEventListener("load", () => {
    img.classList.add("is-ready");
  });

  img.addEventListener("error", () => {
    media.replaceChildren(
      buildPlaceholder(project.image)
    );

    media.classList.add("is-empty");
    media.disabled = true;
    media.removeAttribute("aria-label");
  });

  img.src = project.image;

  media.append(img);

  media.addEventListener("click", () => {
    openLightbox(project, img);
  });

  const body = el("figcaption", "project-body");

  body.append(
    el("p", "project-category-label", project.category),
    el("h3", null, project.title),
    el("p", null, project.description)
  );

  const meta = el("dl", "project-meta");

  meta.append(
    metaRow(
      "Role",
      document.createTextNode(project.role || "")
    )
  );

  const toolList = el("ul", "tools");

  (project.tools || []).forEach(tool => {
    toolList.append(
      el("li", null, tool)
    );
  });

  meta.append(
    metaRow("Tools", toolList)
  );

  body.append(meta);

  card.append(media, body);

  return card;
}

/* DISPLAY PROJECTS */

if (gallery) {
  if (PROJECTS.length === 0) {
    gallery.replaceWith(
      el("p", "note", "Projects will appear here soon.")
    );
  } else {
    PROJECTS.forEach(project => {
      gallery.append(
        buildProject(project)
      );
    });
  }
}

/* FEEDBACK IMAGE VIEWER */

document.querySelectorAll(".testimonial").forEach(
  (button, index) => {
    const image = button.querySelector("img");

    if (!image) return;

    button.setAttribute(
      "aria-label",
      `View feedback ${index + 1} larger`
    );

    button.addEventListener("click", () => {
      const feedback = FEEDBACK[index];

      if (feedback) {
        openLightbox(feedback, image);
      }
    });
  }
);

/* LIGHTBOX CONTROLS */

if (lightbox) {
  const closeButton = lightbox.querySelector(
    ".lightbox-close"
  );

  if (closeButton) {
    closeButton.addEventListener("click", () => {
      lightbox.close();
    });
  }

  lightbox.addEventListener("click", event => {
    if (event.target === lightbox) {
      lightbox.close();
    }
  });

  lightbox.addEventListener("close", () => {
    if (lbImg) lbImg.removeAttribute("src");
    if (lbTitle) lbTitle.textContent = "";
    if (lbRole) lbRole.textContent = "";
  });
}

/* MOBILE NAVIGATION */

const navToggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("site-nav");

function setNav(open) {
  if (!nav || !navToggle) return;

  nav.classList.toggle("open", open);

  navToggle.setAttribute(
    "aria-expanded",
    String(open)
  );
}

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    setNav(
      navToggle.getAttribute("aria-expanded") !== "true"
    );
  });

  nav.addEventListener("click", event => {
    if (event.target.closest("a")) {
      setNav(false);
    }
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      setNav(false);
    }
  });
}

/* FOOTER YEAR */

const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
   }
