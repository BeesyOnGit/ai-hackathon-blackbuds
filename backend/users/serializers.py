from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for the custom User model.
    """

    class Meta:
        model = User
        fields = ("id", "username", "email", "first_name", "last_name", "bio", "avatar")
        read_only_fields = ("id", "username", "email")


class UserUpdateSerializer(serializers.ModelSerializer):
    """
    Serializer for updating user profile.
    """

    class Meta:
        model = User
        fields = ("first_name", "last_name", "bio", "avatar")
