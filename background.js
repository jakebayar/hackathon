chrome.webRequest.onBeforeRequest.addListener(
    function (details, callback) {
        const url = new URL(details.url);
        const keyword = url.searchParams.get('q');

        // Check if the keyword starts with "go "
        if (keyword.startsWith('go ')) {
            const actualKeyword = keyword.substring(3);  // remove "go "

            chrome.storage.local.get('shortlinks', function (data) {
                const shortlinks = data.shortlinks || {};

                if (shortlinks[actualKeyword]) {
                    callback({ redirectUrl: shortlinks[actualKeyword] });
                } else {
                    // If the keyword is not found, you can decide what to do. 
                    callback({ redirectUrl: "https://defaultpage.com" });
                }
            });
        } else {
            callback({});
        }

    },
    { urls: ["https://www.google.com/search?q=go%20*"] },  // adjust this pattern as per your setup
    ["blocking"]
);

