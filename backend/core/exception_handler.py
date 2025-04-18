from django.core.exceptions import PermissionDenied, ValidationError
from django.http import Http404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import exception_handler


def global_exception_handler(exc, context):
    """
    Global exception handler for DRF views.
    This function handles common exceptions and returns a standardized response.
    """
    # Call REST framework's default exception handler first
    response = exception_handler(exc, context)

    # If response is already handled by DRF, return it
    if response is not None:
        return response

    # Handle Django core exceptions
    if isinstance(exc, ValidationError):
        return Response({"detail": str(exc)}, status=status.HTTP_400_BAD_REQUEST)
    elif isinstance(exc, PermissionDenied):
        return Response(
            {"detail": "You do not have permission to perform this action."}, status=status.HTTP_403_FORBIDDEN
        )
    elif isinstance(exc, Http404):
        return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)

    # Handle any other exceptions
    return Response({"detail": f"An error occurred: {str(exc)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
