// Copyright Epic Games, Inc. All Rights Reserved.

#include "AvalancheInteractiveToolsModule.h"
#include "AvaInteractiveToolsCommands.h"
#include "AvaInteractiveToolsDelegates.h"
#include "Builders/AvaInteractiveToolsActorToolBuilder.h"
#include "Interfaces/IPluginManager.h"
#include "Tools/AvaInteractiveToolsActorToolNull.h"
#include "Tools/AvaInteractiveToolsActorToolSpline.h"

#define LOCTEXT_NAMESPACE "AvalancheInteractiveTools"

DEFINE_LOG_CATEGORY(LogAvaInteractiveTools);

namespace UE::AvaInteractiveTools::Private
{
	bool bInitialRegistration = false;
}

void FAvalancheInteractiveToolsModule::StartupModule()
{
	FAvaInteractiveToolsCommands::Register();
	bHasActiveTool = false;

	if (IPluginManager::Get().GetLastCompletedLoadingPhase() >= ELoadingPhase::PostEngineInit)
	{
		OnPostEngineInit();
	}
	else
	{
		FCoreDelegates::OnPostEngineInit.AddRaw(this, &FAvalancheInteractiveToolsModule::OnPostEngineInit);
	}
}

void FAvalancheInteractiveToolsModule::ShutdownModule()
{
	FAvaInteractiveToolsCommands::Unregister();
	FCoreDelegates::OnPostEngineInit.RemoveAll(this);
}

void FAvalancheInteractiveToolsModule::RegisterCategory(FName InCategoryName, TSharedPtr<FUICommandInfo> InCategoryCommand,
	int32 InPlacementModeSortPriority)
{
	if (!InCategoryCommand.IsValid())
	{
		return;
	}

	if (Categories.Contains(InCategoryName))
	{
		return;
	}

	Categories.Add(InCategoryName, InCategoryCommand);
	Tools.Add(InCategoryName, {});
}

void FAvalancheInteractiveToolsModule::RegisterTool(FName InCategory, FAvaInteractiveToolsToolParameters&& InToolParams)
{
	if (!Categories.Contains(InCategory))
	{
		return;
	}

	if (!Tools.Contains(InCategory))
	{
		Tools.Add(InCategory, {});
	}

	const bool bToolAdded = Tools[InCategory].ContainsByPredicate(
		[&InToolParams](const FAvaInteractiveToolsToolParameters& InTool)
		{
			return InTool.ToolIdentifier.Equals(InToolParams.ToolIdentifier);
		}
	);

	if (bToolAdded)
	{
		return;
	}

	Tools[InCategory].Add(MoveTemp(InToolParams));

	using namespace UE::AvaInteractiveTools::Private;

	if (!bInitialRegistration)
	{
		Tools[InCategory].StableSort([](const FAvaInteractiveToolsToolParameters& InA, const FAvaInteractiveToolsToolParameters& InB)
			{
				return InA.Priority < InB.Priority;
			});
	}
}

const TMap<FName, TSharedPtr<FUICommandInfo>>& FAvalancheInteractiveToolsModule::GetCategories()
{
	return Categories;
}

const TArray<FAvaInteractiveToolsToolParameters>* FAvalancheInteractiveToolsModule::GetTools(FName InCategory)
{
	return Tools.Find(InCategory);
}

bool FAvalancheInteractiveToolsModule::HasActiveTool() const
{
	return bHasActiveTool;
}

void FAvalancheInteractiveToolsModule::OnToolActivated()
{
	bHasActiveTool = true;
}

void FAvalancheInteractiveToolsModule::OnToolDeactivated()
{
	bHasActiveTool = false;
}

void FAvalancheInteractiveToolsModule::OnPostEngineInit()
{
	using namespace UE::AvaInteractiveTools::Private;

	bInitialRegistration = true;
	BroadcastRegisterCategories();
	BroadcastRegisterTools();
	bInitialRegistration = false;

	for (TPair<FName, TArray<FAvaInteractiveToolsToolParameters>>& ToolPair : Tools)
	{
		ToolPair.Value.StableSort([](const FAvaInteractiveToolsToolParameters& InA, const FAvaInteractiveToolsToolParameters& InB)
			{
				return InA.Priority < InB.Priority;
			});
	}
}

void FAvalancheInteractiveToolsModule::BroadcastRegisterCategories()
{
	// Ensure that ours are first
	RegisterDefaultCategories();
	FAvaInteractiveToolsDelegates::GetRegisterCategoriesDelegate().Broadcast(this);
}

void FAvalancheInteractiveToolsModule::RegisterDefaultCategories()
{
	RegisterCategory(CategoryName2D,     FAvaInteractiveToolsCommands::Get().Category_2D, 41);
	RegisterCategory(CategoryName3D,     FAvaInteractiveToolsCommands::Get().Category_3D, 42);
	RegisterCategory(CategoryNameActor,  FAvaInteractiveToolsCommands::Get().Category_Actor, 43);
}

void FAvalancheInteractiveToolsModule::BroadcastRegisterTools()
{
	RegisterDefaultTools();
	FAvaInteractiveToolsDelegates::GetRegisterToolsDelegate().Broadcast(this);
}

void FAvalancheInteractiveToolsModule::RegisterDefaultTools()
{
	RegisterTool(CategoryNameActor, GetDefault<UAvaInteractiveToolsActorToolNull>()->GetToolParameters());
	RegisterTool(CategoryNameActor, GetDefault<UAvaInteractiveToolsActorToolSpline>()->GetToolParameters());
}

void FAvalancheInteractiveToolsModule::OnPlacementCategoryRefreshed(FName InCategory)
{	
}

#undef LOCTEXT_NAMESPACE

IMPLEMENT_MODULE(FAvalancheInteractiveToolsModule, AvalancheInteractiveTools)
