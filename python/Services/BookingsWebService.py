import cherrypy
import requests

@cherrypy.expose
@cherrypy.tools.json_in()
@cherrypy.tools.json_out()
@cherrypy.tools.accept(media="application/json")
class BookingsWebService(object):
    def POST(self):
        #   guard : authentication
        if (not cherrypy.session.get("token")):
            cherrypy.response.status = 401
            return {
                "status": "UNAUTHORIZED",
                "status_code": 401,
                "message": "Not authenticated."
            }
        
        #   validation
        req = cherrypy.request.json

        entity_uid = cherrypy.session.get("entity_uid")
        if (entity_uid == None):
            cherrypy.response.status = 400
            return {
                "status": "BAD_REQUEST",
                "status_code": 400,
                "message": "Entity not set in session."
            }
        
        diary_uid = cherrypy.session.get("diary_uid")
        if (diary_uid == None):
            cherrypy.response.status = 400
            return {
                "status": "BAD_REQUEST",
                "status_code": 400,
                "message": "Diary not set in session."
            }
        
        if (not "booking_status_uid" in req
            or req["booking_status_uid"] == None):
            cherrypy.response.status = 400
            return {
                "status": "BAD_REQUEST",
                "status_code": 400,
                "message": "Booking status is required."
            }
        if (not "patient_uid" in req
            or req["patient_uid"] == None):
            cherrypy.response.status = 400
            return {
                "status": "BAD_REQUEST",
                "status_code": 400,
                "message": "Patient is required."
            }
        
        if (req["duration"] == None):
            req["duration"] = 15

        #   request
        data = {
            "model": {
                "entity_uid": entity_uid,
                "diary_uid": diary_uid,
                "booking_type_uid": req["booking_type_uid"],
                "booking_status_uid": 21,
                "start_time": req["start_time"],
                "duration": req["duration"],
                "patient_uid": req["patient_uid"],
                "reason": req["reason"]
            }
        }
        headers = {
            "Cookie": "session_id=%(token)s" % {
                "token": cherrypy.session.get("token")
            }
        }

        bookingRequest = requests.post(
            cherrypy.request.app.config['goodx-api']['host'] + "/api/booking",
            data = data,
            headers = headers
        )

        #   guard : status code
        if (bookingRequest.status_code != 200):
            cherrypy.response.status = 400
            return {
                "status": "BAD_REQUEST",
                "status_code": 400,
                "message": "Could not create booking."
            }
        
        bookingResponse = bookingRequest.json()
        if (bookingResponse["status"] != "OK"):
            cherrypy.response.status = 400
            return {
                "status": "BAD_REQUEST",
                "status_code": 400,
                "message": "Could not create booking."
            }
        
        return bookingResponse
    
    def GET(self, bookingId = None, diary_uid = None):
        #   guard : authentication
        if (not cherrypy.session.get("token")):
            cherrypy.response.status = 401
            return {
                "status": "UNAUTHORIZED",
                "status_code": 401,
                "message": "Not authenticated."
            }
        
        params = {
            "fields": "[[\"AS\",[\"I\",\"patient_uid\",\"name\"],\"patient_name\"],[\"AS\",[\"I\",\"patient_uid\",\"surname\"],\"patient_surname\"],[\"AS\",[\"I\",\"patient_uid\",\"debtor_uid\",\"name\"],\"debtor_name\"],[\"AS\",[\"I\",\"patient_uid\",\"debtor_uid\",\"surname\"],\"debtor_surname\"],\"uid\",\"entity_uid\",\"diary_uid\",\"booking_type_uid\",\"booking_status_uid\",\"patient_uid\",\"start_time\",\"duration\",\"treating_doctor_uid\",\"reason\",\"invoice_nr\",\"cancelled\",\"uuid\"]"
        }
        headers = {
            "Cookie": "session_id=%(token)s" % {
                "token": cherrypy.session.get("token")
            }
        }

        if (bookingId != None):
            params["filter"] = "[\"AND\",[\"=\",[\"I\",\"uid\"],[\"L\"," + bookingId + "]]]"
        if (diary_uid != None):
            params["filter"] = "[\"AND\",[\"=\",[\"I\",\"diary_uid\"],[\"L\"," + diary_uid + "]]]"

        bookingRequest = requests.get(
            cherrypy.request.app.config['goodx-api']['host'] + "/api/booking",
            params = params,
            headers = headers
        )

        #   guard : status code
        if (bookingRequest.status_code != 200):
            cherrypy.response.status = 400
            return {
                "status": "BAD_REQUEST",
                "status_code": 400,
                "message": "Could not retrieve booking."
            }
        
        bookingResponse = bookingRequest.json()
        if (bookingResponse["status"] != "OK"):
            cherrypy.response.status = 400
            return {
                "status": "BAD_REQUEST",
                "status_code": 400,
                "message": "Could not retrieve booking."
            }
        
        return bookingResponse
    
    def PUT(self, bookingId):
        #   guard : authentication
        if (not cherrypy.session.get("token")):
            cherrypy.response.status = 401
            return {
                "status": "UNAUTHORIZED",
                "status_code": 401,
                "message": "Not authenticated."
            }
        
        #   validation

        #   request
        data = {
            "model": {
                "booking_uid": bookingId,
                "booking_type_uid": req["booking_type_uid"],
                "booking_status_uid": req["booking_status_uid"],
                "start_time": req["start_time"],
                "duration": req["duration"],
                "reason": req["reason"]
            }
        }
        headers = {
            "Cookie": "session_id=%(token)s" % {
                "token": cherrypy.session.get("token")
            }
        }

        bookingRequest = requests.put(
            cherrypy.request.app.config['goodx-api']['host'] + "/api/booking/" + bookingId,
            data = data,
            headers = headers
        )

        #   guard : status code
        if (bookingRequest.status_code != 200):
            cherrypy.response.status = 400
            return {
                "status": "BAD_REQUEST",
                "status_code": 400,
                "message": "Could not update booking."
            }
        
        bookingResponse = bookingRequest.json()
        if (bookingResponse["status"] != "OK"):
            cherrypy.response.status = 400
            return {
                "status": "BAD_REQUEST",
                "status_code": 400,
                "message": "Could not update booking."
            }
        
        return bookingResponse
    
    def DELETE(self, bookingId = None):
        #   guard : authentication
        if (not cherrypy.session.get("token")):
            cherrypy.response.status = 401
            return {
                "status": "UNAUTHORIZED",
                "status_code": 401,
                "message": "Not authenticated."
            }
        
        #   request
        data = {
            "model": {
                "booking_uid": bookingId,
                "cancelled": True
            }
        }
        headers = {
            "Cookie": "session_id=%(token)s" % {
                "token": cherrypy.session.get("token")
            }
        }

        bookingRequest = requests.put(
            cherrypy.request.app.config['goodx-api']['host'] + "/api/booking/" + bookingId,
            data = data,
            headers = headers
        )

        #   guard : status code
        if (bookingRequest.status_code != 200):
            cherrypy.response.status = 400
            return {
                "status": "BAD_REQUEST",
                "status_code": 400,
                "message": "Could not cancel booking."
            }
        
        bookingResponse = bookingRequest.json()
        if (bookingResponse["status"] != "OK"):
            cherrypy.response.status = 400
            return {
                "status": "BAD_REQUEST",
                "status_code": 400,
                "message": "Could not cancel booking."
            }
        
        return bookingResponse