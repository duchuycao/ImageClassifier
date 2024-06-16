async function loadModel() {
    const model = await mobilenet.load();
    return model;
}

async function classifyImage(model, imgElement) {
    const predictions = await model.classify(imgElement);
    return predictions;
}

function previewImage(event) {
    const input = event.target;
    const reader = new FileReader();
    reader.onload = async function() {
        const img = new Image();
        img.onload = async function() {
            document.getElementById('uploadedImage').src = this.src;
            document.getElementById('uploadedImage').style.display = 'block';
            const model = await loadModel();
            const predictions = await classifyImage(model, img);
            displayPredictions(predictions);
        };
        img.src = reader.result;
    };
    reader.readAsDataURL(input.files[0]);
}

function displayPredictions(predictions) {
    const outputElement = document.getElementById('output');
    outputElement.innerHTML = '';
    predictions.forEach(prediction => {
        outputElement.innerHTML += `<div>${prediction.className}: ${Math.round(prediction.probability * 100)}%</div>`;
    });
}
