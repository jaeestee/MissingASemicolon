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

title "Start of the Game"
actor User as user
participant "User Interface" as ui
participant "Game Service" as ge
participant "Question Repository" as qr
database "Questions CSV" as q

user -> ui: Start Game (players list)
ui -> ge: POST /start-game
ge -> ge: Store players list
ge --> ui: { message: "Game started", players }

ui -> ge: POST /question/load
ge -> qr: LoadQuestions()
qr -> q: Read CSV file
q --> qr: Raw question rows
qr --> ge: "Loaded the questions and answers!"
ge --> ui: { message: "Loaded..." }

ui -> ge: GET /question/categories
ge -> qr: GetCategories()
qr -> qr: Pick 6 random categories
qr --> ge: 6 selected categories
ge --> ui: { categories: [...] }

ui -> ge: POST /question/save
ge -> qr: SaveQuestions()
qr -> qr: Pick 5 random questions per category
qr --> ge: "Saved the 5 questions for all 6 categories!"
ge --> ui: { message: "Saved..." }
ui --> user: Show Wheel Page
@enduml
