import { THEME_STORAGE_KEY } from "@/lib/theme";

/** FOUC-safe inline script; logic must match `resolveDark` in `lib/theme.ts`. */
export function themeInitMinScript(): string {
  const k = JSON.stringify(THEME_STORAGE_KEY);
  return `(function(){
var k=${k};
try{
var s=localStorage.getItem(k);
var pref=(s==="light"||s==="dark"||s==="system")?s:"system";
var dark=pref==="dark"||(pref!=="light"&&window.matchMedia("(prefers-color-scheme: dark)").matches);
document.documentElement.classList.toggle("dark",dark);
}catch(e){}
})();`;
}
