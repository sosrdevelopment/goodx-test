import cherrypy
import os

#   --- Services
import Services.ApplicationWebService as App
import Services.BookingStatusesWebServices as BookingStatuses
import Services.BookingsWebService as Bookings
import Services.BookingTypesWebService as BookingTypes
import Services.DebtorsWebService as Debtors
import Services.DiariesWebService as Diaries
import Services.EntitiesWebService as Entities
import Services.PatientsWebService as Patients

#   --- MAIN
if __name__ == '__main__':
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
        }
    }
    
    api = App.ApplicationWebService()
    api.bookingStatuses = BookingStatuses.BookingStatusesWebServices()
    api.bookings = Bookings.BookingsWebService()
    api.bookingTypes = BookingTypes.BookingTypesWebService()
    api.debtors = Debtors.DebtorsWebService()
    api.diaries = Diaries.DiariesWebService()
    api.entities = Entities.EntitiesWebService()
    api.patients = Patients.PatientsWebService()
    
    cherrypy.tree.mount(api, '/rest-api', conf)
    
    cherrypy.config.update({
        'server.socket_host': '127.0.0.1',
        'server.socket_port': 8080
    })

    cherrypy.engine.start()
    cherrypy.engine.block()