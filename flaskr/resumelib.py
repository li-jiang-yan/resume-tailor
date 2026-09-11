from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


def compute_similarity(corpus):
    """Computes the TF-IDF similarity of two texts in a given corpus list."""
    vectorizer = TfidfVectorizer()
    X = vectorizer.fit_transform(corpus)
    similarity = cosine_similarity(X[0:1], X[1:2]).item()
    return similarity
