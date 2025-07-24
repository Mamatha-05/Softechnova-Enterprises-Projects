from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel  # ✅ Required for structured request handling

app = FastAPI()

# ✅ Allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Leaderboard storage
leaderboard = []

class ScoreRequest(BaseModel):  # ✅ Define structured request format
    username: str
    score: int
@app.post("/submit_score")
def submit_score(data: ScoreRequest):
    global leaderboard

    print(f"Received Score Submission: Username={data.username}, Score={data.score}")  # ✅ Debugging

    leaderboard.append({"username": data.username, "score": data.score})
    leaderboard = sorted(leaderboard, key=lambda x: x["score"], reverse=True)

    print(f"Updated Leaderboard: {leaderboard}")  # ✅ Debugging
    return {"message": "Score submitted!", "leaderboard": leaderboard}

@app.get("/leaderboard")
def get_leaderboard():
    return {"leaderboard": leaderboard}

@app.get("/")
def home():
    return {"message": "Welcome to the Quiz APP! Visit http://127.0.0.1:8000/quiz for questions."}

@app.get("/quiz")
def get_quiz():
    return [
        {"text": "Who invented the light bulb?", "options": ["Edison", "Tesla", "Newton", "Galileo"], "correct": "Edison"},
        {"text": "What is the capital of France?", "options": ["Rome", "Paris", "Berlin", "Madrid"], "correct": "Paris"},
        {"text": "Which is heavier: 1 kg of cotton or 1 kg of iron?", "options": ["Cotton", "Iron", "Same weight", "Depends on volume"], "correct": "Same weight"},
        {"text": "Largest planet in our solar system?", "options": ["Mars", "Earth", "Saturn", "Jupiter"], "correct": "Jupiter"},
        {"text": "Which month has 28 days?", "options": ["February", "February (leap year)", "All months", "None"], "correct": "All months"},
    ]
