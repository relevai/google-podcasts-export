export async function useSubscriptionStore() {

  // create function to get subscriptions from chrome local storage
  async function getSubscriptions() {
    const { subscriptions } = await chrome.storage.local.get('subscriptions')
    return subscriptions || []
  }

  // save subscriptions to chrome local storage
  async function saveSubscriptions(subscriptions) {
    await chrome.storage.local.set({ subscriptions })
  }

  // get next subscription without history
  async function getNextSubscriptionWithoutHistory() {
    const subscriptions = await getSubscriptions()
    return subscriptions.find((item) => !item.listeningHistory)
  }

  async function saveHistoryForSubscription(url, data) {
    const subscriptions = await getSubscriptions()
    // map history to all subscriptions matching url
    const updatedSubscriptions = subscriptions.map((item) => {
      if (item.googlePodcastsUrl.startsWith(url)) {
        return { ...item, listeningHistory: data?.items, feedUrl: data?.feedUrl, website: data?.website }
      }
      return item
    })
    await saveSubscriptions(updatedSubscriptions)
  }

  // create a function exportIsReady to check if all subscriptions have history and return true or false
  // also subscriptions have to be non empty array
  async function exportIsReady() {
    const subscriptions = await getSubscriptions()
    return subscriptions.length > 0 && subscriptions.every((item) => item.listeningHistory)
  }

  // create function stats that returns number of subscriptions, number of completedd episodes and number of started episodes
  async function stats() {
    const subscriptions = await getSubscriptions()
    const totalSubscriptions = subscriptions.length
    const totalCompleted = subscriptions.filter((item) => item.listeningHistory?.state === 'completed').length
    const totalStarted = subscriptions.filter((item) => item.listeningHistory?.state === 'started').length
    // number of items in queue
    const queue = await getQueue()
    const totalInQueue = queue.length
    return { totalSubscriptions, totalCompleted, totalStarted, totalQueue }
  }

  async function resetSubscriptions() {
    await chrome.storage.local.set({ subscriptions: [] })
  }

  async function getQueue() {
    const { queue } = await chrome.storage.local.get('queue')
    return queue || []
  }

  async function saveQueue(queue) {
    await chrome.storage.local.set({ queue })
  }


  const subscriptions = await getSubscriptions()

  return {
    subscriptions,
    getSubscriptions,
    saveSubscriptions,
    getNextSubscriptionWithoutHistory,
    saveHistoryForSubscription,
    exportIsReady,
    stats,
    resetSubscriptions,
    getQueue,
    saveQueue
  }
}
