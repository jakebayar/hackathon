console.log("Background service worker active.");

chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
        const url = new URL(details.url);
        const keyword = url.searchParams.get("q");

        console.log("Intercepted keyword:", keyword);

        return new Promise(resolve => {
            chrome.storage.local.get(keyword, function (result) {
                if (result[keyword]) {
                    console.log("Found URL for keyword:", result[keyword]);
                    resolve({ redirectUrl: result[keyword] });
                } else {
                    console.log("Keyword not found in storage.");
                    resolve();  // Continue with the original request without redirection.
                }
            });
        });
    },
    { urls: ["https://colinks-placeholder.com/*"] },
    ["blocking"]
);

