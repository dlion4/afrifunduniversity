// Helper Functions

const delay = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// Handle Offset

function setElementOffset(element, height) {
  const attribute = element.dataset.navOffset;
  const additionalOffset = element.dataset.additionalOffset ?? 0;
  const offset = height + parseInt(additionalOffset);
  element.style[attribute] = `${offset}px`;
}

function setElementsOffset(elements, height) {
  elements.forEach(element => {
    setElementOffset(element, height);
  });
}

/**
 * @param {array} elements - array of objects
 * @param {object} element - keys: selector, attribute
 * @param {string} element.selector - js selector for DOM element
 * @param {string} element.attribute - css attribute to set
 * @returns null
 */
function handleOffsets() {
  const elements = Array.from(document.querySelectorAll("[data-nav-offset]"));
  let navHeight;

  const navContainer = document.querySelector('[data-nav="container"]');
  const navSizeObserver = new ResizeObserver(entries => {
    if (entries[0].target.offsetHeight !== navHeight) {
      navHeight = entries[0].target.offsetHeight;
      setElementsOffset(elements, navHeight);
    }
  });
  navSizeObserver.observe(navContainer);
}



// Initiate Nav
const TOGGLE_CLASS = "show-mobile-menu";
const COLLAPSED_CLASS = "collapsed";
const COLLAPSING_CLASS = "collapsing";

const LOCK_CLASS = "lock-body";

const body = document.querySelector(".main-content-container");
const nav = document.querySelector("[data-nav='target']");

const closeMenu = async () => {
  body.classList.remove(LOCK_CLASS);
  nav.classList.remove(TOGGLE_CLASS);
  nav.classList.add(COLLAPSING_CLASS);
  await delay(300);
  nav.classList.remove(COLLAPSING_CLASS);
  nav.classList.add(COLLAPSED_CLASS);
}

const openMenu = async () => {
  nav.classList.remove(COLLAPSED_CLASS);
  await delay(10);
  body.classList.add(LOCK_CLASS);
  nav.classList.add(TOGGLE_CLASS);
}

// TODO - handle closing when resizing over mobile threshold
const toggleMobileMenu = async () => {
  const isOpen = nav.classList.contains(TOGGLE_CLASS);
  if (isOpen) {
    // window.removeEventListener('resize', closeMenu);
    return closeMenu();
  }
  // window.addEventListener('resize', closeMenu);
  return openMenu();
}

function initNavigation() {
  const toggle = document.querySelector("[data-nav='toggle']");

  toggle.addEventListener("click", toggleMobileMenu);
}



// Desktop functions
function handleDropdownHeight () {
  const mainNavLinks = document.querySelectorAll("[data-nav-hover='target']");

  mainNavLinks.forEach(link => {
    link.addEventListener("mouseover", () => {
      const menu = link.querySelector("[data-nav-hover='menu']");
      if (!menu) return;
      const navContainer = document.querySelector("[data-nav='container']");
      const maxHeight = window.innerHeight - navContainer.offsetHeight;
      menu.style.maxHeight = `${maxHeight}px`;
    });
  })
}

$(document).ready(function () {
  if(!document.querySelector('[data-nav="container"]')) return;

  handleOffsets();
  initNavigation();
  handleDropdownHeight();
});
