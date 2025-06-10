from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import UserRegistrationView, ProfileView

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # login
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('profile/', ProfileView.as_view(), name='profile')# refresh
]