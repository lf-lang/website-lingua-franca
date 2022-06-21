import { hasLocalStorage } from "./hasLocalStorage";
import { getTargetLanguage, setTargetLanguage } from "./setTargetLanguage";

const defaultTargetLanguage = "lf-c";

export const setInitialTargetLanguage = () => {
  const target:string = getTargetLanguage()
      || (hasLocalStorage && localStorage.getItem("last-selected-target-language"))
      || defaultTargetLanguage;

  let selector = document.getElementById("targetSelector") as any;
  if (selector != null) selector.value = target;
  setTargetLanguage(target);
}
