from flask import Blueprint, jsonify, render_template, request

from . import analyzelib, resumelib

bp = Blueprint("blog", __name__)


@bp.route("/")
def index():
    """Shows the page of the web app."""
    return render_template("index.html")


@bp.route("/analyze", methods=["POST"])
def analyze():
    """Analyze a given job description."""
    payload = request.get_json()
    text = payload["text"]
    labels, values = analyzelib.vectorize(text)
    return jsonify({"labels": labels, "values": values}), 200


@bp.route("/similarity", methods=["POST"])
def similarity():
    """Computes the TF-IDF similarity of two texts in a given corpus list."""
    payload = request.get_json()
    corpus = payload["corpus"]
    similarity = resumelib.compute_similarity(corpus)
    return jsonify({"percentage": similarity * 100}), 200
