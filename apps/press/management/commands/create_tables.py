from django.core.management.base import BaseCommand
from django.db import connections
from press.models import Leadership
from press.models import Paragraph


class Command(BaseCommand):
    help = (
        """
        Manually creates tables for Leadership and
        Paragraph models in a specific database
        """
    )

    def create_table(self, model, database):
        # Get the database schema for the model
        with connections[database].schema_editor() as schema_editor:
            schema_editor.create_model(model)

    def handle(self, *args, **kwargs):
        database = "afrifundpress"  # The specific database to use
        self.stdout.write(f"Creating tables in database: {database}")

        # Create Leadership table
        self.stdout.write("Creating Leadership table...")
        self.create_table(Leadership, database)

        # Create Paragraph table
        self.stdout.write("Creating Paragraph table...")
        self.create_table(Paragraph, database)

        self.stdout.write(self.style.SUCCESS(
            "Tables created successfully in the specified database!"))
