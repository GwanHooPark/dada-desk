export default {
	fetchTabs() {
		return chrome.tabs.query({ currentWindow: true });
	},
	fetchTabGroups() {
		return chrome.tabGroups.query({ windowId: -2 });
	},
	fetchTabOrder(tabId, index, groupId) {
		chrome.tabs.move(tabId, { index: index });
		//chrome.tabs.group({ groupId: groupId, tabIds: tabId });
	},
	fetchTabOrderToOtherGroup(tabId, groupId) {
		chrome.tabs.group({ tabIds: tabId, groupId: groupId });
	},
};
