from django.urls import path
from . import views

urlpatterns = [
    path('', views.GroupView.as_view()),
    path('<str:_id>/', views.get_group)
]