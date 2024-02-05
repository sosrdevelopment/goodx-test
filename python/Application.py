import cherrypy

#  --- Middleware
from Infrastructure.Authenticate import authenticate

#   --- Services
import Services.ApplicationWebService as App
import Services.BookingStatusesWebServices as BookingStatuses
import Services.BookingsWebService as Bookings
import Services.BookingTypesWebService as BookingTypes
import Services.DebtorsWebService as Debtors
import Services.DiariesWebService as Diaries
import Services.PatientsWebService as Patients
import Services.SessionsWebService as Sessions
import Services.UserSessionWebService as UserSession

#   --- MAIN
if __name__ == '__main__':
    api = App.RestAPI()
    api.bookingStatuses = BookingStatuses.BookingStatusesWebServices()
    api.bookings = Bookings.BookingsWebService()
    api.bookingTypes = BookingTypes.BookingTypesWebService()
    api.debtors = Debtors.DebtorsWebService()
    api.diaries = Diaries.DiariesWebService()
    api.patients = Patients.PatientsWebService()
    api.sessions = Sessions.SessionsWebService()
    api.userSession = UserSession.UserSessionWebService()

    #   --- Setup : Middleware
    cherrypy.tools.authenticate = cherrypy.Tool('before_handler', authenticate)
    
    #  --- Setup : REST API
    #   ToDo : bookingStatuses -> booking-statuses
    #   ToDo : bookingTypes -> booking-types
    #   ToDo : bundle settings under 'api'
    cherrypy.tree.mount(
        api,
        '/api',
        'development.conf'
    )

    #  --- Setup : Server
    cherrypy.config.update({
        'server.socket_host': '0.0.0.0',
        'server.socket_port': 8080
    })

    cherrypy.engine.start()
    cherrypy.engine.block()