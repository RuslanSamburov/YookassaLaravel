<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

# Yookassa

## Настройка конфигурации

Откройте конфигурационный файл `yookassa.php`, и в массив `ips` добавьте ip адреса, которые будут указаны <a href="https://yookassa.ru/developers/using-api/webhooks#ip" target="_blank">тут</a>:
- config/
    - yookassa.php

Переименуйте файл `.env.example` в `.env` и заполните следующие поля:
<br/>`YOOKASSA_CLIENT_ID=`
<br/>`YOOKASSA_CLIENT_SECRET=`
<br/>`YOOKASSA_CURRENCY=RUB`

<br/>`PUSHER_APP_ID=`
<br/>`PUSHER_APP_KEY=`
<br/>`PUSHER_APP_SECRET=`
<br/>`PUSHER_HOST=`
<br/>`PUSHER_PORT=`
<br/>`PUSHER_SCHEME=`
<br/>`PUSHER_APP_CLUSTER=`

## Команды

Команды, которые необходимо выполнить:

- Установка пакетов
```bash
composer i
```
```bash
npm i
```
- Запуск миграций
```bash
php artisan migrate
```
- Создание ссылки хранилища
```bash
php artisan storage:link
```

- Сборка React
```bash
npm run build
```
- Запуск сервера
```bash
php artisan serve
```
