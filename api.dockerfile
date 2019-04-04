FROM python:3.7
ENV PYTHONUNBUFFERED 1
RUN apt update -y && apt install postgresql-client -y
RUN mkdir /code
WORKDIR /code
ADD api/requirements.txt /code/
RUN pip install -r requirements.txt
ADD . /code/