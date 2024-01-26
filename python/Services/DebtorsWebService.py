import cherrypy
import requests

@cherrypy.expose
@cherrypy.tools.json_in()
@cherrypy.tools.json_out()
@cherrypy.tools.accept(media="application/json")
class DebtorsWebService(object):
    def GET(self, debtorId = None):
        #   guard : authentication
        if (not cherrypy.session.get("token")):
            cherrypy.response.status = 401
            return {
                "status": "UNAUTHORIZED",
                "status_code": 401,
                "message": "Not authenticated."
            }
        
        params = {
            "fields": "[\"uid\",\"entity_uid\",\"name\",\"surname\",\"initials\",\"title\",\"id_type\",\"id_no\",\"mobile_no\",\"email\",\"file_no\",\"gender\",\"acc_identifier\",\"patients\",\"medical_aid_option_uid\",\"medical_aid_no\",\"medical_aid_scheme_code\"]"
        }
        headers = {
            "Cookie": "session_id=%(token)s" % {
                "token": cherrypy.session.get("token")
            }
        }

        if (debtorId != None):
            params["filter"] = {
                [
                    "AND",
                    [
                        "=",
                        ["I","uid"],
                        ["L",debtorId]
                    ]
                ]
            }

        debtorRequest = requests.get(
            cherrypy.request.app.config['goodx-api']['host'] + "/api/debtor",
            params = params,
            headers = headers
        )

        #   guard : status code
        if (debtorRequest.status_code != 200):
            cherrypy.response.status = 400
            return {
                "status": "BAD_REQUEST",
                "status_code": 400,
                "message": "Could not retrieve debtor."
            }
        
        debtorResponse = debtorRequest.json()
        if (debtorResponse["status"] != "OK"):
            cherrypy.response.status = 400
            return {
                "status": "BAD_REQUEST",
                "status_code": 400,
                "message": "Could not retrieve debtor."
            }
        
        return debtorResponse