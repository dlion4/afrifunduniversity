from django.db import models


class PartneredUniversity(models.TextChoices):
    JKUAT = "JKUAT" , "Jomo Kenyatta University of Agriculture and Technology"
    KU = "KU", "Kenyatta University"
    UON = "UON", "University of Nairobi"
    MASENO = "MASENO", "Maseno University"

class SupportedCourse(models.TextChoices):
    BACHELOR_OF_SCIENCE_IN_AGRICULTURE = (
        "BACHELOR_OF_SCIENCE_IN_AGRICULTURE", "Bachelor of Science in Agriculture",
    )
    BACHELOR_OF_SCIENCE_IN_TECHNOLOGY = (
        "BACHELOR_OF_SCIENCE_IN_TECHNOLOGY", "Bachelor of Science in Technology",
    )
    BACHELOR_OF_ARTS_AND_HUMAN_SOCIETY = (
        "BACHELOR_OF_ARTS_AND_HUMAN_SOCIETY", "Bachelor of Arts and Human Societies",
    )
    BACHELOR_OF_ENGINEERING = "BACHELOR_OF_ENGINEERING", "Bachelor of Engineering"
    BACHELOR_OF_MATHEMATICS_AND_STATISTICS = (
        "BACHELOR_OF_MATHEMATICS_AND_STATISTICS", "Bachelor of Mathematics and Statistics",
    )
    MASTER_OF_ARTS_IN_AGRICULTURAL_AND_HUMAN_SOCIETY = (
        "MASTER_OF_ARTS_IN_AGRICULTURAL_AND_HUMAN_SOCIETY", "Master of Arts in Agricultural and Human Societies",
    )
    BACHELOR_OF_COMPUTER_SCIENCE = "BACHELOR_OF_COMPUTER_SCIENCE", "Bachelor of Computer Science"
    BACHELOR_OF_LAW = "BACHELOR_OF_LAW", "Bachelor of Law"


MEAN_GRADE_CHOICES = (
    ("A", "A"),
    ("A-", "A-"),
    ("B+", "B+"),
    ("B", "B"),
    ("B-", "B-"),
    ("C+", "C+"),
    ("C", "C"),
    ("C-", "C-"),
    ("D+", "D+"),
    ("D", "D"),
    ("D-", "D-"),
)


class Counties(models.TextChoices):
    MIGORI = "MIGORI", "Migori"
    ISIOLO = "ISIOLO", "Isiolo"
    NAIROBI = "NAIROBI", "Nairobi"
    MAKUENI = "MAKUENI", "Makueni"


YEAR_OF_STUDY = (
    ("FIRST_YEAR", "First Year"),
    ("SECOND_YEAR", "Second Year"),
    ("THIRD_YEAR", "Third Year"),
    ("FOURTH_YEAR", "Fourth Year"),
    ("FIFTH_YEAR", "Fifth Year"),
)
