"use strict";

/**
 * Injecting file into the document head
 *
 * @param file
 */
function injectScript(file) {
  const script = document.createElement("script");
  script.type = "module";
  script.src = chrome.runtime.getURL(file);

  document.head.appendChild(script);
}

/**
 * Loading components registration script
 */
injectScript('scripts/components/index.js');

/**
 * Creating an Anti-Phishing banner element
 *
 * @type {HTMLElement}
 */
const antiPushing = document.createElement('anti-phishing');

/**
 * Adding Anti-Phishing banner to the page
 */
document.body.append(antiPushing);

document.addEventListener('mouseup', (event) => {
  const selection = document.getSelection()?.toString();

  setTimeout(() => {
    document.querySelector('#anti-phishing-marker')?.remove();

    if (!!selection) {
      putMarker(event.x, event.y);
    }
  }, 100);
});

function putMarker(x, y) {
    const marker = document.createElement('div');
    marker.setAttribute('id', 'anti-phishing-marker')
    marker.innerHTML = `<img width="38" src="${chrome.runtime.getURL('../images/icon-128.png')}" alt="Check" />`;

    marker.style.cssText = `
      top: ${y + 5}px;
      left: ${x + 5}px;
      position: fixed;

      width: 38px;

      cursor: pointer;
    `;

    marker.onmouseup = (event) => {
      event.preventDefault();
      event.stopPropagation();
    }

    marker.onclick = (event) => {
      event.preventDefault();
      event.stopPropagation();

      const selection = document.getSelection()?.toString();

      if (!!selection) {
        document.dispatchEvent(new CustomEvent('AntiPhishingChecking'));
      }

      marker.remove();
    }

    document.body.append(marker);
}