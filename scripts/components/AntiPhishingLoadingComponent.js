"use strict";

import Component from './Component.js';

/**
 * Ani-phishing banner loading icon
 *
 * @class AntiPhishingLoadingComponent
 */
class AntiPhishingLoadingComponent extends Component {
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
          gap: 15px;
          display: flex;
          align-items: center;

          width: 30px;
          height: 30px;

          color: white;
        }

        :host svg {
          flex: 0 0 auto;

          width: 30px;
          height: 30px;

          animation: animation-loading infinite 2s;
        }

        @keyframes animation-loading {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      </style>

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" class="hds-flight-icon--animation-loading">
        <g fill="currentColor" fill-rule="evenodd" clip-rule="evenodd">
          <path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z" opacity=".2"/>
          <path d="M7.25.75A.75.75 0 018 0a8 8 0 018 8 .75.75 0 01-1.5 0A6.5 6.5 0 008 1.5a.75.75 0 01-.75-.75z"/>
        </g>
      </svg>
      Checking...
    `);
  }
}

/**
 * Registering custom HTML element
 */
customElements.define('ani-phishing-loading', AntiPhishingLoadingComponent);