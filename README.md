# Marketing Strategy Optimization using Sentiment Analysis

### Introduction

A sentiment analysis project driven by real time data collection and a combination of CNN-LSTM architecture.

## Index

- [Prerequisites](#prerequisites)
- [Setup](#setup)

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

## Setup scraper

```
cd scraper
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

$ .env

```
MONGO_URL=mongodb+srv://<username>:<userpass>@<cluster>.mongodb.net/<db_name>
```

$ ./public/.env

```
GEMINI_API_KEY=
```

- Run in dev mode

```
npm run dev
```

--> runs on : 5000
