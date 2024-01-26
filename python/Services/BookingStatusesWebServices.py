import cherrypy
import requests

@cherrypy.expose
@cherrypy.tools.json_in()
@cherrypy.tools.json_out()
@cherrypy.tools.accept(media="application/json")
class BookingStatusesWebServices(object):
    def GET(self, bookingStatusId = None):
        #   guard : authentication
        if (not cherrypy.session.get("token")):
            cherrypy.response.status = 401
            return {
                "status": "UNAUTHORIZED",
                "status_code": 401,
                "message": "Not authenticated."
            }
        
        params = {
            "fields": "[\"uid\",\"entity_uid\",\"diary_uid\",\"name\",\"next_booking_status_uid\",\"is_arrived\",\"is_final\",\"disabled\"]"
        }
        headers = {
            "Cookie": "session_id=%(token)s" % {
                "token": cherrypy.session.get("token")
            }
        }

        if (bookingStatusId != None):
            params["filter"] = {
                [
                    "AND",
                    [
                        "=",
                        ["I","uid"],
                        ["L",bookingStatusId]
                    ]
                ]
            }

        bookingStatusRequest = requests.get(
            cherrypy.request.app.config['goodx-api']['host'] + "/api/booking_status",
            params = params,
            headers = headers
        )

        #   guard : status code
        if (bookingStatusRequest.status_code != 200):
            cherrypy.response.status = 400
            return {
                "status": "BAD_REQUEST",
                "status_code": 400,
                "message": "Could not retrieve booking status."
            }
        
        bookingStatusResponse = bookingStatusRequest.json()
        if (bookingStatusResponse["status"] != "OK"):
            cherrypy.response.status = 400
            return {
                "status": "BAD_REQUEST",
                "status_code": 400,
                "message": "Could not retrieve booking status."
            }
        
        return bookingStatusResponse