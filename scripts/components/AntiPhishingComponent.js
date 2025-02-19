"use strict";

import Component from './Component.js';

/**
 * Anti-phishing banner secure button
 *
 * @class AntiPhishingComponent
 */
class AntiPhishingComponent extends Component {
  /**
   * URL for more information about phishing
   *
   * @type {string}
   */
  WHY_URL = 'https://www.proofpoint.com/us/threat-reference/phishing';

  /**
   * Phishing status checker API URI (FastAPI server)
   *
   * @type {string}
   */
  API_URI = 'http://127.0.0.1:8000/predict';

  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'closed' });
  }

  /**
   * This getter checks that banner anti-phishing tip
   * should be shown on page reload.
   *
   * @returns {boolean}
   */
  get isRenderable() {
    return localStorage.getItem('anti-phishing-tip') !== '0';
  }

  /**
   * Anti-phishing banner styles
   *
   * @returns {string}
   */
  getCss() {
    return `
      <style>
        :host {
          right: 20px;
          bottom: 20px;
          position: fixed;
          z-index: 10000000;

          gap: 10px;
          display: flex;
          align-items: flex-start;

          width: 100%;
          max-width: 350px;

          padding: 15px 20px !important;

          background: #262626;
          border-radius: 12px;

          color: white;
          font-size: 14px;
          font-weight: 400;
          font-style: normal;
          font-family: monospace;

          transition: background .25s;
        }

        :host([data-status="success"]) {
          background: #40a144;
        }

        :host([data-status="warning"]) {
          background: #d7850b;
        }

        :host a {
          font: inherit;
          color: #4d97f0;
          font-weight: 700;
          text-decoration: none;
        }

        :host a:hover {
          text-decoration: underline;
        }

        .content {
          flex: 1;

          gap: 5px;
          display: flex;
          flex-wrap: wrap;
        }

        .message {
          flex: 1;

          gap: 15px;
          display: flex;
          align-items: center;
        }
      </style>
    `;
  }

  /**
   * Anti-phishing banner template
   *
   * @returns {string}
   */
  template() {
    return `
      <div class="content">
        Select a page segment and choose ‘Anti-Phishing Check’ from the context menu to verify security.
        <a href="${this.WHY_URL}" target="_blank">
          Why?
        </a>
      </div>
      <anti-phishing-close></anti-phishing-close>
    `;
  }

  /**
   * Rendering anti-phishing banner by content
   *
   * @param content
   * @returns {AntiPhishingComponent}
   */
  render(content) {
    this.root.innerHTML = this.createHTML(`
      ${this.getCss()}
      ${content}
    `);
    return this;
  }

  /**
   * Callback when the element added to the page
   */
  connectedCallback() {
    document.addEventListener('CloseAntiPhishingTip', this.onClose.bind(this));
    document.addEventListener('AntiPhishingChecking', this.onLoading.bind(this));
    document.addEventListener('AntiPhishingChecked', this.onChecked.bind(this));

    if (!this.isRenderable) {
      return;
    }

    this.render(this.template());
  }

  /**
   * Callback when the element removed from the page
   */
  disconnectedCallback() {
    document.removeEventListener('CloseAntiPhishingTip', this.onClose.bind(this));
    document.removeEventListener('AntiPhishingChecking', this.onLoading.bind(this));
    document.removeEventListener('AntiPhishingChecked', this.onChecked.bind(this));
  }

  /**
   * On closing we are removing the content but element should
   * stay in the page
   */
  onClose() {
    this.root.innerHTML = this.createHTML('');
  }

  /**
   * Rendering loading state
   */
  onLoading() {
    delete this.dataset.status;

    this.render(
      `<ani-phishing-loading></ani-phishing-loading>`
    );

    /**
       * Sending POST request to the FastAPI server
       */
    fetch(this.API_URI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: document.getSelection()?.toString() ?? ''  // Extracting the selected text from the page
      })
    })
    .then(res => res.json())
    .then(data => {
      const isSave = data.prediction === 0;  // Assuming 0 means safe, 1 means phishing

      const detail = {
        isSave: isSave,
        message: isSave ? 'Content is safe.' : 'Warning: Potential phishing detected!'
      };

      // Simulate delay for demo purposes
      setTimeout(() => {
        document.dispatchEvent(new CustomEvent('AntiPhishingChecked', {
          detail
        }));
      }, 2000);
    })
    .catch(error => {
      console.error("Error while checking phishing:", error);
      // Handle errors (e.g., show an error message in the UI)
    });
  }

  /**
   * Rendering conditional status states
   *
   * @param event
   */
  onChecked(event) {
    const { isSave, message } = event.detail;

    this.dataset.status = isSave ? 'success' : 'warning';
    if (isSave) {
      this.successMessage(message);
    } else {
      this.warningMessage(message);
    }
  }

  /**
   * Rendering success state
   *
   * @param message
   */
  successMessage(message) {
    this.render(`
      <div class="message">
        <anti-phishing-secure></anti-phishing-secure>
        ${message}
      </div>
      <anti-phishing-close></anti-phishing-close>
    `);
  }

  /**
   * Rendering warning state
   *
   * @param message
   */
  warningMessage(message) {
    this.render(`
      <div class="message">
        <anti-phishing-warning></anti-phishing-warning>
        ${message}
      </div>
      <anti-phishing-close></anti-phishing-close>
    `);
  }

}

/**
 * Registering custom HTML element
 */
customElements.define('anti-phishing', AntiPhishingComponent);
