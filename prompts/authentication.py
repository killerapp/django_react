from django.contrib.auth.models import User
from rest_framework import authentication
from rest_framework import exceptions
from django.conf import settings
from supabase import create_client, Client

supabase: Client = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)

class SupabaseAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.META.get('HTTP_AUTHORIZATION')
        if not auth_header:
            return None

        try:
            # Extract the token
            auth_parts = auth_header.split()
            if auth_parts[0].lower() != 'bearer':
                return None
            token = auth_parts[1]

            # Verify the token with Supabase
            user = supabase.auth.get_user(token)
            
            # If verification is successful, get or create the user
            if user:
                django_user, created = User.objects.get_or_create(username=user.user.email)
                return (django_user, None)
            
        except Exception as e:
            raise exceptions.AuthenticationFailed('Invalid token')

        return None