<template>
	<li class="p-2 mb-3 flex justify-between items-center bg-white shadow rounded-lg cursor-move border border-white">
		<div class="flex items-center">
			<img class="w-7 h-7 rounded-lg" :src="user.avatar" :alt="user.name" />
			<p class="ml-2 text-gray-700 font-semibold font-sans tracking-wide">{{ user.name }}</p>
		</div>
		<div class="flex">
			<!-- <button
				aria-label="Edit user"
				class="action-button p-1 focus:outline-none focus:shadow-outline text-teal-500 hover:text-teal-600"
				@click="$emit('on-edit', user)"
			>
				<EditIcon />
			</button> -->
			<button
				aria-label="Delete user"
				class="action-button p-1 focus:outline-none focus:shadow-outline text-gray-500 hover:text-red-600"
				@click="$emit('on-delete', user)"
			>
				<XIcon />
			</button>
		</div>
	</li>
</template>
<script>
import { EditIcon, Trash2Icon, XIcon } from 'vue-feather-icons';
export default {
	components: {
		// 	EditIcon,
		//Trash2Icon,
		XIcon,
	},
	props: {
		user: {
			type: Object,
			default: () => ({}),
		},
	},
};
</script>
