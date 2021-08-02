<template>
	<div id="app" class="min-h-screen w-screen bg-gray-300 flex items-center p-4">
		<div v-for="group in groups" :key="group.id" class="border-gray-200 rounded-md p-2 m-1 bg-gray-200" style="width:220px">
			<div :class="groupColor(group.color)" class="border-l-4 text-base font-semibold p-1 text-gray-500">{{ group.title }}</div>
			<draggable
				:list="group.tabs"
				:animation="150"
				group="group.tabs"
				filter=".action-button"
				ghost-class="moving-card"
				class="w-full max-w-md my-1 overflow-y-auto h-1/2"
				tag="ul"
				:move="moveTab"
				@end="moveEnd"
			>
				<TabCard v-for="tab in group.tabs" :key="tab.id" :tab="tab" @on-delete="onDelete"></TabCard>
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
			tabs: [],
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
		this.getTabInfo();
	},
	methods: {
		groupColor(color) {
			console.log(color);
			return `border-${color}-500`;
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
		async getTabInfo() {
			const tabs = await this.getTabs();
			this.tabs = Object.keys(tabs).map(o => tabs[o]);
			const groups = await this.getTabGroups();
			this.groups = Object.keys(groups).map(o => {
				console.log(groups[o]);
				return {
					id: groups[o].id,
					color: groups[o].color,
					title: groups[o].title,
					tabs: this.tabs.filter(t => t.groupId == groups[o].id),
				};
			});
			console.log('getTabInfo');
			console.log(this.groups);
		},
		moveEnd(e) {
			this.getTabInfo();
		},
		moveTab(e) {
			console.log('Future index: ' + e.draggedContext.futureIndex);
			const draggedContext = e.draggedContext;
			const relatedContext = e.relatedContext;
			console.log(
				` [draggedContext.element.groupId] : ${draggedContext.element.groupId} [relatedContext.element.groupId] : ${relatedContext.element.groupId}`,
			);
			if (draggedContext.element.groupId != relatedContext.element.groupId) {
				console.log('diff');
				console.log(e);
				client.fetchTabOrderToOtherGroup(draggedContext.element.id, relatedContext.element.groupId);
			} else {
				console.log('same');
				console.log(e);
				console.log(draggedContext);
				client.fetchTabOrder(relatedContext.element.id, draggedContext.element.index); //대상 index를 드래그한 index로 변경
				draggedContext.element.index = relatedContext.element.index; //드래그 후 드랍하지 않고 연속으로 움직을때 순차적으로 바꿔줘야함
				client.fetchTabOrder(draggedContext.element.id, relatedContext.element.index); //드래그 index를 대상 index로 변경
			}
		},
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
