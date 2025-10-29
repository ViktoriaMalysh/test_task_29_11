### To launch the frontend:

1. Go to the `/frontend` directory
2. Run the command to install dependencies:
   ```bash
   npm install
   ```
4. Run the command to run the frontend:
   ```
   bash npm run dev
   ```
6. The frontend will be available at: `http://localhost:3000/` in your browser

### To launch the backend:

1. Go to the backend directory
2. Run the command to install dependencies:
   ```bash
   pip install fastapi uvicorn
   ```
4. Run the command to run the server:
   ```bash
   uvicorn main:app --reload --port 8000
   ```
6. The API will be available at: `http://localhost:8000`

Cors configurations were added to the backend to execute the `cors` request with both the locally running backend and frontend.

## Configuration code:

```bash
  app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)
```
