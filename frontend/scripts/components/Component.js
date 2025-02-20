"use strict";

import { TrastedPolicy } from './TrastedPolicy.js';

/**
 * Abstract component for HTML custom elements
 *
 * @class Component
 */
export default class extends HTMLElement {
    /**
     * Creating safe html
     */
    createHTML(html) {
      return TrastedPolicy.createHTML(html);
    }
}