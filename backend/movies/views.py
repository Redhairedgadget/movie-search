from django.http import JsonResponse
from django.conf import settings
from django.core.cache import cache
import requests

def movie_search(request):
    query = request.GET.get('query', '')

    if not query:
        return JsonResponse({'error': 'Query parameter is required'}, status=400)

    existing_entry = cache.get(query)

    if not existing_entry:
        params = {'api_key': settings.TMDB_KEY, 'query': query, 'include_adult': True}
        response = requests.get(settings.TMDB_BASE_URL, params=params)
        data = response.json()

        cache_entry = {'pages': {'1': {'data': data, 'cached': False}}, 'hits': 0}
        cache.set(query, cache_entry)

        return JsonResponse(cache_entry)

    # Either second hit or different page
    else:
        page = request.GET.get('page')

        # User switches pages
        if page:
            # Did we see this page before?
            if page in existing_entry['pages']:
                existing_entry['pages'][page]['cached'] = True
            else:
                params = {'api_key': settings.TMDB_KEY, 'query': query, 'page': page, 'include_adult': True}
                response = requests.get(settings.TMDB_BASE_URL, params=params)
                data = response.json()
                existing_entry['pages'][page] = {'data': data, 'cached': False}
                cache.set(query, existing_entry)

        # User hits same query
        else:
            existing_entry['hits'] += 1

            if not existing_entry['pages']['1']['cached']:
                existing_entry['pages']['1']['cached'] = True

            cache.set(query, existing_entry)

        return JsonResponse(existing_entry)
