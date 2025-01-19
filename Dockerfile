# Specifies node as the base image.
FROM node:20

# Sets the working directory to /app.
WORKDIR /app

# Copy the entire application to to the working directory (app)
COPY . /app

# Install dependencies
RUN npm install

# Check the .env file exists or not
RUN if [ ! -f ".env" ]; then \
      echo ".env file is missing. Please create it before building the Docker image."; \
      exit 1; \
    fi

# Start the application
CMD ["npm", "run","start"]
