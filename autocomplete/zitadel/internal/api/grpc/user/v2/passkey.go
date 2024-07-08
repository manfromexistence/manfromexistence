package user

import (
	"context"

	"google.golang.org/protobuf/types/known/structpb"

	"github.com/zitadel/zitadel/internal/api/grpc/object/v2"
	"github.com/zitadel/zitadel/internal/domain"
	"github.com/zitadel/zitadel/internal/zerrors"
	object_pb "github.com/zitadel/zitadel/pkg/grpc/object/v2beta"
	user "github.com/zitadel/zitadel/pkg/grpc/user/v2beta"
)

func (s *Server) RegisterPasskey(ctx context.Context, req *user.RegisterPasskeyRequest) (resp *user.RegisterPasskeyResponse, err error) {
	var (
		authenticator = passkeyAuthenticatorToDomain(req.GetAuthenticator())
	)
	if code := req.GetCode(); code != nil {
		return passkeyRegistrationDetailsToPb(
			s.command.RegisterUserPasskeyWithCode(ctx, req.GetUserId(), "", authenticator, code.Id, code.Code, req.GetDomain(), s.userCodeAlg),
		)
	}
	return passkeyRegistrationDetailsToPb(
		s.command.RegisterUserPasskey(ctx, req.GetUserId(), "", req.GetDomain(), authenticator),
	)
}

func passkeyAuthenticatorToDomain(pa user.PasskeyAuthenticator) domain.AuthenticatorAttachment {
	switch pa {
	case user.PasskeyAuthenticator_PASSKEY_AUTHENTICATOR_UNSPECIFIED:
		return domain.AuthenticatorAttachmentUnspecified
	case user.PasskeyAuthenticator_PASSKEY_AUTHENTICATOR_PLATFORM:
		return domain.AuthenticatorAttachmentPlattform
	case user.PasskeyAuthenticator_PASSKEY_AUTHENTICATOR_CROSS_PLATFORM:
		return domain.AuthenticatorAttachmentCrossPlattform
	default:
		return domain.AuthenticatorAttachmentUnspecified
	}
}

func webAuthNRegistrationDetailsToPb(details *domain.WebAuthNRegistrationDetails, err error) (*object_pb.Details, *structpb.Struct, error) {
	if err != nil {
		return nil, nil, err
	}
	options := new(structpb.Struct)
	if err := options.UnmarshalJSON(details.PublicKeyCredentialCreationOptions); err != nil {
		return nil, nil, zerrors.ThrowInternal(err, "USERv2-Dohr6", "Errors.Internal")
	}
	return object.DomainToDetailsPb(details.ObjectDetails), options, nil
}

func passkeyRegistrationDetailsToPb(details *domain.WebAuthNRegistrationDetails, err error) (*user.RegisterPasskeyResponse, error) {
	objectDetails, options, err := webAuthNRegistrationDetailsToPb(details, err)
	if err != nil {
		return nil, err
	}
	return &user.RegisterPasskeyResponse{
		Details:                            objectDetails,
		PasskeyId:                          details.ID,
		PublicKeyCredentialCreationOptions: options,
	}, nil
}

func (s *Server) VerifyPasskeyRegistration(ctx context.Context, req *user.VerifyPasskeyRegistrationRequest) (*user.VerifyPasskeyRegistrationResponse, error) {
	pkc, err := req.GetPublicKeyCredential().MarshalJSON()
	if err != nil {
		return nil, zerrors.ThrowInternal(err, "USERv2-Pha2o", "Errors.Internal")
	}
	objectDetails, err := s.command.HumanHumanPasswordlessSetup(ctx, req.GetUserId(), "", req.GetPasskeyName(), "", pkc)
	if err != nil {
		return nil, err
	}
	return &user.VerifyPasskeyRegistrationResponse{
		Details: object.DomainToDetailsPb(objectDetails),
	}, nil
}

func (s *Server) CreatePasskeyRegistrationLink(ctx context.Context, req *user.CreatePasskeyRegistrationLinkRequest) (resp *user.CreatePasskeyRegistrationLinkResponse, err error) {
	switch medium := req.Medium.(type) {
	case nil:
		return passkeyDetailsToPb(
			s.command.AddUserPasskeyCode(ctx, req.GetUserId(), "", s.userCodeAlg),
		)
	case *user.CreatePasskeyRegistrationLinkRequest_SendLink:
		return passkeyDetailsToPb(
			s.command.AddUserPasskeyCodeURLTemplate(ctx, req.GetUserId(), "", s.userCodeAlg, medium.SendLink.GetUrlTemplate()),
		)
	case *user.CreatePasskeyRegistrationLinkRequest_ReturnCode:
		return passkeyCodeDetailsToPb(
			s.command.AddUserPasskeyCodeReturn(ctx, req.GetUserId(), "", s.userCodeAlg),
		)
	default:
		return nil, zerrors.ThrowUnimplementedf(nil, "USERv2-gaD8y", "verification oneOf %T in method CreatePasskeyRegistrationLink not implemented", medium)
	}
}

func passkeyDetailsToPb(details *domain.ObjectDetails, err error) (*user.CreatePasskeyRegistrationLinkResponse, error) {
	if err != nil {
		return nil, err
	}
	return &user.CreatePasskeyRegistrationLinkResponse{
		Details: object.DomainToDetailsPb(details),
	}, nil
}

func passkeyCodeDetailsToPb(details *domain.PasskeyCodeDetails, err error) (*user.CreatePasskeyRegistrationLinkResponse, error) {
	if err != nil {
		return nil, err
	}
	return &user.CreatePasskeyRegistrationLinkResponse{
		Details: object.DomainToDetailsPb(details.ObjectDetails),
		Code: &user.PasskeyRegistrationCode{
			Id:   details.CodeID,
			Code: details.Code,
		},
	}, nil
}
