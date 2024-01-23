import cherrypy

@cherrypy.expose(alias="booking-statuses")
class BookingStatusesWebServices(object):
    def GET(self, bookingStatusId = None):
        if (bookingStatusId == None):
            return "BookingStatusesWebService.GET()"
        
        return "BookingStatusesWebService.GET(%(bookingStatusId)s)" % {"bookingStatusId": bookingStatusId}