"use strict";

/**
 * Adding context menu item for selection context
 */
chrome.runtime.onInstalled.addListener(async () => {
  chrome.contextMenus.create({
	type: 'normal',
	contexts: ['selection'],
	id: 'antiPhishingCheck',
	title: 'Anti Phishing check'
  });
});

/**
 * Handling context menu item clicks
 */
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "antiPhishingCheck") {

	/**
	 * Getting active tab
	 */
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
	  const activeTab = tabs[0];

	  /**
	   * Executing start checking script (Loading state)
	   */
	  chrome.scripting.executeScript({
		target: { tabId: activeTab.id },
		func: startChecking,
	  });
	});
  }
});

/**
 * Executing Anti-Phishing banner loading state
 */
function startChecking() {
  document.dispatchEvent(new CustomEvent('AntiPhishingChecking'));
}
