<script setup lang="ts">
const version = __VERSION__
const displayName = __DISPLAY_NAME__
const gitURL = __GITHUB_URL__
const gitCommit = __GIT_COMMIT__
</script>

<template>
  <div class="m-4 text-base">

    <blockquote class="mb-4 border-l-4 border-blue-500 pl-4">
      Google Podcasts is saying goodbye. After June 23, 2024, you will no longer be able to listen to podcasts in Google Podcasts.
    </blockquote>

    <p class="mb-4">
      The official Export feature allows users to export a list of their subscriptions in OPML format.
      However, it does not include listening history or queued episodes.
    </p>

    <p class="mb-4">
      This extension provides a solution by extracting <b>listening history</b> for each subscribed podcast and also exports <b>all queued episodes</b>.
      To use the extension, users must be logged into their Google account.
      You can download exported data either in XLSX or JSON format.
    </p>

    <p>Vesion: {{ version }}</p>
    <p>Author: Relevate Team</p>

    <!-- <Changelog /> -->
  </div>
</template>

<style scoped>
</style>
