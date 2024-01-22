import cherrypy
import os

import Controllers.ApplicationController as ApplicationController

if __name__ == '__main__':
    conf = {
        '/': {
            "tools.sessions.on": True
        },
        '/api' : {
            'request.dispatch': cherrypy.dispatch.MethodDispatcher(),
            'tools.response_headers.on': True,
            'tools.response_headers.headers': [('Content-Type', 'text/json')],
        },
        '/static': {
            'tools.staticdir.on': True,
            'tools.staticdir.dir' : os.path.abspath(
                os.path.join(os.path.dirname(__file__), 'static')
            )
        }
    }

    webapp = ApplicationController.Application()
    webapp.api = ApplicationController.EntityService()

    cherrypy.quickstart(
        webapp,
        '/',
        conf
    )