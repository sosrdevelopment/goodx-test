import cherrypy

@cherrypy.expose
class BookingTypesWebService(object):
    def GET(self, bookingTypeId = None):
        if (bookingTypeId == None):
            return "BookingTypesWebService.GET()"
        
        return "BookingTypesWebService.GET(%(bookingTypeId)s)" % {"bookingTypeId": bookingTypeId}