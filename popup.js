getCurrentTabUrl = (callback) => {
    const queryInfo = {
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
        code: 'let drawConfig = ' + JSON.stringify(drawConfig)
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

let selectedColour = () => {
    // colours.forEach((colour) => {
    //     colour.addEventListener('click', () => {
    //         colour.dataset.colour = colour.dataset.colour;
    //         // console.log(colour.dataset.colour);
    //         // startDraw(colour.dataset.colour, weight.value);
    //     });
    // })
    return 'red'
}


document.addEventListener('DOMContentLoaded', () => {
    getCurrentTabUrl((url) => {
        const colours = Array.from(document.querySelectorAll('.colour-choice'));
        const drawIcon = document.getElementById('draw-button');
        
        drawIcon.addEventListener('click', () => {
            let colour = selectedColour();
            let weight = selectedWeight();
            startDraw(colour, weight);
        })

        // colours.forEach((colour) => {
        //     colour.addEventListener('click', () => {
        //         colour.dataset.colour = colour.dataset.colour;
        //         console.log(colour.dataset.colour);
        //         startDraw(colour.dataset.colour, weight.value);
        //     });
        // })

    });
});