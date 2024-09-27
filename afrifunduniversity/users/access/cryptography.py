import os
from pathlib import Path

from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import rsa

from config.settings.base import BASE_DIR


def generate_rsa_keys(public_path, private_path):
    private_key = rsa.generate_private_key(
        public_exponent=65537,
        key_size=2048,
        backend=default_backend(),
    )
    public_key = private_key.public_key()

    # Save the private key
    with open(private_path, "wb") as f:  # noqa: PTH123
        f.write(private_key.private_bytes(
            encoding=serialization.Encoding.PEM,
            format=serialization.PrivateFormat.TraditionalOpenSSL,
            encryption_algorithm=serialization.NoEncryption(),
        ))

    # Save the public key
    with open(public_path, "wb") as f:  # noqa: PTH123
        f.write(public_key.public_bytes(
            encoding=serialization.Encoding.PEM,
            format=serialization.PublicFormat.SubjectPublicKeyInfo,
        ))


def check_and_generate_keys():
    private_key_path = Path(BASE_DIR / "encryption" / "private_key.pem")
    public_key_path = Path(BASE_DIR / "encryption" / "public_key.pem")

    if not os.path.isfile(private_key_path) or not os.path.isfile(public_key_path):  # noqa: PTH113
        generate_rsa_keys(public_path=public_key_path, private_path=private_key_path)
