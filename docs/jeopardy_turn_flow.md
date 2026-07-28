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

title "Turn Flow: Spin Wheel to Question"

actor "Player" as player
participant "User Interface" as ui
participant "Game Service" as ge
participant "Wheel Service" as ws
participant "Question Repository" as qr

== Step 1: Spin the Wheel ==

player -> ui: Click "Spin Wheel"
ui -> ge: POST /turn
ge -> ws: SpinWheel()
ws -> ws: Random choice \nfrom WheelOutcome
ws --> ge: WheelOutcome (e.g. "Category3")
ge --> ui: { wheel_outcome }
ui --> player: Show Category + Next Button

== Step 2: Jeopardy Board to Q&A ==

player -> ui: Click a box from the\nhighlighted column (e.g. $200)
ui -> ge: POST\n/question/get/{category, difficulty_level}
ge -> qr: GetQuestion(category, difficulty_level)
qr --> ge: Return Question and 3 Answer Choices

ge --> ui: { \n   category, \n   question, \n   choices, \n   correct_choice, \n   point_value \n}

ui -> player: show Q&A Page

@enduml