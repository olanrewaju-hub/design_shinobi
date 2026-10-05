/* ==========================================================================
   Design Shinobi: script.js

   1. PROJECTS  <- the only part you need to edit to add portfolio work
   2. Gallery rendering
   3. Image viewer (lightbox)
   4. Mobile navigation
   5. Footer year
   ========================================================================== */


/* 1. PROJECTS ---------------------------------------------------------------
   Put your images in:  images/graphic-design/
   Then add one block per project below. Copy a block, paste it after the last
   one (keep the comma between blocks), and change the values.

   Fields
     image        path to the image, e.g. "images/graphic-design/my-flyer.jpg"
     alt          short description of the image for screen readers
     title        project name
     description  one or two sentences
     role         what you did on the project
     tools        list of tools you used
     width/height OPTIONAL: the image's pixel size. Stops the page from
                  jumping while images load.

   The three blocks below are EMPTY TEMPLATES. Their image files don't exist
   yet, so the page shows a dashed placeholder showing the expected filename.
   Replace them with your real projects, or delete them.
--------------------------------------------------------------------------- */
const PROJECTS = [
  {
    image: "images/graphic-design/project-01.jpg",
    alt: "Describe what this flyer shows",
    title: "Your first project title",
    description: "One or two sentences about the project and what it was for.",
    role: "Your role on this project",
    tools: ["Tool one", "Tool two"]
  },
  {
    image: "images/graphic-design/project-02.jpg",
    alt: "Describe what this flyer shows",
    title: "Your second project title",
    description: "One or two sentences about the project and what it was for.",
    role: "Your role on this project",
    tools: ["Tool one", "Tool two"]
  },
  {
    image: "images/graphic-design/project-03.jpg",
    alt: "Describe what this flyer shows",
    title: "Your third project title",
    description: "One or two sentences about the project and what it was for.",
    role: "Your role on this project",
    tools: ["Tool one", "Tool two"]
  }
];


/* ==========================================================================
   Everything below this line is the machinery. You shouldn't need to edit it.
   ========================================================================== */

/* Small helper: create an element with optional class and text. */
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined && text !== null) node.textContent = text;
  return node;
}


/* 2. GALLERY RENDERING ---------------------------------------------------- */
const gallery = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lightbox-img");
const lbTitle = document.getElementById("lightbox-title");
const lbRole = document.getElementById("lightbox-role");

function buildPlaceholder(path) {
  const box = el("div", "project-placeholder");
  box.append(el("span", null, "Image goes here"), el("code", null, path));
  return box;
}

function metaRow(label, content) {
  const row = el("div");
  const dd = el("dd");
  dd.append(content);
  row.append(el("dt", null, label), dd);
  return row;
}

function buildProject(project) {
  const card = el("figure", "project");

  // Image (a button, so keyboard users can open the viewer too)
  const media = el("button", "project-media");
  media.type = "button";
  media.setAttribute("aria-label", "View larger: " + project.title);

  const img = el("img");
  img.alt = project.alt || project.title;
  img.loading = "lazy";
  img.decoding = "async";
  if (project.width && project.height) {
    img.width = project.width;
    img.height = project.height;
  }
  img.addEventListener("load", () => img.classList.add("is-ready"));
  img.addEventListener("error", () => {
    media.replaceChildren(buildPlaceholder(project.image));
    media.classList.add("is-empty");
    media.disabled = true;
    media.removeAttribute("aria-label");
  });
  img.src = project.image;
  media.append(img);
  media.addEventListener("click", () => openLightbox(project, img));

  // Text
  const body = el("figcaption", "project-body");
  body.append(el("h3", null, project.title), el("p", null, project.description));

  const meta = el("dl", "project-meta");
  meta.append(metaRow("Role", document.createTextNode(project.role || "")));

  const toolList = el("ul", "tools");
  [].concat(project.tools || []).forEach((tool) => toolList.append(el("li", null, tool)));
  meta.append(metaRow("Tools", toolList));

  body.append(meta);
  card.append(media, body);
  return card;
}

if (gallery) {
  if (PROJECTS.length === 0) {
    gallery.replaceWith(el("p", "note", "Projects will appear here soon."));
  } else {
    PROJECTS.forEach((project) => gallery.append(buildProject(project)));
  }
}


/* 3. IMAGE VIEWER --------------------------------------------------------- */
function openLightbox(project, img) {
  if (!lightbox || typeof lightbox.showModal !== "function") return;
  lbImg.src = img.currentSrc || img.src;
  lbImg.alt = img.alt;
  lbTitle.textContent = project.title;
  lbRole.textContent = project.role || "";
  lightbox.showModal();
}

if (lightbox) {
  // Close button
  lightbox.querySelector(".lightbox-close").addEventListener("click", () => lightbox.close());
  // Click on the dark backdrop
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) lightbox.close();
  });
  // Free the image when closed (Esc also closes it natively)
  lightbox.addEventListener("close", () => lbImg.removeAttribute("src"));
}


/* 4. MOBILE NAVIGATION ---------------------------------------------------- */
const navToggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("site-nav");

function setNav(open) {
  nav.classList.toggle("open", open);
  navToggle.setAttribute("aria-expanded", String(open));
}

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    setNav(navToggle.getAttribute("aria-expanded") !== "true");
  });
  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) setNav(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setNav(false);
  });
}


/* 5. FOOTER YEAR ---------------------------------------------------------- */
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
