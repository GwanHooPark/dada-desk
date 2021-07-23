<template>
	<div id="app" class="min-h-screen w-screen bg-gray-200 flex items-center justify-center">
		<draggable :list="users" :animation="200" ghost-class="moving-card" group="users" filter=".action-button" class="w-full max-w-md" tag="ul">
			<user-card v-for="user in users" :key="user.id" :user="user" @on-edit="onEdit" @on-delete="onDelete"></user-card>
		</draggable>
	</div>
</template>

<script>
import draggable from 'vuedraggable';
import UserCard from './components/UserCard';
import client from 'api-client';
export default {
	name: 'App',
	components: {
		draggable,
		UserCard,
	},
	data() {
		return {
			users: [
				{
					id: 1,
					name: 'Adrian Schubert',
					avatar: 'https://pickaface.net/gallery/avatar/unr_sample_161118_2054_ynlrg.png',
				},
				{
					id: 2,
					name: 'Violet Gates',
					avatar: 'https://pickaface.net/gallery/avatar/freud51c8b3f65e7dc.png',
				},
				{
					id: 3,
					name: 'Steve Jobs',
					avatar: 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png',
				},
				{
					id: 4,
					name: 'Yassine Smith',
					avatar: 'https://pickaface.net/gallery/avatar/unr_yassine_191124_2012_3gngr.png',
				},
				{
					id: 5,
					name: 'Senior Saez',
					avatar: 'https://pickaface.net/gallery/avatar/elmedinilla541c03412955c.png',
				},
			],
		};
	},
	mounted() {
		// this.getCurrentTabGroups().then(groups => {
		// 	this.tabGroups = this.getTabGroupsInfo(groups);
		// });
		//console.log(this.mockData);
		// console.log('111');
		// console.log(this.tabGroups);
		//this.tabGroups = this.getTabGroupsInfo(currentGroups);
		//잠시주석
		// this.getTabs().then(o => {
		// 	console.log('444');
		// 	console.log(o);
		// 	this.getTabGroups().then(o => {
		// 		console.log('groups');
		// 		console.log(o);
		// 	});
		// });
	},
	methods: {
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
		async getDetailGroupInfo(group) {
			console.log(group.id);
			await chrome.tabs.query(
				{
					groupId: group.id,
				},
				function(o) {
					console.log(o);
				},
			);
		},
	},
};
</script>

<style>
/* Unfortunately @apply cannot be setup in codesandbox, 
but you'd use "@apply border opacity-50 border-blue-500 bg-gray-200" here */
.moving-card {
	opacity: 0.5;
	background: #f7fafc;
	border: 1px solid #4299e1;
}
</style>
