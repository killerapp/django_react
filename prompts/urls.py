from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AIPromptViewSet

router = DefaultRouter()
router.register(r'prompts', AIPromptViewSet, basename='prompt')

urlpatterns = [
    path('', include(router.urls)),
]