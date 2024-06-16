import { useSubscriptionStore } from 'src/stores/subscription.store'

chrome.runtime.onInstalled.addListener(async (opt) => {
  // Check if reason is install or update. Eg: opt.reason === 'install' // If extension is installed.
  // opt.reason === 'update' // If extension is updated.
  if (opt.reason === 'install') {
    await chrome.storage.local.clear()

    chrome.tabs.create({
      active: true,
      // Open the setup page and append `?type=install` to the URL so frontend
      // can know if we need to show the install page or update page.
      url: chrome.runtime.getURL('./src/options/index.html'),
    })
  }

  // if (opt.reason === 'update') {
  //   chrome.tabs.create({
  //     active: true,
  //     url: chrome.runtime.getURL('./src/setup/index.html?type=update'),
  //   })
  // }
})

console.log('hello world from background')

self.onerror = function (message, source, lineno, colno, error) {
  console.info(
    `Error: ${message}\nSource: ${source}\nLine: ${lineno}\nColumn: ${colno}\nError object: ${error}`
  )
}

let tabId = null

// handle messages from content script
chrome.runtime.onMessage.addListener(async (message, _sender, _sendResponse) => {

  const {
    getSubscriptions,
    saveSubscriptions,
    getNextSubscriptionWithoutHistory,
    saveHistoryForSubscription,
    getQueue,
    saveQueue,
  } = await useSubscriptionStore()

  async function gotoNextSubscriptionOrFinish(tabId, sender) {
    const nextPodcast = await getNextSubscriptionWithoutHistory()
    console.log('nextPodcast', nextPodcast)
    if (nextPodcast) {
      chrome.tabs.sendMessage(sender.tab.id, {
        type: 'changeLocation',
        data: nextPodcast,
      })
    } else {
      tabId = null
      console.log('all podcasts are scraped')

      chrome.tabs.remove(sender.tab.id)

      // open the options page
      chrome.tabs.create({
        active: true,
        url: chrome.runtime.getURL('./src/options/index.html'),
      })
    }
  }

  console.log('message', message)

  /***
   * Run scraper
   */
  if (message.action === 'runScraper') {
    // create tab with Google Podcasts subscriptions and save the tabId
    const tab = await chrome.tabs.create({
      active: true,
      url: 'https://podcasts.google.com/queue',
    })
    tabId = tab.id
  }

  /***
   * Scraped queue
   */
  if (message.type === 'scrapedQueue') {
    if (_sender.tab.id !== tabId) {
      console.log('not scraping queue in this tab', _sender.tab.id)
      return
    }
    console.log('scrapedQueue', message)

    await saveQueue(message.data)

    chrome.tabs.sendMessage(_sender.tab.id, {
      type: 'changeLocation',
      data: { googlePodcastsUrl: 'https://podcasts.google.com/subscriptions' },
    })
  }

  /***
   * Scraped subscriptions
   */
  if (message.type === 'scrapedSubscriptions') {
    if (_sender.tab.id !== tabId) {
      console.log('not scraping subscriptions in this tab', _sender.tab.id)
      return
    }
    console.log('scrapedSubscriptions', message)

    const subscriptions = await getSubscriptions()
    if (subscriptions.length > 0) {
      console.log('subscriptions already exist')
    } else {
      await saveSubscriptions(message.data)
    }

    await gotoNextSubscriptionOrFinish(tabId, _sender)
  }

  /***
   * Scraped feed
   */
  if (message.type === 'scrapedFeed') {
    if (_sender.tab.id !== tabId) {
      console.log('not scraping subscriptions in this tab', _sender.tab.id)
      return
    }
    console.log('scrapedFeed', message)

    // get _sender tab url without query params using chrome api
    const tab = await chrome.tabs.get(_sender.tab.id)
    const url = new URL(tab.url)
    const podcastUrl = url.origin + url.pathname

    console.log('feed url', podcastUrl)

    // save podcast history to subscriptions array, find right podcast by url
    await saveHistoryForSubscription(podcastUrl, message.data)

    await gotoNextSubscriptionOrFinish(tabId, _sender)
  }

})


export {}
