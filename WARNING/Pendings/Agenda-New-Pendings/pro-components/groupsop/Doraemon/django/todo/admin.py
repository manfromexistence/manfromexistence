from django.contrib import admin
from .models import Priority,Todo,Note,Goal





# Register your models here
admin.site.register(Priority)
admin.site.register(Note)
admin.site.register(Goal)
admin.site.register(Todo)