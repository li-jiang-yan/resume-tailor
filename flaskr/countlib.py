from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import linear_kernel


def count(phrase, text):
    """Counts the occurrences of a phrase in a given text."""
    corpus = [phrase, text]
    n = get_n(phrase)
    vectorizer = CountVectorizer(ngram_range=(n, n))
    X = vectorizer.fit_transform(corpus)
    dot_product = linear_kernel(X[0:1], X[1:2]).item()
    return dot_product


def get_n(phrase):
    """Get n for a given phrase."""
    corpus = [phrase]
    vectorizer = CountVectorizer()
    vectorizer.fit_transform(corpus)
    return len(vectorizer.get_feature_names_out())
