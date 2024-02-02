import cherrypy
import requests
# import urllib.parse

@cherrypy.expose
class DiariesWebService(object):    
    def GET(self, diaryId = None):
        #   guard : authentication
        if (not cherrypy.session.get("token")):
            cherrypy.response.status = 401
            return {
                "status": "UNAUTHORIZED",
                "status_code": 401,
                "message": "Not authenticated."
            }

        params = {
            "fields": "[\"uuid\",\"uid\",\"entity_uid\",\"treating_doctor_uid\",\"service_center_uid\",\"booking_type_uid\",\"name\",\"disabled\"]"
            #   the urlencoded  version gets extra url encoded :D
            # "fields": urllib.parse.urlencode(
            #     {
            #         "a": [
            #             "uuid",
            #             "uid",
            #             "entity_uid",
            #             "treating_doctor_uid",
            #             "service_center_uid",
            #             "booking_type_uid",
            #             "name",
            #             "disabled"
            #         ]
            #     }
            # ).split('=')[1]
        }
        headers = {
            "Cookie": "session_id=%(token)s" % {
                "token": cherrypy.session.get("token")
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
        
        #   guard : status code
        if (diaryRequest.status_code != 200):
            cherrypy.response.status = 400
            return {
                "status": "BAD_REQUEST",
                "status_code": 400,
                "message": "Could not retrieve diary.",
                "response": diaryRequest.json()
            }

        diaryResponse = diaryRequest.json()
        #   guard : status
        if (diaryResponse["status"] != "OK"):
            cherrypy.response.status = 400
            return {
                "status": "BAD_REQUEST",
                "status_code": 400,
                "message": "Could not retrieve diary.",
                "response": diaryRequest.json()
            }
        
        entity_uid = diaryResponse["data"][0]["entity_uid"]
        if (entity_uid != None and entity_uid != cherrypy.session.get("entity_uid")):
            cherrypy.session["entity_uid"] = entity_uid
            
        return diaryResponse