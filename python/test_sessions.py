import cherrypy
from cherrypy.test import helper

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
        body = '{"username":"bad","password":"bad"}'
        self.getPage(
            "/api/sessions",
            method="POST",
            headers=[
                ("Content-Type", "application/json"),
                ("Content-Length", str(len(body)))
            ],
            body=body
        )
        self.assertStatus("401 Unauthorized")

    def test_authenticate_with_good_credentials(self):
        body = '{"username":"applicant_004","password":"app004"}'
        self.getPage(
            "/api/sessions",
            method="POST",
            headers=[
                ("Content-Type", "application/json"),
                ("Content-Length", str(len(body)))
            ],
            body=body
        )
        self.assertStatus("200 OK")

        cookie = self.assertHeader("Set-Cookie")
        self.cookies = cookie.split(";")[0]

        self.getPage(
            "/api/sessions",
            headers=[
                ("Cookie", self.cookies)
            ]
        )
        self.assertStatus("200 OK")