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

		@import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap');
		
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

			color: white;
			font-size: 14px;
			font-weight: 400;
			font-style: normal;
			font-family: monospace;

			transition: background .25s;
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

		/* popup messages */
		.space-mono-regular {
			font-family: monospace;
			font-weight: 400;
			font-style: normal;
		}

		.space-mono-bold {
			font-family: monospace;
			font-weight: 700;
			font-style: normal;
		}

		.space-mono-regular-italic {
			font-family: monospace;
			font-weight: 400;
			font-style: italic;
		}

		.space-mono-bold-italic {
			font-family: monospace;
			font-weight: 700;
			font-style: italic;
		}

		.modal {
			background-color: #111;
			border: none;
			width: 350px;
			max-height: 80vh;
			padding: 25px 35px;
			text-align: left;
			border-radius: 30px;
			box-shadow: 0px 0px 15px rgba(255, 255, 255, 0.2);
			position: relative;
			overflow-y: auto;
		}

		/* Style the scrollbar */
		.modal::-webkit-scrollbar {
			width: 8px;
		}

		/* Style the scrollbar thumb (the draggable part) */
		.modal::-webkit-scrollbar-thumb {
			background-color: rgb(57, 57, 57); /* Gray color for the thumb */
			border-radius: 4px; /* Rounded corners */
		}

		/* Style the scrollbar */

		.modal-header {
			display: flex;
			justify-content: space-between;
			font-weight: bold;
			align-items: center;
			font-size: 18px;
			color: white;
		}

		.close {
			background: rgb(235, 223, 235);
			border: none;
			color: rgb(0, 0, 0);
			font-size: 25px;
			cursor: pointer;
			border-radius: 50%;
			width: 23px; 
			height: 23px;
			display: flex; 
			align-items: center;
			justify-content: center; 
		}

		.description {
			font-size: 18px;
			margin-bottom: 10px;
			margin-top: 40px;
			color: rgb(235, 223, 235);
		}

		.send {
			display: block;
			margin: 0 auto 10px;
			background: none;
			border: none;
			color: #0084ff;
			font-size: 16px;
			cursor: pointer;
		}

		.modal-footer {
			display: flex;
			justify-content: flex-end;
		}

		.right-buttons {
			margin-top: 35px;
			display: flex;
			width: 100%;
			flex-direction: column;
			align-items: flex-end;
			justify-content: end;
			gap: 5px;
		}

		button {
			width: 100%;
			height: 40px;
			font-family: monospace;
			background: #111;
			border: none;
			text-align: end;
			color: #4199f3;
			font-size: 21px;
			cursor: pointer;
			outline: none;
		}

		button:hover {
			color: rgb(149, 198, 248);
		}

		button {
			transition: color 0.5s ease-in-out;
		}

		button:active {
			color: rgb(149, 198, 248);
			animation: delayChange 0.5s linear forwards;
		}

		@keyframes delayChange {
			0% {
				color: inherit;
			}
			100% {
				color: rgb(149, 198, 248);
			}
		}
		.larger-text, .larger-text-tmp {
			font-weight: normal; 
			color: rgb(235, 223, 235);
		}

		.larger-text {
			color: var(--accent-color);
		}

		.larger-text {
			color: var(--accent-color);
		}

		.larger-text-tmp {
			font-size: 22px; 
			font-weight: normal; 
			color: rgb(235, 223, 235);
		}

		.highlight {
			text-decoration: underline;
			text-decoration-color: #4199f3;
		}

		.highlight {
			text-decoration: underline;
			text-decoration-color: #4199F3;
		}


		/* loading */
		.loading-spinner {
			display: inline-block;
			width: 20px;
			height: 20px;
			border: 3px solid rgba(255, 255, 255, 0.3);
			border-top-color: #fff;
			border-radius: 50%;
			animation: animation-loading 1s infinite linear;
		}
		@keyframes animation-loading {
			from {
				transform: rotate(0deg);
			}
			to {
				transform: rotate(360deg);
			}
		}
		</style>
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
		/*
			Sending POST request to the FastAPI server
		*/
		fetch(this.API_URI, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				content: document.getSelection()?.toString() ?? '' // Extracting the selected text from the page
			})
		})
			.then(res => res.json())
			.then(data => {
				const isSave = data.prediction === 0; // Assuming 0 means safe, 1 means phishing

				const detail = {
					isSave: isSave,
					message: isSave ? 'Low' : 'High'
				};

				document.dispatchEvent(new CustomEvent('AntiPhishingChecked', {
					detail
				}));
			})
			.catch(error => {
				console.error("Error while checking phishing:", error);
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
		function mockServerResponse() {
			return new Promise(resolve => {
				setTimeout(() => {
					resolve(message);
				}, 2000);
			});
		}

		// Call successMessage with the mock function
		this.Message(mockServerResponse);
	}

	/**
	 * Rendering success state
	 *
	 * @param message
	 */
	async Message(fetchAnalysis) {
		// Show loading state immediately
		this.render(`
		<div class="modal">
			<div class="modal-header">
				<button class="close">&times;</button>
				<span class="larger-text-tmp">[Analysis Results]</span>
			</div>
			<p class="description">
				<p>Thank you for your input.</p	>
				<p>Analyzing... <span class="loading-spinner"></span></p>
			</p>
		</div>
	`);

		// Attach event listener to close button
		this.root.querySelector(".close").addEventListener("click", () => this.onClose());

		try {
			// Wait for the response from the server
			const message = await fetchAnalysis();

			// Update the UI with the actual result
			this.render(`
			<div class="modal">
				<div class="modal-header">
					<button class="close">&times;</button>
					<span class="larger-text-tmp">[Analysis Results]</span>
				</div>
				<div class="description">
					<p>Thank you for your input.</p>
					<p>According to my analysis, the text you provided has a <span class="highlight">${message}</span> chance of being malicious.</p>
					<p>Please, do keep in mind that I am a machine and I cannot perceive context, so I highly suggest you make use of both my analysis and the knowledge.</p>
					<p>Where would you like to go now?</p>
				</div>
				<div class="right-buttons">
					<button class="main-menu">[Main menu]</button>
					<button class="quit">[Quit]</button>
				</div>
			</div>
		`);

			// Attach event listeners after rendering
			this.root.querySelector(".close").addEventListener("click", () => this.onClose());
			this.root.querySelector(".quit").addEventListener("click", () => this.onClose());
			this.root.querySelector(".main-menu").addEventListener("click", () => this.showMainMenu());

		} catch (error) {
			this.render(`
			<div class="modal">
				<div class="modal-header">
					<button class="close">&times;</button>
					<span class="larger-text-tmp">[Analysis Results]</span>
				</div>
				<p class="description">
					<p>Sorry, an error occurred while fetching the analysis.</p>
				</p>
			</div>
		`);

			this.root.querySelector(".close").addEventListener("click", () => this.onClose());
		}
	}

	showMainMenu() {
		this.render(`
			<div class="modal">
				<div class="modal-header">
					<button class="close">&times;</button>
					<span class="larger-text-tmp">[Main Screen]</span>
				</div>
				<div class="description">
					<p>Good day to you. I am <span class="highlight">Lock</span>.</p>
					<p>My assignment is to help you stay safe from social engineering attacks. Aside from a <span class="highlight">knowledge base</span> that I have prepared for you, I am also capable of analysing texts and determining the possibility of them being malicious.</p>
					<p>Please, do keep in mind that I am a machine and I cannot perceive context, so I highly suggest you make use of both my analysis and the knowledge.</p>
					<p>Where do you want to go now?</p>
				</div>
				<div class="right-buttons">
					<button class="about">[About Me]</button>
					<button class="quit">[Quit]</button>
				</div>
			</div>
		`);

		this.root.querySelector(".close").addEventListener("click", () => this.onClose());
		this.root.querySelector(".quit").addEventListener("click", () => this.onClose());
		this.root.querySelector(".about").addEventListener("click", () => this.showAbout());
	}

	showAbout() {
		this.render(`
			<div class="modal">
				<div class="modal-header">
					<button class="close">&times;</button>
					<span class="title">[About Trigger_Lock]</span>
				</div>

				<p class="description">// My name is Lock. I am a service, created to help combat the threat of social engineering, by IPV Team, during the CyberTech Sprint in Tumo Labs.</p>
				<p class="description">
					<br> // My code is fully open-source, if you would like to take a look.
				</p>

				<div class="right-buttons">
					<button class="main-menu">[Main Menu]</button>
					<button class="quit">[Quit]</button>
				</div>
			</div>
		`);

		this.root.querySelector(".close").addEventListener("click", () => this.onClose());
		this.root.querySelector(".quit").addEventListener("click", () => this.onClose());
		this.root.querySelector(".main-menu").addEventListener("click", () => this.showMainMenu());
	}

}

/**
 * Registering custom HTML element
 */
customElements.define('anti-phishing', AntiPhishingComponent);
