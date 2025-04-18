from django.shortcuts import render
from drf_spectacular.utils import extend_schema
from rest_framework import generics, permissions
from rest_framework.response import Response

from .serializers import UserSerializer, UserUpdateSerializer

# Create your views here.


class UserProfileView(generics.RetrieveUpdateAPIView):
    """
    Retrieve or update the authenticated user's profile.
    """

    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

    def get_serializer_class(self):
        if self.request.method == "PATCH":
            return UserUpdateSerializer
        return UserSerializer

    @extend_schema(
        summary="Get authenticated user profile",
        description="Returns the profile information of the currently authenticated user.",
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    @extend_schema(
        summary="Update authenticated user profile",
        description="Updates the profile information of the currently authenticated user.",
    )
    def patch(self, request, *args, **kwargs):
        return super().patch(request, *args, **kwargs)

    # disable put
    @extend_schema(
        exclude=True,
        description="PUT method is not allowed. Use PATCH to update specific fields.",
    )
    def put(self, request, *args, **kwargs):
        raise permissions.PermissionDenied(
            detail="PUT method is not allowed. Use PATCH to update specific fields.",
            code=403,
        )
