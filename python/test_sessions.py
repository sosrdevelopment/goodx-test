import cherrypy
from cherrypy.test import helper
from cherrypy.test import test_json

#   --- Services
import Services.ApplicationWebService as App
import Services.SessionsWebService as Sessions

class SessionsTest(helper.CPWebCase):
    @staticmethod
    def setup_server():
        api = App.RestAPI()
        api.sessions = Sessions.SessionsWebService()
        cherrypy.tree.mount(
            api,
            '/api',
            'development.conf'
        )
    
    def test_get_unauthenticated_session(self):
        self.getPage("/api/sessions")
        self.assertStatus("401 Unauthorized")

    def test_authenticate_with_bad_credentials(self):
        self.getPage("/api/sessions", method="POST", body='{"username":"bad","password":"bad"}')
        self.assertStatus("401 Unauthorized")

    def test_authenticate_with_good_credentials(self):
        self.getPage(
            "/api/sessions",
            method="POST",
            body='{"username":"applicant_004","password":"app004"}'
        )
        self.assertStatus("200 OK")

        self.getPage("/api/sessions")
        self.assertStatus("200 OK")