from fastapi import FastAPI,Request, FastAPI  
from fastapi.security import HTTPBearer 
from keras.models import load_model
from keras.preprocessing.text import Tokenizer
from keras.preprocessing.sequence import pad_sequences
import google.generativeai as genai
import os 
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)
gemini_model = genai.GenerativeModel('gemini-pro')

class LLM():
    def __init__(self, model_name):
        self.model = genai.GenerativeModel(model_name)
    
    def generate_text(self, text):
        response = self.model.generate_content(text)
        return response.text
    
token_auth_scheme = HTTPBearer()  

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

@app.get("/")
async def read_root():
    return {"Hello": "World"}

@app.post("/strategies")   
async def generate_strategies(request: Request):
    model = load_model('./sentiment_analysis_model.h5')
    body = await request.json()
    company = body["company"]
    category = body["category"]
    productData = body["productData"]
    reviews = []
    products = []
    
    for item in productData:
        if "reviews" in item.keys():
            reviews.append(item["reviews"])
            products.append(item["productName"])
    
    tokenizer = Tokenizer()
    tokenizer.fit_on_texts(reviews)
    
    sequences = tokenizer.texts_to_sequences(reviews)
    max_sequence_length = 24
    padded_sequences = pad_sequences(sequences, maxlen=max_sequence_length)
    
    predictions = model.predict([padded_sequences,padded_sequences])
    
    sentiments = ["Positive" if pred >= 0.8 else "Mediocre" if pred>=0.5 else "Negative" for pred in predictions]
    # pred_avg = [sum(predictions[i])/len(predictions[i]) for i,pred in predictions]
    reviews = [" ".join(item) for item in reviews]
    joined_reviews = "/".join(reviews)
    llm = LLM('gemini-pro')
    prompt = f"""Generate targeted marketing strategies for {company} in the {category} category, leveraging insights from customer reviews. 
    Avoid generic recommendations and focus on addressing specific sentiments and pain points expressed by customers.
    Consider the following aspects:
    - Product Features: Identify key features praised by customers and emphasize them in marketing materials.
    - Customer Satisfaction: Address any recurring issues or concerns raised in negative reviews to improve customer satisfaction.
    - Competitive Analysis: Analyze competitor reviews to identify areas where your product outperforms competitors and capitalize on those strengths.
    - Personalized Marketing: Tailor marketing campaigns to specific customer segments based on sentiment analysis of reviews.
    - Content Creation: Develop engaging content (e.g., blog posts, videos) that resonates with customers' sentiments and interests.
    Provide actionable strategies that resonate with customers' experiences and drive sales growth."""

    response = llm.generate_text(prompt + " "
    +company + category +" reviews: "+joined_reviews)
    return {"sentiments": sentiments, "response": response}
