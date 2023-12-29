from django.urls import path
from .views import movie_search

urlpatterns = [
    path('search/', movie_search, name='movie-search')
]