getCurrentTabUrl = (callback) => {
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


startDraw = (color, weight) => {
    let drawConfig = {
        color: color,
        weight: weight,
        // transparency: transparency
    };
    console.log(drawConfig)
    chrome.tabs.executeScript({
        code: 'var drawConfig = ' + JSON.stringify(drawConfig)
    }, () => {
        chrome.tabs.executeScript({
            file: "sketch.js"
        });
    });
}


document.addEventListener('DOMContentLoaded', () => {
    getCurrentTabUrl((url) => {
        const dropdown = document.getElementById('dropdown');
        const weight   = document.getElementById('weight');
        const colours = Array.from(document.querySelectorAll('.colour-choice'));
        const drawIcon = document.getElementById('draw-button');
        
        drawIcon.addEventListener('click', () => {
            console.log('trig');
            startDraw(dropdown.value, weight.value);
        })

        dropdown.addEventListener('change', () => {
            dropdown.value = dropdown.value;
            startDraw(dropdown.value, weight.value);
        });

        colours.forEach((colour) => {
            colour.addEventListener('click', () => {
                colour.dataset.colour = colour.dataset.colour;
                console.log(colour.dataset.colour);
                startDraw(colour.dataset.colour, weight.value);
            });
        })

        dropdown.addEventListener('change', () => {
            weight.value = weight.value;
            startDraw(dropdown.value, weight.value);
        });
    });
});