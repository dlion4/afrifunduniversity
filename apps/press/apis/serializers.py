
from django.utils.text import slugify
from drf_spectacular.utils import extend_schema_field
from rest_framework import serializers

from apps.press.models import Article
from apps.press.models import Category
from apps.press.models import Leadership
from apps.press.models import Paragraph, FootNote
from apps.press.models import PressRelease


class PressReleaseSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField()

    class Meta:
        model = PressRelease
        fields = ["id", "title", "url", "date"]
    @extend_schema_field(serializers.CharField())
    def get_url(self, obj):
        return obj.get_absolute_url()


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "label"]

    def create(self, validated_data):
        label = validated_data.pop("label")
        return  Category.objects.using(
            "afrifundpress").create(
                slug=slugify(label),
                label=label,
                **validated_data)


    def update(self, instance, validated_data):
        obj = Category.objects.using("afrifundpress").get(pk=instance.pk)
        return super().update(obj, validated_data)


class ArticleSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    url = serializers.SerializerMethodField()

    class Meta:
        model = Article
        fields = ["id", "title", "url", "category", "content", "author"]

    @extend_schema_field(serializers.CharField())
    def get_url(self, obj: Article) -> str:
        return obj.get_absolute_url()


    def create(self, validated_data):
        category_data = validated_data.pop("category")
        category=Category.objects.using(
            "afrifundpress").get(label=category_data.get("label"))
        title_field = validated_data.pop("title")
        return Article.objects.using(
            "afrifundpress").create(
                category=category,
                title = title_field,
                slug=slugify(title_field),
                **validated_data,
            )

    def update(self, instance, validated_data):
        if category_data := validated_data.pop("category", None):
            category = Category.objects.using(
                "afrifundpress").get(label=category_data.get("label"))
            instance.category = category

        # Update other fields
        instance.title = validated_data.get("title", instance.title)
        instance.content = validated_data.get("content", instance.content)
        instance.author = validated_data.get("author", instance.author)

        instance.save(using="afrifundpress")
        return instance




class ParagraphSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paragraph
        fields = ["paragraph"]


class LeadershipSerializer(serializers.ModelSerializer):
    paragraphs = ParagraphSerializer(many=True, read_only=True)
    class Meta:
        model = Leadership
        fields = ["id", "image", "name", "job_title", "paragraphs"]
    def create(self, validated_data):
        return Leadership.objects.using("afrifundpress").create(**validated_data)


class FootNoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = FootNote
        fields = ["id", "category", "content"]
