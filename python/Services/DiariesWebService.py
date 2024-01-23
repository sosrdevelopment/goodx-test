import cherrypy

@cherrypy.expose
class DiariesWebService(object):
    def POST(self):
        return "DiaryService.POST()"
    
    def GET(self, diaryId = None):
        if (diaryId == None):
            return "DiaryService.GET()"
        
        return "DiaryService.GET(%(diaryId)s)" % {"diaryId": diaryId}
    
    def PUT(self, diaryId = None):
        if (diaryId == None):
            return "DiaryService.PUT()"
        
        return "DiaryService.PUT(%(diaryId)s)" % {"diaryId": diaryId}
    
    def DELETE(self, diaryId = None):
        if (diaryId == None):
            return "DiaryService.DELETE()"
        
        return "DiaryService.DELETE(%(diaryId)s)" % {"diaryId": diaryId}