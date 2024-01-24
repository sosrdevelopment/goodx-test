import cherrypy
import os

#   --- Services
import Services.ApplicationWebService as App
import Services.BookingStatusesWebServices as BookingStatuses
import Services.BookingsWebService as Bookings
import Services.BookingTypesWebService as BookingTypes
import Services.DebtorsWebService as Debtors
import Services.DiariesWebService as Diaries
import Services.EntitiesWebService as EntitiesWebService
import Services.PatientsWebService as Patients
import Services.SessionsWebService as Sessions

#   --- MAIN
if __name__ == '__main__':
    #  --- Setup : REST API
    #   ToDo : bookingStatuses -> booking-statuses
    #   ToDo : bookingTypes -> booking-types
    #   ToDo : bundle settings under 'api'
    conf = {
        '/bookingStatuses': {
            'request.dispatch': cherrypy.dispatch.MethodDispatcher(),
            'tools.response_headers.on': True,
            'tools.response_headers.headers': [('Content-Type', 'text/json')],
        },
        '/bookings': {
            'request.dispatch': cherrypy.dispatch.MethodDispatcher(),
            'tools.response_headers.on': True,
            'tools.response_headers.headers': [('Content-Type', 'text/json')],
        },
        '/bookingTypes': {
            'request.dispatch': cherrypy.dispatch.MethodDispatcher(),
            'tools.response_headers.on': True,
            'tools.response_headers.headers': [('Content-Type', 'text/json')],
        },
        '/debtors': {
            'request.dispatch': cherrypy.dispatch.MethodDispatcher(),
            'tools.response_headers.on': True,
            'tools.response_headers.headers': [('Content-Type', 'text/json')],
        },
        '/diaries': {
            'request.dispatch': cherrypy.dispatch.MethodDispatcher(),
            'tools.response_headers.on': True,
            'tools.response_headers.headers': [('Content-Type', 'text/json')],
        },
        '/entities': {
            'request.dispatch': cherrypy.dispatch.MethodDispatcher(),
            'tools.response_headers.on': True,
            'tools.response_headers.headers': [('Content-Type', 'text/json')],
        },
        '/patients': {
            'request.dispatch': cherrypy.dispatch.MethodDispatcher(),
            'tools.response_headers.on': True,
            'tools.response_headers.headers': [('Content-Type', 'text/json')],
        },
        '/sessions': {
            'request.dispatch': cherrypy.dispatch.MethodDispatcher(),
            'tools.response_headers.on': True,
            'tools.response_headers.headers': [('Content-Type', 'text/json')],
        }
    }
    
    api = App.RestAPI()
    api.bookingStatuses = BookingStatuses.BookingStatusesWebServices()
    api.bookings = Bookings.BookingsWebService()
    api.bookingTypes = BookingTypes.BookingTypesWebService()
    api.debtors = Debtors.DebtorsWebService()
    api.diaries = Diaries.DiariesWebService()
    api.entities = EntitiesWebService.EntitiesWebService()
    api.patients = Patients.PatientsWebService()
    api.sessions = Sessions.SessionsWebService()
    
    cherrypy.tree.mount(
        api,
        '/api',
        conf
    )

    #  --- Setup : Server
    cherrypy.config.update({
        'server.socket_host': '127.0.0.1',
        'server.socket_port': 8080
    })

    cherrypy.engine.start()
    cherrypy.engine.block()