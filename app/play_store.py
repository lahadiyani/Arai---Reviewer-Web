from google_play_scraper import Sort, reviews, app
import pandas as pd
import numpy as np
from datetime import datetime
import json

def get_reviews_app(app_id, count=100, lang='id', country='id', sort=Sort.MOST_RELEVANT, filter_score_with=None):
    try:
        # Mengambil reviews dari Google Play Store
        result, continuation_token = reviews(
            app_id=app_id,
            lang=lang,
            country=country,
            sort=sort,
            count=count,
            filter_score_with=filter_score_with
        )
        
        # Mengambil informasi aplikasi (ratings dan lainnya)
        app_info = app(app_id)  # menggunakan app_id, bukan package_name
        ratings = app_info.get('ratings', 0)
        title = app_info.get('title', 'Unknown App')
        icon = app_info.get('icon', 'url_to_icon')  # Default icon jika tidak ada

        # Membuat DataFrame dari hasil scraping
        df_reviews = pd.DataFrame(np.array(result), columns=['review'])
        df_reviews = df_reviews.join(pd.DataFrame(df_reviews.pop('review').tolist()))

        # Menambahkan kolom 'icon', 'title', dan 'ratings' dari app_info
        df_reviews['icon'] = icon
        df_reviews['title'] = title
        df_reviews['ratings'] = ratings

        # Cek apakah kolom 'icon' dan 'title' ada sebelum diakses
        df_reviews['score_category'] = df_reviews['score'].apply(lambda x: 'baik' if x >= 4 else 'buruk')

        # Menghitung persentase nilai buruk dan baik berdasarkan 'score_category'
        total_reviews = len(df_reviews)
        if total_reviews > 0:
            buruk_count = df_reviews[df_reviews['score_category'] == 'buruk'].shape[0]
            baik_count = df_reviews[df_reviews['score_category'] == 'baik'].shape[0]

            # Menghitung persentase
            buruk_percentage = (buruk_count / total_reviews) * 100
            baik_percentage = (baik_count / total_reviews) * 100
        else:
            buruk_percentage = 0
            baik_percentage = 0

        # Menambahkan kolom 'date' dengan format yang sesuai
        df_reviews['date'] = pd.to_datetime(df_reviews['at'], unit='ms').dt.strftime('%Y-%m-%d %H:%M:%S')

        # Menyusun data untuk rate
        rate = {
            "buruk_percentage": round(buruk_percentage, 2),
            "baik_percentage": round(baik_percentage, 2),
            "rate": "buruk" if buruk_percentage > baik_percentage else "baik"
        }

        # Mengembalikan data review yang relevan
        return df_reviews[['score', 'content', 'icon', 'title', 'date', 'ratings']], rate
    
    except Exception as e:
        return {"error": f"Failed to fetch reviews or app information: {str(e)}"}, None  # Mengembalikan error
