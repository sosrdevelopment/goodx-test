import cherrypy

@cherrypy.expose
class DebtorsWebService(object):
    def GET(self, debtorId = None):
        if (debtorId == None):
            return "DebtorsWebService.GET()"
        
        return "DebtorsWebService.GET(%(debtorId)s)" % {"debtorId": debtorId}