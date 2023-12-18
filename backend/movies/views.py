from django.http import JsonResponse
from django.conf import settings
import requests
from django.core.cache import cache

def movie_search(request):
    query = request.GET.get('query', '')
    
    if not query:
        return JsonResponse({'error': 'Query parameter is required'}, status=400)
    
    cached = cache.get(query)

    # First time user hit
    if not cached:
        print('not cached, caching')
        params = {'api_key': settings.TMDB_KEY, 'query': query} 
        response = requests.get(settings.TMDB_BASE_URL, params=params)
        data = response.json()
        
        cache_entry = {'data': data, 'hits': 0}
        cache.set(query, cache_entry)

        return JsonResponse(cache_entry)
    
    # Either second hit or different page
    else: 

        page = request.GET.get('page', '')

        if page: 
             params = {'api_key': settings.TMDB_KEY, 'query': query,'page': page}
             response = requests.get(settings.TMDB_BASE_URL, params=params)
             data = response.json()
             cache_entry = {'data': data, 'hits': cached['hits']}
             return JsonResponse(cache_entry)
        
        else: 
            cached['hits'] += 1
            cache.set(query, cached)
            return JsonResponse(cached)
    

