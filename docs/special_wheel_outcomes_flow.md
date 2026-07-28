@startuml
skinparam backgroundColor #FFFFFF
skinparam sequenceArrowColor #412a27
skinparam sequenceLifeLineBorderColor #412a27
skinparam sequenceParticipantBorderColor #412a27
skinparam sequenceParticipantBackgroundColor #412a27
skinparam sequenceParticipantFontColor #FFFFFF
skinparam sequenceActorBorderColor #412a27
skinparam sequenceActorBackgroundColor #412a27
skinparam sequenceActorFontColor #FFFFFF
skinparam sequenceTitleBackgroundColor #412a27
skinparam sequenceTitleFontColor #FFFFFF
skinparam sequenceDividerBackgroundColor #412a27
skinparam sequenceDividerFontColor #FFFFFF
skinparam sequenceGroupBackgroundColor #412a27
skinparam sequenceNoteBackgroundColor #412a27
skinparam sequenceNoteFontColor #FFFFFF
skinparam sequenceBoxBackgroundColor #412a27
skinparam sequenceBoxFontColor #FFFFFF

title "Special Wheel Outcomes: Free Spin / Lose Turn / Bankrupt"

actor "Player" as player
participant "User Interface" as ui
participant "Game Service" as ge
participant "Wheel Service" as ws
participant "Scoring Service" as ss

== Player Spins the Wheel ==

player -> ui: Click "Spin Wheel"
ui -> ge: POST /wheel/spin
ge -> ws: SpinWheel()
ws -> ws: Random choice from WheelOutcome
ws --> ge: WheelOutcome
ge --> ui: { outcome }
ui -> ui: Display wheel animation\nlanding on outcome

== Outcome A: Free Spin ==

alt outcome == "Free Spin"

    ui -> ui: Show "Free Spin!" banner
    ui -> ge: POST /token/add/{player}
    ge -> ge: Add token for player
    ge --> ui: "Token added for {player}"
    ui --> player: Token earned!\nCan be used later

    note right of player
        Free Spin token can be used:
        1. After an incorrect answer
           (to spin the wheel again instead of passing)
        2. When landing on "Lose Turn"
           (to spin again instead of passing)
    end note

== Outcome B: Lose Turn ==

else outcome == "Lose Turn"

    ui -> ui: Show "Lose Turn!" banner

    alt player has Free Spin token

        ui --> player: "Use Free Spin?" prompt
        player -> ui: Use Free Spin token

        ui -> ui: Consume Free Spin token
        player -> ui: Click "Spin Wheel" again
        ui -> ge: POST /wheel/spin
        ge -> ws: SpinWheel()
        ws -> ws: Random choice from WheelOutcome
        ws --> ge: WheelOutcome (category or special)
        ge --> ui: { outcome }
        ui -> ui: Proceed with new outcome

    else no Free Spin token

        ui --> player: Turn passes to next player

    end

== Outcome C: Bankrupt ==

else outcome == "Bankrupt"

    ui -> ui: Show "Bankrupt!" banner
    ui -> ge: POST /scoring/bankrupt\n{ player }
    ge -> ss: ApplyBankrupt(player)
    ss -> ss: _scores[player] = 0
    ss --> ge: "Applied bankruptcy to player."
    ge --> ui: { message, player }
    ui -> ui: Reset player score to 0
    ui --> player: Score wiped +\nturn passes to next player

end
@enduml