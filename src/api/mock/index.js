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
		console.log('mock fetchTabGroups');
		console.log(groups);
		return fetch(groups, 1000);
	},
	fetchTabs() {
		console.log('mock fetchTabs');
		console.log(tabs);
		return fetch(tabs, 1000);
	},
};
