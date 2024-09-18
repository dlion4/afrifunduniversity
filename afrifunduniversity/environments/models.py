from django.contrib.postgres.fields import JSONField  # If you're using Postgres
from django.core.serializers.json import DjangoJSONEncoder
from django.db import models


class EnvironmentConfig(models.Model):
    # Field to store the configuration in JSON format
    config = models.JSONField(encoder=DjangoJSONEncoder)  # or JSONField if using Postgres

    def __str__(self):
        return f"Configuration {self.id}"

    # Method to get config for a specific environment
    def get_config_for_environment(self, environment):
        return self.config.get(environment, {})
