from django.utils.text import slugify
from rest_framework import serializers
from drf_spectacular.utils import extend_schema_serializer

from afrifunduniversity.help.models import Category
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
    total_votes = serializers.SerializerMethodField()
    class Meta:
        model = QuestionResponseArticle
        fields = [
            "id",
            "title",
            "slug",
            "content",
            "created_at",
            "updated_at",
            "is_helpful",
            "up_vote",
            "down_vote",
            "total_votes",
        ]
    def get_total_votes(self, obj)->int:
        return obj.get_total_votes()


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
        fields = ["id", "category", "title", "slug", "description", "icon", "responses"]


    def create(self, validated_data):
        title = validated_data.pop("title", None)
        slug = slugify(title)
        return Question.objects.create(
            title=title,
            slug=slug,
            **validated_data,
        )



class HelpCategorySerializer(serializers.ModelSerializer):
    category_questions = QuestionSerializer(many=True, read_only=True)
    class Meta:
        model = Category
        fields = ["id", "title", "category_questions"]
