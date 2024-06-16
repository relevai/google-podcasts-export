console.log('running queue scraper')

// on change location message
chrome.runtime.onMessage.addListener((message, _sender, _sendResponse) => {
  if (message.type === 'changeLocation') {
    location.href = message.data.googlePodcastsUrl
  }
})

// scrape all content from divs under all divs with attribute role="navigation">
const navigationDivs = document.querySelectorAll('div[role="navigation"]')

const queue = Array.from(navigationDivs).map((navDiv) => {
  const divs = navDiv.querySelectorAll('div')
  const divsContent = Array.from(divs).map((item) => {
    return {
      text: item?.textContent
    }
  })
  // console.log('divsContent', divsContent)

  // select div with jsdata attribute, and extract the podcast url using regex from the jsdata attribute
  const jsDataDiv = navDiv.querySelector('div[jsdata]')
  const jsData = jsDataDiv?.getAttribute('jsdata')
  const episodeUrl = jsData?.match(/;(http[^;]+);/)[1]

  return {
    podcastTitle: divsContent[0]?.text,
    episodeDate: divsContent[1]?.text,
    episodeTitle: divsContent[2]?.text,
    episodeUrl,
    shortDescription: divsContent[4]?.text,
    time: divsContent[6]?.text
  }
})

console.log('queue', queue)

// send list of podcasts to the background script
chrome.runtime.sendMessage({
  type: 'scrapedQueue',
  data: queue
})
