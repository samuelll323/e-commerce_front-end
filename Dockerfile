FROM nginx:latest

RUN rm -rf /usr/share/nginx/html/*

COPY dist/my-angular-app /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

