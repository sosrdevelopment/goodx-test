import cherrypy
import requests

@cherrypy.expose
@cherrypy.tools.json_in()
@cherrypy.tools.json_out()
@cherrypy.tools.accept(media="application/json")
class PatientsWebService(object):
    def GET(self, patientId = None):
        #   guard : authentication
        if (not cherrypy.session.get("token")):
            cherrypy.response.status = 401
            return {
                "status": "UNAUTHORIZED",
                "status_code": 401,
                "message": "Not authenticated."
            }
        
        params = {
            "fields": "[\"uid\",\"entity_uid\",\"debtor_uid\",\"name\",\"surname\",\"initials\",\"title\",\"id_type\",\"id_no\",\"date_of_birth\",\"mobile_no\",\"email\",\"file_no\",\"gender\",\"dependant_no\",\"dependant_type\",\"acc_identifier\",\"gap_medical_aid_option_uid\",\"gap_medical_aid_no\",\"private\",\"patient_classification_uid\"]"
        }
        headers = {
            "Cookie": "session_id=%(token)s" % {
                "token": cherrypy.session.get("token")
            }
        }

        if (patientId != None):
            params["filter"] = {
                [
                    "AND",
                    [
                        "=",
                        ["I","uid"],
                        ["L",patientId]
                    ]
                ]
            }
        
        patientRequest = requests.get(
            cherrypy.request.app.config['goodx-api']['host'] + "/api/patient",
            params = params,
            headers = headers
        )

        #   guard : status code
        if (patientRequest.status_code != 200):
            cherrypy.response.status = 400
            return {
                "status": "BAD_REQUEST",
                "status_code": 400,
                "message": "Could not retrieve patient."
            }
        
        patientResponse = patientRequest.json()
        if (patientResponse["status"] != "OK"):
            cherrypy.response.status = 400
            return {
                "status": "BAD_REQUEST",
                "status_code": 400,
                "message": "Could not retrieve patient."
            }
        
        return patientResponse