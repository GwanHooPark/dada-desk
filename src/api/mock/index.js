import tabs from './data/tabData.json';
import groups from './data/tabGroupData.json';

const fetch = (mockData, time = 0) => {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(mockData);
		}, time);
	});
};

export default {
	fetchTabGroups() {
		return fetch(groups, 1000);
	},
	fetchTabs() {
		return fetch(tabs, 1000);
	},
};
