import cherrypy

class UserSessionWebService(object):
    @cherrypy.expose
    @cherrypy.tools.allow(methods=["POST"])
    def setEntity(self):
        #   guard : authentication
        if (not cherrypy.session.get("token")):
            cherrypy.response.status = 401
            return {
                "status": "UNAUTHORIZED",
                "status_code": 401,
                "message": "Not authenticated."
            }
        
        cherrypy.session["entity_uid"] = cherrypy.request.json["entity_uid"]
        cherrypy.response.status = 200
        return {
            "entity_uid": cherrypy.session.get("entity_uid")
        }
    
    @cherrypy.expose
    def getEntity(self):
        #   guard : authentication
        if (not cherrypy.session.get("token")):
            cherrypy.response.status = 401
            return {
                "status": "UNAUTHORIZED",
                "status_code": 401,
                "message": "Not authenticated."
            }
        
        cherrypy.response.status = 200
        return {
            "entity_uid": cherrypy.session.get("entity_uid")
        }
    
    @cherrypy.expose
    @cherrypy.tools.allow(methods=["POST"])
    def setDiary(self):
        #   guard : authentication
        if (not cherrypy.session.get("token")):
            cherrypy.response.status = 401
            return {
                "status": "UNAUTHORIZED",
                "status_code": 401,
                "message": "Not authenticated."
            }
        
        cherrypy.session["diary_uid"] = cherrypy.request.json["diary_uid"]
        cherrypy.response.status = 200
        return {
            "diary_uid": cherrypy.session.get("diary_uid")
        }
    
    @cherrypy.expose
    def getDiary(self):
        #   guard : authentication
        if (not cherrypy.session.get("token")):
            cherrypy.response.status = 401
            return {
                "status": "UNAUTHORIZED",
                "status_code": 401,
                "message": "Not authenticated."
            }
        
        cherrypy.response.status = 200
        return {
            "diary_uid": cherrypy.session.get("diary_uid")
        }