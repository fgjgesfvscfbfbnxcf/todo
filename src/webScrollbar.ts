import { Platform } from 'react-native';

/**
 * Vzhled aplikace, který umí jen prohlížeč.
 *
 * 1) Výchozí scrollbar je tlustý, bílý a v temném motivu působí cizorodě.
 * 2) Přechod barvy pozadí – na webu nejde spolehlivě přehrát vlastní animací
 *    (viz `usePressAnimation`), takže barvu zde plynule přejíždí samotný prohlížeč.
 *    Bez toho se barva při stisku přepne okamžitě a působí trhaně.
 *
 * Android a iOS scrollbar nekreslí a barvu řídí vlastní animace, takže je tento
 * soubor na telefonech úplně neaktivní.
 */
const CSS = `
/* plynulé přechod barev na webu */
* {
  transition:
    background-color 260ms cubic-bezier(0.33, 1, 0.68, 1),
    border-color 260ms cubic-bezier(0.33, 1, 0.68, 1);
}

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