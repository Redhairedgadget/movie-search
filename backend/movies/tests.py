from django.core.cache import cache
from django.test import TestCase, Client
from django.urls import reverse
from unittest.mock import patch
import time

class MovieSearchTests(TestCase):
    def set_up(self):
        self.query = 'test'
        self.mock_data = {'results': [], 'total_results': 0, 'total_pages': 0}
        self.default_page = '1'
        self.new_page = '2'

    def make_first_hit(self): 
        response = self.client.get(reverse('movie-search') + f'?query={self.query}')
        return response.json()

    def test_no_query(self):
        response = self.client.get(reverse('movie-search'))
        self.assertEqual(response.status_code, 400)
        self.assertIn('error', response.json())

    @patch('movies.views.requests.get')
    def test_first_hit(self, mock_get):
        mock_get.return_value.json.return_value = self.mock_data
        data = self.make_first_hit()

        # Cache entry was created
        existing_entry = cache.get(self.query)
        self.assertIsNotNone(existing_entry)

        # Hits set to 0
        self.assertEqual(data['hits'], 0)
        
        # Cached first page and assigned 'cached' value as False
        self.assertFalse(data['pages'][self.default_page]['cached'])

    @patch('movies.views.requests.get')
    def test_same_query(self, mock_get):
        mock_get.return_value.json.return_value = self.mock_data

        # First hit
        self.make_first_hit()

        # Same query hit without page switch
        second_hit = self.client.get(reverse('movie-search') + f'?query={self.query}')
        self.assertEqual(second_hit.status_code, 200)

        data_second_hit = second_hit.json()

        # Hits incremented by 1
        self.assertEqual(data_second_hit['hits'], 1)
        
        # 'Cached' value of the first page updated to True
        self.assertTrue(data_second_hit['pages'][self.default_page]['cached'])

    @patch('movies.views.requests.get')
    def test_switch_pages(self, mock_get):
        mock_get.return_value.json.return_value = self.mock_data

        # First hit
        data_first_hit = self.make_first_hit()
        self.assertEqual(data_first_hit['hits'], 0)

        # Switching pages
        response_page_2 = self.client.get(reverse('movie-search') + f'?query={self.query}&page={self.new_page}')
        self.assertEqual(response_page_2.status_code, 200)
        data_page_2 = response_page_2.json()

        # Hits should remain unchanged, page shouldn't be marked as 'cached' yet
        self.assertEqual(data_page_2['hits'], 0)
        self.assertFalse(data_page_2['pages'][self.new_page]['cached'])
        
        self.client.get(reverse('movie-search') + f'?query={self.query}&page={int(self.new_page) + 1}')

        # Return to previously visited page
        return_page_2 = self.client.get(reverse('movie-search') + f'?query={self.query}&page={self.new_page}').json()

        # Hits should be unchanged, but the page should be marked as cached
        self.assertEqual(return_page_2['hits'], 0)
        self.assertTrue(return_page_2['pages'][self.new_page]['cached'])

    def test_cache_reset(self):
        # Test query search after cache
        self.make_first_hit()
        self.client.get(reverse('movie-search') + f'?query={self.query}')

        time.sleep(cache.default_timeout + 10)
        third_hit = self.client.get(reverse('movie-search') + f'?query={self.query}').json()

        # Returns reset cache values
        self.assertEqual(third_hit['hits'], 0)
        self.assertFalse(third_hit['pages'][self.default_page]['cached'])

        # Test page switching after cache

        # Switch page two times
        self.client.get(reverse('movie-search') + f'?query={self.query}&page={self.new_page}')
        self.client.get(reverse('movie-search') + f'?query={self.query}&page=3')

        time.sleep(cache.default_timeout + 10)

        # Return to previously seen page
        third_page_switch = self.client.get(reverse('movie-search') + f'?query={self.query}&page={self.new_page}').json()
        self.assertEqual(third_page_switch['hits'], 0)
        self.assertFalse(third_page_switch['pages'][self.new_page]['cached'])
