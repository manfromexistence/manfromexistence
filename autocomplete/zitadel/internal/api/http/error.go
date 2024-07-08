package http

import (
	"errors"
	"net/http"

	"github.com/zitadel/zitadel/internal/zerrors"
)

func ZitadelErrorToHTTPStatusCode(err error) (statusCode int, ok bool) {
	if err == nil {
		return http.StatusOK, true
	}
	//nolint:errorlint
	switch err.(type) {
	case *zerrors.AlreadyExistsError:
		return http.StatusConflict, true
	case *zerrors.DeadlineExceededError:
		return http.StatusGatewayTimeout, true
	case *zerrors.InternalError:
		return http.StatusInternalServerError, true
	case *zerrors.InvalidArgumentError:
		return http.StatusBadRequest, true
	case *zerrors.NotFoundError:
		return http.StatusNotFound, true
	case *zerrors.PermissionDeniedError:
		return http.StatusForbidden, true
	case *zerrors.PreconditionFailedError:
		// use the same code as grpc-gateway:
		// https://github.com/grpc-ecosystem/grpc-gateway/blob/9e33e38f15cb7d2f11096366e62ea391a3459ba9/runtime/errors.go#L59
		return http.StatusBadRequest, true
	case *zerrors.UnauthenticatedError:
		return http.StatusUnauthorized, true
	case *zerrors.UnavailableError:
		return http.StatusServiceUnavailable, true
	case *zerrors.UnimplementedError:
		return http.StatusNotImplemented, true
	case *zerrors.ResourceExhaustedError:
		return http.StatusTooManyRequests, true
	default:
		c := new(zerrors.ZitadelError)
		if errors.As(err, &c) {
			return ZitadelErrorToHTTPStatusCode(errors.Unwrap(err))
		}
		return http.StatusInternalServerError, false
	}
}
