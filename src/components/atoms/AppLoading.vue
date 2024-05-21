<script setup lang="ts">
</script>

<template>
    <div class="custom-loader"></div>
</template>

<style scoped lang="scss">
.custom-loader {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: 
    radial-gradient(farthest-side, var(--main),#0000) top/8px 8px no-repeat,
    conic-gradient(#0000 30%, var(--main));
    -webkit-mask: radial-gradient(farthest-side,#0000 calc(100% - 8px),#000 0);
    animation:s3 1s infinite linear;
}

@keyframes s3{ 
  100%{transform: rotate(1turn)}
}
</style>