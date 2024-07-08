package domain

import (
	"encoding/base64"
	"strings"

	"github.com/zitadel/zitadel/internal/crypto"
	"github.com/zitadel/zitadel/internal/zerrors"
)

func NewRefreshToken(userID, tokenID string, algorithm crypto.EncryptionAlgorithm) (string, error) {
	return RefreshToken(userID, tokenID, tokenID, algorithm)
}

func RefreshToken(userID, tokenID, token string, algorithm crypto.EncryptionAlgorithm) (string, error) {
	encrypted, err := algorithm.Encrypt([]byte(userID + ":" + tokenID + ":" + token))
	if err != nil {
		return "", err
	}
	return base64.RawURLEncoding.EncodeToString(encrypted), nil
}

func FromRefreshToken(refreshToken string, algorithm crypto.EncryptionAlgorithm) (userID, tokenID, token string, err error) {
	decoded, err := base64.RawURLEncoding.DecodeString(refreshToken)
	if err != nil {
		return "", "", "", zerrors.ThrowInvalidArgument(err, "DOMAIN-BGDhn", "Errors.User.RefreshToken.Invalid")
	}
	decrypted, err := algorithm.Decrypt(decoded, algorithm.EncryptionKeyID())
	if err != nil {
		return "", "", "", err
	}
	split := strings.Split(string(decrypted), ":")
	if len(split) != 3 {
		return "", "", "", zerrors.ThrowInvalidArgument(nil, "DOMAIN-BGDhn", "Errors.User.RefreshToken.Invalid")
	}
	return split[0], split[1], split[2], nil
}
