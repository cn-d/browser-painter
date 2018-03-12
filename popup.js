function getCurrentTabUrl(callback) {
    let queryInfo = {
        active: true,
        currentWindow: true
    };
  
    chrome.tabs.query(queryInfo, (tabs) => {
        let tab = tabs[0];
        let url = tab.url;
        console.assert(typeof url == 'string', 'tab.url should be a string');
        callback(url);
    });
}


function startDraw(color, weight) {
    let drawConfig = {
        color: color,
        weight: weight,
        // transparency: transparency
    };
    console.log(drawConfig)
    chrome.tabs.executeScript({
        code: 'var drawConfig = ' + JSON.stringify(drawConfig)
    }, function(){
        chrome.tabs.executeScript({
            file: "sketch.js"
        });
    });
}
  

document.addEventListener('DOMContentLoaded', () => {
    getCurrentTabUrl((url) => {
        let dropdown = document.getElementById('dropdown'),
            weight   = document.getElementById('weight'),
            drawIcon = document.getElementById('draw-button');
        
        drawIcon.addEventListener('click', () => {
            console.log('trig')
            startDraw(dropdown.value, weight.value)
        })

        dropdown.addEventListener('change', () => {
            dropdown.value = dropdown.value
            startDraw(dropdown.value, weight.value)
        });

        dropdown.addEventListener('change', () => {
            weight.value = weight.value
            startDraw(dropdown.value, weight.value)
        });
    });
});