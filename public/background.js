chrome.runtime.onInstalled.addListener(function() {
	chrome.action.onClicked.addListener(activeTab => {
		console.log('onclick~~');
		chrome.tabs.create({
			url: 'index.html',
		});
	});
});
