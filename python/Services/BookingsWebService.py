import cherrypy

@cherrypy.expose
class BookingsWebService(object):
    def GET(serl, bookingId = None):
        if (bookingId == None):
            return "BookingsWebService.GET()"
        
        return "BookingsWebService.GET(%(bookingId)s)" % {"bookingId": bookingId}