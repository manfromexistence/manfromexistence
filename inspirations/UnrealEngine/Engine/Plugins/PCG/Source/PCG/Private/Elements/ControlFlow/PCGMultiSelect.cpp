// Copyright Epic Games, Inc. All Rights Reserved.

#include "Elements/ControlFlow/PCGMultiSelect.h"

#include "PCGContext.h"
#include "PCGModule.h"
#include "Elements/PCGGather.h"

#define LOCTEXT_NAMESPACE "FPCGMultiSelectElement"

namespace PCGMultiSelectConstants
{
	const FText NodeTitleBase = LOCTEXT("NodeTitleBase", "Select (Multi)");
}

void UPCGMultiSelectSettings::PostLoad()
{
	Super::PostLoad();
	CachePinLabels();
}

#if WITH_EDITOR
void UPCGMultiSelectSettings::PostEditChangeProperty(FPropertyChangedEvent& PropertyChangedEvent)
{
	Super::PostEditChangeProperty(PropertyChangedEvent);

	// Only need to change the pin labels if the options have changed
	if (PropertyChangedEvent.GetMemberPropertyName() == GET_MEMBER_NAME_CHECKED(UPCGMultiSelectSettings, IntOptions) ||
		PropertyChangedEvent.GetMemberPropertyName() == GET_MEMBER_NAME_CHECKED(UPCGMultiSelectSettings, StringOptions) ||
		PropertyChangedEvent.GetMemberPropertyName() == GET_MEMBER_NAME_CHECKED(UPCGMultiSelectSettings, EnumSelection))
	{
		CachePinLabels();
	}
}

FText UPCGMultiSelectSettings::GetDefaultNodeTitle() const
{
	return PCGMultiSelectConstants::NodeTitleBase;
}

FText UPCGMultiSelectSettings::GetNodeTooltipText() const
{
	return LOCTEXT("NodeTooltip", "Control flow node that will select all input data on a single input pin that matches a given selection mode and corresponding 'selection' property - which can also be overridden.");
}
#endif // WITH_EDITOR

EPCGDataType UPCGMultiSelectSettings::GetCurrentPinTypes(const UPCGPin* Pin) const
{
	// Output pin depends on the union of all non-advanced input pins. Advanced pins are dynamic user overrides and
	// should not affect the output pin type.
	if (Pin->IsOutputPin())
	{
		EPCGDataType InputTypeUnion = EPCGDataType::None;

		const TArray<TObjectPtr<UPCGPin>>& InputPins = Pin->Node->GetInputPins();

		for (int Index = 0; Index < InputPins.Num(); ++Index)
		{
			if (!InputPins[Index]->Properties.IsAdvancedPin())
			{
				InputTypeUnion |= GetTypeUnionOfIncidentEdges(InputPins[Index]->Properties.Label);
			}
		}

		return InputTypeUnion != EPCGDataType::None ? InputTypeUnion : EPCGDataType::Any;
	}

	return Super::GetCurrentPinTypes(Pin);
}

FString UPCGMultiSelectSettings::GetAdditionalTitleInformation() const
{
	switch (SelectionMode)
	{
		case EPCGControlFlowSelectionMode::Integer:
		{
			FString Subtitle = PCGControlFlowConstants::SubtitleInt.ToString();
			if (!IsPropertyOverriddenByPin(GET_MEMBER_NAME_CHECKED(UPCGMultiSelectSettings, IntegerSelection)))
			{
				Subtitle += FString::Format(TEXT(": {0}"), {IntegerSelection});
			}

			return Subtitle;
		}

		case EPCGControlFlowSelectionMode::Enum:
			if (EnumSelection.Class)
			{
				FString Subtitle = EnumSelection.Class->GetName();
				if (!IsPropertyOverriddenByPin({GET_MEMBER_NAME_CHECKED(UPCGMultiSelectSettings, EnumSelection), GET_MEMBER_NAME_CHECKED(FEnumSelector, Value)}))
				{
					Subtitle += FString::Format(TEXT(": {0}"), {EnumSelection.Class->GetNameStringByValue(EnumSelection.Value)});
				}

				return Subtitle;
			}
			else
			{
				return PCGControlFlowConstants::SubtitleEnum.ToString();
			}

		case EPCGControlFlowSelectionMode::String:
			{
				FString Subtitle = PCGControlFlowConstants::SubtitleString.ToString();
				if (!IsPropertyOverriddenByPin(GET_MEMBER_NAME_CHECKED(UPCGMultiSelectSettings, StringSelection)))
				{
					Subtitle += FString::Format(TEXT(": {0}"), {StringSelection});
				}

				return Subtitle;
			}

		default:
			checkNoEntry();
			break;
	}

	return PCGMultiSelectConstants::NodeTitleBase.ToString();
}

TArray<FPCGPinProperties> UPCGMultiSelectSettings::InputPinProperties() const
{
	TArray<FPCGPinProperties> PinProperties;

	switch (SelectionMode)
	{
		case EPCGControlFlowSelectionMode::Integer:
			for (const int32 Value : IntOptions)
			{
				PinProperties.Emplace(FName(FString::FromInt(Value)));
			}
			break;
		case EPCGControlFlowSelectionMode::String:
			for (const FString& Value : StringOptions)
			{
				PinProperties.Emplace(FName(Value));
			}
			break;
		case EPCGControlFlowSelectionMode::Enum:
			// -1 to bypass the MAX value
			for (int32 Index = 0; EnumSelection.Class && Index < EnumSelection.Class->NumEnums() - 1; ++Index)
			{
#if WITH_EDITOR
				bool const bHidden = EnumSelection.Class->HasMetaData(TEXT("Hidden"), Index) || EnumSelection.Class->HasMetaData(TEXT("Spacer"), Index);
				if (!bHidden)
				{
					PinProperties.Emplace(FName(EnumSelection.Class->GetDisplayNameTextByIndex(Index).ToString()));
				}
#else // WITH_EDITOR
				// HasMetaData is editor only, so there will be extra pins at runtime, but that should be okay
				PinProperties.Emplace(FName(EnumSelection.Class->GetDisplayNameTextByIndex(Index).ToString()));
#endif // WITH_EDITOR
			}
			break;
		default:
			break;
	}

	PinProperties.Emplace(PCGControlFlowConstants::DefaultPathPinLabel);

	return PinProperties;
}

TArray<FPCGPinProperties> UPCGMultiSelectSettings::OutputPinProperties() const
{
	TArray<FPCGPinProperties> PinProperties;
	PinProperties.Emplace(PCGPinConstants::DefaultOutputLabel,
		EPCGDataType::Any,
		/*bInAllowMultipleConnections=*/true,
		/*bAllowMultipleData=*/true,
		LOCTEXT("OutputPinTooltip", "All input on the selected input pin will be forwarded directly to the output."));

	return PinProperties;
}

FPCGElementPtr UPCGMultiSelectSettings::CreateElement() const
{
	return MakeShared<FPCGMultiSelectElement>();
}

bool UPCGMultiSelectSettings::IsValuePresent(const int32 Value) const
{
	return IntOptions.Contains(Value);
}

bool UPCGMultiSelectSettings::IsValuePresent(const FString& Value) const
{
	return StringOptions.Contains(Value);
}

bool UPCGMultiSelectSettings::IsValuePresent(const int64 Value) const
{
	if (!EnumSelection.Class)
	{
		return false;
	}

	const int64 Index = EnumSelection.Class->GetIndexByValue(Value);
	return Index != INDEX_NONE && Index < EnumSelection.Class->NumEnums() - 1;
}

bool UPCGMultiSelectSettings::GetSelectedPinLabel(FName& OutSelectedPinLabel) const
{
	if (CachedPinLabels.IsEmpty())
	{
		return false;
	}

	int32 Index = INDEX_NONE;
	if (SelectionMode == EPCGControlFlowSelectionMode::Integer && IsValuePresent(IntegerSelection))
	{
		Index = IntOptions.IndexOfByKey(IntegerSelection);
	}
	else if (SelectionMode == EPCGControlFlowSelectionMode::String && IsValuePresent(StringSelection))
	{
		Index = StringOptions.IndexOfByKey(StringSelection);
	}
	else if (SelectionMode == EPCGControlFlowSelectionMode::Enum && IsValuePresent(EnumSelection.Value))
	{
		// To account for hidden enums missing from the pin properties, find the pin by label instead of index
		const FName PinLabel(EnumSelection.Class->GetDisplayNameTextByValue(EnumSelection.Value).ToString());
		for (int i = 0; i < CachedPinLabels.Num(); ++i)
		{
			if (CachedPinLabels[i] == PinLabel)
			{
				Index = i;
				break;
			}
		}
	}
	else
	{
		OutSelectedPinLabel = PCGControlFlowConstants::DefaultPathPinLabel;

		return true;
	}

	if (Index < 0 || Index >= CachedPinLabels.Num())
	{
		return false;
	}

	OutSelectedPinLabel = CachedPinLabels[Index];

	return true;
}

void UPCGMultiSelectSettings::CachePinLabels()
{
	CachedPinLabels.Empty();
	Algo::Transform(InputPinProperties(), CachedPinLabels, [](const FPCGPinProperties& Property)
	{
		return Property.Label;
	});
}

bool FPCGMultiSelectElement::ExecuteInternal(FPCGContext* Context) const
{
	TRACE_CPUPROFILER_EVENT_SCOPE(FPCGMultiSelectElement::ExecuteInternal);

	const UPCGMultiSelectSettings* Settings = Context->GetInputSettings<UPCGMultiSelectSettings>();
	check(Settings);

	FName SelectedPinLabel;
	if (!Settings->GetSelectedPinLabel(SelectedPinLabel))
	{
		PCGE_LOG_C(Error, GraphAndLog, Context, LOCTEXT("ValueDoesNotExist", "Selected value is not a valid option."));
		return true;
	}

	// Reuse the functionality of the Gather node
	Context->OutputData = PCGGather::GatherDataForPin(Context->InputData, SelectedPinLabel);

	return true;
}

#undef LOCTEXT_NAMESPACE