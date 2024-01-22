import cherrypy

class Application(object):
    @cherrypy.expose
    def index(self):
        return open("./Views/App/Index.html")
    
    @cherrypy.expose
    def test(self, testor = ""):
        cherrypy.session['testor'] = testor
        return "This is a test %(testor)s" % {"testor": testor}
    
    @cherrypy.expose
    def test2(self):
        return "This is a test %(testor)s" % {"testor": cherrypy.session['testor']}