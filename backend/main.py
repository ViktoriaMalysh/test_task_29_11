from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Mock People Assignment API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)

class Person(BaseModel):
    id: str
    name: str
    role: str  # "none", "leader", "group1", "group2"

# Mock people list (in-memory store)
people = [
    {"id": "1", "name": "Alice", "role": "leader"},
    {"id": "2", "name": "Bob", "role": "group1"},
    {"id": "3", "name": "Charlie", "role": "group2"},
    {"id": "4", "name": "Diana", "role": "none"},
    {"id": "5", "name": "Ethan", "role": "none"},
]

@app.get("/people", response_model=List[Person])
def get_people():
    """Return list of all people."""
    return people

class Assignment(BaseModel):
    person_id: str
    new_role: str

@app.patch("/assign")
def assign_role(assignment: Assignment):
    """Assign a role to a person, enforcing one project leader only."""
    global people
    if assignment.new_role == "leader":
        current_leader = next((p for p in people if p["role"] == "leader"), None)
        if current_leader and current_leader["id"] != assignment.person_id:
            raise HTTPException(status_code=400, detail="Only one project leader can be assigned.")
    
    person = next((p for p in people if p["id"] == assignment.person_id), None)
    if not person:
        raise HTTPException(status_code=404, detail="Person not found.")
    
    person["role"] = assignment.new_role
    return {"success": True, "people": people}

# To run:
# uvicorn main:app --reload --port 8000
