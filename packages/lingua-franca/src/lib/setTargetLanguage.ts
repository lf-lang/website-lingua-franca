import { hasLocalStorage } from "./hasLocalStorage";

const targetLanguages = ["c", "cpp", "py", "ts", "rs"];

export function getTargetLanguage(): string | null {
  return new URLSearchParams(window.location.search).get('target')
}

export const setTargetLanguage = (selected: string) => {
  console.log("Setting target language to " + selected);
  window.history.replaceState(null, '', `?target=${selected}`);
  hasLocalStorage && localStorage.setItem("last-selected-target-language", selected)
  for (const target of targetLanguages) {
    const id = 'lf-' + target;
    const element = document.getElementById(id);
    if (element != null) element.className = id === selected ? "selected" : "unselected"
  }
  for (var target of targetLanguages) {
    for (var element of Array.from(document.getElementsByClassName('language-lf-' + target) as HTMLCollectionOf<HTMLElement>)) {
      if (element.classList.contains('language-' + selected)) {
        element.style.display = "";
      } else {
        element.style.display = "none";
      }
    }
    for (var element of Array.from(document.getElementsByClassName('lf-' + target) as HTMLCollectionOf<HTMLElement>)) {
      if (element.classList.contains(selected)) {
        element.style.display = "";
      } else {
        element.style.display = "none";
      }
    }
  }
}
