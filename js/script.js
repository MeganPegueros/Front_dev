// Referencias a elementos
const btnAccessibility = document.getElementById('btn-accessibility');
const menuAccess = document.getElementById('accessibility-menu');
const closeAccessBtn = document.getElementById('close-accessibility');

const fontSizeRange = document.getElementById('font-size-range');
const cursorSelect = document.getElementById('cursor-type-select');
const colorSelect = document.getElementById('color-mode-select');
const fontSelect = document.getElementById('font-select');

const toggleLetterSpacingBtn = document.getElementById('toggle-letter-spacing');
const toggleContrastBtn = document.getElementById('toggle-contrast');
const toggleDarkmodeBtn = document.getElementById('toggle-darkmode');
const toggleImagesBtn = document.getElementById('toggle-images');
const toggleLinksBtn = document.getElementById('toggle-links');
const toggleHighlightLinksBtn = document.getElementById('toggle-highlight-links');

// Estado inicial
let letterSpacingOn = false;
let contrastOn = false;
let darkModeOn = false;
let imagesHidden = false;
let linksRemoved = false;
let highlightLinksOn = false;

// Abrir/cerrar menú accesibilidad
btnAccessibility.addEventListener('click', () => {
  menuAccess.classList.toggle('hidden');
  const expanded = btnAccessibility.getAttribute('aria-expanded') === 'true';
  btnAccessibility.setAttribute('aria-expanded', (!expanded).toString());
});

closeAccessBtn.addEventListener('click', () => {
  menuAccess.classList.add('hidden');
  btnAccessibility.setAttribute('aria-expanded', 'false');
});

// Aplicar tamaño de fuente (a todo el html)
const fontSizes = [0.5, 0.7, 0.85, 1.0, 1.3, 1.6, 2.0];
function applyFontSize(scale) {
  document.documentElement.style.fontSize = scale + 'em';
}

// Inicializar tamaño fuente
fontSizeRange.value = 3;
applyFontSize(fontSizes[3]);

fontSizeRange.addEventListener('input', (e) => {
  const val = parseInt(e.target.value, 10);
  const size = fontSizes[val];
  applyFontSize(size);
  fontSizeRange.setAttribute('aria-valuenow', size);
  fontSizeRange.setAttribute('aria-valuetext', `Tamaño de fuente ${size.toFixed(2)}`);
  saveAccessibilityState();
});

// Toggle letter spacing
toggleLetterSpacingBtn.addEventListener('click', () => {
  letterSpacingOn = !letterSpacingOn;
  if (letterSpacingOn) {
    document.documentElement.classList.add('letter-spacing');
  } else {
    document.documentElement.classList.remove('letter-spacing');
  }
  toggleLetterSpacingBtn.setAttribute('aria-pressed', letterSpacingOn);
  saveAccessibilityState();
});

// Toggle alto contraste
toggleContrastBtn.addEventListener('click', () => {
  contrastOn = !contrastOn;
  if (contrastOn) {
    document.documentElement.classList.add('high-contrast');
  } else {
    document.documentElement.classList.remove('high-contrast');
  }
  toggleContrastBtn.setAttribute('aria-pressed', contrastOn);
  saveAccessibilityState();
});

// Toggle modo oscuro
toggleDarkmodeBtn.addEventListener('click', () => {
  darkModeOn = !darkModeOn;
  if (darkModeOn) {
    document.documentElement.classList.add('dark-mode');
    applyDarkModeColors();
  } else {
    document.documentElement.classList.remove('dark-mode');
    applyLightModeColors();
  }
  toggleDarkmodeBtn.setAttribute('aria-pressed', darkModeOn);
  saveAccessibilityState();
});

// Aplicar variables CSS para modos claro/oscuro
function applyLightModeColors() {
  document.documentElement.style.setProperty('--bg-color', '#ffffff');
  document.documentElement.style.setProperty('--text-color', '#1e1e1e');
  document.documentElement.style.setProperty('--primary-color', '#6b5bff');
  document.documentElement.style.setProperty('--nav-bg', 'rgba(30, 30, 30, 0.75)');
  document.documentElement.style.setProperty('--footer-bg', '#161a36');
}

function applyDarkModeColors() {
  document.documentElement.style.setProperty('--bg-color', '#121212');
  document.documentElement.style.setProperty('--text-color', '#eee');
  document.documentElement.style.setProperty('--primary-color', '#6b5bff');
  document.documentElement.style.setProperty('--nav-bg', 'rgba(0, 0, 0, 0.85)');
  document.documentElement.style.setProperty('--footer-bg', '#0f1222');
}

// Toggle ocultar imágenes
toggleImagesBtn.addEventListener('click', () => {
  imagesHidden = !imagesHidden;
  const imgs = document.querySelectorAll('img, picture, svg');
  imgs.forEach(img => {
    if (imagesHidden) {
      img.classList.add('hidden-img');
    } else {
      img.classList.remove('hidden-img');
    }
  });
  toggleImagesBtn.setAttribute('aria-pressed', imagesHidden);
  saveAccessibilityState();
});

// Toggle quitar links
toggleLinksBtn.addEventListener('click', () => {
  linksRemoved = !linksRemoved;
  const links = document.querySelectorAll('a');
  links.forEach(link => {
    if (linksRemoved) {
      link.classList.add('no-links');
    } else {
      link.classList.remove('no-links');
    }
  });
  toggleLinksBtn.setAttribute('aria-pressed', linksRemoved);
  saveAccessibilityState();
});

// Toggle resaltar links
toggleHighlightLinksBtn.addEventListener('click', () => {
  highlightLinksOn = !highlightLinksOn;
  const links = document.querySelectorAll('a');
  links.forEach(link => {
    if (highlightLinksOn) {
      link.classList.add('highlight-links');
    } else {
      link.classList.remove('highlight-links');
    }
  });
  toggleHighlightLinksBtn.setAttribute('aria-pressed', highlightLinksOn);
  saveAccessibilityState();
});

// Cambio cursor
function applyCursorType(cursorType) {
  document.documentElement.classList.remove('cursor-default', 'cursor-pointer', 'cursor-crosshair', 'cursor-wait', 'cursor-text');
  document.documentElement.classList.add(`cursor-${cursorType}`);
}

// Aplicar cursor inicial
applyCursorType(cursorSelect.value);

cursorSelect.addEventListener('change', (e) => {
  applyCursorType(e.target.value);
  saveAccessibilityState();
});

// Guardar estado en localStorage
function saveAccessibilityState() {
  const state = {
    fontSizeIndex: fontSizeRange.value,
    letterSpacingOn,
    contrastOn,
    darkModeOn,
    imagesHidden,
    linksRemoved,
    highlightLinksOn,
    cursorType: cursorSelect.value,
    colorMode: colorSelect.value,
    fontSelected: fontSelect.value
  };
  localStorage.setItem('accessibilityState', JSON.stringify(state));
}

// Cargar estado guardado
function loadAccessibilityState() {
  const savedState = localStorage.getItem('accessibilityState');
  if (!savedState) return;
  const state = JSON.parse(savedState);

  if (state.fontSizeIndex !== undefined) {
    fontSizeRange.value = state.fontSizeIndex;
    applyFontSize(fontSizes[state.fontSizeIndex]);
  }

  letterSpacingOn = state.letterSpacingOn || false;
  contrastOn = state.contrastOn || false;
  darkModeOn = state.darkModeOn || false;
  imagesHidden = state.imagesHidden || false;
  linksRemoved = state.linksRemoved || false;
  highlightLinksOn = state.highlightLinksOn || false;

  if (letterSpacingOn) document.documentElement.classList.add('letter-spacing');
  else document.documentElement.classList.remove('letter-spacing');
  toggleLetterSpacingBtn.setAttribute('aria-pressed', letterSpacingOn);

  if (contrastOn) document.documentElement.classList.add('high-contrast');
  else document.documentElement.classList.remove('high-contrast');
  toggleContrastBtn.setAttribute('aria-pressed', contrastOn);

  if (darkModeOn) {
    document.documentElement.classList.add('dark-mode');
    applyDarkModeColors();
  } else {
    document.documentElement.classList.remove('dark-mode');
    applyLightModeColors();
  }
  toggleDarkmodeBtn.setAttribute('aria-pressed', darkModeOn);

  const imgs = document.querySelectorAll('img, picture, svg');
  imgs.forEach(img => {
    if (imagesHidden) img.classList.add('hidden-img');
    else img.classList.remove('hidden-img');
  });
  toggleImagesBtn.setAttribute('aria-pressed', imagesHidden);

  const links = document.querySelectorAll('a');
  links.forEach(link => {
    if (linksRemoved) link.classList.add('no-links');
    else link.classList.remove('no-links');

    if (highlightLinksOn) link.classList.add('highlight-links');
    else link.classList.remove('highlight-links');
  });
  toggleLinksBtn.setAttribute('aria-pressed', linksRemoved);
  toggleHighlightLinksBtn.setAttribute('aria-pressed', highlightLinksOn);

  if (state.cursorType) {
    cursorSelect.value = state.cursorType;
    applyCursorType(state.cursorType);
  }

  if (state.colorMode) {
    colorSelect.value = state.colorMode;
    document.documentElement.classList.remove('protanopia', 'deuteranopia', 'tritanopia');
    if (state.colorMode !== 'normal') {
      document.documentElement.classList.add(state.colorMode);
    }
  }

  if (state.fontSelected) {
    fontSelect.value = state.fontSelected;
    document.documentElement.classList.remove('font-arial', 'font-verdana', 'font-comic', 'font-open-dyslexic');
    switch (state.fontSelected) {
      case "Arial, sans-serif":
        document.documentElement.classList.add('font-arial');
        break;
      case "Verdana, sans-serif":
        document.documentElement.classList.add('font-verdana');
        break;
      case "'Comic Sans MS', cursive, sans-serif":
        document.documentElement.classList.add('font-comic');
        break;
      case "'Open Dyslexic', sans-serif":
        document.documentElement.classList.add('font-open-dyslexic');
        break;
    }
  }
}

// Carga inicial
document.addEventListener('DOMContentLoaded', () => {
  loadAccessibilityState();
});
