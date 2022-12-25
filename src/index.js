const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const { PORT } = require('./config/serverConfig');
const apiRoutes = require('./routes/index');
// const UserRepository = require('./repository/user-repository');
// const UserService = require('./services/user-service');
const prepareAndStartServer = async() => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/api', apiRoutes);

    // const repo = new UserRepository();
    // const res = await repo.getById(1);
    // console.log(res);

    // const service = new UserService();
    // const newToken = service.createToken({ email: 'sudiptaghosh27september@gmail.com', id: 1 })
    // console.log(newToken);
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1ZGlwdGFnaG9zaDI3c2VwdGVtYmVyQGdtYWlsLmNvbSIsImlkIjoxLCJpYXQiOjE2NzE5NTk5MzEsImV4cCI6MTY3MTk2NzEzMX0.2XYBav1DCYjLw9aGs5GqP8OpG7KZ2QN_BTyR6VNVl8k';
    // const response = service.verifyToken(token);
    // console.log(response);
    app.listen(PORT, () => {
        console.log(`Server is running in port ${PORT}`);
    })
}

prepareAndStartServer();