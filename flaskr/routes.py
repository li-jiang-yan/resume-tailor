from flask import Blueprint, render_template

bp = Blueprint("blog", __name__)


@bp.route("/")
def index():
    """Shows the page of the web app."""
    return render_template("index.html")
