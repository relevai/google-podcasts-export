<script setup lang="ts">
import { useSubscriptionStore } from '@/stores/subscription.store';

const { runExport, resetStorageAndRunExport } = useExportFunctions();

const downloadJsonFile = async () => {
  const { downloadJsonFile } = await useDownloader();
  await downloadJsonFile();
}

const downloadXlsxFile = async () => {
  const { downloadXlsxFile } = await useDownloader();
  await downloadXlsxFile();
}

// get stats TODO: implement reactive stat variables
// const getStats = async () => {
//   const { stats } = await useSubscriptionStore();
//   const { totalSubscriptions, totalCompleted, totalStarted, totalInQueue } = await stats();
//   return { totalSubscriptions, totalCompleted, totalStarted, totalInQueue };
// };

// const { totalSubscriptions, totalCompleted, totalStarted, totalInQueue } = await getStats();

</script>


<template>
  <div class="mb-12 mr-12 ml-12 text-base">

    <p class="mb-4">
      Exporting your data may take a while. Please be patient.
    </p>

    <button @click="runExport" class="btn btn-primary btn-wide mb-4">
      Export
    </button>


    <!-- <h3 class="text-xl font-bold mb-2">Export status</h3>
    <table class="table-auto">
      <thead>
        <tr>
          <th class="px-4 py-2">Exported Subscriptions</th>
          <th class="px-4 py-2">Completed Episodes</th>
          <th class="px-4 py-2">Started Episodes</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="px-4 py-2">{{ 10 }}</td>
          <td class="px-4 py-2">{{ 20 }}</td>
          <td class="px-4 py-2">{{ 30 }}</td>
        </tr>
      </tbody>
    </table>

    <table class="table-auto">
      <thead>
        <tr>
          <th class="px-4 py-2">Exported Episodes in Queue</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="px-4 py-2">{{ 50 }}</td>
        </tr>
      </tbody>
    </table> -->

    <p class="mb-4">After the export is done, you can download the data in JSON or XLSX format.</p>

    <div class="mb-4">
      <button @click="downloadJsonFile" class="btn btn-primary btn-wide">
        Download JSON
      </button>
      &nbsp;&nbsp;&nbsp;
      <button @click="downloadXlsxFile" class="btn btn-primary btn-wide">
        Download XLSX
      </button>
    </div>

    <p class="mb-4">
      Is your data saved?
    </p>
    <p class="mb-4">
      <a href='https://ko-fi.com/O4O7Z5A4R' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://storage.ko-fi.com/cdn/kofi5.png?v=3' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>
    </p>

    <p class="mb-4">
      If you don't uninstall the extension, your data will stay stored in your browser, even after Google Podcasts end of life.
    </p>

    <p class="mb-4">Contact your Podcast App author and ask them to import downloaded files into your account.</p>


    <h3 class="text-xl font-bold mb-2">Troubleshooting</h3>

    <p class="mb-4">Is there a problem with the export? Try resetting and exporting again.</p>

    <button @click="resetStorageAndRunExport" class="btn btn-primary btn-wide mb-4">
      Reset and Export Again
    </button>

    <h3 class="text-xl font-bold mb-2">Notes</h3>
    <ul class="list-disc ml-6 mb-4">
      <li>This extension is not affiliated with Google Podcasts.</li>
      <li>Extension will only browse through podcasts you are subscribed to. Episodes that you listened to in podcasts you don’t follow or the podcasts that you unsubscribed from won’t be stored.</li>
      <li>Exported data is stored in your browser's local storage.</li>
      <li>Exported data is not sent to any server.</li>
    </ul>
  </div>
</template>

<style scoped>

</style>
