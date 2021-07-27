export default {
	fetchTabs() {
		console.log('api chrome');
		return chrome.tabs.query({ currentWindow: true });
	},
	fetchTabGroups() {
		console.log('api chrome');
		return chrome.tabGroups.query({ windowId: -2 });
	},
	fetchTabOrder(tabId, index) {
		chrome.tabs.move(tabId, { index: index });
	},
	fetchTabOrderToOtherGroup(groupId, tabId, index) {
		chrome.tabs.group({ groupId: groupId, tabIds: tabId });
	},
};
