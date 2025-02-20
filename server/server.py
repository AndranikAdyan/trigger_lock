from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import re

def clean_text(text: str) -> str:
	text = text.lower()
	text = re.sub(r'[^a-z\s]', '', text)
	text = text.replace("\n", " ")
	return text

svm_model = joblib.load("./saved_data/svm_model.pkl")
vectorizer = joblib.load("./saved_data/tfidf_vectorizer.pkl")

app = FastAPI()

app.add_middleware(
	CORSMiddleware,
	allow_origins=["*"],
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
)

class EmailContent(BaseModel):
	content: str

@app.post("/predict")
def predict_email(email: EmailContent):
	try:
		cleaned_text = clean_text(email.content)
		text_features = vectorizer.transform([cleaned_text])
		prediction = svm_model.predict(text_features)
		print(int(prediction))
		return {"prediction": int(prediction)}

	except Exception as e:
		raise HTTPException(status_code=500, detail=str(e))
