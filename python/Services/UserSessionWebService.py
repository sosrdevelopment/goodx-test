import cherrypy

@cherrypy.tools.json_in()
@cherrypy.tools.json_out()
@cherrypy.tools.accept(media="application/json")
class UserSessionWebService(object):
    @cherrypy.expose
    def setEntity(self, entity_uid = None):
        #   guard : authentication
        if (not cherrypy.session.get("token")):
            cherrypy.response.status = 401
            return {
                "status": "UNAUTHORIZED",
                "status_code": 401,
                "message": "Not authenticated."
            }
        
        cherrypy.session["entity_uid"] = entity_uid
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
    def setDiary(self, diary_uid = None):
        #   guard : authentication
        if (not cherrypy.session.get("token")):
            cherrypy.response.status = 401
            return {
                "status": "UNAUTHORIZED",
                "status_code": 401,
                "message": "Not authenticated."
            }
        
        cherrypy.session["diary_uid"] = diary_uid
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