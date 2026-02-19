import { mount } from 'svelte';
import InjectedApp from './views/App.svelte';
import tailwindCss from "@/assets/global.css?inline"

const HOST_ID = 'vite-svelte-tailwind-shadow-host';

function correctStyleSheet(){
  const urlregex = /(?<=url\()(.*?)(?=\))/gm
  const results = tailwindCss.matchAll(urlregex)
  let newCSS = tailwindCss 
  for (const res of results){
    console.log("regexFound:",res[0]);
    newCSS = newCSS.replaceAll(res[0], chrome.runtime.getURL(res[0]))
  }
  return newCSS
}


if (!document.getElementById(HOST_ID)) {
  const styleSheetString = correctStyleSheet()
  const container = document.createElement('div');
  container.id = HOST_ID;
  document.documentElement.appendChild(container);
  const shadowRoot = container.attachShadow({ mode: 'open' });
  const shadowSheet = new CSSStyleSheet()
  shadowSheet.replaceSync(styleSheetString.replace(/:root/g, ':host'))
  const globalSheet = new CSSStyleSheet()
  for(const rule of shadowSheet.cssRules) {
    if (rule instanceof CSSPropertyRule) {
      globalSheet.insertRule(rule.cssText)
    }
  }
   const styleSheet = new CSSStyleSheet() 
   styleSheet.replace(styleSheetString)
   document.adoptedStyleSheets.push(styleSheet)
  shadowRoot.adoptedStyleSheets = [shadowSheet];
  const mountPoint = document.createElement('div');
  shadowRoot.appendChild(mountPoint);
  mount(InjectedApp, {
    target: mountPoint
  });
  //   const container = document.createElement('div')
  // container.id = 'crxjs-app'
  //document.body.appendChild(container)
  mount(InjectedApp, {
    target: container,
  })
}
