import datetime
from pathlib import Path

import jwt

from config.settings.base import BASE_DIR

private_key_path = Path(BASE_DIR / "encryption" / "private_key.pem")
public_key_path = Path(BASE_DIR / "encryption" / "public_key.pem")
# Load your private key
with open(private_key_path, "rb") as f:  # noqa: PTH123
    private_key = f.read()

# Load your public key
with open("public_key.pem", "rb") as f:  # noqa: PTH123
    public_key = f.read()

def create_access_token(user_id: str, expires_delta: datetime.timedelta | None = None):
    payload = {
        "sub": user_id,
        "iat": datetime.datetime.now(datetime.UTC),
    }
    if expires_delta:
        payload["exp"] = datetime.datetime.now(datetime.UTC) + expires_delta
    else:
        payload["exp"] = datetime.datetime.now(
            datetime.UTC,
        ) + datetime.timedelta(minutes=5)

    return jwt.encode(payload, private_key, algorithm="RS256")

def create_refresh_token(user_id: str, expires_delta: datetime.timedelta | None = None):
    payload = {
        "sub": user_id,
        "iat": datetime.datetime.now(datetime.UTC),
    }
    if expires_delta:
        payload["exp"] = datetime.datetime.now(datetime.UTC) + expires_delta
    else:
        payload["exp"] = datetime.datetime.now(
            datetime.UTC,
        ) + datetime.timedelta(days=30)

    return jwt.encode(payload, private_key, algorithm="RS256")
