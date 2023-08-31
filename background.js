chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
        const url = new URL(details.url);
        const keyword = url.searchParams.get('q');

        return new Promise((resolve) => {
            chrome.storage.local.get(keyword, function (result) {
                if (result[keyword]) {
                    resolve({ redirectUrl: result[keyword] });
                } else {
                    // If the keyword is not found, you can decide what to do. 
                    // For instance, redirect to a default page or show an error.
                    resolve({ redirectUrl: "https://defaultpage.com" });
                }
            });
        });
    },
    { urls: ["https://colinks-placeholder.com?q=*"] },
    ["blocking"]
);
