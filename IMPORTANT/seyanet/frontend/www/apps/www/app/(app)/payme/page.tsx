
export default function PayMe() {
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center">
            <div className="w-auto rounded-md border">
                <div className="grid w-full grid-cols-2 items-center justify-start border-t p-4 last:border-b">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Email</div>
                    <div className="text-right text-sm">manfromearth25@gmail.com</div>
                </div>
                <div className="grid w-full grid-cols-2 items-center justify-start border-t p-4 last:border-b">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Pet Name</div>
                    <div className="text-right text-sm">manofexistence</div>
                </div>
                <div className="grid w-full grid-cols-2 items-center justify-start border-t p-4 last:border-b">
                    <div className="text-sm text-gray-500 dark:text-gray-400">First Name</div>
                    <div className="text-right text-sm">Erany</div>
                </div>
                <div className="grid w-full grid-cols-2 items-center justify-start border-t p-4 last:border-b">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Last Name</div>
                    <div className="text-right text-sm">Begum</div>
                </div>
            </div>
        </div>

    )
}
