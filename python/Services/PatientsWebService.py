import cherrypy

@cherrypy.expose
class PatientsWebService(object):
    def GET(self, patientId = None):
        if (patientId == None):
            return "PatientsWebService.GET()"
        
        return "PatientsWebService.GET(%(patientId)s)" % {"patientId": patientId}