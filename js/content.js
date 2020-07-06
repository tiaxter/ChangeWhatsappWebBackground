const setupBackground = (base64) => {
    let styleElement = (document.querySelector('#whatsapp_background_changer') != null) ? document.querySelector('#whatsapp_background_changer'): document.createElement('style');
    styleElement.setAttribute('id', 'whatsapp_background_changer');
    styleElement.innerHTML = `
       #main > div:first-child {
            background-image: url('${base64}');
            background-size: cover;
            background-repeat: no-repeat;
            opacity: 1;
        }`;
    document.querySelector('head').append(styleElement);
}

chrome.runtime.onMessage.addListener((request) => {
    if (request.base64 != null){
        chrome.storage.local.set({'base64': request.base64});
        setupBackground(request.base64)
    }
});

chrome.storage.local.get(['base64'], value => {
    if (value.base64 != null){
        setupBackground(value.base64);
    }
});