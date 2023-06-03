var config=require('./env/development'),
    session=require('express-session'),
    express=require('express'),
    morgan=require('morgan'),
    compress=require('compression'),
    bodyParser=require('body-parser'),
    methodOverride=require('method-override');

module.exports=function(){
    var app=express();
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production'){
        app.use(compress());
    }

    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(bodyParser.json());
    app.use(methodOverride());

    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret
    }));

    app.set('views', './app/views');
    app.set('view engine', 'ejs');

    app.use('/', require('../app/routes/index.server.routes.js'));
    //require('../app/routes/index.server.routes.js')(app);

    //to add static file support 
    app.use(express.static('./public'));
    app.use(express.static("./node_modules"));
    return app;
};
