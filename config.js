const mlabDbUrl =  "mongodb://BriNew:133Finnish@ds149124.mlab.com:49124/vocab_app_db";

exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
             	 	   mlabDbUrl;
             	 	   
exports.PORT = process.env.PORT || 8080;