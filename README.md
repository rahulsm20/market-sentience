# Marketing Sentience

### Introduction

Market Sentience is a sentiment analysis platform powered by real-time data collection and a microservices architecture. It leverages a CNN-LSTM deep learning model to analyze market sentiment from scraped data. The system orchestrates asynchronous tasks through a scheduler service and RabbitMQ, with dedicated services for scraping, embedding, and generation. MongoDB stores conversation and message data, while Pinecone manages semantic embeddings for efficient retrieval. The generation service uses LLM-powered reasoning to produce actionable insights, delivered back to the client in real time.

### Index

- [Pre-requisites](#prerequisites)
- [Setup](#setup)
- [System Design](#system-design)

### Prerequisites

- [Node](https://nodejs.org/en/download/current)
- [Python (>=3.10)](https://www.python.org/downloads/)
- [Python Extension (VSCode)](https://marketplace.visualstudio.com/items?itemName=ms-python.python)
- [Jupyter Notebook Extension (VSCode)](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter)
- [Docker (Optional)](https://www.docker.com/)

### Setup

- Add .env variables according to .env.example files

  #### Using start script

  ```bash
  chmod +x start.sh && ./start.sh
  ```

  #### Using Docker

  ```bash
  docker compose up
  ```

### System Design

![system](client/public/market_sentience_arch.png)
