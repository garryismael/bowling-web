const btnSubmit = document.querySelector("button");
let frame = document.querySelector(".frame");
let lancer = document.querySelector(".lancer");
let score = document.querySelector(".score");
let input = document.querySelector("input");
let btnClear = document.querySelector(".clean-btn");

const URL = "http://localhost:8080/api/bowling";

async function loadData() {
    const response = await fetch(URL, {
        method: "GET"
    });
    return await response.json();
}

async function clearData() {
    const response = await fetch(`${URL}/clear`, {
        method: "POST"
    });
    return await response.json();
}

async function submitData(pins) {
    const response = await fetch(`${URL}/${pins}`, {
        method: "GET"
    });
    return await response.json();
}

function updateView(data) {
    frame.textContent = data.frame;
    lancer.textContent = data.lancer;
    score.textContent = data.score;
}

btnSubmit.addEventListener('click', async (e) => {
    e.preventDefault();
    const pins = input.value;
    const data = await submitData(pins);
    updateView(data);
});

btnClear.addEventListener("click", async (e) => {
    const data = await clearData();
    updateView(data);
});

window.addEventListener("load", async (e) => {
    const data = await loadData();
    updateView(data);
});
