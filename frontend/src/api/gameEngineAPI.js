const API_BASE = "/api";


export async function spinWheel() {
    const response = await fetch(`${API_BASE}/wheel/spin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ request_type: "SpinWheel" })
    });

    if (!response.ok) {
        throw new Error("Failed to spin wheel");
    }

    return response.json();
}


export async function startGame(players) {
    const response = await fetch(`${API_BASE}/start-game`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ players })
    });

    if (!response.ok) {
        throw new Error("Failed to start game");
    }

    return response.json();
}


export async function createTurn(category) {
    const response = await fetch(`${API_BASE}/turn`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ category })
    });

    if (!response.ok) {
        throw new Error("Failed to create turn");
    }

    return response.json();
}


export async function submitAnswer(player, answer, correctChoice) {
    const response = await fetch(`${API_BASE}/answer`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ player, answer, correct_choice: correctChoice })
    });

    if (!response.ok) {
        throw new Error("Failed to submit answer");
    }

    return response.json();
}