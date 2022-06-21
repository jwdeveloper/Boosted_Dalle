function SendDalleGenerateRequest(batch) {
    let payload = { prompt: batch.input };
    var headers =
    {
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'pl-PL,pl;q=0.9,en-US;q=0.8,en;q=0.7',
        'Access-Control-Request-Headers': 'content-type',
        'Access-Control-Request-Method': 'POST',
        'Connection': 'keep-alive',
        'Host': 'bf.dallemini.ai',
        'Origin': 'https://hf.space',
        'Referer': 'https://hf.space/',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'cross-site',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36'
    }
    var url = "https://bf.dallemini.ai/generate"
    console.log("SENDING REQUEST")
    fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(payload)
    })
        .then(response => response.json())
        .then(data => handleResponse(batch, data))
        .catch((error) => {
            console.log(error);
            batch.error = error;
            batch.isDone  =true;
        });
};


function handleResponse(batch, data) {
    console.log('Success:', data);
    batch.currentCount += 1;
    if (batch.currentCount === imagesCount) {
        batch.isDone = true;
    }
    for (const image in data.images) {
        batch.image.push(image)
    }
}
