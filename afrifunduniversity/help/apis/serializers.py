from django.utils.text import slugify
from rest_framework import serializers
from rest_framework import status
from rest_framework.response import Response

from afrifunduniversity.help.models import ContactBlock
from afrifunduniversity.help.models import Question
from afrifunduniversity.help.models import QuestionResponse
from afrifunduniversity.help.models import QuestionResponseArticle
# from afrifunduniversity.help.models import QuestionResponseArticleContent


class ContactBlockSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactBlock
        fields = ["name", "description", "html_url"]


# class QuestionResponseArticleContentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = QuestionResponseArticleContent
#         fields = [
#             "id",
#             "title",
#         ]

class QuestionResponseArticleSerializer(serializers.ModelSerializer):
    # articles = QuestionResponseArticleContentSerializer(many=True, read_only=True)
    class Meta:
        model = QuestionResponseArticle
        fields = [
            "id",
            "title",
            "slug",
            "content",
            "created_at",
        ]


class QuestionResponseSerializer(serializers.ModelSerializer):
    response_articles = QuestionResponseArticleSerializer(
        many=True, read_only=True)

    class Meta:
        model = QuestionResponse
        fields = ["id","title", "slug", "response_articles"]



class QuestionSerializer(serializers.ModelSerializer):
    responses = QuestionResponseSerializer(many=True, read_only=True)
    class Meta:
        model = Question
        fields = ["id", "title", "slug", "description", "icon", "responses"]


    def create(self, validated_data):
        title = validated_data.pop("title", None)
        slug = slugify(title)
        return Question.objects.create(
            title=title,
            slug=slug,
            **validated_data,
        )


