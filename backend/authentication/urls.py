from django.urls import path
from drf_spectacular.utils import OpenApiResponse, extend_schema, extend_schema_view
from rest_framework_simplejwt.views import TokenRefreshView

from authentication.serializers import TokenResponseSerializer

from .views import LoginView, LogoutView, RegisterView

app_name = "authentication"


@extend_schema_view(
    post=extend_schema(
        summary="Refresh JWT token",
        description="Refreshes the JWT access token using the refresh token.",
        responses={
            200: TokenResponseSerializer,
            401: OpenApiResponse(description="Invalid or expired refresh token"),
        },
    )
)
class _TokenRefreshView(TokenRefreshView):
    pass


urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("token/refresh/", _TokenRefreshView.as_view(), name="token-refresh"),
]
