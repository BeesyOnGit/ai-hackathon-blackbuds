import asyncio
from dotenv import load_dotenv
import warnings
from routes import agents
from fastapi import FastAPI
from routes import agents

# Load env having your OPEN AI KEY
load_dotenv()


app = FastAPI(title="AI Hackathon", version="1.0.0")

app.include_router(agents.router)


@app.get("/")
async def read_root():
    return {"msg": "AI Hackathon"}

