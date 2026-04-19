const container = document.getElementById("notifications");

// =========================
// AUDIO (FIVEM SAFE)
// =========================

// HTML audio element (MOST RELIABLE METHOD)
const audio = document.getElementById("notify-sound");
const sounds = {
    success: "success.mp3",
    info: "info.mp3",
    warning: "warning.mp3",
    error: "error.mp3"
};

// reset + play sound safely
function playNotifySound(type) {
    if (!audio) return;

    try {
        const soundFile = sounds[type] || "sound.mp3";

        audio.pause();
        audio.src = soundFile;
        audio.currentTime = 0;

        const playPromise = audio.play();

        if (playPromise !== undefined) {
            playPromise.catch(() => {});
        }
    } catch (e) {}
}

// =========================
// NOTIFICATIONS
// =========================

window.addEventListener("message", function (event) {
    const data = event.data || {};

    if (data.action !== "open") return;

    const type = data.type || "info";
    const title = data.title || "Notification";
    const message = data.message || "";
    const time = Number(data.time) || 5000;

    const icons = {
        success: "✔️",
        info: "ℹ️",
        warning: "⚠️",
        error: "❌"
    };

    // limit spam
    if (container.children.length >= 6) {
        container.removeChild(container.firstChild);
    }

    const notif = document.createElement("div");
    notif.className = `notify ${type}`;

    notif.innerHTML = `
        <div class="icon">${icons[type] || "ℹ️"}</div>
        <div class="content">
            <div class="title">${escapeHtml(title)}</div>
            <div class="message">${escapeHtml(message)}</div>
        </div>
        <div class="progress"></div>
    `;

    container.appendChild(notif);
        const progress = notif.querySelector(".progress");
    if (progress) {
        progress.style.animationDuration = `${time}ms`;
    }

    // 🔊 PLAY SOUND
    playNotifySound(type);

    // force render fix (FiveM UI stability)
    notif.offsetHeight;

    notif.classList.add("show");

    setTimeout(() => {
        notif.classList.remove("show");
        notif.classList.add("hide");

        setTimeout(() => notif.remove(), 400);
    }, time);
});

// =========================
// SECURITY
// =========================

function escapeHtml(text) {
    return String(text)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;");
}