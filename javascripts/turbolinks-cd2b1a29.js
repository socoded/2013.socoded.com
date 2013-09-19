var CSRFToken,anchoredLink,browserCompatibleDocumentParser,browserIsntBuggy,browserSupportsPushState,cacheCurrentPage,changePage,constrainPageCacheTo,createDocument,crossOriginLink,currentState,executeScriptTags,extractLink,extractTitleAndBody,fetchHistory,fetchReplacement,handleClick,ignoreClick,initializeTurbolinks,initialized,installClickHandlerLast,loadedAssets,noTurbolink,nonHtmlLink,nonStandardClick,pageCache,recallScrollPosition,referer,reflectNewUrl,reflectRedirectedUrl,rememberCurrentState,rememberCurrentUrl,rememberInitialPage,removeHash,removeNoscriptTags,requestMethod,requestMethodIsSafe,resetScrollPosition,targetLink,triggerEvent,validateResponse,visit,xhr,_ref,__hasProp={}.hasOwnProperty,__indexOf=[].indexOf||function(e){for(var t=0,r=this.length;r>t;t++)if(t in this&&this[t]===e)return t;return-1};initialized=!1,currentState=null,referer=document.location.href,loadedAssets=null,pageCache={},createDocument=null,requestMethod=(null!=(_ref=document.cookie.match(/request_method=(\w+)/))?_ref[1].toUpperCase():void 0)||"",xhr=null,visit=function(e){return browserSupportsPushState&&browserIsntBuggy?(cacheCurrentPage(),reflectNewUrl(e),fetchReplacement(e)):document.location.href=e},fetchReplacement=function(e){var t;return triggerEvent("page:fetch"),t=removeHash(e),null!=xhr&&xhr.abort(),xhr=new XMLHttpRequest,xhr.open("GET",t,!0),xhr.setRequestHeader("Accept","text/html, application/xhtml+xml, application/xml"),xhr.setRequestHeader("X-XHR-Referer",referer),xhr.onload=function(){var e;return triggerEvent("page:receive"),(e=validateResponse())?(changePage.apply(null,extractTitleAndBody(e)),reflectRedirectedUrl(),document.location.hash?document.location.href=document.location.href:resetScrollPosition(),triggerEvent("page:load")):void 0},xhr.onloadend=function(){return xhr=null},xhr.onabort=function(){return rememberCurrentUrl()},xhr.onerror=function(){return document.location.href=e},xhr.send()},fetchHistory=function(e){var t;return cacheCurrentPage(),(t=pageCache[e.position])?(null!=xhr&&xhr.abort(),changePage(t.title,t.body),recallScrollPosition(t),triggerEvent("page:restore")):fetchReplacement(document.location.href)},cacheCurrentPage=function(){return rememberInitialPage(),pageCache[currentState.position]={url:document.location.href,body:document.body,title:document.title,positionY:window.pageYOffset,positionX:window.pageXOffset},constrainPageCacheTo(10)},constrainPageCacheTo=function(e){var t,r;for(t in pageCache)__hasProp.call(pageCache,t)&&(r=pageCache[t],t<=currentState.position-e&&(pageCache[t]=null))},changePage=function(e,t,r,n){return document.title=e,document.documentElement.replaceChild(t,document.body),null!=r&&CSRFToken.update(r),removeNoscriptTags(),n&&executeScriptTags(),currentState=window.history.state,triggerEvent("page:change")},executeScriptTags=function(){var e,t,r,n,o,i,a,c,l,u,s,d;for(i=Array.prototype.slice.call(document.body.querySelectorAll('script:not([data-turbolinks-eval="false"])')),a=0,l=i.length;l>a;a++)if(o=i[a],""===(s=o.type)||"text/javascript"===s){for(t=document.createElement("script"),d=o.attributes,c=0,u=d.length;u>c;c++)e=d[c],t.setAttribute(e.name,e.value);t.appendChild(document.createTextNode(o.innerHTML)),n=o.parentNode,r=o.nextSibling,n.removeChild(o),n.insertBefore(t,r)}},removeNoscriptTags=function(){var e,t,r,n;for(t=Array.prototype.slice.call(document.body.getElementsByTagName("noscript")),r=0,n=t.length;n>r;r++)e=t[r],e.parentNode.removeChild(e)},reflectNewUrl=function(e){return e!==document.location.href?(referer=document.location.href,window.history.pushState({turbolinks:!0,position:currentState.position+1},"",e)):void 0},reflectRedirectedUrl=function(){var e,t;return(e=xhr.getResponseHeader("X-XHR-Redirected-To"))?(t=removeHash(e)===e?document.location.hash:"",window.history.replaceState(currentState,"",e+t)):void 0},rememberCurrentUrl=function(){return window.history.replaceState({turbolinks:!0,position:Date.now()},"",document.location.href)},rememberCurrentState=function(){return currentState=window.history.state},rememberInitialPage=function(){return initialized?void 0:(rememberCurrentUrl(),rememberCurrentState(),createDocument=browserCompatibleDocumentParser(),initialized=!0)},recallScrollPosition=function(e){return window.scrollTo(e.positionX,e.positionY)},resetScrollPosition=function(){return window.scrollTo(0,0)},removeHash=function(e){var t;return t=e,null==e.href&&(t=document.createElement("A"),t.href=e),t.href.replace(t.hash,"")},triggerEvent=function(e){var t;return t=document.createEvent("Events"),t.initEvent(e,!0,!0),document.dispatchEvent(t)},validateResponse=function(){var e,t,r,n,o,i,a;return t=function(){var e;return 400<=(e=xhr.status)&&600>e},i=function(){return!xhr.getResponseHeader("Content-Type").match(/^(?:text\/html|application\/xhtml\+xml|application\/xml)(?:;|$)/)},n=function(e){var t,r,n,o,i;for(o=e.head.childNodes,i=[],r=0,n=o.length;n>r;r++)t=o[r],null!=("function"==typeof t.getAttribute?t.getAttribute("data-turbolinks-track"):void 0)&&i.push(t.src||t.href);return i},e=function(e){var t;return loadedAssets||(loadedAssets=n(document)),t=n(e),t.length!==loadedAssets.length||o(t,loadedAssets).length!==loadedAssets.length},o=function(e,t){var r,n,o,i,a;for(e.length>t.length&&(i=[t,e],e=i[0],t=i[1]),a=[],n=0,o=e.length;o>n;n++)r=e[n],__indexOf.call(t,r)>=0&&a.push(r);return a},t()?(a=document.location.href,window.history.replaceState(null,"","#"),window.location.replace(a),!1):i()||e(r=createDocument(xhr.responseText))?(window.location.reload(),!1):r},extractTitleAndBody=function(e){var t;return t=e.querySelector("title"),[null!=t?t.textContent:void 0,e.body,CSRFToken.get(e).token,"runScripts"]},CSRFToken={get:function(e){var t;return null==e&&(e=document),{node:t=e.querySelector('meta[name="csrf-token"]'),token:null!=t?"function"==typeof t.getAttribute?t.getAttribute("content"):void 0:void 0}},update:function(e){var t;return t=this.get(),null!=t.token&&null!=e&&t.token!==e?t.node.setAttribute("content",e):void 0}},browserCompatibleDocumentParser=function(){var e,t,r,n,o;t=function(e){return(new DOMParser).parseFromString(e,"text/html")},e=function(e){var t;return t=document.implementation.createHTMLDocument(""),t.documentElement.innerHTML=e,t},r=function(e){var t;return t=document.implementation.createHTMLDocument(""),t.open("replace"),t.write(e),t.close(),t};try{if(window.DOMParser)return n=t("<html><body><p>test"),t}catch(i){return n=e("<html><body><p>test"),e}finally{if(1!==(null!=n?null!=(o=n.body)?o.childNodes.length:void 0:void 0))return r}},installClickHandlerLast=function(e){return e.defaultPrevented?void 0:(document.removeEventListener("click",handleClick,!1),document.addEventListener("click",handleClick,!1))},handleClick=function(e){var t;return e.defaultPrevented||(t=extractLink(e),"A"!==t.nodeName||ignoreClick(e,t))?void 0:(visit(t.href),e.preventDefault())},extractLink=function(e){var t;for(t=e.target;t.parentNode&&"A"!==t.nodeName;)t=t.parentNode;return t},crossOriginLink=function(e){return location.protocol!==e.protocol||location.host!==e.host},anchoredLink=function(e){return(e.hash&&removeHash(e))===removeHash(location)||e.href===location.href+"#"},nonHtmlLink=function(e){var t;return t=removeHash(e),t.match(/\.[a-z]+(\?.*)?$/g)&&!t.match(/\.html?(\?.*)?$/g)},noTurbolink=function(e){for(var t;!t&&e!==document;)t=null!=e.getAttribute("data-no-turbolink"),e=e.parentNode;return t},targetLink=function(e){return 0!==e.target.length},nonStandardClick=function(e){return e.which>1||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey},ignoreClick=function(e,t){return crossOriginLink(t)||anchoredLink(t)||nonHtmlLink(t)||noTurbolink(t)||targetLink(t)||nonStandardClick(e)},initializeTurbolinks=function(){return document.addEventListener("click",installClickHandlerLast,!0),window.addEventListener("popstate",function(e){var t;return(null!=(t=e.state)?t.turbolinks:void 0)?fetchHistory(e.state):void 0},!1)},browserSupportsPushState=window.history&&window.history.pushState&&window.history.replaceState&&void 0!==window.history.state,browserIsntBuggy=!navigator.userAgent.match(/CriOS\//),requestMethodIsSafe="GET"===requestMethod||""===requestMethod,browserSupportsPushState&&browserIsntBuggy&&requestMethodIsSafe&&initializeTurbolinks(),this.Turbolinks={visit:visit};