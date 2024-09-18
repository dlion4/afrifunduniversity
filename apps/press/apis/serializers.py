from django.utils.text import slugify
from rest_framework import serializers

from apps.press.models import Article
from apps.press.models import Category
from apps.press.models import PressRelease


class PressReleaseSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField()

    class Meta:
        model = PressRelease
        fields = ["id", "title", "url", "date"]

    def get_url(self, obj):
        return obj.get_absolute_url()


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "label"]

    def create(self, validated_data):
        label = validated_data.pop("label")
        return  Category.objects.using(
            "afrifundpress").create(slug=slugify(label), **validated_data)


    def update(self, instance, validated_data):
        obj = Category.objects.using("afrifundpress").get(pk=instance.pk)
        return super().update(obj, validated_data)


class ArticleSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    url = serializers.SerializerMethodField()

    class Meta:
        model = Article
        fields = ["id", "title", "url", "category", "content", "author"]

    def get_url(self, obj):
        return obj.get_absolute_url()


    def create(self, validated_data):
        category_data = validated_data.pop("category")
        category=Category.objects.using(
            "afrifundpress").get(label=category_data.get("label"))
        return Article.objects.using(
            "afrifundpress").create(
                category=category,title=validated_data.pop("title"),slug=slugify(validated_data.pop("title")),
                **validated_data,
            )

    def update(self, instance, validated_data):
        obj = Article.objects.using("afrifundpress").get(pk=instance.pk)
        return super().update(obj, validated_data)



