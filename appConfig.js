var developmentDatabase = {
    postgres: {
        host: 'ec2-99-81-238-134.eu-west-1.compute.amazonaws.com',
        port: 5432,
        database: 'd6erjdmcf6jk4g',
        user: 'owuqmjrrihztys',
        password: '38fefb1385bea4b7250055341697835f836057564abb32cf1675514ddfe8bad1'
        }
        }
        
        var connectionString = "postgres://owuqmjrrihztys:38fefb1385bea4b7250055341697835f836057564abb32cf1675514ddfe8bad1@ec2-99-81-238-134.eu-west-1.compute.amazonaws.com:5432/d6erjdmcf6jk4g";
    if (process.env.NODE_ENV == 'production') {
    //Production mode
    if (process.env.DATABASE_URL) {
    developmentDatabase =
    parseConnectionString(process.env.DATABASE_URL);
    } else {
    console.log("process.env.DATABASE_URL empty, connectionStringvariable used");
    developmentDatabase = parseConnectionString(connectionString);
    }
    }else{
    //Development mode
    developmentDatabase = parseConnectionString(connectionString);
    }
    function parseConnectionString(connectionString) {
    if (connectionString) {
    var myRegexp = /(\w+):(\w+)@(.+):(\w+)\/(\w+)/g;
    var match = myRegexp.exec(connectionString);
    if (match.length == 6) {
    developmentDatabase.postgres.user = match[1];
    developmentDatabase.postgres.password = match[2];
    developmentDatabase.postgres.host = match[3];
    developmentDatabase.postgres.port = Number(match[4]);
    developmentDatabase.postgres.database = match[5];
    developmentDatabase.postgres.ssl = { rejectUnauthorized: false };
    return developmentDatabase;
    }
    }
    console.log("connectionString cannot be parsed");
    return null;
    }
    module.exports = {
    hostname: "http://localhost",
    port: 5656,
    database: {
    postgres: developmentDatabase.postgres
    }
    }