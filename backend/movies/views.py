from django.http import JsonResponse
from django.conf import settings
import requests
from django.core.cache import cache

def movie_search(request):

    base_url = 'https://api.themoviedb.org/3/search/movie'
    
    query = request.GET.get('query', '')
    
    if not query:
        return JsonResponse({'error': 'Query parameter is required'}, status=400)
    
    cached = cache.get(query)

    if not cached:
        print('not cached, caching')
        params = {'api_key': settings.TMDB_KEY, 'query': query}
        
        response = requests.get(base_url, params=params)
        data = response.json()
        
        cache.set(query, data)

        return JsonResponse(data)
    
    else: 
        return JsonResponse(cached)
