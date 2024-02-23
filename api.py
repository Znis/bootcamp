from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from joblib import load

app = FastAPI()

class data(BaseModel):
    years_of_experience: float
    
# Allowing CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# load the model
best_model = load("salary_hike_best_lr_model.pkl")


@app.post("/predict-salary/")
async def predict_salary(years_of_experience:data):

    years_of_exp_input = years_of_experience.years_of_experience

    # model prediction
    try:
        predicted_salary_linear = best_model.predict([[years_of_exp_input]])
        return {"salary": round(predicted_salary_linear[0],2)}
    except:
        return {"salary": "0"}
