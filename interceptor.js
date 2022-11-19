var filter = { urls: ['<all_urls>'] }
var extraInfoSpec = ['responseHeaders']

chrome.webRequest.onCompleted.addListener(function(details){
    console.log(`Woo got a request, here's the details!`, details)
}, filter, extraInfoSpec) 

console.log('Added listener')