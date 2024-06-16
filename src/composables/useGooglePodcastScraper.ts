export function useGooglePodcastScraper() {

  function scrapePodcastListeningHistory() {
    // scrape all anchor tags with role="listitem" and it has a non-direct child <polyline points="1.5,5.5 5,9 10,3" />
    // then extract all <div> tags with role="presentation" and get the textContent
    const listItems = document.querySelectorAll('a[role="listitem"]')
    const listItemsWithPolyline = Array.from(listItems).filter((item) =>
      item.querySelector('polyline[points="1.5,5.5 5,9 10,3"]')
    )
    const listItemsWithPolylineAndDiv = listItemsWithPolyline.map((item) => {
      const divs = Array.from(item.querySelectorAll('div[role="presentation"]'))
      const content = divs.map((div) => {
        return {
          class: div.className,
          text: div.textContent
        }
      })

      // select div with jsdata attribute, and extract the podcast url using regex from the jsdata attribute
      const jsDataDiv = item.querySelector('div[jsdata]')
      const jsData = jsDataDiv?.getAttribute('jsdata')
      const episodeUrl = jsData?.match(/;(http[^;]+);/)[1]

      return {
        googlePodcastsUrl: item.href,
        state: 'completed',
        title: content[1]?.text,
        description: content[2]?.text,
        episodeUrl,
      }
    })
    console.log('items completed', listItemsWithPolylineAndDiv)


    // scrape other anchors tags with role="listitem" and it has a non-direct child <line/>
    // then extract all <div> tags with role="presentation" and get the textContent
    const listItemsWithLine = Array.from(listItems).filter((item) =>
      item.querySelector('line')
    )
    const listItemsWithLineAndDiv = listItemsWithLine.map((item) => {
      const divs = Array.from(item.querySelectorAll('div[role="presentation"]'))
      // select div with aria-role="button" and get the textContent from direct child <span>
      const button = item.querySelector('div[aria-role="button"]')
      const buttonSpan = button?.lastChild
      const content = divs.map((div) => {
        return {
          class: div.className,
          text: div.textContent
        }
      })

      // select div with jsdata attribute, and extract the podcast url using regex from the jsdata attribute
      const jsDataDiv = item.querySelector('div[jsdata]')
      const jsData = jsDataDiv?.getAttribute('jsdata')
      const episodeUrl = jsData?.match(/;(http[^;]+);/)[1]


      return {
        googlePodcastsUrl: item.href,
        state: 'started',
        remaining: buttonSpan?.textContent,
        title: content[1].text,
        description: content[2].text,
        episodeUrl,
      }
    })
    console.log('items started', listItemsWithLineAndDiv)

    // scrape all elements with data-feed and data-title attribute
    const feedItems = document.querySelectorAll('c-data[jsdata]')
    const feedItemsArray = Array.from(feedItems).map((item) => {
      return {
        feed: item.getAttribute('jsdata'),
        title: item.getAttribute('')
      }
    })
    console.log('feed items', feedItemsArray)
    // from first item.feed extract url (beginning with http) between two terminator characters, use regex
    let feedUrl = undefined
    if (feedItemsArray.length > 0 && feedItemsArray[0].feed) {
      const regex = /;(http[^;]+);/
      const match = feedItemsArray[0].feed.match(regex)
      if (match) {
        feedUrl = match[1]
      }
    }
    console.log('feedUrl', feedUrl)


    // scrape all a with rel="nofollow"
    const nofollowItems = document.querySelectorAll('a[rel="nofollow"]')
    const nofollowItemsArray = Array.from(nofollowItems).map((item) => {
      return {
        href: item.href,
        text: item.textContent
      }
    })
    console.log('website', nofollowItemsArray[0]?.href)


    // merge all arrays and download as a JSON file
    const allItems = listItemsWithPolylineAndDiv.concat(listItemsWithLineAndDiv)

    return {
      items: allItems,
      feedUrl,
      website: nofollowItemsArray[0]?.href,
    }

  }

  return {
    scrapePodcastListeningHistory,
  };
}
