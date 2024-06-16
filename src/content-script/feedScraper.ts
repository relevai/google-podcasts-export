console.log('running feed scraper')

// on change location message
chrome.runtime.onMessage.addListener((message, _sender, _sendResponse) => {
  if (message.type === 'changeLocation') {
    location.href = message.data.googlePodcastsUrl
  }
})

const { scrapePodcastListeningHistory } = useGooglePodcastScraper()

const items = scrapePodcastListeningHistory()

chrome.runtime.sendMessage({
  type: 'scrapedFeed',
  data: items,
})
