<script setup lang="ts">
import AppButton from '@/components/atoms/AppButton.vue'
</script>

<template>
    <div class="overlay">
        <div class="content">
            <h2>Are you sure u want to delete the question?</h2>
            <AppButton></AppButton>
        </div>
    </div>
</template>

<style scoped lang="scss">
.overlay {
    position: fixed; /* Stay in place */
    top: 0;
    left: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    background: rgba(0, 0, 0, 0.5); /* Black background with opacity */
    display: flex; /* Use flexbox to center content */
    justify-content: center; /* Center horizontally */
    align-items: center; /* Center vertically */
    z-index: 1000; /* Sit on top */

    .content {
        display: flex;
        flex-flow: column;
        gap: 1rem;
        width: 50%;
        background: white;
        padding: 20px;
        box-sizing: border-box;
        overflow: auto;
    }
}
</style>