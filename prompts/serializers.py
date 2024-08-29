from rest_framework import serializers
from .models import AIPrompt

class AIPromptSerializer(serializers.ModelSerializer):
    class Meta:
        model = AIPrompt
        fields = ['id', 'title', 'content', 'created_by', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_by', 'created_at', 'updated_at']

    def create(self, validated_data):
        validated_data['created_by'] = self.context['request'].user.id
        return super().create(validated_data)