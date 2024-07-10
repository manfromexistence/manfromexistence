from django.contrib import admin
from django.urls import include, path




urlpatterns = [
    path('admin/', admin.site.urls),
    path('chat/', include('chat.urls')),
    # path('video/', include('video.urls')),
    # path('groups/', include('groups.urls')),
    
    
]

