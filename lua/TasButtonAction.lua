TasButtonAction = {
    Set = function(frame, action)
        -- first call?
        if not TasButtonAction.Trigger then
            -- yes, Create the Trigger and the click handler
            TasButtonAction.Trigger = CreateTrigger()
            TriggerAddAction(TasButtonAction.Trigger, function()
                local frame = BlzGetTriggerFrame()
                -- remove Focus for the local clicking player
                if GetTriggerPlayer() == GetLocalPlayer() then
                    BlzFrameSetEnable(frame, false)
                    BlzFrameSetEnable(frame, true)
                end
                -- call the action set for that frame
                TasButtonAction[frame](frame, GetTriggerPlayer())
                frame = nil
            end)
        end

        -- create the click event only when it does not exist yet.
        if not TasButtonAction[frame] then
            BlzTriggerRegisterFrameEvent(TasButtonAction.Trigger, frame, FRAMEEVENT_CONTROL_CLICK)
        end
        
        TasButtonAction[frame] = action
    end
}