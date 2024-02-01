import cherrypy

@cherrypy.tools.register('before_finalize')
def authenticate(self = None):
    if (not cherrypy.session.get("token")):
        cherrypy.response.status = 401
        raise cherrypy.HTTPError(401, "Not authenticated.")