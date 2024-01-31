import cherrypy
import requests

@cherrypy.expose
class SessionsWebService(object):
    def POST(self):
        request = cherrypy.request.json

        if (not request["username"] or request["username"] == ""):
            cherrypy.response.status = 400
            return {
                "status": "BAD_REQUEST",
                "status_code": 400,
                "message": "Username is required."
            }
                
        
        if (not request["password"] or request["password"] == ""):
            cherrypy.response.status = 400
            return {
                "status": "BAD_REQUEST",
                "status_code": 400,
                "message": "Password is required."
            }
        
        authRequest = requests.post(
            cherrypy.request.app.config['goodx-api']['host'] + "/api/session",
            json = {
                "model": {
                    "timeout": 1800
                },
                "auth": [
                    [
                        "password",
                        {
                            "username": request["username"],
                            "password": request["password"]
                        }
                    ]
                ]
            }
        )

        if (authRequest.status_code != 200):
            cherrypy.response.status = 400
            return {
                "status": "BAD_REQUEST",
                "status_code": 400,
                "message": "Could not authenticate."
            }
        
        authResponse = authRequest.json()
        if (authResponse["status"] != "OK"):
            cherrypy.response.status = 400
            return {
                "status": "BAD_REQUEST",
                "status_code": 400,
                "message": "Could not authenticate."
            }
        
        cherrypy.session["token"] = authResponse["data"]["uid"]
        cherrypy.session["username"] = request["username"]
        cherrypy.session["cookie"] = '"' + '\\' + '"' + "%s\\\"_%s\"" % (authResponse["data"]["uid"], request["username"])
        
        cherrypy.response.status = 200
        return {
            "username": request["username"],
            "token": authResponse["data"]["uid"]
        }
    
    def GET(self):
        if (not cherrypy.session.get("token")):
            cherrypy.response.status = 401
            return {
                "status": "UNAUTHORIZED",
                "status_code": 401,
                "message": "Not authenticated."
            }
        
        cherrypy.response.status = 200
        return {
            "username": cherrypy.session.get("username"),
            "token": cherrypy.session.get("token")
        }