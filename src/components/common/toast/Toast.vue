<template>
	<div class="toast" v-show="isShow">
		{{ message }}
	</div>
</template>

<script>
	export default {
		name: "Toast",
		props: {
			// message: {
			// 	type: String,
			// 	default: ""
			// },
			// show: {
			// 	type: Boolean,
			// 	default: false
			// }
		},
		data() {
			return {
				message: "",
				isShow: false
			};
		},
		methods: {
			show(message, duration = 1500) {
				this.isShow = true;
				this.message = message;

				setTimeout(() => {
					this.isShow = false;
					this.message = "";
				}, duration);
			}
		}
	};
</script>
<style scoped>
	.toast {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 999;
		background-color: rgba(0, 0, 0, 0.5);
		color: white;
		padding: 8px 15px;
		border-radius: 5px;
	}
</style>
