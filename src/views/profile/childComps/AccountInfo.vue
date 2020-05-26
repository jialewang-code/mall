<template>
	<div class="account">
		<div class="account-item">
			<div class="number"><span class="balance">0.00</span>元</div>
			<div class="info">我的余额</div>
		</div>
		<div class="account-item">
			<div class="number"><span class="balance">0</span>个</div>
			<div class="info">我的优惠</div>
		</div>
		<div class="account-item">
			<div class="number"><span class="balance">0</span>分</div>
			<div class="info">我的积分</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "AccountInfo"
	};
</script>
<style scoped>
	.account {
		display: flex;
		height: 80px;
		justify-content: center;
		align-items: center;
	}
	.account-item {
		flex: 1;
		color: #666;
		font-size: 13px;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		border-right: solid 1px #eee;
		height: 80px;
	}
	.account-item:last-of-type {
		border-right: none;
	}
	.account-item .balance {
		font-size: 24px;
		font-weight: 700;
		color: #ff5f3e;
	}
	.info {
		margin-top: 2px;
	}
</style>
