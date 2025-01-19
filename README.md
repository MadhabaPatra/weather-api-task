# Weather API - Backend Task

## Overview

This API gives you the current weather based on the user's IP address. It does this by integrating two key external services:

1. **Geolocation API**: Finds the user's location based on their IP.
2. **Weather API**: Gets the weather data for that location.

The API is designed with best practices in

1. Error handling
2. Rate limiting,
3. Caching
4. Modular file structure(Three layer architecture)
5. Documentation (Followed Standard: https://jsdoc.app)
6. Testing friendly

---

## Key Features

- **Rate Limiting**: You can make up to 5 requests per minute for each IP.

- **Caching**: Weather data for a city is cached for 10 minutes to reduce API calls.

- **Logging**: The API logs activity with timestamps and log levels, so you can always track what's going on.

- **Security**: We follow standard security practices, such as input validation and rate limiting.

- Easy Deployment: Provided docker file for easy setup.

---

## Installation Instructions

1. **Clone the repo**:

   ```bash
   git clone <repository-url>
   cd weather-api-task
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up your environment variables**:
   Rename the `.env.example` to `.env` file in the root directory with api keys.

4. **Start the development**:

   ```bash
   npm run dev
   ```

5. **Scripts**:

- `npm run start`: This will start the server for you.
- `npm run dev`: This will start the development server for you.
- `npm run test`: Run the tests to make sure everything is working.

---

## Project Structure

```
| Path                              | Description                                  |
|-----------------------------------|----------------------------------------------|
| `root/server.js`                  | Express Server Entry file                    |
| `root/app/index.js`               | Application Entry file                       |
| `root/app/middlewares`            | All the middlewares defined here             |
| `root/app/weather`                | Weather module (Controller, Route)           |
| `root/app/utils`                  | Utils files                                  |
| `root/app/services`               | Location API Service & Weather APi Service   |
| `root/logs`                       | All the log files                            |
| `root/test`                       | Testing files (Jest)                         |
| `root/package.json`               | Express application configuration file       |
| `root/.env.example`               | Env example file (Renamed to .env.test.local |
| `README.md`                       | Project documentation                        |
```

---

## Using the API

### Endpoint: `GET /weather-by-ip`

- **Query Parameters**:

  - `ip` (optional): You can specify an IP address, or leave it empty to use the client's IP.

- **Example**:
  ```bash
  curl "http://localhost:8080/weather-by-ip?ip=123.123.123.123"
  ```

### Sample Response:

```json
{
  "ip": "123.123.123.123",
  "location": {
    "city": "Pune",
    "country": "India"
  },
  "weather": {
    "temperature": 30.5,
    "humidity": 60,
    "description": "clear sky"
  }
}
```

---

## Testing

### Unit Tests & Integration Tests

```bash
npm test
```

---

## Deployment / Host it on your own

### Docker
1. Clone the repo and in the root directory rename .env.example to .env and fill the api keys

2. containing your `Dockerfile`, and run the following command:

   ```bash
   docker build -t weather-api .
   ```

3. Run the following command to run the container:
   ```bash
   docker run -it -p 8080:8080 weather-api
   ```
4. Deploy to google cloud run
   ```bash
   docker run -it -p 8080:8080 weather-api
   ```
---

## References

- **Rate Limiting**: [express-rate-limit](https://www.npmjs.com/package/express-rate-limit)
- **Caching**: [node-cache](https://www.npmjs.com/package/node-cache)
- **Security**: [helmat](https://www.npmjs.com/package/helmat)
- **Geolocation API**: [IPinfo](https://ipinfo.io/)
- **Weather API**: [OpenWeatherMap](https://openweathermap.org/api)

## Author

G Madhabananda Patra

## Task completed

17-Jan-2015

## Todo
1. Retry mechanism
