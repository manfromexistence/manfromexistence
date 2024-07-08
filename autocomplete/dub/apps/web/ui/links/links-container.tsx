"use client";

import useLinks from "@/lib/swr/use-links";
import useLinksCount from "@/lib/swr/use-links-count";
import { MaxWidthWrapper } from "@dub/ui";
import { Suspense, useRef } from "react";
import { useLinkFiltersModal } from "../modals/link-filters-modal";
import LinkCard from "./link-card";
import LinkCardPlaceholder from "./link-card-placeholder";
import LinkFilters, { SearchBox } from "./link-filters";
import LinkPagination from "./link-pagination";
import LinkSort from "./link-sort";
import NoLinksPlaceholder from "./no-links-placeholder";

export default function LinksContainer({
  AddEditLinkButton,
}: {
  AddEditLinkButton: () => JSX.Element;
}) {
  const { links, isValidating } = useLinks();
  const { data: count } = useLinksCount();
  const { LinkFiltersButton, LinkFiltersModal } = useLinkFiltersModal();
  const searchInputRef = useRef();

  return (
    <>
      <LinkFiltersModal />
      <MaxWidthWrapper className="flex flex-col space-y-3 py-3">
        <div className="flex h-10 w-full justify-center lg:justify-end">
          <LinkFiltersButton />
          <Suspense>
            <LinkSort />
          </Suspense>
        </div>
        <div className="block lg:hidden">
          <SearchBox searchInputRef={searchInputRef} />
        </div>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-7">
          <div className="scrollbar-hide sticky top-32 col-span-2 hidden max-h-[calc(100vh-150px)] self-start overflow-auto rounded-lg border border-gray-100 bg-white shadow lg:block">
            <Suspense>
              <LinkFilters />
            </Suspense>
          </div>
          <div className="col-span-1 auto-rows-min grid-cols-1 lg:col-span-5">
            <ul className="grid min-h-[66.5vh] auto-rows-min gap-3">
              {links && !isValidating ? (
                links.length > 0 ? (
                  links.map((props) => (
                    <Suspense key={props.id} fallback={<LinkCardPlaceholder />}>
                      <LinkCard props={props} />
                    </Suspense>
                  ))
                ) : (
                  <NoLinksPlaceholder AddEditLinkButton={AddEditLinkButton} />
                )
              ) : (
                Array.from({ length: 10 }).map((_, i) => (
                  <LinkCardPlaceholder key={i} />
                ))
              )}
            </ul>
            {count && count > 0 ? (
              <Suspense>
                <LinkPagination />
              </Suspense>
            ) : null}
          </div>
        </div>
      </MaxWidthWrapper>
    </>
  );
}
