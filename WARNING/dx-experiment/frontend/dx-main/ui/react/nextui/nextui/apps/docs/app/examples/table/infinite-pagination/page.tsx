"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Spinner,
} from "@nextui-org/react";
import {useAsyncList} from "@react-stately/data";
import {useInfiniteScroll} from "@nextui-org/use-infinite-scroll";
import {useState} from "react";

type SWCharacter = {
  name: string;
  height: string;
  mass: string;
  birth_year: string;
};

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);

  let list = useAsyncList<SWCharacter>({
    async load({signal, cursor}) {
      if (cursor) {
        setIsLoading(false);
      }
      // If no cursor is available, then we're loading the first page.
      // Otherwise, the cursor is the next URL to load, as returned from the previous page.
      const res = await fetch(cursor || "https://swapi.py4e.com/api/people/?search=", {signal});
      let json = await res.json();

      setHasMore(json.next !== null);

      return {
        items: json.results,
        cursor: json.next,
      };
    },
  });

  const [loaderRef, scrollerRef] = useInfiniteScroll({hasMore, onLoadMore: list.loadMore});

  return (
    <div className="p-6">
      <Table
        isHeaderSticky
        aria-label="Example table with infinite pagination"
        baseRef={scrollerRef}
        bottomContent={
          hasMore ? (
            <div className="flex w-full justify-center">
              <Spinner ref={loaderRef} color="white" />
            </div>
          ) : null
        }
        classNames={{
          base: "max-h-[520px] overflow-scroll",
          table: "min-h-[400px]",
        }}
      >
        <TableHeader>
          <TableColumn key="name">Name</TableColumn>
          <TableColumn key="height">Height</TableColumn>
          <TableColumn key="mass">Mass</TableColumn>
          <TableColumn key="birth_year">Birth year</TableColumn>
        </TableHeader>
        <TableBody
          isLoading={isLoading}
          items={list.items}
          loadingContent={<Spinner color="white" />}
        >
          {(item) => (
            <TableRow key={item.name}>
              {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
