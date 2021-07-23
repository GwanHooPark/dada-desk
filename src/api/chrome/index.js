export default {
	fetchTabs() {
		console.log('api chrome');
		return chrome.tabs.query({ currentWindow: true });
	},
	fetchTabGroups() {
		console.log('api chrome');
		return chrome.tabGroups.query({ windowId: -2 });
	},
};
