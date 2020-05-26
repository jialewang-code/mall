<template>
	<div class="user-info">
		<div class="avatar">
			<img src="~assets/img/profile/avatar.svg" alt="" />
		</div>
		<div class="info">
			<div class="login">登录/注册</div>
			<div class="phone">
				<img src="~assets/img/profile/phone.svg" alt="" />
				<span>暂无绑定手机号</span>
			</div>
		</div>
		<div class="arrow">
			<img src="~assets/img/common/arrow-left.svg" alt="" />
		</div>
	</div>
</template>

<script>
	export default {
		name: "UserInfo"
	};
</script>
<style scoped>
	.user-info {
		height: 85px;
		background-color: var(--color-tint);
		display: flex;
		color: #fff;
		padding: 6px 15px;
		align-items: center;
		/* justify-content: space-between; */
	}
	.avatar img {
		width: 70px;
		height: 70px;
	}
	.info {
		flex: 1;
		padding-left: 15px;
	}
	.phone {
		display: flex;
		align-items: center;
	}
	.phone span {
		font-size: 13px;
	}
	.phone img {
		width: 20px;
		height: 30px;
		margin-left: -5px;
	}
	.arrow img {
		width: 20px;
	}
</style>
