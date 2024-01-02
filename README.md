# movie-search

It allows you to search for movies!\
And it caches the result of the query while counting the amount of hits agaisnt it for two minutes.\
Uses [TMDB](https://developer.themoviedb.org/reference/intro/getting-started) API.

## Local build

### Prerequisites:
1. Node >= 16.20.2
2. Python >= 3.10
3. TMDB API key (registration at TMDB required)

### Run server
```
cd you/path/to/movie-search/backend
python3 -m venv path/to/your/movie-search-venv
source path/to/your/movie-search-venv/bin/activate

pip install -r requirements.txt

python3 manage.py createcachetable
python3 manage.py migrate
python3 manage.py runserver
```

Create .env and put your TMDB_KEY and SECRET_KEY there.

### Run client

```
cd your/path/to/movie-search/frontend
```

Create .env with REACT_APP_BASE_URL (your local server url) and REACT_APP_ENVIRONMENT ('dev').


```
npm install
npm start
```

## Testing

Unit tests were made for basic functionalities.

For the backend:
```
cd your/path/to/movie-search/backend
python3 manage.py test
```

## Deployment

Various strategies are possible, but don't forget about the following:
1. Define different env variables depending on the enviroment
2. Build the client part with ```npm run build``` command
3. Adjust Django settings accordingly (DEBUG, ALLOWED_HOSTS, CORS_ALLOWED_ORIGINS) in backend/MovieSearch/settings.py (you should use [DJANGO_SETTINGS_MODULE](https://docs.djangoproject.com/en/2.1/topics/settings/#envvar-DJANGO_SETTINGS_MODULE) for a cleaner solution)
