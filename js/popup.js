FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginFileValidateSize,
    FilePondPluginFileValidateType,
    FilePondPluginFileEncode
);

const uploader = FilePond.create(document.querySelector('input[type="file"]'));

uploader.onaddfile = () => {
    const reader = new FileReader();
    reader.onload = () => {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {base64: reader.result});
        });
    };
    reader.readAsDataURL(uploader.getFile().file);
};
