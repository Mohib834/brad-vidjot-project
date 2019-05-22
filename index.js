const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const ideasRouter = require('./routes/ideas');
const usersRouter = require('./routes/users');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const router = express.Router();


require('./db/mongoose');
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');


app.use(morgan('dev')) //log every request to console
app.use(cookieParser()); //read cookies (needed for auth)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

//Static folder
app.use(express.static(path.join(__dirname,'./public')))

//Method Overide Middleware
app.use(methodOverride('_method'));

//Express session middleware and passport config
app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true
}))
app.use(passport.initialize());
app.use(passport.session()) //persistent login sessions
app.use(flash());

//Global variable
app.use((req, res, next) => {
    res.locals.user = req.user || null 

    next();
})

//Load routes
app.use('/ideas', ideasRouter); //anything that goes to /ideas url then ideasRouter will work eg('localhost:3000/ideas/'new)
app.use('/users', usersRouter);

//passport config
require('./config/passport')(passport);

app.get('/', (req, res) => {
    req.flash('logout');
    res.render('index', { message:req.flash('logout') });
})

app.get('/about',(req, res) => {
    res.render('about');
})


app.listen(process.env.PORT || 3000);