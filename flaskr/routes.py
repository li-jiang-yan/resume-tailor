from flask import Blueprint, jsonify, render_template, request

from . import analyzelib

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
