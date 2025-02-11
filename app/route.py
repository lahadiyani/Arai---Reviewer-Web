from flask import Flask, Blueprint, render_template, jsonify, url_for
from .play_store import get_reviews_app
import re

main = Blueprint('main', __name__)

@main.route('/')
def home():
    return render_template('base.html')

@main.route('/rates/<app_id>', methods=['GET'])
@main.route('/rates/<app_id>/<int:count>', methods=['GET'])
def get_reviews_route(app_id, count=100):
    # Validasi app_id: pastikan hanya id yang valid dari URL yang diterima
    if not app_id or len(app_id) < 3:  # Cek panjang app_id, sesuaikan dengan aturan
        return jsonify({"error": "Invalid app_id provided"}), 400  # Return 400 jika invalid
    
    # Ekstraksi app_id dari URL jika diperlukan (jika misalnya parameter tidak langsung digunakan)
    # Anda sudah mendapatkan app_id langsung dari route Flask, namun bila diperlukan pemrosesan lebih lanjut:
    app_id_valid = re.match(r'^[a-zA-Z0-9._-]+$', app_id)  # Regex untuk validasi app_id
    if not app_id_valid:
        return jsonify({"error": "Invalid app_id format"}), 400  # Return error jika format app_id tidak sesuai

    # Fetch reviews dan rate
    df_reviews, rate = get_reviews_app(app_id, count=count)
    
    # Pastikan rate memiliki nilai default jika tidak ditemukan
    if rate is None:
        rate = {"baik_percentage": 100, "buruk_percentage": 0, "rate": "baik"}  # Default rate jika rate tidak ditemukan
    
    # Cek apakah ada error saat mengambil data reviews atau data lainnya
    if df_reviews is None or isinstance(df_reviews, dict):  # Jika df_reviews None atau error
        return jsonify({"error": "Failed to fetch reviews or app information"}), 500  # Return error 500
    
    # Return data review dan rate jika berhasil
    return jsonify({
        "reviews": df_reviews.to_dict(orient="records"),
        "rate": rate
    }), 200