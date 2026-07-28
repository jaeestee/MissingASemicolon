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

title "No Spins Left Scenarios"

actor "Player" as player
participant "User Interface" as ui
participant "Game Service" as ge
participant "Scoring Service" as ss

== Scenario 1: Round 1 Ends — Proceed to Round 2 ==

ge -> ge: Check spin counter (30 spins used in Round 1)

alt spins == 30 and round == 1

    ge --> ui: { roundComplete: true, round: 1 }
    ui -> ui: Show "Round 1 Complete!" banner


    player -> ui: Click "Start Round 2"
    ui -> ge: POST /round-two
    ge -> ss: DoublePoints()
    ss --> ge: "Doubled All Points"
    ge --> ui: { points_doubled: true }
    ui --> player: Show "Spin Wheel"

== Scenario 2: Round 2 Ends — Game Over ==

else spins == 30 and round == 2

    ge --> ui: { gameOver: true }
    ui -> ui: Show "Game Over!" banner

    == Fetch Final Scores ==

    loop for each player

        ui -> ge: GET /scoring/{player}
        ge -> ss: GetScore(player)
        ss -> ss: _scores.get(player, 0)
        ss --> ge: final score
        ge --> ui: { player, score }

    end

    ui -> ui: Display final\nscoreboard

    
else spins < 30

    ge --> ui: { spinsRemaining: 30 - spins }
    ui -> ui: Continue to next turn

end
@enduml