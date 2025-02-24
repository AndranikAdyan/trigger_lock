"use strict";

import Component from './Component.js';

/**
 * Anti-phishing banner secure button
 *
 * @class AntiPhishingSecureComponent
 */
class AntiPhishingSecureComponent extends Component {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: 'closed' });
  }

  /**
   * Callback when the element added to the page
   */
  connectedCallback() {
    this.root.innerHTML = this.createHTML(`
      <style>
        :host {
          flex: 0 0 auto;
        }

        :host svg {
          flex: 0 0 auto;

          width: 30px;
          height: 30px;

          color: inherit;
        }
      </style>

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
          d="M19.42,3.83,12.24,2h0A.67.67,0,0,0,12,2a.67.67,0,0,0-.2,0h0L4.58,3.83A2,2,0,0,0,3.07,5.92l.42,5.51a12,12,0,0,0,7.24,10.11l.88.38h0a.91.91,0,0,0,.7,0h0l.88-.38a12,12,0,0,0,7.24-10.11l.42-5.51A2,2,0,0,0,19.42,3.83ZM15.71,9.71l-4,4a1,1,0,0,1-1.42,0l-2-2a1,1,0,0,1,1.42-1.42L11,11.59l3.29-3.3a1,1,0,0,1,1.42,1.42Z"
          fill="currentColor"
        />
      </svg>
    `);
  }
}

/**
 * Registering custom HTML element
 */
customElements.define('anti-phishing-secure', AntiPhishingSecureComponent);

