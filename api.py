from fastapi import FastAPI
from joblib import load

app = FastAPI()



# load the model
best_model = load("salary_hike_best_lr_model.pkl")


@app.post("/predict-salary/")
async def predict_salary(years_of_experience: float):
    years_of_exp_input = years_of_experience

    # model prediction
    predicted_salary_linear = best_model.predict([[years_of_exp_input]])
    return {"salary": round(predicted_salary_linear[0],2)}
