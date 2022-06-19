import { hasLocalStorage } from "./hasLocalStorage";
import { setTargetLanguage } from "./setTargetLanguage";

const defaultTargetLanguage = "lf-c";

export const setInitialTargetLanguage = () => {
  var lang:string = (hasLocalStorage && localStorage.getItem("last-selected-target-language")) 
      || defaultTargetLanguage;
  console.log("Setting initial target language to " + lang);

  let selector = document.getElementById("targetSelector") as any;
  if (selector != null) selector.value = lang;
  setTargetLanguage(lang);
}
