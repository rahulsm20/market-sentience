from transformers import BloomForCausalLM
from transformers import BloomTokenizerFast
from transformers import AutoModelForCausalLM, AutoTokenizer, BitsAndBytesConfig
import torch
import bitsandbytes
import accelerate
import pandas as pd
import plotly.express as px

def main():
    df = pd.read_csv("response.csv")
    df_ = pd.read_csv("reviews.csv")

    sentiment_counts = df_.groupby("Sentiment").size().reset_index(name='Count')
    positive_reviews = df_[df_['Sentiment'] == 'Positive']
    print(sentiment_counts,positive_reviews)
    sentiment_counts = df.groupby("reviews").size().reset_index(name='Review Count')
    print(sentiment_counts)
    fig = px.pie(sentiment_counts,values='reviews', names='Review Count', title='Review Count Distribution')
    fig.show()
if __name__ == "__main__":
    main()