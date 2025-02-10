FROM nginx:latest

RUN rm -rf /usr/share/nginx/html/*

COPY dist/YOUR_PROJECT_NAME /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

