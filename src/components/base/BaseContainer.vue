<template>
  <div class="container">
    <div class="columns">
      <div class="column is-9">
				<slot />
			</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
	.columns{
		justify-content: center;
	}
</style>