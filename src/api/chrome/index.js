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
	fetchTabOrderToOtherGroup(groupId, tabId, index) {
		chrome.tabs.group({ groupId: groupId, tabIds: tabId });
	},
};
