<template>
	<nav class="navbar justify-between bg-base-100">
		<div class="flex">
			<button
				v-if="$route.meta.showBack"
				class="btn btn-ghost p-2 hover:bg-inherit"
				@click="$router.back()"
			>
				<Icon size="24" name="uil:angle-left-b" />
			</button>

			<h1 v-if="$route.meta.title" class="text-xl">{{ $route.meta.title }}</h1>
		</div>

		<div id="headerContent"></div>
	</nav>
</template>
