Hello!
That's  a site for employees and emloyers, where you can find a job for yourself or give smb a job. 

Here is only backend with some hbs structure part without client and css.

http://localhost:3000/api/...

STRUCTURE OF CODE:

    index.js  -  the main page of site with connecting all modules and routes

    package.json  -  all the dependencies

    folder routes  -  routes for every page (main path: `http://localhost:3000/api/${name of file of routes}`)

    folder controllers  -  functions for routes

    folder models  -  structure of Schemes in mongoDb

    folder middleware  -  middlewares for routes

    folder utils  -  helpers for functions

    folder views  -  hbs structure of site

    folder keys  -  hiden keys  


Content of keys/keys.js:

        module.exports = {
            secret:   // secret of jwt
            link:   // link of mongoose
            host:   // host of server email
            emailPort:   // port of server email
            ofEmail:   // email of server email
            passwordOfEmail:   // password of server email
        }


If you found some bug or mistake - i am waiting your report :)
