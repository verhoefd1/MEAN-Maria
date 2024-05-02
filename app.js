
// import and initialize modules and variables
const
//db			= require('./db'),
express		= require("express"),
app 		= express(),
bodyParser	= require("body-parser"),
// can't call require("pool") have to call the file that is exporting it (.db).
pool        = require("./db"),
// bootstrap	= require("bootstrap"),
//server
serverName	= "MEAN-SQL Server",
// process.env.PORT allows us to set the port as an environment variable from docker. Or it defaults to 8080.
port = process.env.PORT || 8080;
//security
//database
const mariadb = require("mariadb")

// this is working 05/01/24
// const pool = mariadb.createPool({
//     host: 'docker-mariadb',
//     user: 'root',
//     password: 'asjdfpoiajsdadsfipjoiasjdf',
//     database: 'food'
// })
//serves all files in public directory to /
app.use(express.static(__dirname + "/public"));
//creates middleware link with bodyparser
app.use(bodyParser.urlencoded({extended: true}));
//adds middleware to all routes without explicitly adding it ie ejs
app.set("views",__dirname + "/views/");
app.set("view engine", "ejs");

//add routes here:

app.get('/', async (req, res) => {
    res.send("Hello world, oh hey there, take my change and show it!")
})

app.get('/index', async (req, res) => {
    res.send("Test Page")
})

// Route to test database connection
app.get('/desserts', async (req, res) => {
    let conn
    try {
        conn = await pool.getConnection()

        let sql = `SELECT * FROM desserts`
        let result = await conn.query(sql)

        res.send(result)
    } catch (error) {
        throw error
    } finally {
        if (conn) {
            conn.release()
        }
    }
})

//sets app to listen on specified port and displays status in Console log
app.listen(port, function(){
	// using the ${port} syntax means that it takes it as a template literaly and will pull in the port number dynamically
	console.log(serverName + " is now listening on port: " + port);
});