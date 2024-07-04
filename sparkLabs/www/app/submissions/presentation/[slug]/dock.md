      <Dock>
        {/* <DockIcon onClick={() => {
          setSubmitBar(!submitBar);
          setLoadBar(false);
          setSaveBar(false);
          setNavigationsBar(false);
          setDetailsBar(false);
          setDeveloperBar(false);
          setActionsBar(false);
        }} className={cn(submitBar ? "jello-vertical" : "")}>
          {submitBar ? <X className="h-4 w-4" /> : <Send className="h-4 w-4" />}
        </DockIcon>
        <DockIcon onClick={() => {
          setSubmitBar(false);
          setLoadBar(!loadBar);
          setSaveBar(false);
          setNavigationsBar(false);
          setDetailsBar(false);
          setDeveloperBar(false);
          setActionsBar(false);
        }} className={cn("hover:jello-vertical")}>
          {loadBar ? <X className="h-4 w-4" /> :
            <MonitorUp className="h-4 w-4" />}
        </DockIcon> */}
        <DockIcon onClick={() => {
          setSubmitBar(false);
          setLoadBar(false);
          setSaveBar(!saveBar);
          setNavigationsBar(false);
          setDetailsBar(false);
          setDeveloperBar(false);
          setActionsBar(false);
          // console.log("Save");
          // toast({
          //   title: "Save Your Project!",
          //   description: (
          //     <div className="mt-2 w-[340px] rounded-md bg-primary-foreground p-4">
          //       <span>You have to follow the Save Menu to save your project.</span>
          //     </div>
          //   ),
          // });
        }} className={cn("hover:jello-vertical")}>

          {saveBar ? <X className="h-4 w-4" /> :
            <Save className="h-4 w-4" />}
        </DockIcon>
        <DockIcon onClick={() => {
          setSubmitBar(false);
          setNavigationsBar(!navigationsBar);
          setDetailsBar(false);
          setDeveloperBar(false);
          setActionsBar(false);
        }} className={cn(submitBar ? "jello-vertical" : "")}>
          {navigationsBar ? <X className="h-4 w-4" /> :
            <Map className="h-4 w-4" />}
        </DockIcon>
        <DockIcon onClick={() => {
          setSubmitBar(false);
          setNavigationsBar(false);
          setDetailsBar(!detailsBar);
          setDeveloperBar(false);
          setActionsBar(false);
        }} className={cn(submitBar ? "jello-vertical" : "")}>
          {detailsBar ? <X className="h-4 w-4" /> :
            <CircleDashed className="h-4 w-4" />}
        </DockIcon>
        <DockIcon onClick={() => {
          setSubmitBar(false);
          setNavigationsBar(false);
          setDetailsBar(false);
          setDeveloperBar(!developerBar);
          setActionsBar(false);
        }} className={cn(submitBar ? "jello-vertical" : "")}>
          {developerBar ? <X className="h-4 w-4" /> :
            <ArrowUpFromDot className="h-4 w-4" />}
        </DockIcon>
        <DockIcon onClick={() => {
          setSubmitBar(false);
          setNavigationsBar(false);
          setDetailsBar(false);
          setDeveloperBar(false);
          setActionsBar(!actionsBar);
        }} className={cn(submitBar ? "jello-vertical" : "")}>
          {actionsBar ? <X className="h-4 w-4" /> :
            <ChevronsRightLeft className="h-4 w-4" />}
        </DockIcon>
      </Dock>