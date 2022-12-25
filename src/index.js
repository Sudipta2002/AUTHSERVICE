const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const { PORT } = require('./config/serverConfig');
const apiRoutes = require('./routes/index');
// const UserRepository = require('./repository/user-repository');
const prepareAndStartServer = async() => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/api', apiRoutes);

    // const repo = new UserRepository();
    // const res = await repo.getById(1);
    // console.log(res);
    app.listen(PORT, () => {
        console.log(`Server is running in port ${PORT}`);
    })
}

prepareAndStartServer();