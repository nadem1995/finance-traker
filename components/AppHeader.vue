<template>
  <header class="flex justify-between items-center">
    <NuxtLink :to="{ name: 'index' }" class="text-xl font-bold">
      Finance traker
    </NuxtLink>
    <div>
      <UAvatar
        src="https://avatars.githubusercontent.com/u/739984?v=4"
        alt="Avatar"
      />
    </div>
  </header>
</template>