# Same Student Dashboard Issue:

                                            {
                                                docs.map((classroom: any) => submissions.find((submission: any) => submission.classroomId === classroom.id ? `(Yes:${classroom.title})` : `[No: ${classroom.title}]`))
                                            }





                                            {docs.map((classroom: any) => {

                                                
                                                return classroom.students.map((student: any) => {
                                                    const submissionExists = submissions.map((submission: any) => submission.userId === student);
                                                    return (
                                                        <span key={classroom.id} className="h-auto w-full p-3 flex-center">
                                                                {
                                                                    submissions.map((submission: any) => submission.userId === student  ? `Yes, you can submit a project to Classroom: ${classroom.title}`
                                                                    : `No, you cannot submit a project to Classroom: ${classroom.title}`)
                                                                }
                                                        </span>
                                                    );
                                                });
                                            })}

                                            {
                                            const classroom = docs.filter((classroom:any) => classroom.id === submission.classroomId);
                                            submissions.map((submission:any) => classroom  ? `${classroom.title}: Matched` : `${classroom.title}: Wrong`);
                                            
                                            }



                                                docs.filter((classroom: any) => classroom.students.map((student: any) => student === user.id))
                                                    .map((classroom: any) => <span key={classroom.id} className="w-full p-3 flex-center hover:bg-primary-foreground hover:text-primary hover:text-bold">Classroom:({classroom.title}) ||
                                                       Logic: {submissions.map((submission:any) => submission.classroomId === classroom.id ? "Match" : "Wrong")}
                                                    </span>)

                                                // AVAILABLE_CLASSROOMS.map((classroom: any) => <span key={classroom.id} className="w-full p-3 flex-center hover:bg-primary-foreground hover:text-primary hover:text-underline">{classroom.title} {classroom.id}</span>)
                                           



                                                        [{classroom.students.map((student: any) => submissions.map((submission: any) => submission.userId === student && submission.classroomId === classroom.id ? "Classroom Matches" : "Classroom Does Not Match"))}]


        // configuring available classrooms
        const available_classrooms_for_current_student = docs.filter((classroom: any) => classroom.students.map((student: any) => student === auth.currentUser?.uid))
        setAVAILABLE_CLASSROOMS(available_classrooms_for_current_student);
        alert(available_classrooms_for_current_student);



                                            {submissions.map((submission) => (
                                                <>
                                                    {docs.map((classroom) => (
                                                        <span key={classroom.id}>{classroom.title || "No title provided in this classroom"}</span>
                                                    ))}
                                                </>
                                            ))}






                                            {submissions.map((submission) => (
                                                <div key={submission.id} className='flex flex-row w-full h-auto p-3 hover:bg-primary-foreground hover:text-primary'>
                                                    <span className='flex-1 my-auto'>{submission.title || "No title provided in this submission"}</span>
                                                    {docs.map((classroom) => (
                                                        <span key={classroom.id}>{classroom.title || "No title provided in this classroom"}</span>
                                                    ))}
                                                </div>
                                            ))}



                                            {submissions.map((submission) => (
                                                <div key={submission.id} className='flex flex-row w-full h-auto p-3 hover:bg-primary-foreground hover:text-primary'>
                                                    <span className='flex-1 my-auto'>{submission.title || "No title provided in this submission"}</span>
                                                </div>
                                            ))}
                                            {docs.map((classroom) => (
                                                <div key={classroom.id} className='flex flex-row w-full h-auto p-3 hover:bg-primary-foreground hover:text-primary'>
                                                    <span className='flex-1 my-auto'>{classroom.title || "No title provided in this classroom"}</span>
                                                </div>
                                            ))}



{submissions.map((submission) => (
        <div key={submission.id} className='flex flex-row w-full h-auto p-3 hover:bg-primary-foreground hover:text-primary'>
          <span className='flex-1 my-auto'>{submission.title || "No title provided in this submission"}</span>
        </div>
      ))}



                                            {submissions.map((submission) => (
                                                    {docs.map((classroom) => 
                                                        (<div key={classroom.id} className='flex flex-row w-full h-auto p-3 hover:bg-primary-foreground hover:text-primary'>
                                                            <span className='flex-1 my-auto'>{classroom.title || "No title provided in this submission"}</span>
                                                    </div>)
                                                    )}
                                            ))}



{
                                                        if (classroom.id === submission.id) {
                                                            return (
                                                                <Link key={classroom.id} href={`submissions/edit/${classroom.id}+${user.userId}`}>
                                                                    <Button className='bg-[#FDD5B1] hover:bg-[#f78d31] text-background'>Go</Button>
                                                                </Link>
                                                            );
                                                        } else {
                                                            return (
                                                                <Button key={classroom.id} disabled className='bg-[#FDD5B1] hover:bg-[#f78d31] text-background'>
                                                                    You already submitted to this project.
                                                                </Button>
                                                            );
                                                        }
                                                    }
















































                                            {docs.map((classroom: any) => {
                                                return classroom.students.map((student: any) => {
                                                    const submissionExists = submissions.map((submission: any) => submission.userId === student);
                                                    return (
                                                        <span key={classroom.id} className="h-auto w-full p-3 flex-center">
                                                                {
                                                                    submissions.map((submission: any) => submission.userId === student  ? `Yes, you can submit a project to Classroom: ${classroom.title}`
                                                                    : `No, you cannot submit a project to Classroom: ${classroom.title}`)
                                                                }
                                                        </span>
                                                    );
                                                });
                                            })}











                                                            {submissionExists
                                                                ? `Yes, you can submit a project to Classroom: ${classroom.title}`
                                                                : `No, you cannot submit a project to Classroom: ${classroom.title}`}


{ docs.map((classroom:any) => {
    classroom.student.map((student:any) => submissions.map((submission:any) => submission.userId === student) ? <span key={classroom.id}>Yes you can submit project to Classroom:{classroom.title}</span> : <span key={classroom.id}>No you cannot submit project to  Classroom:{classroom.title}</span>)
})}



                                            {submissions.map((submission) => (
                                                <div key={submission.id} className='flex flex-row w-full h-auto p-3 hover:bg-primary-foreground hover:text-primary'>
                                                    <span className='flex-1 my-auto'>{submission.title || "No title provided in this submission"}</span>
                                                    {docs.map((classroom) => {
                                                        if (classroom.id === submission.id) {
                                                            return (
                                                                <Link key={classroom.id} href={`submissions/edit/${classroom.id}+${user.userId}`}>
                                                                    <Button className='bg-[#FDD5B1] hover:bg-[#f78d31] text-background'>Go</Button>
                                                                </Link>
                                                            );
                                                        } else {
                                                            return (
                                                                <Button key={classroom.id} disabled className='bg-[#FDD5B1] hover:bg-[#f78d31] text-background'>
                                                                    You already submitted to this project.
                                                                </Button>
                                                            );
                                                        }
                                                    })}
                                                </div>
                                            ))}



                                            {submissions.map((submission) => (
                                                <div key={submission.id} className='flex flex-row w-full h-auto p-3 hover:bg-primary-foreground hover:text-primary'>
                                                    <span className='flex-1 my-auto'>{submission.title || "No title provided in this submission"}</span>
                                                    {submission.submitted ? (
                                                        <Button disabled className='bg-[#FDD5B1] hover:bg-[#f78d31] text-background'>
                                                            You already submitted to this project.
                                                        </Button>
                                                    ) : (
                                                        <Link href={`submissions/edit/${submission.id}+${user.userId}`}>
                                                            <Button className='bg-[#FDD5B1] hover:bg-[#f78d31] text-background'>Go</Button>
                                                        </Link>
                                                    )}
                                                </div>
                                            ))}




                                            {submissions.map((submission: any) => {
docs.map((classroom:any) =>              <div key={classroom.id} className='flex flex-row w-full h-auto p-3 hover:bg-primary-foreground hover:text-primary'>
<span className='flex-1 my-auto'>{classroom.title || "No title provided in this classroom"}</span>
{
    classroom ? <Button disabled={true} className='bg-[#FDD5B1] hover:bg-[#f78d31] text-background'>You already submitted to this project.</Button> : <Link href={`submissions/edit/${classroom.id}+${user.userId}`}>
        <Button className='bg-[#FDD5B1] hover:bg-[#f78d31] text-background'>Go</Button>
    </Link>
}
</div> )


                                                );
                                            })}






                                                const classroom = docs.find((classroom: any) => submission.classroomId === classroom.id);

                                                return (
                                                    <div key={classroom.id} className='flex flex-row w-full h-auto p-3 hover:bg-primary-foreground hover:text-primary'>
                                                        <span className='flex-1 my-auto'>{classroom.title || "No title provided in this classroom"}</span>
                                                        {
                                                            classroom ? <Button disabled={true} className='bg-[#FDD5B1] hover:bg-[#f78d31] text-background'>You already submitted to this project.</Button> : <Link href={`submissions/edit/${classroom.id}+${user.userId}`}>
                                                                <Button className='bg-[#FDD5B1] hover:bg-[#f78d31] text-background'>Go</Button>
                                                            </Link>
                                                        }
                                                    </div>



                                                if (classroom) {
                                                    return (
                                                        <div key={submission.id} className='flex flex-row w-full h-auto p-3 hover:bg-primary-foreground hover:text-primary'>
                                                            <span className='flex-1 my-auto'>{classroom?.title || "No title provided in this classroom"}</span>
                                                            <Button disabled={true} className='bg-[#FDD5B1] hover:bg-[#f78d31] text-background'>You already submitted to this project.</Button>
                                                        </div>
                                                    );
                                                } else {
                                                    return (
                                                        <div key={submission.id} className='flex flex-row w-full h-auto p-3 hover:bg-primary-foreground hover:text-primary'>
                                                            <span className='flex-1 my-auto'>{classroom.title || "No title provided in this classroom"}</span>
                                                            <Link href={`submissions/edit/${classroom.id}+${user.userId}`}>
                                                                <Button className='bg-[#FDD5B1] hover:bg-[#f78d31] text-background'>Go</Button>
                                                            </Link>
                                                        </div>
                                                    );
                                                }



                                            {submissions.map((submission: any) => (
                                                <div key={submission.id} className='w-full h-auto flex flex-col rounded-md border mt-3'>
                                                    {docs.map((classroom: any) => {
                                                        if (submission.classroomId === classroom.id) {
                                                            return (
                                                                <div key={submission.id} className='flex flex-row w-full h-auto p-3 hover:bg-primary-foreground hover:text-primary'>
                                                                    <span className='flex-1 my-auto'>Yes {classroom.title || "No title provided in this classroom"}</span>
                                                                    <Link href={`submissions/edit/${classroom.id}+${user.userId}`} key={classroom.id}>
                                                                        <Button className='bg-[#FDD5B1] hover:bg-[#f78d31] text-background'>Go</Button>
                                                                    </Link>
                                                                </div>
                                                            );
                                                        } else {
                                                            return (
                                                                <div key={submission.id} className='flex flex-row w-full h-auto p-3 hover:bg-primary-foreground hover:text-primary'>
                                                                    <span className='flex-1 my-auto'>No {classroom.title || "No title provided in this classroom"}</span>
                                                                    <Link href={`submissions/edit/${classroom.id}+${user.userId}`} key={classroom.id}>
                                                                        <Button className='bg-[#FDD5B1] hover:bg-[#f78d31] text-background'>Nothing To Do</Button>
                                                                    </Link>
                                                                </div>
                                                            );
                                                        }
                                                        return null;
                                                    })}
                                                </div>
                                            ))}






                                                    {docs.every((classroom: any) => submission.classroomId !== classroom.id) && (
                                                        <span className='flex-center w-full hover:bg-primary-foreground hover:text-primary hover:rounded-md border min-h-[250px]'>No classrooms are available for submission.</span>
                                                    )}


                                                            return (<span key={submission.id} className='flex-center w-full hover:bg-primary-foreground hover:text-primary hover:rounded-md border min-h-[250px]'>No classrooms are available for submission.</span>);



# Starting New Cleanup:
import { useDropdownStore } from "@/lib/store/dropdown";
import { useUniversityImages } from "@/lib/store/university-images"


                                                                    {/* 
                                                                    saif
                                                                    
                                                                    <Input
                                                                        value={user.password}
                                                                        disabled={true}
                                                                        required
                                                                        type={isVisiblePassword ? "text" : "password"}
                                                                        id={user.id}
                                                                        className="!w-auto text-right rounded-md !border-none text-muted-foreground"
                                                                    />
                                                                    <div
                                                                        onClick={togglePasswordVisibility}
                                                                        className=""
                                                                    >
                                                                        {isVisiblePassword ? (
                                                                            <Eye className="h-5 w-5 text-muted-foreground hover:text-primary" />
                                                                        ) : (
                                                                            <EyeOff className="h-5 w-5 text-muted-foreground hover:text-primary" />
                                                                        )}
                                                                    </div> */}



                                                                        // alert(!USERNAME_VERIFICATION)
                                                                        // alert(PASSWORD_VERIFICATION)



                                                                        // asif



                                                                        

                                                                            // alert(`Created: ${username} ${password}`);

                                                                            // setAUTOMATICALLY_CREATED_STUDENTS((prevDocs: any) => [...prevDocs, {
                                                                            //     username: username,
                                                                            //     password: password,
                                                                            // }])






                                                                            













                                                                            // toast({
                                                                            //     title: "Processing...",
                                                                            //     description: <div>
                                                                            //         {
                                                                            //             automaticallyRestrictedStudents.length === 0 ? <div className='flex flex-col gap-3'> <span className='w-full leading-tight font-mono'>All students will be created!</span> <span className='bg-rose-500 w-full leading-tight font-bold p-1.5 rounded-md'>Except those who have already used usernames or have weak passwords.</span></div> :
                                                                            //                 <div className='gap-3'>
                                                                            //                     <span>There are some problems with you csv file</span>
                                                                            //                     <span>This csv file student's usernames is not available or have weak password</span>
                                                                            //                     <ScrollArea className="h-[450px] w-full rounded-md border p-1 pt-0">
                                                                            //                         <div className="w-full h-auto rounded-md p-3">
                                                                            //                             <div className="w-full flex flex-row space-x-3 justify-between items-center text-sm font-mono py-3 px-3 border-b">
                                                                            //                                 <span>Username</span>
                                                                            //                                 <span>Password</span>
                                                                            //                             </div>
                                                                            //                             {
                                                                            //                                 automaticallyRestrictedStudents.map((user: any) =>
                                                                            //                                     <div key={user.username} className="hover:bg-primary hover:text-primary-foreground w-full flex flex-row space-x-3 justify-between items-center text-sm font-mono p-3">
                                                                            //                                         <span>{user.username}</span>
                                                                            //                                         <span>{user.password}</span>
                                                                            //                                     </div>
                                                                            //                                 )
                                                                            //                             }
                                                                            //                         </div>
                                                                            //                     </ScrollArea>
                                                                            //                 </div>
                                                                            //         }
                                                                            //     </div>,
                                                                            // });






                                                                            
                                                                            // automaticallyRestrictedStudents.map((student) => student.username === username ? null :
                                                                            //     setAutomaticallyRestrictedStudents(prevDocs => [...prevDocs, {
                                                                            //         username: username,
                                                                            //         password: password,
                                                                            //     }]))



                                                                            // alert(`Rejected: ${username} ${password}`);






                                                                    // toast({
                                                                    //     title: "Processing...",
                                                                    //     description: <div>
                                                                    //         {
                                                                    //             automaticallyRestrictedStudents.length === 0 && <div className='flex flex-col gap-3'> <span className='w-full leading-tight font-mono'>All students will be created!</span> <span className='bg-rose-500 w-full leading-tight font-bold p-1.5 rounded-md'>Except those who's usernames are not available or or those who have weak passwords.</span></div>
                                                                    // <div className='gap-3'>
                                                                    //     <span>There are some problems with you csv file</span>
                                                                    //     <span>This csv file student's usernames is not available or have weak password</span>
                                                                    //     <ScrollArea className="h-[200px] w-full rounded-md border p-1 pt-0">
                                                                    //         <div className="w-full h-auto rounded-md p-3">
                                                                    //             <div className="w-full flex flex-row space-x-3 justify-between items-center text-sm font-mono py-3 px-3 border-b">
                                                                    //                 <span>Username</span>
                                                                    //                 <span>Password</span>
                                                                    //             </div>
                                                                    //             {
                                                                    //                 automaticallyRestrictedStudents.map((user: any) =>
                                                                    //                     <div key={user} className="hover:bg-primary hover:text-primary-foreground w-full flex flex-row space-x-3 justify-between items-center text-sm font-mono p-3">
                                                                    //                         <span>{user.username}</span>
                                                                    //                         <span>{user.password}</span>
                                                                    //                     </div>
                                                                    //                 )
                                                                    //             }
                                                                    //         </div>
                                                                    //     </ScrollArea>
                                                                    // </div>
                                                                    //         }
                                                                    //     </div>,
                                                                    // });






                                                                    
                                                                    // alert(JSON.stringify(AUTOMATICALLY_CREATED_STUDENTS))
                                                                    // alert(JSON.stringify(AUTOMATICALLY_RESTRIGTED_STUDENTS))


                                                                    // toast({
                                                                    //     title: "2nd Processing...",
                                                                    //     description: <div>
                                                                    //         {
                                                                    //             automaticallyRestrictedStudents.length === 0 ? <span>All students will be created!</span> :
                                                                    //                 <div className='gap-3'>
                                                                    //                     <span>There are some problems with you csv file</span>
                                                                    //                     <span>This csv file student's usernames is not available or have weak password</span>
                                                                    //                     <ScrollArea className="h-[450px] w-full rounded-md border p-1 pt-0">
                                                                    //                         <div className="w-full h-auto rounded-md p-3">
                                                                    //                             <div className="w-full flex flex-row space-x-3 justify-between items-center text-sm font-mono py-3 px-3 border-b">
                                                                    //                                 <span>Username</span>
                                                                    //                                 <span>Password</span>
                                                                    //                             </div>
                                                                    //                             {
                                                                    //                                 automaticallyRestrictedStudents.map((user: any) =>
                                                                    //                                     <div key={user.username} className="hover:bg-primary hover:text-primary-foreground w-full flex flex-row space-x-3 justify-between items-center text-sm font-mono p-3">
                                                                    //                                         <span>{user.username}</span>
                                                                    //                                         <span>{user.password}</span>
                                                                    //                                     </div>
                                                                    //                                 )
                                                                    //                             }
                                                                    //                         </div>
                                                                    //                     </ScrollArea>
                                                                    //                 </div>
                                                                    //         }
                                                                    //     </div>,
                                                                    // });






                                                                    // setAutomaticallyRestrictedStudents([]);







                                        {/* <Button onClick={() => {
                                            alert(JSON.stringify(AUTOMATICALLY_CREATED_STUDENTS))
                                            alert(JSON.stringify(AUTOMATICALLY_RESTRIGTED_STUDENTS))
                                        }}>View Automatically Managed Students</Button> */}







                                                                                                // else{
                                                                                                //     return (
                                                                                                // <div key={user.id} className="flex-center h-full hover:bg-primary hover:text-primary-foreground w-full flex flex-row space-x-3 justify-between items-center text-sm font-mono p-3">
                                                                                                //     <span>No Students Found!</span>
                                                                                                // </div>
                                                                                                //     );
                                                                                                // }







                                                                                                  {/* <ScrollArea className="h-[450px] w-full rounded-md border p-1">
                                                                    <Card className="w-full max-w-md border-0">
                                                                        <CardHeader>
                                                                            <CardTitle>Create New Classroom</CardTitle>
                                                                            <CardDescription>Enter the classroom details to add them to the system.</CardDescription>
                                                                        </CardHeader>
                                                                        <CardContent className="space-y-4">
                                                                            <div className="space-y-2">
                                                                                <Label htmlFor="title">Title</Label>
                                                                                <Input onChange={(e: any) => setTitle(e.target.value)} id="title" placeholder="Enter Title" />
                                                                            </div>
                                                                            <div className="space-y-2">
                                                                                <Label htmlFor="thumbnail">Thumbnail</Label>
                                                                                <Input onChange={(e: any) => setThumbnail(e.target.value)} id="thumbnail" placeholder="Enter Thumbnail Link" />
                                                                            </div>
                                                                            <div className="space-y-2">
                                                                                <Label htmlFor="description">Description</Label>
                                                                                <Textarea onChange={(e: any) => setDescription(e.target.value)} id="description" placeholder="Enter Description" />
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
                                                                                        </div>)
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        </CardContent>
                                                                    </Card>
                                                                </ScrollArea>
                                                                <Button onClick={async () => {
                                                                    await addDoc(collection(db, "classrooms"), {
                                                                        userId: auth.currentUser && auth.currentUser.uid,
                                                                        title: title,
                                                                        thumbnail: thumbnail,
                                                                        description: description,
                                                                        students: students.map((student) => student.id),
                                                                        time: date.format(new Date(), 'YYYY/MM/DD HH:mm:ss [GMT]Z', true),
                                                                    })
                                                                    toast({
                                                                        title: "Classroom Created Successfully!",
                                                                        description: `Students can now submit projects in this classroom.`,
                                                                    });
                                                                    setAddClassroomMenu(!addClassroomMenu);
                                                                    fetchDocs();
                                                                }} className="w-full">Create Classroom</Button> */}







                                                                                        {/* sabbir */}








                                                                                                                        // setPOPOVER_OPEN(false);






                                                                                            {/* {
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
                                                                                } */}





                                                                                
                                {/* {
                                    docs.map((items: any) => {
                                        if (items.userId !== user.userId) {
                                            return (
                                                <div className="flex-center w-full min-h-[70vh]" key={items.id}>
                                                    <CircleOff className="h-4 w-4 mr-2" />
                                                    No Classrooms Found!
                                                </div>
                                            );
                                        }
                                        return null; // Return null for other cases
                                    })
                                } */}









                                {/* {docs.map((classroom) => classroom.userId === user.userId) ? (
                                    null
                                ) : (
                                    <div className="flex-center w-full min-h-[70vh]">
                                        <CircleOff className="h-4 w-4 mr-2" />
                                        No Classrooms Found!
                                    </div>
                                )} */}

                                {/* {docs.map((classrooms) => classrooms.student.some((student:any) => student === user.id)).length === 0 && <div className="flex-center w-full min-h-[70vh]">
                                    <CircleOff className="h-4 w-4 mr-2" />No Classrooms Found!
                                </div>} */}
                                {/* {docs.length >= 8 && <Button variant={'outline'} className="w-full mt-5" onClick={loadMoreClassrooms} disabled={loading}>
                                    Load More Classrooms
                                </Button>} */}



