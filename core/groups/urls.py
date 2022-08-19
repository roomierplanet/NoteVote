from django.urls import path
from . import views

urlpatterns = [
    path('', views.GroupView.as_view()),
    path('auth0/<str:auth0_id>/', views.get_group_auth0),
    path('<str:_id>/', views.get_group),
    path('<str:_id>/vote/', views.vote_group)
]