# Test Backend Invoice

## Preparation

### install Sequelize globally
```
npm install sequelize -g
```

### set up database
```
change the config in config/config.js
```

### preparing modules and database
```
npm install
sequelize db:migrate
sequelize db:seed:all
```

### Run Dev
```
npm run start:dev
```