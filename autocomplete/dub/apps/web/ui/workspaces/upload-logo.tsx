"use client";

import useWorkspace from "@/lib/swr/use-workspace";
import { Button } from "@dub/ui";
import { UploadCloud } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { mutate } from "swr";

export default function UploadLogo() {
  const { id, logo, isOwner } = useWorkspace();

  const [image, setImage] = useState<string | null>();

  useEffect(() => {
    setImage(logo || null);
  }, [logo]);

  const [dragActive, setDragActive] = useState(false);

  const onChangePicture = useCallback(
    (e) => {
      const file = e.target.files[0];
      if (file) {
        if (file.size / 1024 / 1024 > 2) {
          toast.error("File size too big (max 2MB)");
        } else if (file.type !== "image/png" && file.type !== "image/jpeg") {
          toast.error("File type not supported (.png or .jpg only)");
        } else {
          const reader = new FileReader();
          reader.onload = (e) => {
            setImage(e.target?.result as string);
          };
          reader.readAsDataURL(file);
        }
      }
    },
    [setImage],
  );

  const [uploading, setUploading] = useState(false);

  return (
    <form
      onSubmit={async (e) => {
        setUploading(true);
        e.preventDefault();
        fetch(`/api/workspaces/${id}/logo`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ image }),
        }).then(async (res) => {
          if (res.status === 200) {
            await Promise.all([
              mutate("/api/workspaces"),
              mutate(`/api/workspaces/${id}`),
            ]);
            toast.success("Succesfully uploaded workspace logo!");
          } else {
            const { error } = await res.json();
            toast.error(error.message);
          }
          setUploading(false);
        });
      }}
      className="rounded-lg border border-gray-200 bg-white"
    >
      <div className="flex flex-col space-y-3 p-5 sm:p-10">
        <h2 className="text-xl font-medium">Workspace Logo</h2>
        <p className="text-sm text-gray-500">
          This is your workspace's logo on {process.env.NEXT_PUBLIC_APP_NAME}
        </p>
        <div>
          <label
            htmlFor="image"
            className="group relative mt-1 flex h-24 w-24 cursor-pointer flex-col items-center justify-center rounded-full border border-gray-300 bg-white shadow-sm transition-all hover:bg-gray-50"
          >
            <div
              className="absolute z-[5] h-full w-full rounded-full"
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setDragActive(true);
              }}
              onDragEnter={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setDragActive(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setDragActive(false);
              }}
              onDrop={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setDragActive(false);
                const file = e.dataTransfer.files && e.dataTransfer.files[0];
                if (file) {
                  if (file.size / 1024 / 1024 > 2) {
                    toast.error("File size too big (max 2MB)");
                  } else if (
                    file.type !== "image/png" &&
                    file.type !== "image/jpeg"
                  ) {
                    toast.error("File type not supported (.png or .jpg only)");
                  } else {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                      setImage(e.target?.result as string);
                    };
                    reader.readAsDataURL(file);
                  }
                }
              }}
            />
            <div
              className={`${
                dragActive
                  ? "cursor-copy border-2 border-black bg-gray-50 opacity-100"
                  : ""
              } absolute z-[3] flex h-full w-full flex-col items-center justify-center rounded-full bg-white transition-all ${
                image
                  ? "opacity-0 group-hover:opacity-100"
                  : "group-hover:bg-gray-50"
              }`}
            >
              <UploadCloud
                className={`${
                  dragActive ? "scale-110" : "scale-100"
                } h-5 w-5 text-gray-500 transition-all duration-75 group-hover:scale-110 group-active:scale-95`}
              />
            </div>
            {image && (
              <img
                src={image}
                alt="Preview"
                className="h-full w-full rounded-full object-cover"
              />
            )}
          </label>
          <div className="mt-1 flex rounded-full shadow-sm">
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={onChangePicture}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between space-x-4 rounded-b-lg border-t border-gray-200 bg-gray-50 p-3 sm:px-10">
        <p className="text-sm text-gray-500">
          Square image recommended. Accepted file types: .png, .jpg. Max file
          size: 2MB.
        </p>
        <div className="shrink-0">
          <Button
            text="Save changes"
            loading={uploading}
            disabled={!isOwner || !image || logo === image}
            {...(!isOwner && {
              disabledTooltip:
                "Only workspace owners can change the workspace logo.",
            })}
          />
        </div>
      </div>
    </form>
  );
}
