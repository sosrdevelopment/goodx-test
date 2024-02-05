# Use the official Python image from Docker Hub
FROM python:3.11

# Set the working directory inside the container
WORKDIR /app

# Copy only the requirements file to leverage Docker cache
COPY requirements.txt .

# Install dependencies from requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire application code to the working directory
COPY . .

# Expose the port your application runs on
EXPOSE 8080

# Command to run your application
CMD [ "python", "./Application.py"]