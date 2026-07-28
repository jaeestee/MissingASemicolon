# Backend Sequence Diagrams

## Start of the Game

```plantuml
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
participant "Game Engine" as ge
participant "Question Repository" as qr
database "Questions CSV" as q

user -> ui: Start Game (players list)
ui -> ge: POST /start-game
ge -> ge: Store players list
ge --> ui: { message: "Game started", players }

user -> ui: Load Questions
ui -> ge: POST /question/load
ge -> qr: LoadQuestions()
qr -> q: Read CSV file
q --> qr: Raw question rows
qr --> ge: "Loaded the questions and answers!"
ge --> ui: { message: "Loaded..." }

user -> ui: Get Categories
ui -> ge: GET /question/categories
ge -> qr: GetCategories()
qr -> qr: Pick 6 random categories
qr --> ge: 6 selected categories
ge --> ui: { categories: [...] }

user -> ui: Save Questions
ui -> ge: POST /question/save
ge -> qr: SaveQuestions()
qr -> qr: Pick 5 random questions per category
qr --> ge: "Saved the 5 questions for all 6 categories!"
ge --> ui: { message: "Saved..." }
@enduml
```

## Spin the Wheel

```plantuml
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

title "Spin the Wheel"
actor User as user
participant "User Interface" as ui
participant "Game Engine" as ge
participant "Wheel Service" as ws

user -> ui: Spin Wheel
ui -> ge: POST /wheel/spin
ge -> ws: SpinWheel()
ws -> ws: Random choice from WheelOutcome
ws --> ge: WheelOutcome (e.g. "Category1", "Bankrupt", "Lose Turn")
ge --> ui: { outcome }
@enduml
```

## Create a Turn (Spin + Get Question)

```plantuml
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

title "Create a Turn (Spin + Get Question)"
actor User as user
participant "User Interface" as ui
participant "Game Engine" as ge
participant "Wheel Service" as ws
participant "Question Repository" as qr
database "Questions CSV" as q

user -> ui: Request Turn (optional category)
ui -> ge: POST /turn
ge -> ws: SpinWheel()
ws -> ws: Random choice from WheelOutcome
ws --> ge: WheelOutcome
ge -> qr: GetCategories()
qr -> q: Read CSV
q --> qr: All questions
qr --> qr: Pick 6 random categories
qr --> ge: categories list
ge -> qr: SaveQuestions()
qr -> qr: Pick 5 random questions per category
qr --> ge: questions list
ge -> ge: Select unused question for category\n(random fallback if category has none)
ge -> qr: MarkQuestionUsed(category, question)
qr --> ge: Question marked as used
ge --> ui: { category, question, choices, correct_choice, outcome }
@enduml
```

## Submit Answer

```plantuml
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

title "Submit Answer"
actor User as user
participant "User Interface" as ui
participant "Game Engine" as ge
participant "Scoring Service" as ss

user -> ui: Submit Answer (player, answer, correct_choice, points)
ui -> ge: POST /answer
ge -> ge: Compare answer == correct_choice

alt Correct Answer
    ge -> ss: AddScore(player, points)
    ss --> ge: "Added X points to player."
    ge --> ui: { correct: true, message: "Correct answer!" }
else Incorrect Answer
    ge -> ss: SubtractScore(player, points)
    ss --> ge: "Subtracted X points from player."
    ge --> ui: { correct: false, message: "Incorrect answer." }
end
@enduml
```

## Scoring Operations (Add / Subtract / Bankrupt / Get)

```plantuml
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

title "Scoring Operations (Add / Subtract / Bankrupt / Get)"
actor User as user
participant "User Interface" as ui
participant "Game Engine" as ge
participant "Scoring Service" as ss

== Add Score ==
user -> ui: Add Score
ui -> ge: POST /scoring/add
ge -> ss: AddScore(player, points)
ss --> ge: "Added X points."
ge --> ui: { message, player, points }

== Subtract Score ==
user -> ui: Subtract Score
ui -> ge: POST /scoring/subtract
ge -> ss: SubtractScore(player, points)
ss --> ge: "Subtracted X points."
ge --> ui: { message, player, points }

== Apply Bankrupt ==
user -> ui: Bankrupt Player
ui -> ge: POST /scoring/bankrupt
ge -> ss: ApplyBankrupt(player)
ss -> ss: Reset score to 0
ss --> ge: "Applied bankruptcy."
ge --> ui: { message, player }

== Get Score ==
user -> ui: Get Score
ui -> ge: GET /scoring/{player}
ge -> ss: GetScore(player)
ss --> ge: current score
ge --> ui: { player, score }
@enduml
```

## Determine Winner

```plantuml
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
actor User as user
participant "User Interface" as ui
participant "Game Engine" as ge
participant "Scoring Service" as ss

user -> ui: Check Winner
ui -> ge: GET /scoring/winner
ge -> ss: DetermineWinner()
ss -> ss: Find max score + check for ties

alt Clear Winner
    ss --> ge: winner player name
    ge --> ui: { winner: "PlayerX" }
else Tie or No Players
    ss --> ge: null
    ge --> ui: { winner: null, message: "No clear winner yet" }
end
@enduml
```

## Manage Questions (CRUD)

```plantuml
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

title "Manage Questions (CRUD)"
actor User as user
participant "User Interface" as ui
participant "Game Engine" as ge
participant "Question Repository" as qr

== Create Question ==
user -> ui: Create Question
ui -> ge: POST /question/create
ge -> qr: CreateQuestion(category, question, answer_choices)
qr -> qr: Append new QuestionAndAnswer to all_questions
qr --> ge: "Created a new question..."
ge --> ui: { message }

== Update Question ==
user -> ui: Update Question
ui -> ge: PUT /question/update
ge -> qr: UpdateQuestion(category, question, answer_choices)
qr -> qr: Find and update matching question fields
qr --> ge: "Updated question..."
ge --> ui: { message }

== Delete Question ==
user -> ui: Delete Question
ui -> ge: DELETE /question/delete/{category}/{question_id}
ge -> qr: DeleteQuestion(category, question_id)
qr -> qr: Remove from all_questions
qr --> ge: "Deleted question..."
ge --> ui: { message }
@enduml
```
