import cherrypy
import requests

@cherrypy.expose
@cherrypy.tools.json_in()
@cherrypy.tools.json_out()
@cherrypy.tools.accept(media="application/json")
class DiariesWebService(object):
    def POST(self):
        return "DiaryService.POST()"
    
    def GET(self, diaryId = None):
        if (not cherrypy.session.get("token")):
            cherrypy.response.status = 401
            return {
                "status": "UNAUTHORIZED",
                "status_code": 401,
                "message": "Not authenticated."
            }

        params = {}
        headers = {
            "Cookie": {
                "session_id": "%(token)s" % {
                    "token": cherrypy.session.get("token")
                }
            }
        }

        if (diaryId != None):
            params["filter"] = {
                [
                    "AND",
                    [
                        "=",
                        ["I","diary_uid"],
                        ["L",diaryId]
                    ]
                ]
            }

        diaryRequest = requests.get(
            cherrypy.request.app.config['goodx-api']['host'] + "/api/diary",
            params = params,
            headers = headers
        )

        diaryResponse = diaryRequest.json()
        if (diaryResponse["status"] != "OK"):
            cherrypy.response.status = 400
            return {
                "status": "BAD_REQUEST",
                "status_code": 400,
                "message": "Could not retrieve diary.",
                "response": diaryRequest.json()
            }
        
        return diaryResponse
    
    def PUT(self, diaryId = None):
        if (diaryId == None):
            return "DiaryService.PUT()"
        
        return "DiaryService.PUT(%(diaryId)s)" % {"diaryId": diaryId}
    
    def DELETE(self, diaryId = None):
        if (diaryId == None):
            return "DiaryService.DELETE()"
        
        return "DiaryService.DELETE(%(diaryId)s)" % {"diaryId": diaryId}