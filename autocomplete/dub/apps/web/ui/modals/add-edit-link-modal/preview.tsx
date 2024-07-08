import { isStored } from "@/lib/storage";
import { LinkProps } from "@/lib/types";
import {
  BlurImage,
  Facebook,
  LinkedIn,
  LoadingCircle,
  Photo,
  Twitter,
} from "@dub/ui";
import { getDomainWithoutWWW } from "@dub/utils";
import { useMemo } from "react";
import { useDebounce } from "use-debounce";

export default function Preview({
  data,
  generatingMetatags,
}: {
  data: LinkProps;
  generatingMetatags: boolean;
}) {
  const { title, description, image, url, password } = data;
  const [debouncedUrl] = useDebounce(url, 500);
  const hostname = useMemo(() => {
    if (password) return "dub.co";
    return getDomainWithoutWWW(debouncedUrl);
  }, [password, debouncedUrl]);

  const previewImage = useMemo(() => {
    if (generatingMetatags) {
      return (
        <div className="flex h-[250px] w-full flex-col items-center justify-center space-y-4 bg-gray-100">
          <LoadingCircle />
        </div>
      );
    }
    if (image) {
      if (isStored(image)) {
        return (
          <BlurImage
            src={image}
            alt="Preview"
            width={1200}
            height={627}
            className="h-[250px] w-full object-cover"
          />
        );
      } else {
        return (
          <img
            src={image}
            alt="Preview"
            className="h-[250px] w-full object-cover"
          />
        );
      }
    } else {
      return (
        <div className="flex h-[250px] w-full flex-col items-center justify-center space-y-4 bg-gray-100">
          <Photo className="h-8 w-8 text-gray-400" />
          <p className="text-sm text-gray-400">
            Enter a link to generate a preview.
          </p>
        </div>
      );
    }
  }, [image, generatingMetatags]);

  return (
    <div>
      <div className="sticky top-0 z-10 flex h-14 items-center justify-center border-b border-gray-200 bg-white px-5 sm:h-24">
        <h2 className="text-lg font-medium">Social Previews</h2>
      </div>
      <div className="grid gap-5 p-5">
        {/* Twitter */}
        <div>
          <div className="relative mb-2">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center">
              <div className="flex items-center space-x-2 bg-white px-3">
                <Twitter className="h-3 w-3" />
                <p className="text-sm text-gray-400">Twitter</p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-gray-300">
            {previewImage}
            {title && (
              <div className="absolute bottom-2 left-2 rounded-md bg-[#414142] px-1.5 py-px">
                <h3 className="max-w-sm truncate text-sm text-white">
                  {title}
                </h3>
              </div>
            )}
          </div>
          {hostname && (
            <p className="mt-2 text-[0.8rem] text-[#606770]">{hostname}</p>
          )}
        </div>

        {/* Facebook */}
        <div>
          <div className="relative mb-2">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center">
              <div className="flex items-center space-x-2 bg-white px-3">
                <Facebook className="h-4 w-4" />
                <p className="text-sm text-gray-400">Facebook</p>
              </div>
            </div>
          </div>
          <div className="border border-gray-300">
            {previewImage}
            <div className="grid gap-1 border-t border-gray-300 bg-[#f2f3f5] p-3">
              {hostname ? (
                <p className="text-[0.8rem] uppercase text-[#606770]">
                  {hostname}
                </p>
              ) : (
                <div className="mb-1 h-4 w-24 rounded-md bg-gray-200" />
              )}
              {title ? (
                <h3 className="truncate font-semibold text-[#1d2129]">
                  {title}
                </h3>
              ) : (
                <div className="mb-1 h-5 w-full rounded-md bg-gray-200" />
              )}
              {description ? (
                <p className="line-clamp-2 text-sm text-[#606770]">
                  {description}
                </p>
              ) : (
                <div className="grid gap-2">
                  <div className="h-4 w-full rounded-md bg-gray-200" />
                  <div className="h-4 w-48 rounded-md bg-gray-200" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* LinkedIn */}
        <div>
          <div className="relative mb-2">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center">
              <div className="flex items-center space-x-2 bg-white px-3">
                <LinkedIn className="h-4 w-4 text-[#0077b5]" />
                <p className="text-sm text-gray-400">LinkedIn</p>
              </div>
            </div>
          </div>
          <div className="overflow-hidden rounded-[2px] shadow-[0_0_0_1px_rgba(0,0,0,0.15),0_2px_3px_rgba(0,0,0,0.2)]">
            {previewImage}
            <div className="grid gap-1 border-t border-gray-300 bg-white p-3">
              {title ? (
                <h3 className="truncate font-semibold text-[#000000E6]">
                  {title}
                </h3>
              ) : (
                <div className="mb-1 h-5 w-full rounded-md bg-gray-200" />
              )}
              {hostname ? (
                <p className="text-xs text-[#00000099]">{hostname}</p>
              ) : (
                <div className="mb-1 h-4 w-24 rounded-md bg-gray-200" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
