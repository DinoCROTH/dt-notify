# 🚀 dt-notify

**Modern Blur Notification System for FiveM (QBCore Ready)**

A clean, lightweight, and stylish notification system featuring glass-style UI, smooth animations, progress bars, and custom sounds.

---

## ✨ Features

- 🎨 Modern glass-style UI (FiveM optimized)
- 🎬 Smooth animations (slide + scale)
- ⏳ Progress bar (time indicator)
- 🔊 Custom sounds per notification type
- 📦 Stack system with spam protection
- 🔒 Safe NUI handling (ready callback)
- ⚡ Lightweight & optimized
- 🔌 Easy QBCore integration
- 📤 Export support for any resource

---

## 📦 Installation

🔥 REPLACE THIS FUNCTION (CLEAN INTEGRATION)

FIND:
function QBCore.Functions.Notify(text, texttype, length, icon)

Replace your entire function with this:

function QBCore.Functions.Notify(text, texttype, length, icon)
    local msg = ""
    local caption = nil

    -- support qb table format
    if type(text) == 'table' then
        msg = text.text or "Notification"
        caption = text.caption
    else
        msg = text or "Notification"
    end

    local typ = texttype or "primary"
    local time = length or 5000

    -- map qb types → your notify types
    local typeMap = {
        primary = "info",
        success = "success",
        error = "error",
        inform = "info",
        warning = "warning"
    }

    local notifyType = typeMap[typ] or "info"

    -- optional title system
    local titleMap = {
        success = "SUCCESS",
        error = "ERROR",
        warning = "WARNING",
        info = "INFO"
    }

    local title = titleMap[notifyType] or "NOTIFICATION"

    -- combine caption if exists
    if caption then
        msg = msg .. " - " .. caption
    end

    -- 🔥 USE YOUR dt-notify
    exports['dt-notify']:Alert(title, msg, time, notifyType)
end
