const express = require('express');
const path = require('path');
require('dotenv').config();
const PORT = process.env.PORT || 5600
const authRoute = require('./routes/auth-route');
const adminRoute = require('./routes/admin-route');
const commonRoute = require('./routes/common-route');
const userRoute = require('./routes/user-route');
const publicRoute = require('./routes/public-route');
const cors = require('cors');
const dbConfig = require('./configs/db-config');
const ErrorHandler = require('./utils/error-handler');
const errorMiddlware = require('./middlewares/error-middleware');
const cookieParser = require('cookie-parser');
const { auth, authRole } = require('./middlewares/auth-middleware');

const app = express();

const corsOption = {
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:80', 'https://socialshopia.herokuapp.com', 'http://socialshopia.herokuapp.com', '*']
}

app.use(cors(corsOption));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoute);
app.use('/api/common', commonRoute); //auth
app.use('/api/public', publicRoute); //auth
app.use('/api/admin', auth, authRole('admin'), adminRoute);
app.use('/api/user', auth, authRole('admin'), userRoute);
app.use('/storage', express.static('storage'));

app.use((req, res, next) => {
    return next(ErrorHandler.notFound());
})


app.use(errorMiddlware);

app.listen(PORT, () => console.log(`Listning on port ${PORT}`))