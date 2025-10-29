# 🧩 Mock Backend – People Assignment API

This is a lightweight **FastAPI** backend used for the **People Assignment Page** frontend task.

It provides two endpoints:
- `GET /people` – returns a predefined list of people with their current roles  
- `PATCH /assign` – updates a person’s role (with a rule that only one Project Leader can exist)

---

## ⚙️ Setup & Run

### 1. Install dependencies
Make sure you have **Python 3.9+** installed.

```bash
pip install fastapi uvicorn
```

### 2. Run the server
From the `/backend` folder, run:

```bash
uvicorn main:app --reload --port 8000
```

The API will be available at:
```
http://localhost:8000
```

---

## 📚 Endpoints

### **GET /people**
Returns a list of all people and their current roles.

**Response example:**
```json
[
  { "id": "1", "name": "Alice", "role": "leader" },
  { "id": "2", "name": "Bob", "role": "group1" },
  { "id": "3", "name": "Charlie", "role": "group2" },
  { "id": "4", "name": "Diana", "role": "none" }
]
```

---

### **PATCH /assign**
Assigns a new role to a person.

**Request body:**
```json
{
  "person_id": "2",
  "new_role": "leader"
}
```

**Success response:**
```json
{
  "success": true,
  "people": [ ...updated list... ]
}
```

**Error response (if assigning a second leader):**
```json
{
  "detail": "Only one project leader can be assigned."
}
```

---

## 🧠 Notes

- This API stores data **in memory** – restarting the server resets all assignments.
- Only one user can have the role `"leader"`.  
- Other valid roles: `"none"`, `"group1"`, `"group2"`.

---

## 📦 Folder Structure

```
backend/
├── main.py        # FastAPI application
└── README.md      # This file
```

---

## 🧪 Example Usage (via curl)

```bash
curl http://localhost:8000/people
```

```bash
curl -X PATCH http://localhost:8000/assign \
  -H "Content-Type: application/json" \
  -d '{"person_id": "4", "new_role": "group2"}'
```

---

## ✅ Expected Behavior

- You can reassign group members freely.
- Assigning a new Project Leader replaces the old one **only if** the old leader is reassigned to another role first.
- Assigning a second leader without removing the previous one will trigger an error (HTTP 400).

---

**Author:**  
Frontend Take-Home Assignment – People Assignment Page  
© 2025
