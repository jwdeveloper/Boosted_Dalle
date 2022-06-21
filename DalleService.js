function SendDalleGenerateRequest(batch) {
    let payload = { prompt: batch.input };
    var headers =
    {
        'Access-Control-Allow-Origin': '*',
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
        .then(response => {
            if (response.ok) 
            {
                return response.json();
            }
            if(response.status === 429)
            {
                throw new Error('TRAFFIC');
            }

            throw new Error('Uknow error try again');
        })
        .then(data => handleResponse(batch, data))
        .catch((error) => {
             if(error.message === "TRAFFIC")
             {
                sendRequestRandomDelay(batch);
                return;
             }
           
            batch.error = error;
            batch.imagesCount = batch.imagesCount-1;
        });
};


function sendRequestRandomDelay(batch)
{
    setTimeout(function(){
        console.log("Trying to send request again");
        SendDalleGenerateRequest(batch);
    }, getRandomInt(100,3000));
}

function handleResponse(batch, data) {
    console.log('Success:', data);
    batch.currentCount += 1;
    if (batch.currentCount === batch.imagesCount) {
        batch.isDone = true;
    }
    for (const image in data.images) {
        batch.images.push(data.images[image])
    }
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }