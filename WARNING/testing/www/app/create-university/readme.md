            <div className="create-university min-h-[100vh] w-full lg:max-w-[1500px] lg:flex lg:flex-col space-y-3 mx-auto p-10 pt-3">
                <div className="action w-full my-3 hidden lg:flex items-center justify-between ">
                    <div className="w-full h-full flex items-start justify-start space-x-3">
                        <Link href="/universities" className="z-50">
                            <AnimatedButton variant="expandIcon" Icon={ArrowLeftIcon} iconPlacement="left" className="border border-input bg-background hover:bg-accent text-accent-foreground">
                                Back
                            </AnimatedButton>
                        </Link>
                        <AnimatedButton onClick={handleInputedValues} variant="expandIcon" Icon={Projector} iconPlacement="left" className="border border-input bg-background hover:bg-accent text-accent-foreground">
                            {inputedValues ? "Hide" : "Show"} Inputed Values
                        </AnimatedButton>
                    </div>
                    <div className="w-full h-full flex items-end justify-end space-x-3">
                        <AnimatedButton onClick={syncImagesAndLogo} variant="expandIcon" Icon={CloudUpload} iconPlacement="left" className="border border-input bg-background hover:bg-accent text-accent-foreground">
                            Sync Uploaded Files
                        </AnimatedButton>
                        <Button
                            className="!py-0"
                            disabled={createButtonDisabled}
                            onClick={handleConfetti}
                        >
                            {
                                createButtonDisabled && <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            }
                            Create
                        </Button>
                    </div>


                </div>
                {inputedValues && <div className="min-w-full w-max flex flex-col gap-2 border rounded-lg p-3 text-sm !mb-3">
                    <div className="flex gap-2">
                        <p>Name: </p>
                        <span className="font-semibold">{inputedName || "No Name is Provided."}</span>
                    </div>
                    <Separator />
                    <div className="flex gap-2">
                        <p>Email: </p>
                        <span className="font-semibold">{inputedEmail || "No Email is Provided."}</span>
                    </div>

                    <Separator />
                    <div className="flex gap-2">
                        <p>Facebook: </p>
                        <span className="font-semibold">{inputedFacebook || "No Facebook Link is Provided."}</span>
                    </div>
                    <Separator />
                    <div className="flex gap-2">
                        <p>Instagram: </p>
                        <span className="font-semibold">{inputedInstragam || "No Instagram Link is Provided."}</span>
                    </div>
                    <Separator />
                    <div className="flex gap-2">
                        <p>Education Cost: </p>
                        <span className="font-semibold">{inputedCost || "No Education Cost is Provided."}</span>
                    </div>
                    <Separator />
                    <div className="flex gap-2">
                        <p>Website: </p>
                        <span className="font-semibold">{inputedWebsite || "No Website Link is Provided."}</span>
                    </div>
                    <Separator />
                    <div className="flex gap-2">
                        <p>University Code: </p>
                        <span className="font-semibold">{inputedCode || "No University Code is Provided."}</span>
                    </div>
                    <Separator />


                    <div className="flex gap-2">
                        <p>Phone Number: </p>
                        <span className="font-semibold">{phone || "No Phone Number is Provided."}</span>
                    </div>
                    <Separator />
                    <div className="flex gap-2">
                        <p>Logo: </p>
                        <span className="font-semibold">{inputedLogo || "No Logo is Provided."}</span>
                    </div>
                    <Separator />
                    <div className="flex gap-2">
                        <p>Address: </p>
                        <span className="font-semibold">{stateValue || "No Address is Provided."}</span>
                    </div>
                    <Separator />
                    <div className="flex gap-2">
                        <p>Region: </p>
                        <span className="font-semibold">{countryValue || "No Region is Provided."}</span>
                    </div>
                    <Separator />
                    <div className="flex gap-2">
                        <p>Description: </p>
                        <span className="font-semibold">{inputedDescription || "No Description is Provided."}</span>
                    </div>
                    <Separator />
                    <div className="flex gap-2">
                        <p>Images: </p>
                        <span className="font-semibold">{JSON.stringify(inputedImages, null, 2) || "No Images are Provided."}</span>
                    </div>
                    <Separator />
                    <div className="flex gap-2">
                        <p>Image: </p>
                        <span className="font-semibold">{inputedImage || "No Images are Provided."}</span>
                    </div>
                    <Separator />
                    <div className="flex gap-2">
                        <p>Hostel: </p>
                        {/* <span className="font-semibold">{inputedHostel || "No Hostel Information is Provided."}</span> */}
                        {
                            <Badge
                                className={cn(
                                    "w-fit text-center",
                                    inputedHostel ? "bg-green-500 text-green-50" : "bg-destructive text-destructive-foreground"
                                )}
                            >
                                {inputedHostel || "No Hostel Information Provided."}
                            </Badge>
                        }
                    </div>
                    <Separator />
                    <div className="flex gap-2">
                        <p>Military: </p>
                        {/* <span className="font-semibold">{inputedMilitary || "No Military Information is Provided."}</span> */}
                        {
                            <Badge
                                className={cn(
                                    "w-fit",
                                    inputedMilitary ? "bg-green-500 text-green-50" : "bg-destructive text-destructive-foreground"
                                )}
                            >
                                {inputedMilitary || 'No Military Status Provided.'}
                            </Badge>
                        }
                    </div>

                    <Separator />
                    <div className="flex gap-2">
                        <p>Status: </p>
                        {
                            <Badge
                                className={cn(
                                    "w-fit",
                                    inputedStatus ? "bg-green-500 text-green-50" : "bg-destructive text-destructive-foreground"
                                )}
                            >
                                {inputedStatus || "No Status Provided."}
                            </Badge>
                        }
                    </div>
                </div>}
                <div className="name-logo-description-university w-full grid gap-3 ">
                    <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                        <h1 className="text-4xl font-bold w-full text-left">Name</h1>
                        <Input onChange={handleNameChange} type="text" placeholder="Enter University Name" />
                    </div>
                    <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                        <h1 className="text-4xl font-bold w-full text-left">Email</h1>
                        <Input onChange={handleEmailChange} type="email" placeholder="Enter University Name" />
                    </div>
                    <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                        <h1 className="text-4xl font-bold w-full text-left">Status</h1>
                        <Select onValueChange={handleStatusChange}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>What is the operating method of this university?</SelectLabel>
                                    <Separator className="mb-1" />
                                    <SelectItem value="Non Profit">Non Profit</SelectItem>
                                    <SelectItem value="Public">Public</SelectItem>
                                    <SelectItem value="Liberal">Liberal</SelectItem>
                                    <SelectItem value="Community">Community</SelectItem>
                                    <SelectItem value="Corporatized">Corporatized</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="tag-location-university w-full grid gap-3 h-auto">

                    <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                        <h1 className="text-4xl font-bold w-full text-left">Phone Number</h1>
                        <PhoneInput className="!p-0 !m-0 w-full" value={phone} onChange={handleOnChange} />
                        <Button onClick={showPhoneNumberDetails} className="w-full">{phoneNumberDetails ? "Hide" : "Show"} Phone Number Details</Button>
                    </div>
                    <div className="hover-glow-border w-full h-auto border rounded-md flex lg:flex-row flex-col items-center justify-start p-10">
                        <div className="leftLogo flex flex-col items-start justify-center lg:h-full h-auto space-y-3 w-1/2">
                            <h1 className="text-4xl font-bold w-auto text-left">Logo</h1>
                            <div className="flex w-auto items-start justify-start">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline">Upload Logo</Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[95%] sm:mx-auto lg:min-w-[750px] lg:max-w-[35%]">
                                        <FileUploader
                                            maxFiles={1}
                                            maxSize={4 * 1024 * 1024}
                                            progresses={logoUploadprogresses}
                                            onUpload={uploadLogo}
                                            disabled={isLogoUploading}
                                        />
                                        <Card className="hover-glow-border">
                                            <CardHeader>
                                                <CardTitle>Uploaded Logo</CardTitle>
                                                <CardDescription>View the uploaded logo here</CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                {uploadedLogo.length > 0 ? (
                                                    <ScrollArea className="pb-4">
                                                        <div className="flex w-max space-x-2.5">
                                                            {
                                                                uploadedLogo.map((file: any) => {
                                                                    return (
                                                                        <div key={file.key} className="relative aspect-video w-64">
                                                                            <Image
                                                                                src={file.url}
                                                                                alt={file.name}
                                                                                fill
                                                                                sizes="(min-width: 640px) 640px, 100vw"
                                                                                loading="lazy"
                                                                                className="rounded-md object-cover"
                                                                            />
                                                                            <span>{file.name}</span>
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                        <ScrollBar orientation="horizontal" />
                                                    </ScrollArea>
                                                ) : (
                                                    <EmptyCard
                                                        title="No logo uploaded"
                                                        description="Upload logo to see it here."
                                                        className="w-full"
                                                    />
                                                )}
                                            </CardContent>
                                        </Card>
                                    </DialogContent>
                                </Dialog>
                            </div>

                        </div>

                        <div className="flex items-center justify-end lg:h-full h-auto RightLogoSide w-1/2">
                            {uploadedLogo.length > 0 ? (
                                <div className="flex w-full h-full">
                                    {
                                        uploadedLogo.map((file: any) => {
                                            return (
                                                <div key={file.key} className="relative aspect-video w-full h-full overflow-hidden">
                                                    <Image
                                                        src={file.url}
                                                        alt={file.name}
                                                        fill
                                                        sizes="(min-width: 100%) 100%, 50vw"
                                                        loading="lazy"
                                                        className="rounded-md object-cover"
                                                    />
                                                    <span>{file.name}</span>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            ) : (
                                <Card
                                    className={cn(
                                        "flex w-full flex-col items-center justify-center space-y-3 bg-transparent p-3",
                                    )}
                                >
                                    <div className="shrink-0 rounded-full border border-dashed p-4">
                                        <ImageIcon className="size-8 text-muted-foreground" aria-hidden="true" />
                                    </div>
                                    <div className="flex flex-col items-center text-center">
                                        <CardDescription>Uplaod Logo to see them here</CardDescription>
                                    </div>
                                </Card>

                            )}
                        </div>
                    </div>
                    <div className="hover-glow-border flex flex-col items-start justify-center gap-3 w-full h-full border rounded-md p-10">
                        <h1 className="text-4xl font-bold w-full text-left">Address & Region</h1>
                        <div className="flex flex-col lg:flex-col items-start justify-start gap-3 w-full">
                            <CountryDropdown />
                            <StateDropdown />
                        </div>
                    </div>
                </div>
                {phoneNumberDetails && <div className="min-w-[99%] w-max mx-auto flex flex-col gap-2 border rounded-lg p-3 text-sm">
                    <div className="flex gap-2">
                        <p>Phone number: </p>
                        <span className="font-semibold">{phoneData.phoneNumber || "-"}</span>
                    </div>
                    <Separator />
                    <div className="flex gap-2">
                        <p>Country code: </p>
                        <span className="font-semibold">{phoneData.countryCode || "-"}</span>
                    </div>
                    <Separator />
                    <div className="flex gap-2">
                        <p>Country calling code: </p>
                        <span className="font-semibold">
                            {phoneData.countryCallingCode || "-"}
                        </span>
                    </div>
                    <Separator />
                    <div className="flex gap-2">
                        <p>National number: </p>
                        <span className="font-semibold">
                            {phoneData.nationalNumber || "-"}
                        </span>
                    </div>
                    <Separator />
                    <div className="flex gap-2">
                        <p>International number: </p>
                        <span className="font-semibold">
                            {phoneData.internationalNumber || "-"}
                        </span>
                    </div>
                    <Separator />
                    <div className="flex gap-2">
                        <p>URI: </p>
                        <span className="font-semibold">{phoneData.uri || "-"}</span>
                    </div>
                    <Separator />
                    <div className="flex gap-2">
                        <p className="flex-shrink-0">Possible countries: </p>
                        <span className="font-semibold">
                            {phoneData.possibleCountries || "-"}
                        </span>
                    </div>
                    <Separator />
                    <Badge
                        className={cn(
                            "w-fit",
                            phoneData.isValid
                                ? "bg-green-500 text-green-50"
                                : "bg-destructive text-destructive-foreground",
                        )}
                    >
                        VALID NUMBER
                    </Badge>
                    <Separator />
                    <Badge
                        className={cn(
                            "w-fit",
                            phoneData.isPossible
                                ? "bg-green-500 text-green-50"
                                : "bg-destructive text-destructive-foreground",
                        )}
                    >
                        POSSIBLE NUMBER
                    </Badge>
                </div>}
                <div className="hover-glow-border w-full border rounded-md mx-auto h-auto pt-3 flex flex-col space-y-3">
                    <h1 className="text-4xl font-bold w-full text-left pl-4">Description</h1>
                    {/* <div className="w-full h-full border-t">
                        <DndProvider backend={HTML5Backend}>
                            <CommentsProvider users={commentsUsers} myUserId={myUserId}>
                                <Plate plugins={plugins} initialValue={initialValue} onChange={handleDescriptionChange}>
                                    <div
                                        ref={containerRef}
                                        className={cn(
                                            'relative',
                                            '[&_.slate-start-area-left]:!w-[64px] [&_.slate-start-area-right]:!w-[64px] [&_.slate-start-area-top]:!h-4'
                                        )}
                                    >
                                        <FixedToolbar>
                                            <FixedToolbarButtons />
                                        </FixedToolbar>

                                        <Editor
                                            className="p-3 px-7 !min-h-[500px]"
                                            autoFocus
                                            focusRing={false}
                                            variant="ghost"
                                            size="md"

                                        />

                                        <MentionCombobox items={MENTIONABLES} />

                                        <CommentsPopover />

                                        <CursorOverlay containerRef={containerRef} />
                                    </div>
                                </Plate>
                            </CommentsProvider>
                        </DndProvider>
                    </div> */}
                    <Textarea onChange={handleDescriptionChange} className="w-full min-h-[350px]" placeholder="Type your description here." />

                </div>
                <div className="w-full border rounded-md mx-auto h-auto min-h-[300px]">
                    {/* <Shell>
                        <VariantTabs />
                    </Shell> */}
                    <div className="w-full h-full flex flex-col space-y-4">
                        <h1 className="text-4xl font-bold w-full text-left pl-4">Images</h1>
                        <div className="space-y-6">
                            <FileUploader
                                maxFiles={10}
                                maxSize={4 * 1024 * 1024}
                                progresses={imagesUploadingProgress}
                                onUpload={uploadImages}
                                disabled={isImagesUploading}
                            />
                            <Card className="hover-glow-border">
                                <CardHeader>
                                    <CardTitle>Uploaded images</CardTitle>
                                    <CardDescription>View the uploaded images here</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {uploadedImages.length > 0 ? (
                                        <ScrollArea className="pb-4">
                                            <div className="flex w-max space-x-2.5">
                                                {
                                                    uploadedImages.map((file: any) => {
                                                        // setInputedImages(file.url)
                                                        return (
                                                            <div key={file.key} className="relative aspect-video w-64">
                                                                <Image
                                                                    src={file.url}
                                                                    alt={file.name}
                                                                    fill
                                                                    sizes="(min-width: 640px) 640px, 100vw"
                                                                    loading="lazy"
                                                                    className="rounded-md object-cover"
                                                                />
                                                                {/* <span>{file.name}</span> */}
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                            <ScrollBar orientation="horizontal" />
                                        </ScrollArea>
                                    ) : (
                                        <EmptyCard
                                            title="No images uploaded"
                                            description="Upload some images to see them here"
                                            className="w-full"
                                        />
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>



                <div className="name-logo-description-university w-full grid gap-3 ">

                    {/* <Collapsible
                    open={isOpen}
                    onOpenChange={setIsOpen}
                    className="w-[350px] space-y-2"
                >
                    <div className="flex items-center justify-between space-x-4 px-4">
                        <h4 className="text-sm font-semibold">
                            Add Files Link
                        </h4>
                        <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="sm" className="w-9 p-0">
                                <ChevronsUpDown className="h-4 w-4" />
                                <span className="sr-only">Toggle</span>
                            </Button>
                        </CollapsibleTrigger>
                    </div>
                    <div className="rounded-md border px-4 py-3 font-mono text-sm">
                        @radix-ui/primitives
                    </div>
                    <CollapsibleContent className="space-y-2">
                        <div className="rounded-md border px-4 py-3 font-mono text-sm">
                            @radix-ui/colors
                        </div>
                        <div className="rounded-md border px-4 py-3 font-mono text-sm">
                            @stitches/react
                        </div>
                    </CollapsibleContent>
                </Collapsible> */}

                    {/* <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                        <h1 className="text-4xl font-bold w-full text-left">Image</h1>
                        <Input onChange={handleImageChange} type="text" placeholder="Enter University Image" />
                    </div> */}
                    <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                        <h1 className="text-4xl font-bold w-full text-left">Code</h1>
                        <Input onChange={handleCodeChange} type="number" placeholder="Enter University Code" />
                    </div>
                    <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                        <h1 className="text-4xl font-bold w-full text-left">Hostel</h1>
                        <Select onValueChange={handleHostelChange}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a Hostel Availability" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Is there is a hostel in this university?</SelectLabel>
                                    <Separator className="mb-1" />
                                    <SelectItem value="yes">Yes</SelectItem>
                                    <SelectItem value="no">No</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                        <h1 className="text-4xl font-bold w-full text-left">Military</h1>
                        <Select onValueChange={handleMilitaryChange}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a Military Campain" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Are there is a military campain in this university?</SelectLabel>
                                    <Separator className="mb-1" />

                                    <SelectItem value="yes">Yes</SelectItem>
                                    <SelectItem value="no">No</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="name-logo-description-university w-full grid gap-3 ">
                    <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                        <h1 className="text-4xl font-bold w-full text-left">Facebook</h1>
                        <Input onChange={handleFacebookChange} type="text" placeholder="Enter University Facebook Link" />
                    </div>
                    <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                        <h1 className="text-4xl font-bold w-full text-left">Instragam</h1>
                        <Input onChange={handleInstagramChange} type="text" placeholder="Enter University Instragam Link" />
                    </div>
                    <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                        <h1 className="text-4xl font-bold w-full text-left">Website</h1>
                        <Input onChange={handleWebsiteChange} type="text" placeholder="Enter University Website Link" />
                    </div>
                    <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                        <h1 className="text-4xl font-bold w-full text-left">Cost</h1>
                        <Input onChange={handleCostChange} type="text" placeholder="Enter University Website Link" />
                    </div>
                </div>


                <Collapsible
                    open={isOpen}
                    onOpenChange={setIsOpen}
                    className="w-full space-y-2"
                >
                    <div className="flex items-center justify-between space-x-4 px-4">
                        <h4 className="text-sm font-semibold">
                            Add Files Link
                        </h4>
                        <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="sm" className="w-9 p-0">
                                <ChevronsUpDown className="h-4 w-4" />
                                <span className="sr-only">Toggle</span>
                            </Button>
                        </CollapsibleTrigger>
                    </div>
                    {/* <div className="rounded-md border px-4 py-3 font-mono text-sm">
                        @radix-ui/primitives
                    </div> */}

                    <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                        <h1 className="text-4xl font-bold w-full text-left">Logo</h1>
                        <Input onChange={handleLogoChange} type="text" placeholder="Enter Logo Link" />
                    </div>

                    <CollapsibleContent className="space-y-2">
                        {/* <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                    <h1 className="text-4xl font-bold w-full text-left">Images</h1>
                    <TagInput
                        placeholder="Enter Images Link"
                        tags={inputedImages}
                        draggable
                        className="sm:min-w-[450px]"
                        setTags={(newTags:any) => {
                            setInputedImages(newTags);
                        }}
                    />
                </div> */}

                        <div className="hover-glow-border w-full h-auto border rounded-md flex flex-col space-y-3 items-center justify-center p-10">
                            <h1 className="text-4xl font-bold w-full text-left">Images</h1>
                            <Input onChange={handleImageChange} type="text" placeholder="Enter Images Link" />
                        </div>









                    </CollapsibleContent>
                </Collapsible>


                <div className="action w-full my-3 flex flex-col lg:hidden items-start justify-start space-y-3 lg:space-y-0">
                    <Link href="/universities" className="z-50 w-full">
                        <AnimatedButton variant="expandIcon" Icon={ArrowLeftIcon} iconPlacement="left" className="border border-input bg-secondary hover:bg-accent text-accent-foreground !min-w-full lg:w-auto">
                            Back
                        </AnimatedButton>
                    </Link>
                    <AnimatedButton onClick={handleInputedValues} variant="expandIcon" Icon={Projector} iconPlacement="left" className="border w-full border-input bg-background hover:bg-accent text-accent-foreground">
                        {inputedValues ? "Hide" : "Show"} Inputed Values
                    </AnimatedButton>
                    <AnimatedButton onClick={syncImagesAndLogo} variant="expandIcon" Icon={CloudUpload} iconPlacement="left" className="border w-full border-input bg-background hover:bg-accent text-accent-foreground">
                        Sync Uploaded Files
                    </AnimatedButton>
                    <AnimatedButton
                        className="!py-0 w-full"
                        disabled={createButtonDisabled}
                        onClick={handleConfetti}
                    >
                        {
                            createButtonDisabled && <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        }
                        Create
                    </AnimatedButton>
                </div>
            </div>