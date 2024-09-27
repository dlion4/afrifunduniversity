import contextlib
import jwt
from afrifunduniversity.users.models import AuthenticationToken
from afrifunduniversity.users.models import Profile
from afrifunduniversity.users.models import ProfileAPIKey
from afrifunduniversity.users.models import User

from .tokens import public_key


class UserProfileCustomAuthenticationService:
    @staticmethod
    def verify_user_credentials(username:str, password: str) -> User|None:
        # not that the username is the same as the email
        with contextlib.suppress(User.DoesNotExist):
            user = User.objects.get(email=username)
            return user if user.check_password(password) else None
    def get_user_by_email(self, email: str)->User:
        return User.objects.get(email=email)
    def get_user_by_id(self, pk: int)->User:
        return User.objects.get(pk=pk)


class TokenVerificationService:
    @staticmethod
    def verify_token(token: str) -> dict:
        try:
            return jwt.decode(token, public_key, algorithms=["RS256"])
        except jwt.ExpiredSignatureError:
            return {"error": "Token has expired"}
        except jwt.InvalidTokenError:
            return {"error": "Invalid token"}
