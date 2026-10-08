import { Platform } from 'react-native';

/**
 * Výchozí scrollbar v prohlížeči je tlustý a bílý a v temném motivu působí
 * cizorodě. Tenhle styl se aplikuje jen na webu (Expo Go / Android / iOS ho
 * nepotřebují – tam scrollbar nekreslí).
 */
const CSS = `
* {
  scrollbar-width: thin;
  scrollbar-color: rgba(124, 92, 255, 0.55) transparent;
}

*::-webkit-scrollbar {
  width: 11px;
  height: 11px;
}

*::-webkit-scrollbar-track {
  background: transparent;
}

*::-webkit-scrollbar-thumb {
  background-color: rgba(124, 92, 255, 0.5);
  border: 3px solid transparent;
  background-clip: content-box;
  border-radius: 999px;
}

*::-webkit-scrollbar-thumb:hover {
  background-color: rgba(124, 92, 255, 0.8);
}

*::-webkit-scrollbar-corner {
  background: transparent;
}
`;

let isInstalled = false;

/** Vloží styl do dokumentu. Opakované volání nic udělá. */
export function installWebScrollbarStyle(): void {
  if (Platform.OS !== 'web' || isInstalled) {
    return;
  }

  if (typeof document === 'undefined') {
    return;
  }

  const style = document.createElement('style');
  style.setAttribute('data-app-scrollbar', 'true');
  style.textContent = CSS;
  document.head.appendChild(style);
  isInstalled = true;
}