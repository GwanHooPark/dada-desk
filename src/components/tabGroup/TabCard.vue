<template>
	<li class="p-2 mb-1 flex justify-between items-center bg-white shadow rounded-lg cursor-move border border-white">
		<div class="flex items-center truncate">
			<img v-if="tab.favIconUrl != ''" class="w-7 h-7 rounded-lg" :src="tab.favIconUrl" :alt="tab.title" />
			<MehIcon v-if="tab.favIconUrl == ''" />
			<p class="ml-2 text-gray-600 text-sm font-sans tracking-wide">{{ tab.title }}</p>
		</div>
		<div class="flex">
			<button
				aria-label="Delete user"
				class="action-button p-1 focus:outline-none focus:shadow-outline text-gray-400 hover:text-red-600"
				@click="$emit('on-delete', tab)"
			>
				<XIcon size="1x" />
			</button>
		</div>
	</li>
</template>
<script>
import { XIcon, MehIcon } from 'vue-feather-icons';
export default {
	components: {
		XIcon,
		MehIcon,
	},
	props: {
		tab: {
			type: Object,
			default: () => ({}),
		},
	},
};
</script>
