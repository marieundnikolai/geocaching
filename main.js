// const name = localStorage.getItem('name');
const storedGroup = localStorage.getItem('group');

// If the user hasn't gone through landing.html, redirect them
if (!storedGroup || storedGroup === 'none') {
    window.location.href = 'index.html';
}

const params = new URLSearchParams(window.location.search);
const guestGroup = params.get('gst');

// Use URL param if present, otherwise fallback to localStorage
const activeGroup = guestGroup || storedGroup;

const validGroups = [
    'TVRi', 'TVRp', 'TVRc', 'TVRa',
    'SOPi', 'SOPp', 'SOPa',
    'CDOi', 'CDOp', 'CDOa',
    'SBK', 'SBKa', 'SBKie', 'SBKim', 'SBKic', 'SBKe'
];

if (validGroups.includes(activeGroup)) {
    document.querySelectorAll('[data-groups]').forEach(el => {
        const groups = (el.dataset.groups || '').split(/\s+/); // "SOPi SOPp SOPa"
        if (groups.includes(activeGroup)) {
            el.classList.remove('hidden');
        }
    });
} else {
    window.location.href = 'index.html';
}

const orte = [
    { id: "95e8023eedc18e8bab4a0888312c440bb01ca755", name: "Pool" },
    { id: "b1a4eb7aca57ad07c732fd5e9d8d039aee46c25a", name: "Hochbeet" },
    { id: "63e57cfd514c88315e9946f75a6bc8f76aa1200e", name: "Barfußpfad" },
    { id: "6721152a61f50fd79b7321f8302d443799ed4287", name: "Weberei" },
    { id: "bc6b1494f0604a7e07e65e49f980fedab869f9b3", name: "Tabaklounge" },
    { id: "5f8ed65345f5ccc78ca8b5aa7640b05c43e0a25b", name: "Olivenbäume" },
    { id: "35642b527b93e5a366f4f584cf01fe31ae0c6b24", name: "Schweinegehege" },
    { id: "95d99b424781106303eaae4fc0a8b4d071f67e81", name: "Innenhof" },
    { id: "3e595e4f2d5cf9a6c2e25affe7fd5da4c55bb5cc", name: "Aussichtspunkt" }
];

function getOrtStatus(id) {
    return localStorage.getItem(id) === "entdeckt" ? "entdeckt" : "nicht entdeckt";
}

function renderListe() {
    const liste = document.getElementById("orte-liste");
    liste.innerHTML = "";

    orte.forEach((ort) => {
        const status = getOrtStatus(ort.id);
        const li = document.createElement("li");

        li.innerHTML = `
      <span>${ort.name}</span>
      <span class="status ${status === "entdeckt" ? "entdeckt" : "offen"}">
        ${status}
      </span>
    `;

        liste.appendChild(li);
    });
}

function resetFortschritt() {
    orte.forEach((ort) => localStorage.removeItem(ort.id));
    renderListe();
}

document.addEventListener("DOMContentLoaded", () => {
    renderListe();

    const resetBtn = document.getElementById("reset-btn");
    resetBtn.addEventListener("click", resetFortschritt);
});
