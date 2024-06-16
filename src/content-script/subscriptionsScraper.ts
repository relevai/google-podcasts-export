console.log('running subscriptions scraper')

// on change location message
chrome.runtime.onMessage.addListener((message, _sender, _sendResponse) => {
  if (message.type === 'changeLocation') {
    location.href = message.data.googlePodcastsUrl
  }
})

// scrape first element <scrolling-carousel /> take all <a> tags
const scrollingCarousel = document.querySelector('scrolling-carousel')
const aTags = scrollingCarousel?.querySelectorAll('a')
const subscriptions = Array.from(aTags).map((item) => {
  return {
    googlePodcastsUrl: item?.href,
    title: item?.textContent
  }
})

console.log('scrollingCarousel', subscriptions)

// send list of podcasts to the background script
chrome.runtime.sendMessage({
  type: 'scrapedSubscriptions',
  data: subscriptions
})
