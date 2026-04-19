local function Alert(title, message, time, type)
    SendNUIMessage({
        action = "open",
        title = title or "Notification",
        message = message or "",
        time = time or 5000,
        type = type or "info"
    })
end

exports('Alert', Alert)

RegisterNetEvent('dt-notify:Alert', function(title, message, time, type)
    Alert(title, message, time, type)
end)

-- INIT
CreateThread(function()
    Wait(500)
    SetNuiFocus(false, false)
    print("^2[dt-notify]^7 initialized")
end)

-- =========================
-- SAFE COMMAND REGISTRATION
-- =========================
CreateThread(function()

    -- wait until player is fully loaded (CRITICAL FIX)
    while not NetworkIsPlayerActive(PlayerId()) do
        Wait(200)
    end

    Wait(1000) -- extra safety buffer

    RegisterCommand('success', function()
        print("^2[dt-notify]^7 SUCCESS COMMAND TRIGGERED")
        Alert("SUCCESS", "Success working!", 4000, "success")
    end, false)

    RegisterCommand('info', function()
        Alert("INFO", "Info working!", 4000, "info")
    end, false)

    RegisterCommand('warning', function()
        Alert("WARNING", "Warning working!", 4000, "warning")
    end, false)

    RegisterCommand('error', function()
        Alert("ERROR", "Error working!", 4000, "error")
    end, false)

    RegisterCommand('testnotify', function()
        Alert("SUCCESS", "Test 1", 3000, "success")
        Wait(300)
        Alert("INFO", "Test 2", 3000, "info")
        Wait(300)
        Alert("WARNING", "Test 3", 3000, "warning")
        Wait(300)
        Alert("ERROR", "Test 4", 3000, "error")
    end, false)

    print("^2[dt-notify]^7 commands registered")

end)