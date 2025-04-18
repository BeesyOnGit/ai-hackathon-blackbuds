from django.shortcuts import render
from drf_spectacular.utils import extend_schema
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView as BaseTokenRefreshView

from .serializers import LoginSerializer, LogoutSerializer, RegisterSerializer, TokenResponseSerializer


class RegisterView(generics.CreateAPIView):
    """
    API endpoint for user registration.
    """

    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

    @extend_schema(
        summary="Register new user",
        description="Creates a new user account with the provided information.",
        responses={201: RegisterSerializer},
    )
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(
            {
                "user": RegisterSerializer(user, context=self.get_serializer_context()).data,
                "message": "User created successfully.",
            },
            status=status.HTTP_201_CREATED,
        )


class LoginView(TokenObtainPairView):
    """
    API endpoint for user login.
    """

    serializer_class = LoginSerializer

    @extend_schema(
        summary="Login user",
        description="Authenticates a user and returns JWT access and refresh tokens.",
        responses={200: TokenResponseSerializer},
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


class LogoutView(generics.GenericAPIView):
    """
    API endpoint for user logout.
    """

    serializer_class = LogoutSerializer
    permission_classes = [permissions.IsAuthenticated]

    @extend_schema(
        summary="Logout user", description="Blacklists the current refresh token, effectively logging the user out."
    )
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"message": "Successfully logged out."}, status=status.HTTP_204_NO_CONTENT)


class TokenRefreshView(BaseTokenRefreshView):
    """
    API endpoint for refreshing the access token.
    """

    @extend_schema(
        summary="Refresh token",
        description="Refreshes an access token using a valid refresh token.",
        responses={200: TokenResponseSerializer},
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)
