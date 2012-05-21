var _gaq = _gaq || [];
_gaq.push(
['_setAccount', 'UA-12842300-1'],
['_setDomainName', '.hhs.gov'],
['_setAllowLinker', true],
['_setMaxCustomVariables', 10],
['_trackOutbound',{onBounce:true, action:'click'}],
['_trackDownload',{onBounce:true, method:'event', action:'click'}],
['_trackMailTo',{onBounce:true, action:'click'}],
['_trackRealBounce'],
['_trackError'],
['_trackLoadTime'],
['_trackPageview']
);
(function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();