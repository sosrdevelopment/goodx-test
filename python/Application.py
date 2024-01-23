import cherrypy
import os

#   --- Services
import Services.EntitiesWebService as Entities
import Services.DiariesWebService as Diaries

class RestApi(object):
    @cherrypy.expose
    def index(self):
        return "Boop"

if __name__ == '__main__':
    conf = {
        '/entities': {
            'request.dispatch': cherrypy.dispatch.MethodDispatcher(),
            'tools.response_headers.on': True,
            'tools.response_headers.headers': [('Content-Type', 'text/json')],
        },
        '/diaries': {
            'request.dispatch': cherrypy.dispatch.MethodDispatcher(),
            'tools.response_headers.on': True,
            'tools.response_headers.headers': [('Content-Type', 'text/json')],
        }
    }
    
    api = RestApi()
    api.entities = Entities.EntitiesWebService()
    api.diaries = Diaries.DiariesWebService()
    
    cherrypy.tree.mount(api, '/api', conf)
    
    cherrypy.config.update({
        'server.socket_host': '127.0.0.1',
        'server.socket_port': 8080
    })

    cherrypy.engine.start()
    cherrypy.engine.block()