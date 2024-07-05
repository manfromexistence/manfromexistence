                                                         <div>
                                                            <Button
                                                                onClick={() => {
                                                                    setMyDialogOpen(true);
                                                                }}
                                                                variant="outline">Manage Students
                                                            </Button>
                                                            {myDialogOpen && <div className="h-screen w-full fixed top-0 left-0 flex-center">
                                                                <div className="h-auto min-h-[50vh] w-[450px] flex flex-col gap-3">
                                                                    <ScrollArea className="h-[450px] w-full rounded-md my-3 border">
                                                                        <Card className="w-full max-w-md border-0">
                                                                            <CardHeader>
                                                                                <CardTitle>Update Students In ({items.title.toUpperCase()})</CardTitle>
                                                                                <CardDescription>Need to add or remove students.No worry.Just add or remove them here!</CardDescription>
                                                                            </CardHeader>
                                                                            <CardContent className="space-y-4">


                                                                                <div className="w-full space-y-2">
                                                                                    <Label htmlFor="students">Students</Label>
                                                                                   
                                                                                    <Popover open={open} onOpenChange={setOpen}>
                                                                                        <PopoverTrigger asChild>
                                                                                            <Button
                                                                                                variant="outline"
                                                                                                role="combobox"
                                                                                                aria-expanded={open}
                                                                                                className="w-full justify-between"
                                                                                            >
                                                                                                {value
                                                                                                    ? `Added (${value.toUpperCase()})`
                                                                                                    : "Add student..."}
                                                                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                                                            </Button>
                                                                                        </PopoverTrigger>
                                                                                        <PopoverContent className="w-[342px] p-0">
                                                                                            <Command>
                                                                                                <CommandInput placeholder="Search students..." />
                                                                                                <CommandList>
                                                                                                    <CommandGroup>
                                                                                                        {addOneStudent.length > 0 ? addOneStudent.map((user: any) => (
                                                                                                            <CommandItem
                                                                                                                key={user.id}
                                                                                                                value={user.username}
                                                                                                                onSelect={(currentValue) => {
                                                                                                                    setValue(currentValue);
                                                                                                                    const updatedStudentsPP = addOneStudent.filter((item) => item.id !== user.id);
                                                                                                                    setAddOneStudent(updatedStudentsPP);
                                                                                                                    setStudents(prevDocs => [...prevDocs, {
                                                                                                                        id: user.id,
                                                                                                                        username: user.username,
                                                                                                                    }]);
                                                                                                                    setOpen(false);
                                                                                                                }}
                                                                                                            >
                                                                                                                <Check
                                                                                                                    className={cn(
                                                                                                                        "mr-2 h-4 w-4",
                                                                                                                        value === user.username ? "opacity-100" : "opacity-0"
                                                                                                                    )}
                                                                                                                />
                                                                                                                {user.username}
                                                                                                            </CommandItem>
                                                                                                        )) : (<div className="flex-center rounded-md h-32 hover:bg-primary-foreground hover:text-primary w-full text-sm font-mono p-3">
                                                                                                            No Students.
                                                                                                        </div>)}
                                                                                                    </CommandGroup>
                                                                                                </CommandList>
                                                                                            </Command>
                                                                                        </PopoverContent>
                                                                                    </Popover>
                                                                                    <div className="w-full flex gap-1.5">
                                                                                        <Button className="w-full" onClick={removeAllStudents} variant="outline">
                                                                                            Remove All Students
                                                                                        </Button>
                                                                                        <Button className="w-full" onClick={addAllStudents} variant="outline">
                                                                                            Add All Students
                                                                                        </Button>
                                                                                    </div>

                                                                                    <div className="w-full h-auto rounded-md border p-3">
                                                                                        <div className="w-full flex flex-row space-x-3 justify-between items-center text-sm font-mono py-5 px-3 pt-3 border-b">
                                                                                            <span>Username</span>
                                                                                            <span>Actions</span>
                                                                                        </div>
                                                                                        {
                                                                                            dummyFunctionallty ? students.length > 0 ? students.map((student: any) => (
                                                                                                <div key={student.id} className="hover:bg-primary hover:text-primary-foreground w-full flex flex-row space-x-3 justify-between items-center text-sm font-mono p-3">
                                                                                                    <span>{student.username}</span>
                                                                                                    <Trash2 onClick={() => {
                                                                                                        const updatedStudentsTT = students.filter((user: any) => user.id !== student.id);
                                                                                                        setStudents(updatedStudentsTT);
                                                                                                        setAddOneStudent(prevDocs => [...prevDocs, {
                                                                                                            id: student.id,
                                                                                                            username: student.username,
                                                                                                        }]);
                                                                                                    }} className="h-4 w-4" />
                                                                                                </div>
                                                                                            )) : (<div className="flex-center h-32 hover:bg-primary-foreground hover:text-primary w-full text-sm font-mono p-3">
                                                                                                No Students.
                                                                                            </div>) : items.students.map((student: any) => {
                                                                                                return users.map((user: any) => {
                                                                                                    if (user.id === student) {
                                                                                                        return (
                                                                                                            <div key={user.id} className="hover:bg-primary hover:text-primary-foreground w-full flex flex-row space-x-3 justify-between items-center text-sm font-mono p-3">
                                                                                                                <span>{user.username}</span>
                                                                                                                <Link href={`submissions/${student}`}>
                                                                                                                    <CircleArrowOutUpRight className="h-4 w-4" />
                                                                                                                </Link>
                                                                                                            </div>
                                                                                                        );
                                                                                                    }
                                                                                                });
                                                                                            })
                                                                                        }
                                                                                    </div>
                                                                                </div>
                                                                            </CardContent>
                                                                        </Card>
                                                                    </ScrollArea>
                                                                    <Button onClick={async () => {
                                                                        const updateRef = doc(db, "classrooms", items.id);
                                                                        const UPDATE = await updateDoc(updateRef, {
                                                                            // userId: items.userId,
                                                                            // title: items.title,
                                                                            // thumbnail: items.thumbnail,
                                                                            // description: items.description,
                                                                            students: students.map((student) => student.id),
                                                                            // time: date.format(new Date(), 'YYYY/MM/DD HH:mm:ss [GMT]Z', true),
                                                                        })

                                                                        // setDocs((prevDocs) => {
                                                                        //     const index = prevDocs.findIndex((doc) => doc.id === items.id);

                                                                        //     if (index !== -1) {
                                                                        //         const updatedDocs = [...prevDocs];
                                                                        //         updatedDocs[index] = {
                                                                        //             ...updatedDocs[index],
                                                                        //             students: updatedStudents.map((student) => student.id),
                                                                        //             time: date.format(new Date(), "YYYY/MM/DD HH:mm:ss [GMT]Z", true),
                                                                        //         };
                                                                        //         return updatedDocs;
                                                                        //     }

                                                                        //     // If no matching document found, return the original state
                                                                        //     return prevDocs;
                                                                        // });


                                                                        toast({
                                                                            title: "Classroom Updated Successfully!",
                                                                            description: `Students are updated in this class.`,
                                                                        });
                                                                        setUpdateStudentMenu(false);
                                                                        window.location.reload();

                                                                    }} className="w-full">Update Students In This Classroom</Button>
                                                                </div>
                                                            </div>}

                                                        </div>












                                                        
 
 
                                                                            <div className="w-full space-y-2">
                                                                                <Label htmlFor="students">Students</Label>
                                                                                <Popover open={updateStudentMenuOpen} onOpenChange={setUpdateStudentMenuOpen}>
                                                                                    <PopoverTrigger asChild>
                                                                                        <Button
                                                                                            variant="outline"
                                                                                            role="combobox"
                                                                                            aria-expanded={updateStudentMenuOpen}
                                                                                            className="w-full justify-between"
                                                                                        >
                                                                                            {updateValue
                                                                                                ? `Added (${updateValue.toUpperCase()})`
                                                                                                : "Add student..."}
                                                                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                                                        </Button>
                                                                                    </PopoverTrigger>
                                                                                    <PopoverContent className="w-[342px] p-0">
                                                                                        <Command>
                                                                                            <CommandInput placeholder="Search students..." />
                                                                                            <CommandList>
                                                                                                <CommandGroup>
                                                                                                    {addOneUpdatedStudent.length > 0 ? addOneUpdatedStudent.map((user: any) => (
                                                                                                        <CommandItem
                                                                                                            key={user.id}
                                                                                                            value={user.username}
                                                                                                            onSelect={(currentValue) => {
                                                                                                                setUpdateValue(currentValue);
                                                                                                                const updatedStudentsLatest = addOneUpdatedStudent.filter((item) => item.id !== user.id);
                                                                                                                setAddOneUpdatedStudent(updatedStudentsLatest);
                                                                                                                setUpdatedStudents(prevDocs => [...prevDocs, {
                                                                                                                    id: user.id,
                                                                                                                    username: user.username,
                                                                                                                }]);
                                                                                                                setUpdateStudentMenuOpen(false);
                                                                                                            }}
                                                                                                        >
                                                                                                            <Check
                                                                                                                className={cn(
                                                                                                                    "mr-2 h-4 w-4",
                                                                                                                    value === user.username ? "opacity-100" : "opacity-0"
                                                                                                                )}
                                                                                                            />
                                                                                                            {user.username}
                                                                                                        </CommandItem>
                                                                                                    )) : (<div className="flex-center rounded-md h-32 hover:bg-primary-foreground hover:text-primary w-full text-sm font-mono p-3">
                                                                                                        No Students.
                                                                                                    </div>)}
                                                                                                </CommandGroup>
                                                                                            </CommandList>
                                                                                        </Command>
                                                                                    </PopoverContent>
                                                                                </Popover>
                                                                                <div className="w-full flex gap-1.5">
                                                                                    <Button className="w-full" onClick={removeAllUpdatedStudents} variant="outline">
                                                                                        Remove All Students
                                                                                    </Button>
                                                                                    <Button className="w-full" onClick={addAllUpdatedStudents} variant="outline">
                                                                                        Add All Students
                                                                                    </Button>
                                                                                </div>

                                                                                <div className="w-full h-auto rounded-md border p-3">
                                                                                    <div className="w-full flex flex-row space-x-3 justify-between items-center text-sm font-mono py-5 px-3 pt-3 border-b">
                                                                                        <span>Username</span>
                                                                                        <span>Actions</span>
                                                                                    </div>
                                                                                    {
                                                                                        updatedStudents.length > 0 ? updatedStudents.map((student: any) => (
                                                                                            <div key={student.id} className="hover:bg-primary hover:text-primary-foreground w-full flex flex-row space-x-3 justify-between items-center text-sm font-mono p-3">
                                                                                                <span>{student.username}</span>
                                                                                                <Trash2 onClick={() => {
                                                                                                    const updatedStudentsNew = updatedStudents.filter((user: any) => user.id !== student.id);
                                                                                                    setUpdatedStudents(updatedStudentsNew);
                                                                                                    setAddOneUpdatedStudent(prevDocs => [...prevDocs, {
                                                                                                        id: student.id,
                                                                                                        username: student.username,
                                                                                                    }]);
                                                                                                }} className="h-4 w-4" />
                                                                                            </div>
                                                                                        )) : (<div className="flex-center h-32 hover:bg-primary-foreground hover:text-primary w-full text-sm font-mono p-3">
                                                                                            No Students.
                                                                                        </div>)
                                                                                    }
                                                                                </div>
                                                                            </div>
So, there are two array in react typescript.
1. docs => [
    {
        id: "docsid",
        students: [
            "studentId1",
            "studentId2",
        ],
    },
    ...
]
2. users = [
    {
        id:"usersId",
        username:"username",
    }
]

docs.student array's items are according to users.id
I am mapping through docs array and in react typescript
I was using this code to to hanle docs and users. 
```                                                        <div className="w-full space-y-2">
                                                            <Label htmlFor="students">Students</Label>
                                                            <Popover open={open} onOpenChange={setOpen}>
                                                                <PopoverTrigger asChild>
                                                                    <Button
                                                                        variant="outline"
                                                                        role="combobox"
                                                                        aria-expanded={open}
                                                                        className="w-full justify-between"
                                                                    >
                                                                        {value
                                                                            ? `Added (${value.toUpperCase()})`
                                                                            : "Add student..."}
                                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                                    </Button>
                                                                </PopoverTrigger>
                                                                <PopoverContent className="w-[342px] p-0">
                                                                    <Command>
                                                                        <CommandInput placeholder="Search students..." />
                                                                        <CommandList>
                                                                            <CommandEmpty>No student found.</CommandEmpty>
                                                                            <CommandGroup>
                                                                                {addOneStudent.length > 0 ? addOneStudent.map((user: any) => (
                                                                                    <CommandItem
                                                                                        key={user.id}
                                                                                        value={user.username}
                                                                                        onSelect={(currentValue) => {
                                                                                            setValue(currentValue);
                                                                                            const updatedStudents = addOneStudent.filter((item) => item.id !== user.id);
                                                                                            setAddOneStudent(updatedStudents);
                                                                                            setStudents(prevDocs => [...prevDocs, {
                                                                                                id: user.id,
                                                                                                username: user.username,
                                                                                            }]);
                                                                                            setOpen(false);
                                                                                        }}
                                                                                    >
                                                                                        <Check
                                                                                            className={cn(
                                                                                                "mr-2 h-4 w-4",
                                                                                                value === user.username ? "opacity-100" : "opacity-0"
                                                                                            )}
                                                                                        />
                                                                                        {user.username}
                                                                                    </CommandItem>
                                                                                )) : (<div className="flex-center rounded-md h-32 hover:bg-primary-foreground hover:text-primary w-full text-sm font-mono p-3">
                                                                                    No Students.
                                                                                </div>)}
                                                                            </CommandGroup>
                                                                        </CommandList>
                                                                    </Command>
                                                                </PopoverContent>
                                                            </Popover>
                                                            <div className="w-full flex gap-1.5">
                                                                <Button className="w-full" onClick={removeAllStudents} variant="outline">
                                                                    Remove All Students
                                                                </Button>
                                                                <Button className="w-full" onClick={addAllStudents} variant="outline">
                                                                    Add All Students
                                                                </Button>
                                                            </div>

                                                            <div className="w-full h-auto rounded-md border p-3">
                                                                <div className="w-full flex flex-row space-x-3 justify-between items-center text-sm font-mono py-5 px-3 pt-3 border-b">
                                                                    <span>Username</span>
                                                                    <span>Actions</span>
                                                                </div>
                                                                {
                                                                    students.length > 0 ? students.map((student: any) => (
                                                                        <div key={student.id} className="hover:bg-primary hover:text-primary-foreground w-full flex flex-row space-x-3 justify-between items-center text-sm font-mono p-3">
                                                                            <span>{student.username}</span>
                                                                            <Trash2 onClick={() => {
                                                                                const updatedStudents = students.filter((user: any) => user.id !== student.id);
                                                                                setStudents(updatedStudents);
                                                                                setAddOneStudent(prevDocs => [...prevDocs, {
                                                                                    id: student.id,
                                                                                    username: student.username,
                                                                                }]);
                                                                            }} className="h-4 w-4" />
                                                                        </div>
                                                                    )) : (<div className="flex-center h-32 hover:bg-primary-foreground hover:text-primary w-full text-sm font-mono p-3">
                                                                        No Students.
                                                                    </div>)
                                                                }
                                                            </div>
                                                        </div>```
