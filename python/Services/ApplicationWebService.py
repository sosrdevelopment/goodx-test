import cherrypy

class ApplicationWebService(object):
    @cherrypy.expose
    def index(self):
        return "Boop"