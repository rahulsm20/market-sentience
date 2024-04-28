import streamlit as st
import requests
from keras.models import load_model
from keras.preprocessing.text import Tokenizer
from keras.preprocessing.sequence import pad_sequences
import google.generativeai as genai
import os 
from dotenv import load_dotenv
from transformers import BloomForCausalLM
from transformers import BloomTokenizerFast
import torch
import pandas as pd
import plotly.express as px

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
    
model = load_model('../analysis/sentiment_analysis_model.h5')

def main():
    st.title("Sentiment Analysis and Marketing Strategy Generation")    
    company = st.text_input("Enter Company Name", "")
    
    category_options = ['Mobiles', 'Television', 'Refridgerators', 'Laptops', 'Smartwatches']
    category = st.selectbox("Select Category of the Product", category_options)
    
    if st.button("Submit"):
        if company and category:
            payload = {"company": company, "category": category}
            response = requests.get("http://localhost:5000/scrape",params=payload)
            
            if response.status_code == 200:
                data = response.json()
                response_df = pd.DataFrame(data)
                response_df.to_csv("response.csv", index=False)
                reviews = []
                products = []
                
                for item in data:
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

                df = pd.DataFrame({"Product Name": products, "Review": reviews, "Sentiment": sentiments})

                sentiment_counts = df.groupby("Sentiment").size().reset_index(name='Count')
                
                # Plotting the pie chart
                st.plotly_chart(px.pie(sentiment_counts, values='Count', names='Sentiment', title='Sentiment Distribution'))
                
                llm = LLM('gemini-pro')
                response = llm.generate_text("Give me strong strategies for improving product sales for " +company + category +" reviews: "+joined_reviews)
                st.write(response)
            else:
                st.warning("Failed to fetch data from the server.")
        else:
            st.warning("Please fill in all fields.")

if __name__ == "__main__":
    main()
