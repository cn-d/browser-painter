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

let selectedWeight = () => {
    const weight = document.getElementById('weight');
    return weight.value
}

let selectedColour = (colours) => {
    let colour = colours.find(colour => colour.classList.contains('active'));
    return colour.dataset.colour
}


document.addEventListener('DOMContentLoaded', () => {
    getCurrentTabUrl((url) => {
        const colours = Array.from(document.querySelectorAll('.colour-choice'));
        const drawIcon = document.getElementById('draw-button');
        
        drawIcon.addEventListener('click', () => {
            let colour = selectedColour(colours);
            let weight = selectedWeight();
            startDraw(colour, weight);
        })

        colours.forEach((colour) => {
            colour.addEventListener('click', () => {
                colours.forEach((colour) => {
                    colour.classList.remove('active')
                });
                colour.classList.add('active')
            });
        })

    });
});