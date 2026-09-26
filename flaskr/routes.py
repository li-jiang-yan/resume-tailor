from flask import Blueprint, jsonify, render_template, request, send_file

from . import analyzelib, countlib, doclib, similaritylib

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
    try:
        similarity = similaritylib.compute(corpus)
        result = similarity * 100
    except Exception:  # noqa: BLE001
        result = "-"
    return jsonify({"percentage": result}), 200


@bp.route("/word", methods=["POST"])
def word():
    """Returns a Word doc of the given resume JSON file."""
    resume_json = request.get_json()
    file = doclib.generate(resume_json)
    return send_file(file, as_attachment=True, download_name="resume.docx")


@bp.route("/count", methods=["POST"])
def count():
    """Counts the number of occurrences of a given word/phrase in a text."""
    payload = request.get_json()
    phrase = payload["phrase"]
    text = payload["text"]
    try:
        result = countlib.count(phrase, text)
    except Exception:  # noqa: BLE001
        result = "-"
    return jsonify({"count": result}), 200
