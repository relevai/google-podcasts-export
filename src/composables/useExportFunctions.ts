export function useExportFunctions() {

  function runExport() {
    // send message to background.js
    chrome.runtime.sendMessage({ action: 'runScraper' });
  }

  function resetStorageAndRunExport() {
    chrome.storage.local.clear(() => {
      runExport();
    });
  }


  return {
    runExport,
    resetStorageAndRunExport,
  }
}
