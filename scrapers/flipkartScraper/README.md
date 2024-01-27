# Flipkart Scraper API
[Postman documentation](https://documenter.getpostman.com/view/22495929/2s9Xy5NWqv)

### Tech Stack
* Typescript
* Node.js
* ExpressJS
* JWT
* MongoDB + Mongoose
* AWS

Deployed to AWS ([Live endpoint](https://xopepr7x6d.execute-api.ap-south-1.amazonaws.com/dev/))


### Endpoints
![endpoints](https://github.com/rahulsm20/flipkart-scraper-api/assets/77540672/4ce21770-a257-4a0b-9006-d5d9759d26fb)


### System Design
![system-design](https://github.com/rahulsm20/flipkart-scraper-api/assets/77540672/cc550f3a-9928-4b19-abd9-49f36e2dade6)

### Steps to run locally 

* Clone this repo
  ```
  git clone https://github.com/rahulsm20/flipkart-scraper-api.git
  ```

* Enter folder
  ```
  cd flipkart-scraper-api
  ```
* Install packages
  ```
  npm install
  ```
* Add a connection URL to a MongoDB instance in a .env file at the root of the directory and a 256-bit JWT secret key
  * Example
    ```
    MONGO_URL=mongodb+srv://admin:<password>@cluster0.5kaqvs5.mongodb.net/<collection_name>
    JWT_SECRET=<INSERT_SECRET>
    ```
* Run project
  * Dev mode
    ```
    npm run dev
    ``` 
  * Production mode
    ```
    npm start
    ```