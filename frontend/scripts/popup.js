"use strict";

const API_URI = 'http://127.0.0.1:8000/predict';

document.addEventListener("DOMContentLoaded", () => {
	const $field = document.querySelector('textarea');
	const $checkButton = document.querySelector('.larger-text');
	const $modal = document.querySelector('.modal');

	attachCloseEvent();
	attachQuitEvent();
	attachMenuEvent();

	$checkButton.addEventListener('click', async () => {
		if (!$field.value.trim()) return;
		showLoadingState();

		try {
			const response = await fetch(API_URI, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ content: $field.value })
			});
			const data = await response.json();
			
			const isSafe = data.prediction === 0; // Assuming 0 means safe, 1 means phishing
			showResult(isSafe ? 'Low' : 'High');
		} catch (error) {
			showError();
		}
	});

	function showLoadingState() {
		$modal.innerHTML = `
			<div class="modal-header">
				<button class="close">&times;</button>
				<span class="title">[Analysis Results]</span>
			</div>
			<p class="description">
				<p>Analyzing... <span class="loading-spinner"></span></p>
			</p>
		`;
		attachCloseEvent();
	}

	function showResult(message) {
		$modal.innerHTML = `
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
		`;
		attachCloseEvent();
		attachQuitEvent();
		attachMenuEvent();
	}

	function showError() {
		$modal.innerHTML = `
			<div class="modal-header">
				<button class="close">&times;</button>
				<span class="title">[Error]</span>
			</div>
			<p class="description">Sorry, an error occurred while fetching the analysis.</p>
		`;
		attachCloseEvent();
	}

	function attachCloseEvent() {
		const closeButton = document.querySelector('.close');
		if (closeButton) {
			closeButton.addEventListener('click', () => {
				window.close()
			});
		}
	}

	function attachQuitEvent() {
		const quitButton = document.querySelector('.quit');
		if (quitButton) {
			quitButton.addEventListener('click', () => {
				window.close()
			});
		}
	}

	function attachMenuEvent() {
		const mainMenuButton = document.querySelector('.main-menu');
		if (mainMenuButton) {
			mainMenuButton.addEventListener('click', showMainMenu);
		}
	}

	function attachAboutMeEvent() {
		const mainMenuButton = document.querySelector('.about');
		if (mainMenuButton) {
			mainMenuButton.addEventListener('click', showAbout);
		}
	}

	function showMainMenu() {
		$modal.innerHTML = `
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
		`;
		attachQuitEvent();
		attachCloseEvent();
		attachAboutMeEvent();
	}

	function showAbout() {
		$modal.innerHTML = `
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
		`;
		attachQuitEvent();
		attachCloseEvent();
		attachMenuEvent();
	}
});
