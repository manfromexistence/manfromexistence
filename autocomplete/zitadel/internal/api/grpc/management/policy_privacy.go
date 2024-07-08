package management

import (
	"context"

	"github.com/zitadel/zitadel/internal/api/authz"
	"github.com/zitadel/zitadel/internal/api/grpc/object"
	policy_grpc "github.com/zitadel/zitadel/internal/api/grpc/policy"
	mgmt_pb "github.com/zitadel/zitadel/pkg/grpc/management"
)

func (s *Server) GetPrivacyPolicy(ctx context.Context, _ *mgmt_pb.GetPrivacyPolicyRequest) (*mgmt_pb.GetPrivacyPolicyResponse, error) {
	policy, err := s.query.PrivacyPolicyByOrg(ctx, true, authz.GetCtxData(ctx).OrgID, false)
	if err != nil {
		return nil, err
	}
	return &mgmt_pb.GetPrivacyPolicyResponse{Policy: policy_grpc.ModelPrivacyPolicyToPb(policy)}, nil
}

func (s *Server) GetDefaultPrivacyPolicy(ctx context.Context, _ *mgmt_pb.GetDefaultPrivacyPolicyRequest) (*mgmt_pb.GetDefaultPrivacyPolicyResponse, error) {
	policy, err := s.query.DefaultPrivacyPolicy(ctx, true)
	if err != nil {
		return nil, err
	}
	return &mgmt_pb.GetDefaultPrivacyPolicyResponse{Policy: policy_grpc.ModelPrivacyPolicyToPb(policy)}, nil
}

func (s *Server) AddCustomPrivacyPolicy(ctx context.Context, req *mgmt_pb.AddCustomPrivacyPolicyRequest) (*mgmt_pb.AddCustomPrivacyPolicyResponse, error) {
	result, err := s.command.AddPrivacyPolicy(ctx, authz.GetCtxData(ctx).OrgID, AddPrivacyPolicyToDomain(req))
	if err != nil {
		return nil, err
	}
	return &mgmt_pb.AddCustomPrivacyPolicyResponse{
		Details: object.AddToDetailsPb(
			result.Sequence,
			result.ChangeDate,
			result.ResourceOwner,
		),
	}, nil
}

func (s *Server) UpdateCustomPrivacyPolicy(ctx context.Context, req *mgmt_pb.UpdateCustomPrivacyPolicyRequest) (*mgmt_pb.UpdateCustomPrivacyPolicyResponse, error) {
	result, err := s.command.ChangePrivacyPolicy(ctx, authz.GetCtxData(ctx).OrgID, UpdatePrivacyPolicyToDomain(req))
	if err != nil {
		return nil, err
	}
	return &mgmt_pb.UpdateCustomPrivacyPolicyResponse{
		Details: object.ChangeToDetailsPb(
			result.Sequence,
			result.ChangeDate,
			result.ResourceOwner,
		),
	}, nil
}

func (s *Server) ResetPrivacyPolicyToDefault(ctx context.Context, _ *mgmt_pb.ResetPrivacyPolicyToDefaultRequest) (*mgmt_pb.ResetPrivacyPolicyToDefaultResponse, error) {
	objectDetails, err := s.command.RemovePrivacyPolicy(ctx, authz.GetCtxData(ctx).OrgID)
	if err != nil {
		return nil, err
	}
	return &mgmt_pb.ResetPrivacyPolicyToDefaultResponse{
		Details: object.DomainToChangeDetailsPb(objectDetails),
	}, nil
}
