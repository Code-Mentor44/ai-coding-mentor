FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .

# Force upgrade the vulnerable packages globally
RUN pip install --upgrade pip wheel==0.46.2 jaraco.context==6.1.0

RUN pip install -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn","main:app","--host", "0.0.0.0","--port","8000"]