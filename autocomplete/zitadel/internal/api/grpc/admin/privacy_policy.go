package admin

import (
	"context"

	"github.com/zitadel/zitadel/internal/api/grpc/object"
	policy_grpc "github.com/zitadel/zitadel/internal/api/grpc/policy"
	admin_pb "github.com/zitadel/zitadel/pkg/grpc/admin"
)

func (s *Server) GetPrivacyPolicy(ctx context.Context, _ *admin_pb.GetPrivacyPolicyRequest) (*admin_pb.GetPrivacyPolicyResponse, error) {
	policy, err := s.query.DefaultPrivacyPolicy(ctx, true)
	if err != nil {
		return nil, err
	}
	return &admin_pb.GetPrivacyPolicyResponse{Policy: policy_grpc.ModelPrivacyPolicyToPb(policy)}, nil
}

func (s *Server) UpdatePrivacyPolicy(ctx context.Context, req *admin_pb.UpdatePrivacyPolicyRequest) (*admin_pb.UpdatePrivacyPolicyResponse, error) {
	result, err := s.command.ChangeDefaultPrivacyPolicy(ctx, UpdatePrivacyPolicyToDomain(req))
	if err != nil {
		return nil, err
	}
	return &admin_pb.UpdatePrivacyPolicyResponse{
		Details: object.ChangeToDetailsPb(
			result.Sequence,
			result.ChangeDate,
			result.ResourceOwner,
		),
	}, nil
}
