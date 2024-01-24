import cherrypy

@cherrypy.expose
class SessionsWebService(object):
    @cherrypy.tools.json_in()
    @cherrypy.tools.json_out()
    @cherrypy.tools.accept(media="application/json")
    def POST(self):
        request = cherrypy.request.json
        return "SessionsWebService.GET(%(username)s, %(password)s)" % {"username": request["username"], "password": request["password"]}