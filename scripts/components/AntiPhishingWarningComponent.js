"use strict";

import Component from './Component.js';

/**
 * Anti-phishing banner warning button
 *
 * @class AntiPhishingWarningComponent
 */
class AntiPhishingWarningComponent extends Component {
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

      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="800px" height="800px" viewBox="0 0 512 512" version="1.1">
        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="add" fill="currentColor" transform="translate(32.000000, 42.666667)">
            <path d="M246.312928,5.62892705 C252.927596,9.40873724 258.409564,14.8907053 262.189374,21.5053731 L444.667042,340.84129 C456.358134,361.300701 449.250007,387.363834 428.790595,399.054926 C422.34376,402.738832 415.04715,404.676552 407.622001,404.676552 L42.6666667,404.676552 C19.1025173,404.676552 7.10542736e-15,385.574034 7.10542736e-15,362.009885 C7.10542736e-15,354.584736 1.93772021,347.288125 5.62162594,340.84129 L188.099293,21.5053731 C199.790385,1.04596203 225.853517,-6.06216498 246.312928,5.62892705 Z M224,272 C208.761905,272 197.333333,283.264 197.333333,298.282667 C197.333333,313.984 208.415584,325.248 224,325.248 C239.238095,325.248 250.666667,313.984 250.666667,298.624 C250.666667,283.264 239.238095,272 224,272 Z M245.333333,106.666667 L202.666667,106.666667 L202.666667,234.666667 L245.333333,234.666667 L245.333333,106.666667 Z"></path>
          </g>
        </g>
      </svg>
    `);
  }
}

/**
 * Registering custom HTML element
 */
customElements.define('anti-phishing-warning', AntiPhishingWarningComponent);

