/* ==========================================================================
   Design Shinobi: script.js
   ========================================================================== */


/* 1. PROJECTS -------------------------------------------------------------- */

const PROJECTS = [
  {
    image: "images/1_20260324_083210_0000.png",
    alt: "Graphic design project",
    title: "Design Project 01",
    description: "A graphic design project created as part of my design work.",
    role: "Graphic Designer",
    tools: ["PixelLab", "Canva"]
  },

  {
    image: "images/20251115_210930.jpg",
    alt: "Graphic design project",
    title: "Design Project 02",
    description: "A graphic design project created as part of my design work.",
    role: "Graphic Designer",
    tools: ["PixelLab", "Canva"]
  },

  {
    image: "images/20260107_150217.jpg",
    alt: "Graphic design project",
    title: "Design Project 03",
    description: "A graphic design project created as part of my design work.",
    role: "Graphic Designer",
    tools: ["PixelLab", "Canva"]
  },

  {
    image: "images/20260131_173457.jpg",
    alt: "Graphic design project",
    title: "Design Project 04",
    description: "A graphic design project created as part of my design work.",
    role: "Graphic Designer",
    tools: ["PixelLab", "Canva"]
  },

  {
    image: "images/20260308_010149.png",
    alt: "Graphic design project",
    title: "Design Project 05",
    description: "A graphic design project created as part of my design work.",
    role: "Graphic Designer",
    tools: ["PixelLab", "Canva"]
  },

  {
    image: "images/20260415_093023.png",
    alt: "Graphic design project",
    title: "Design Project 06",
    description: "A graphic design project created as part of my design work.",
    role: "Graphic Designer",
    tools: ["PixelLab", "Canva"]
  },

  {
    image: "images/20260415_193912.png",
    alt: "Graphic design project",
    title: "Design Project 07",
    description: "A graphic design project created as part of my design work.",
    role: "Graphic Designer",
    tools: ["PixelLab", "Canva"]
  },

  {
    image: "images/Untitled (736 x 736 px)_20260620_172642_0000.png",
    alt: "Graphic design project",
    title: "Design Project 08",
    description: "A graphic design project created as part of my design work.",
    role: "Graphic Designer",
    tools: ["PixelLab", "Canva"]
  }
];


/* 2. FEEDBACK -------------------------------------------------------------- */

const FEEDBACK = [
  {
    image: "images/Screenshot_20261007-013858_1.jpg",
    title: "Client Feedback",
    role: "Design Feedback"
  },

  {
    image: "images/Screenshot_20261007-014254_1.jpg",
    title: "Client Feedback",
    role: "Design Feedback"
  },

  {
    image: "images/Screenshot_20261007-014319_1.jpg",
    title: "Client Feedback",
    role: "Design Feedback"
  },

  {
    image: "images/Screenshot_20261007-014817_1.jpg",
    title: "Client Feedback",
    role: "Design Feedback"
  },

  {
    image: "images/Screenshot_20261007-015114_1.jpg",
    title: "Client Feedback",
    role: "Design Feedback"
  },

  {
    image: "images/Screenshot_20261007-015215_1.jpg",
    title: "Client Feedback",
    role: "Design Feedback"
  },

  {
    image: "images/Screenshot_20261007-015220_1.jpg",
    title: "Client Feedback",
    role: "Design Feedback"
  },

  {
    image: "images/Screenshot_20261007-015407_1.jpg",
    title: "Client Feedback",
    role: "Design Feedback"
  }
];


/* 3. SHARED ELEMENTS ------------------------------------------------------- */

const gallery =
  document.getElementById("gallery");

const lightbox =
  document.getElementById("lightbox");

const lbImg =
  document.getElementById("lightbox-img");

const lbTitle =
  document.getElementById("lightbox-title");

const lbRole =
  document.getElementById("lightbox-role");


function el(tag, className, text) {

  const node =
    document.createElement(tag);

  if (className) {
    node.className =
      className;
  }

  if (
    text !== undefined &&
    text !== null
  ) {
    node.textContent =
      text;
  }

  return node;
}


function buildPlaceholder(path) {

  const box =
    el("div", "project-placeholder");

  box.append(
    el("span", null, "Image goes here"),
    el("code", null, path)
  );

  return box;
}


function metaRow(label, content) {

  const row =
    el("div");

  const dd =
    el("dd");

  dd.append(content);

  row.append(
    el("dt", null, label),
    dd
  );

  return row;
}


/* 4. PROJECT GALLERY ------------------------------------------------------- */

function buildProject(project) {

  const card =
    el("figure", "project");


  const media =
    el("button", "project-media");

  media.type =
    "button";


  media.setAttribute(
    "aria-label",
    "View larger: " + project.title
  );


  const img =
    el("img");


  img.alt =
    project.alt || project.title;

  img.loading =
    "lazy";

  img.decoding =
    "async";


  if (
    project.width &&
    project.height
  ) {

    img.width =
      project.width;

    img.height =
      project.height;

  }


  img.addEventListener(
    "load",
    () => {
      img.classList.add("is-ready");
    }
  );


  img.addEventListener(
    "error",
    () => {

      media.replaceChildren(
        buildPlaceholder(
          project.image
        )
      );

      media.classList.add(
        "is-empty"
      );

      media.disabled =
        true;

      media.removeAttribute(
        "aria-label"
      );

    }
  );


  img.src =
    project.image;


  media.append(img);


  media.addEventListener(
    "click",
    () => {
      openLightbox(
        project,
        img
      );
    }
  );


  const body =
    el("figcaption", "project-body");


  body.append(
    el(
      "h3",
      null,
      project.title
    ),

    el(
      "p",
      null,
      project.description
    )
  );


  const meta =
    el("dl", "project-meta");


  meta.append(
    metaRow(
      "Role",
      document.createTextNode(
        project.role || ""
      )
    )
  );


  const toolList =
    el("ul", "tools");


  [].concat(
    project.tools || []
  ).forEach(
    (tool) => {

      toolList.append(
        el(
          "li",
          null,
          tool
        )
      );

    }
  );


  meta.append(
    metaRow(
      "Tools",
      toolList
    )
  );


  body.append(meta);

  card.append(
    media,
    body
  );


  return card;
}


if (gallery) {

  if (
    PROJECTS.length === 0
  ) {

    gallery.replaceWith(
      el(
        "p",
        "note",
        "Projects will appear here soon."
      )
    );

  } else {

    PROJECTS.forEach(
      (project) => {

        gallery.append(
          buildProject(project)
        );

      }
    );

  }

}


/* 5. IMAGE VIEWER ---------------------------------------------------------- */

function openLightbox(
  project,
  img
) {

  if (
    !lightbox ||
    typeof lightbox.showModal !== "function"
  ) {
    return;
  }


  lbImg.src =
    img.currentSrc ||
    img.src;


  lbImg.alt =
    img.alt;


  lbTitle.textContent =
    project.title ||
    "";


  lbRole.textContent =
    project.role ||
    "";


  lightbox.showModal();
}


/* 6. FEEDBACK VIEWER ------------------------------------------------------- */

const testimonialButtons =
  document.querySelectorAll(
    ".testimonial"
  );


testimonialButtons.forEach(
  (button, index) => {

    const image =
      button.querySelector("img");

    if (!image) {
      return;
    }


    button.setAttribute(
      "aria-label",
      "View feedback " +
      (index + 1) +
      " larger"
    );


    button.addEventListener(
      "click",
      () => {

        const feedback =
          FEEDBACK[index];


        if (!feedback) {
          return;
        }


        openLightbox(
          feedback,
          image
        );

      }
    );

  }
);


/* 7. LIGHTBOX CONTROLS ----------------------------------------------------- */

if (lightbox) {

  const closeButton =
    lightbox.querySelector(
      ".lightbox-close"
    );


  if (closeButton) {

    closeButton.addEventListener(
      "click",
      () => {
        lightbox.close();
      }
    );

  }


  lightbox.addEventListener(
    "click",
    (event) => {

      if (
        event.target ===
        lightbox
      ) {
        lightbox.close();
      }

    }
  );


  lightbox.addEventListener(
    "close",
    () => {

      lbImg.removeAttribute(
        "src"
      );

      lbTitle.textContent =
        "";

      lbRole.textContent =
        "";

    }
  );

}


/* 8. MOBILE NAVIGATION ----------------------------------------------------- */

const navToggle =
  document.querySelector(
    ".nav-toggle"
  );

const nav =
  document.getElementById(
    "site-nav"
  );


function setNav(open) {

  if (!nav || !navToggle) {
    return;
  }


  nav.classList.toggle(
    "open",
    open
  );


  navToggle.setAttribute(
    "aria-expanded",
    String(open)
  );

}


if (
  navToggle &&
  nav
) {

  navToggle.addEventListener(
    "click",
    () => {

      setNav(
        navToggle.getAttribute(
          "aria-expanded"
        ) !== "true"
      );

    }
  );


  nav.addEventListener(
    "click",
    (event) => {

      if (
        event.target.closest("a")
      ) {
        setNav(false);
      }

    }
  );


  document.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "Escape"
      ) {
        setNav(false);
      }

    }
  );

}


/* 9. FOOTER YEAR ----------------------------------------------------------- */

const year =
  document.getElementById(
    "year"
  );


if (year) {

  year.textContent =
    new Date().getFullYear();

   }
