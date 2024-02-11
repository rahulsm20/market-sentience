# Marketing Strategy Optimization using Sentiment Analysis

### Introduction

A sentiment analysis project driven by real time data collection and a combination of CNN-LSTM architecture.

## Index

- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [More details about scraper](https://github.com/rahulsm20/flipkart-scraper-api)

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
    cd venv\Scripts
    .\Activate.ps1
    ```

- Install requirements

```
pip install -r requirements.txt
```

## Setup scraper

```
cd scrapers/amazon_scraper
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

```
MONGO_URL=mongodb+srv://<username>:<userpass>@<cluster>.mongodb.net/<db_name>
JWT_SECRET= {ANY_SEQUENCE_OF_CHARACTERS}
NODE_ENV= production
BRIGHTDATA_WS_ENDPOINT = <BRIGHTDATA_PROXY_ENDPOINT>
```

- Run in dev mode

```
npm run dev
```

--> runs on : 5000
