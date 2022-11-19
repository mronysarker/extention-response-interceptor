function interceptData() {
    var xhrOverrideScript = document.createElement('script');
    xhrOverrideScript.type = 'text/javascript';
    xhrOverrideScript.src = chrome.runtime.getURL('inject.js');
    (document.head || document.documentElement).appendChild(xhrOverrideScript);
    
    // s.onload = function(){
    
    //   var url=chrome.runtime.getURL("html/popup.html");
    
    //   var evt=document.createEvent("injectEvent");
    //   // evt.initCustomEvent("injectEvent", true, true, url);
    //   document.dispatchEvent(evt);
    // };

    // xhrOverrideScript.src = chrome.runtime.getURL("inject.js");
    try {
      // xhrOverrideScript.appendChild(document.createTextNode(functionString));
      // document.body.appendChild(xhrOverrideScript);
    } catch (e) {
      // xhrOverrideScript.text = functionString;
      // document.body.appendChild(xhrOverrideScript);
    }
    // (document.head || document.documentElement).prepend(xhrOverrideScript);
  }
  function checkForDOM() {
    if (document.body && (document.head || document.documentElement)) {
      interceptData();
    } else {
      requestIdleCallback(checkForDOM);
    }
  }
  requestIdleCallback(checkForDOM);