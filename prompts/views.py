from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import AIPromptSerializer
from django_react.supabase_config import get_supabase_client

class AIPromptViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def list(self, request):
        supabase = get_supabase_client()
        user_id = request.user.id
        response = supabase.table('ai_prompts').select('*').eq('created_by', user_id).execute()
        serializer = AIPromptSerializer(response.data, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = AIPromptSerializer(data=request.data)
        if serializer.is_valid():
            supabase = get_supabase_client()
            user_id = request.user.id
            data = {**serializer.validated_data, 'created_by': user_id}
            response = supabase.table('ai_prompts').insert(data).execute()
            return Response(response.data[0], status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        supabase = get_supabase_client()
        response = supabase.table('ai_prompts').select('*').eq('id', pk).execute()
        if response.data:
            serializer = AIPromptSerializer(response.data[0])
            return Response(serializer.data)
        return Response(status=status.HTTP_404_NOT_FOUND)

    def update(self, request, pk=None):
        serializer = AIPromptSerializer(data=request.data)
        if serializer.is_valid():
            supabase = get_supabase_client()
            user_id = request.user.id
            data = {**serializer.validated_data, 'created_by': user_id}
            response = supabase.table('ai_prompts').update(data).eq('id', pk).execute()
            if response.data:
                return Response(response.data[0])
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        supabase = get_supabase_client()
        response = supabase.table('ai_prompts').delete().eq('id', pk).execute()
        if response.data:
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(status=status.HTTP_404_NOT_FOUND)