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

title "Answer Question (Correct & Incorrect Paths)"

actor "Player" as player
participant "User Interface" as ui
participant "Game Service" as ge
participant "Scoring Service" as ss

== Player Selects an Answer ==

player -> ui: Click answer choice A, B, or C
ui -> ge: POST /answer\n{ player, answer }

== Path A: Correct Answer ==

alt answer == correct_choice
    
    ge -> ge: Check answer
    ge -> ss: AddScore(player, points)
    ss -> ss: _scores[player] += points
    ss --> ge: "Added X points to player."

    ge --> ui: { \n   correct: true, \n   message: "Correct answer!", \n   player \n}
    ui -> ui: Show "Correct!" feedback
    ui -> ui: Update player score display
    ui --> player: Green confirmation +\nnew score shown

== Path B: Incorrect Answer ==

else answer != correct_choice

    ge -> ge: Check answer
    ge -> ss: SubtractScore(player, points)
    ss -> ss: _scores[player] -= points
    ss --> ge: "Subtracted X points from player."

    ge --> ui: { \n   correct: false, \n   message: "Incorrect answer.",\n   player \n}
    ui -> ui: Show "Incorrect" feedback
    ui -> ui: Reveal correct answer
    ui --> player: Red notification +\ncorrect answer revealed

end

== After Either Outcome ==

ui -> ui: Mark question as used
ui --> player: Go back to the Wheel Page
@enduml