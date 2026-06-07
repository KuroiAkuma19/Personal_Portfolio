FROM python:3.11-slim
WORKDIR /app
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1
COPY requirements.txt /app/
RUN pip install --upgrade pip && pip install -r requirements.txt
COPY . /app/
ENV DJANGO_SETTINGS_MODULE=server_project.settings
RUN python manage.py collectstatic --noinput || true
CMD ["gunicorn", "server_project.wsgi:application", "--bind", "0.0.0.0:8000"]
