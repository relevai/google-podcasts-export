import { useSubscriptionStore } from '@/stores/subscription.store'
import * as XLSX from 'xlsx'

export async function useDownloader() {

  const { getSubscriptions, getQueue } = await useSubscriptionStore()

  // now download divCompleted as a JSON file
  async function downloadJsonFile() {

    const subscriptions = await getSubscriptions()
    const queue = await getQueue()

    console.log('subscriptions', subscriptions)
    console.log('queue', queue)

    const file = new Blob([
      JSON.stringify({
        subscriptions,
        queue
      })
    ], { type: 'application/json' })
    const a = document.createElement('a')
    const url = URL.createObjectURL(file)
    a.href =
      url
    a.download = `google-podcasts-export-${new Date().toISOString()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  async function downloadXlsxFile() {

    const subscriptions = await getSubscriptions()
    const queue = await getQueue()

    const subscriptionSheet = XLSX.utils.json_to_sheet(subscriptions.map((item) => {
      return {
        Title: item.title,
        Website: item.website,
        'Feed URL': item.feedUrl,
        'Google Podcasts URL': item.googlePodcastsUrl,
        '# items in listening history': item.listeningHistory?.length,
      }
    }))

    const listeningHistorySheet = XLSX.utils.json_to_sheet(subscriptions.map((item) => {
      return item.listeningHistory?.map((historyItem) => {
        return {
          'Podcast Title': item.title,
          Title: historyItem.title,
          'State': historyItem.state,
          'Remaining': historyItem.remaining,
          'Episode URL': historyItem.episodeUrl,
          'Google Podcasts URL': historyItem.googlePodcastsUrl,
          'Description': historyItem.description,
        }
      })
    }).flat())

    const queueSheet = XLSX.utils.json_to_sheet(queue.map((item) => {
      return {
        'Podcast Title': item.podcastTitle,
        Title: item.episodeTitle,
        'Episode Date': item.episodeDate,
        Time: item.time,
        'Episode URL': item.episodeUrl,
        'Short Description': item.shortDescription,
      }
    }))


    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, subscriptionSheet, 'Subscriptions')
    XLSX.utils.book_append_sheet(wb, listeningHistorySheet, 'Listening History')
    XLSX.utils.book_append_sheet(wb, queueSheet, 'Queue')
    XLSX.writeFile(wb, `google-podcasts-export-${new Date().toISOString()}.xlsx`)
  }

  return {
    downloadJsonFile,
    downloadXlsxFile,
  }
}
