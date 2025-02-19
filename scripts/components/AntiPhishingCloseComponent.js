"use strict";

import Component from './Component.js';

/**
 * Anti-phishing banner close button
 *
 * @class AntiPhishingCloseComponent
 */
class AntiPhishingCloseComponent extends Component {

  constructor() {
    super();

    this.root = this.attachShadow({ mode: 'closed' });
  }

  /**
   * Callback when the element added to the page
   */
  connectedCallback() {
    this.setAttribute('title', 'Close anti-phishing tip');

    this.root.innerHTML = this.createHTML(`
      <style>
        :host {
          flex: 0 0 auto;

          width: 25px;
          height: 25px;

          color: inherit;

          cursor: pointer;
        }

        svg {
          opacity: .7;
          transition: transform .15s, opacity .25s;
        }

        :host(:hover) svg {
          opacity: 1;
          transform: scale(1.15);
        }

        :host(:active) svg {
          transform: scale(.98);
        }
      </style>

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -0.5 25 25" fill="none">
        <path d="M6.96967 16.4697C6.67678 16.7626 6.67678 17.2374 6.96967 17.5303C7.26256 17.8232 7.73744 17.8232 8.03033 17.5303L6.96967 16.4697ZM13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697L13.0303 12.5303ZM11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303L11.9697 11.4697ZM18.0303 7.53033C18.3232 7.23744 18.3232 6.76256 18.0303 6.46967C17.7374 6.17678 17.2626 6.17678 16.9697 6.46967L18.0303 7.53033ZM13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303L13.0303 11.4697ZM16.9697 17.5303C17.2626 17.8232 17.7374 17.8232 18.0303 17.5303C18.3232 17.2374 18.3232 16.7626 18.0303 16.4697L16.9697 17.5303ZM11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697L11.9697 12.5303ZM8.03033 6.46967C7.73744 6.17678 7.26256 6.17678 6.96967 6.46967C6.67678 6.76256 6.67678 7.23744 6.96967 7.53033L8.03033 6.46967ZM8.03033 17.5303L13.0303 12.5303L11.9697 11.4697L6.96967 16.4697L8.03033 17.5303ZM13.0303 12.5303L18.0303 7.53033L16.9697 6.46967L11.9697 11.4697L13.0303 12.5303ZM11.9697 12.5303L16.9697 17.5303L18.0303 16.4697L13.0303 11.4697L11.9697 12.5303ZM13.0303 11.4697L8.03033 6.46967L6.96967 7.53033L11.9697 12.5303L13.0303 11.4697Z" fill="currentColor"/>
      </svg>
    `);

    this.addEventListener('click', this.onClose.bind(this));
  }

  /**
   * Callback when the element removed from the page
   */
  disconnectedCallback() {
    this.removeEventListener('click', this.onClose.bind(this));
  }

  /**
   * On closing the anti-phishing banner, we are saving data
   * in the localStorage with key anti-phishing-tip and value 0
   * to prevent the banner from reopening on the next page reloads
   */
  onClose() {
    localStorage.setItem('anti-phishing-tip', '0');
    document.dispatchEvent(new Event('CloseAntiPhishingTip'));
  }
}

/**
 * Registering custom HTML element
 */
customElements.define('anti-phishing-close', AntiPhishingCloseComponent);