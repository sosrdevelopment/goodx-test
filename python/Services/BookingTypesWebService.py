import cherrypy
import requests

@cherrypy.expose
@cherrypy.tools.json_in()
@cherrypy.tools.json_out()
@cherrypy.tools.accept(media="application/json")
class BookingTypesWebService(object):
    def GET(self, bookingTypeId = None):
        #   guard : authentication
        if (not cherrypy.session.get("token")):
            cherrypy.response.status = 401
            return {
                "status": "UNAUTHORIZED",
                "status_code": 401,
                "message": "Not authenticated."
            }
        
        params = {
            "fields": "[\"uid\",\"entity_uid\",\"diary_uid\",\"name\",\"booking_status_uid\",\"disabled\",\"uuid\"]"
        }
        headers = {
            "Cookie": "session_id=%(token)s" % {
                "token": cherrypy.session.get("token")
            }
        }

        if (bookingTypeId != None):
            params["filter"] = {
                [
                    "AND",
                    [
                        "=",
                        ["I","uid"],
                        ["L",bookingTypeId]
                    ]
                ]
            }

        bookingTypeRequest = requests.get(
            cherrypy.request.app.config['goodx-api']['host'] + "/api/booking_type",
            params = params,
            headers = headers
        )

        #   guard : status code
        if (bookingTypeRequest.status_code != 200):
            cherrypy.response.status = 400
            return {
                "status": "BAD_REQUEST",
                "status_code": 400,
                "message": "Could not retrieve booking type."
            }
        
        bookingTypeResponse = bookingTypeRequest.json()
        if (bookingTypeResponse["status"] != "OK"):
            cherrypy.response.status = 400
            return {
                "status": "BAD_REQUEST",
                "status_code": 400,
                "message": "Could not retrieve booking type."
            }
        
        return bookingTypeResponse