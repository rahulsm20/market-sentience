# Marketing Strategy Optimization using Sentiment Analysis

### Introduction

A sentiment analysis project driven by real time data collection and a combination of CNN-LSTM architecture.

## Index

- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [System Design](#system-design)

## Prerequisites

- [Node](https://nodejs.org/en/download/current)
- [Python (>=3.10)](https://www.python.org/downloads/)
- [Python Extension (VSCode)](https://marketplace.visualstudio.com/items?itemName=ms-python.python)
- [Jupyter Notebook Extension (VSCode)](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter)
- [Docker (Optional)](https://www.docker.com/)

## Setup

### Setup Notebook

- Create virtual environment

```
python -m venv venv
```

- Enter virtual environment

  - Bash
    ```
    source venv/bin/activate
    ```
  - Powershell

    ```
    .\venv\Scripts\activate
    ```

- Install requirements

```
pip install -r requirements.txt
```

## Setup

#### Scraping Service

```
cd scraping-service
```

- Install modules

  ```
  npm install
  ```

  or

  ```
  npm i
  ```

- Setup environment variables

  $ scraping-service/.env

  ```
  MONGO_URL=
  API_KEY=
  POSTGRES_URL=
  ```


* Starting the servers  
  $ scraping-service
  ```
  npm run dev
  ```

#### Generation Service 
```
cd generation-service
```
- Install Packages  

  ```
  pip -r requirements.txt
  ```

$ generation-service/.env

```
GEMINI_API_KEY=
```
$ generation-service
```
uvicorn main:app --host 0.0.0.0 --port 8000
```
#### Setup Client
- Setup environment variables
  ```
  VITE_AUTH0_CLIENT_ID=
  VITE_AUTH0_DOMAIN=
  VITE_SCRAPING_SERVICE_URL=http://localhost:5000
  VITE_GENERATION_SERVICE_URL=http://localhost:8000
  VITE_CLIENT_URL= http://localhost:5173/
  VITE_SERVER_URL=http://localhost:5000
  ```
  $ client
  ```
  npm i && npm run dev
  ```
### Using Docker
$ .
```
docker compose up
```
### System Design
![system](https://github.com/rahulsm20/marketing-sentiment-analysis/assets/77540672/06703c25-fc15-4b79-aa33-c4e5964ca174)