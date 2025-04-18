from django.urls import path

from .views import FixedCostsView

urlpatterns = [
    path("", FixedCostsView.as_view(), name="fixed-costs"),
]
