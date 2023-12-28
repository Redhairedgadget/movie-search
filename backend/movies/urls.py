from django.urls import path
from .views import movie_search, get_hits

urlpatterns = [
    path('search/', movie_search, name='movie-search'),
    path('get-hits/', get_hits, name='get-hits')
]