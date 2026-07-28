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

title "Determine Winner"

actor "Player" as player
participant "User Interface" as ui
participant "Game Service" as ge
participant "Scoring Service" as ss

    ui -> ge: GET /scoring/winner
    ge -> ss: DetermineWinner()
    ss -> ss: Find max score\nacross all players

    alt clear winner exists

        ss --> ge: winner player name
        ge --> ui: { winner: "PlayerX" }
        ui -> ui: Show "Winner!" screen with crown animation
        ui --> player: PlayerX wins! Final scores displayed

    else tie between players

        ss --> ge: null
        ge --> ui: { winner: null }
        ui -> ui: Show "It's a Tie!" screen
        ui --> player: Tie declared! Final scores displayed

    end
@enduml