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
load_dotenv()


GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)
gemini_model = genai.GenerativeModel('gemini-pro')

model = load_model('../analysis/sentiment_analysis_model.h5')

def main():
    st.title("Product Information")    
    company = st.text_input("Enter Company Name", "")
    
    category_options = ['Mobiles', 'Television', 'Refridgerators', 'Laptops', 'Smartwatches']
    category = st.selectbox("Select Category of the Product", category_options)
    
    if st.button("Submit"):
        if company and category:
            payload = {"company": company, "category": category}
            response = requests.get("http://localhost:5000/scrape",params=payload)
            
            if response.status_code == 200:
                data = response.json()
                reviews = []
                products = []
                for item in data:
                    if "reviews" in item.keys():
                        reviews.append(item["reviews"])
                        products.append(item["productName"])
                reviews = [" ".join(item) for item in reviews]
                joined_reviews = "/".join(reviews)
                
                tokenizer = Tokenizer()
                tokenizer.fit_on_texts(reviews)
                
                sequences = tokenizer.texts_to_sequences(reviews)
                max_sequence_length = 24
                padded_sequences = pad_sequences(sequences, maxlen=max_sequence_length)
                
                predictions = model.predict([padded_sequences,padded_sequences])
                
                sentiments = ["Positive" if pred >= 0.8 else "Mediocre" if pred>=0.5 else "Negative" for pred in predictions]
                

                llm = LLM('gemini-pro')
                response = llm.generate_text("Generate marketing strategies based on the reviews for a given line of products of company: " +company+ "and category: " + category +" reviews: "+joined_reviews)
                st.write(response)

                # bloom = BloomForCausalLM.from_pretrained("bigscience/bloom-1b3")
                # tokenizer = BloomTokenizerFast.from_pretrained("bigscience/bloom-1b3")

                # prompt ={ f"Generate marketing strategies based on the reviews for a given line of products of company: {company} , category: {category}, reviews: {joined_reviews}"}
                # result_length = 3000
                # inputs = tokenizer(prompt, return_tensors="pt")

                # st.write(tokenizer.decode(bloom.generate(inputs["input_ids"],max_length=result_length, do_sample=True, top_k=50, top_p=0.9)[0]))
                
            else:
                st.warning("Failed to fetch data from the server.")
        else:
            st.warning("Please fill in all fields.")

if __name__ == "__main__":
    main()


class LLM():
    def __init__(self, model_name):
        self.model = genai.GenerativeModel(model_name)
    
    def generate_text(self, text):
        response = self.model.generate_content(text)
        return response.text