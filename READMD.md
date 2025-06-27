## Mongoose
commands to start mongodb server:
```
mongosh "mongodb://127.0.0.1:27017/event-booking"


```


## .env
To generate an unique JWT secret:

```
openssl rand -hex 32
or
openssl rand -base64 48
```

then paste it in .env to "JWT_SECRET=xxx"

