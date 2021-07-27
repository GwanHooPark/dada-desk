<template>
	<div id="app" class="min-h-screen w-screen bg-gray-300 flex items-center p-4">
		<div v-for="group in groups" :key="group.id" class="border-gray-200 rounded-md p-2 m-1 bg-gray-200" style="width:220px">
			<div :class="groupColor(group.color)" class="border-gray-500 border-l-4 text-base font-semibold p-1 text-gray-500">{{ group.title }}</div>
			<draggable
				:list="group.tabs"
				:animation="150"
				group="group.tabs"
				filter=".action-button"
				ghost-class="moving-card"
				class="w-full max-w-md my-1 overflow-y-auto h-1/2"
				tag="ul"
				:move="moveTab"
			>
				<TabCard v-for="tab in group.tabs" :key="tab.id" :tab="tab" @on-edit="onEdit" @on-delete="onDelete"></TabCard>
			</draggable>
		</div>
	</div>
</template>

<script>
import draggable from 'vuedraggable';
import TabCard from '@/components/tabGroup/TabCard';
import client from 'api-client';
export default {
	name: 'App',
	components: {
		draggable,
		TabCard,
	},
	data() {
		return {
			groups: [],
			tabs: [
				{
					id: 1,
					name: '네이버',
					avatar: 'https://www.naver.com/favicon.ico?1',
				},
				{
					id: 2,
					name: 'Violet Gates abcr 가나다 라마바',
					avatar: 'https://portal.daou.co.kr/resources/images/favicon/DO_favicon.ico?rev=202106032023',
				},
				{
					id: 3,
					name: 'Steve Jobs',
					avatar: 'https://www.clien.net/service/image/favicon.ico',
				},
				{
					id: 4,
					name: 'Yassine Smith',
					avatar: 'https://funshop.akamaized.net/www/favicon.ico',
				},
				{
					id: 5,
					name: 'Senior Saez',
					avatar: 'https://www.google.co.kr/favicon.ico',
				},
			],
		};
	},
	async mounted() {
		// this.getCurrentTabGroups().then(groups => {
		// 	this.tabGroups = this.getTabGroupsInfo(groups);
		// });
		// console.log(this.mockData);
		// console.log('111');
		// console.log(this.tabGroups);
		//this.tabGroups = this.getTabGroupsInfo(currentGroups);
		//잠시주석
		const tabs = await this.getTabs();
		this.tabs = Object.keys(tabs).map(o => tabs[o]);
		console.log(this.tabs);
		const groups = await this.getTabGroups();
		this.groups = Object.keys(groups).map(o => {
			return {
				id: groups[o].id,
				color: groups[o].color,
				title: groups[o].title,
				tabs: this.tabs.filter(t => t.groupId == groups[o].id),
			};
		});
	},
	methods: {
		groupColor(color) {
			return `border-${color}-500`;
		},
		onEdit(user) {
			alert(`Editing ${user.name}`);
		},
		onDelete(user) {
			alert(`Deleting ${user.name}`);
		},
		getTabs() {
			return client.fetchTabs();
		},
		getTabGroups() {
			return client.fetchTabGroups();
		},
		moveTab(e) {
			console.log(e);
			console.log('Future index: ' + e.draggedContext.futureIndex);
			const draggedContext = e.draggedContext;
			const relatedContext = e.relatedContext;
			if (draggedContext.element.groupId != relatedContext.element.groupId) {
				console.log('diff');
				client.fetchTabOrderToOtherGroup(relatedContext.element.groupId, draggedContext.element.id, draggedContext.futureIndex);
			} else {
				console.log('same');
				client.fetchTabOrder(e.draggedContext.element.id, e.draggedContext.futureIndex);
			}
		},
		// async getDetailGroupInfo(group) {
		// 	console.log(group.id);
		// 	await chrome.tabs.query(
		// 		{
		// 			groupId: group.id,
		// 		},
		// 		function(o) {
		// 			console.log(o);
		// 		},
		// 	);
		// },
	},
};
</script>
<style scoped>
.moving-card {
	opacity: 0.5;
	background: #f7fafc;
	border: 1px solid #4299e1;
}
</style>
