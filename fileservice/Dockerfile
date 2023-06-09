FROM php:7.4-cli

COPY . /app
COPY upload.ini /usr/local/etc/php/conf.d/upload.ini

WORKDIR /app

EXPOSE 8080

CMD ["php", "-S", "0.0.0.0:8080", "router.php"]