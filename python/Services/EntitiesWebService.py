import cherrypy

@cherrypy.expose
class EntitiesWebService(object):
    def POST(self):
        return "EntityService.POST()"
    
    @cherrypy.tools.accept(media = 'text/json')
    def GET(self, entityId = None):
        if (entityId == None):
            return "EntityService.GET()"
        
        return "EntityService.GET(%(entityId)s)" % {"entityId": entityId}
    
    def PUT(self, entityId = None):
        if (entityId == None):
            return "EntityService.PUT()"
        
        return "EntityService.PUT(%(entityId)s)" % {"entityId": entityId}
    
    def DELETE(self, entityId = None):
        if (entityId == None):
            return "EntityService.DELETE()"
        
        return "EntityService.DELETE(%(entityId)s)" % {"entityId": entityId}