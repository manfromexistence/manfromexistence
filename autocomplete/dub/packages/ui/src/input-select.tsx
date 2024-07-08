import { cn } from "@dub/utils";
import { Command, useCommandState } from "cmdk";
import { Check, ChevronDown, Search, X } from "lucide-react";
import {
  Dispatch,
  InputHTMLAttributes,
  ReactNode,
  SetStateAction,
  memo,
  useEffect,
  useRef,
  useState,
} from "react";
import { Drawer } from "vaul";
import { Badge } from "./badge";
import { BlurImage } from "./blur-image";
import { useMediaQuery } from "./hooks";

export interface InputSelectItemProps {
  id: string;
  value: string;
  color?: string;
  image?: string;
  disabled?: boolean;
  label?: string;
}

export function InputSelect({
  items,
  selectedItem,
  setSelectedItem,
  className,
  disabled,
  adjustForMobile,
  icon,
  inputAttrs,
  noItemsElement,
}: {
  items: InputSelectItemProps[] | [];
  selectedItem: InputSelectItemProps | null;
  setSelectedItem: Dispatch<SetStateAction<InputSelectItemProps | null>>;
  className?: string;
  disabled?: boolean;
  adjustForMobile?: boolean;
  icon?: ReactNode;
  inputAttrs?: InputHTMLAttributes<HTMLInputElement>;
  noItemsElement?: ReactNode;
}) {
  const commandRef = useRef<HTMLDivElement | null>(null);
  const [openCommandList, setOpenCommandList] = useState(false);
  const [inputValue, setInputValue] = useState(selectedItem?.value || "");

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        commandRef.current &&
        !commandRef.current.contains(e.target as Node)
      ) {
        setOpenCommandList(false);
      }
    };
    if (openCommandList) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [commandRef, openCommandList]);

  // hacks the input value to be empty when the selectedItem is empty
  useEffect(() => {
    if (!selectedItem?.value) {
      setInputValue("");
    }
  }, [selectedItem?.value]);

  const { isMobile } = useMediaQuery();

  const CommandInput = memo(() => {
    const isEmpty = useCommandState((state: any) => state.filtered.count === 0);

    return (
      <Command.Input
        placeholder={inputAttrs?.placeholder || "Search..."}
        // hacky focus on the input when the dropdown opens
        autoFocus={openCommandList}
        onFocus={() => setOpenCommandList(true)}
        value={inputValue}
        onValueChange={setInputValue}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            e.preventDefault();
            setOpenCommandList(false);
            // listen for cases where empty results and enter is pressed
          } else if (e.key === "Enter" && isEmpty) {
            setOpenCommandList(false);
            // if it's a letter or a number and there's no meta key pressed, openCommandList dropdown
          } else if (e.key.match(/^[a-z0-9]$/i) && !e.metaKey) {
            setOpenCommandList(true);
          }
        }}
        disabled={disabled}
        className="block w-full truncate rounded-md border-none px-0 text-base text-gray-900 placeholder-gray-400 outline-none outline-0 transition-all duration-300 focus:ring-0 md:text-sm"
      />
    );
  });

  const CloseButton = () => (
    <button
      onClick={() => {
        setSelectedItem(null);
        setInputValue("");
      }}
      className="absolute inset-y-0 right-0 my-auto"
    >
      <X className="h-7 w-7 pr-3 text-gray-400" />
    </button>
  );

  // renders a reusable list of items
  const SelectorList = () =>
    items.map((item) => (
      <Command.Item
        key={item.id}
        value={item.value}
        disabled={item.disabled}
        onSelect={() => {
          setSelectedItem(item);
          setInputValue(item.value);
          setOpenCommandList(false);
        }}
        className="group flex cursor-pointer items-center justify-between rounded-md px-4 py-2 text-sm text-gray-900 hover:bg-gray-100 hover:text-gray-900 active:bg-gray-200 aria-disabled:cursor-not-allowed aria-disabled:opacity-75 aria-disabled:hover:bg-white aria-selected:bg-gray-100 aria-selected:text-gray-900"
      >
        <div className="flex items-center space-x-2">
          {item.image && (
            <BlurImage
              src={item.image}
              alt={item.value}
              className="h-4 w-4 rounded-full"
              width={16}
              height={16}
            />
          )}
          <p
            className={cn(
              "whitespace-nowrap py-0.5 text-sm",
              item.color && "rounded-md px-2",
              item.color === "red" && "bg-red-100 text-red-600",
              item.color === "yellow" && "bg-yellow-100 text-yellow-600",
              item.color === "green" && "bg-green-100 text-green-600",
              item.color === "blue" && "bg-blue-100 text-blue-600",
              item.color === "purple" && "bg-purple-100 text-purple-600",
              item.color === "brown" && "bg-brown-100 text-brown-600",
            )}
          >
            {item.value}
          </p>
          {item.label && (
            <Badge className="text-xs" variant="neutral">
              {item.label}
            </Badge>
          )}
        </div>

        <Check className="invisible h-5 w-5 text-gray-500 aria-selected:visible" />
      </Command.Item>
    ));

  // when adjustForMobile is true, render the input as a drawer
  if (isMobile && adjustForMobile) {
    return (
      <Drawer.Root open={openCommandList} onOpenChange={setOpenCommandList}>
        <Drawer.Trigger className="sm:hidden" asChild>
          <Command ref={commandRef} className="relative" loop>
            <div
              className={cn(
                "group relative rounded-md border border-gray-300 bg-white px-1 focus-within:border-gray-500 focus-within:ring-1 focus-within:ring-gray-500 md:min-w-[140px]",
                className,
              )}
            >
              <div className="absolute inset-y-0 left-0 flex items-center justify-center pl-3 text-gray-400">
                {selectedItem && selectedItem.image ? (
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.value}
                    className="h-4 w-4 rounded-full"
                  />
                ) : (
                  icon || <Search className="h-4 w-4 text-gray-400" />
                )}
              </div>
              <div className="flex h-10 px-8">
                <CommandInput />
                {inputValue || selectedItem?.value !== "" ? (
                  <CloseButton />
                ) : (
                  <ChevronDown className="absolute inset-y-0 right-0 my-auto h-7 w-7 pr-3 text-gray-400 transition-all" />
                )}
              </div>
            </div>
          </Command>
        </Drawer.Trigger>
        <Drawer.Overlay className="fixed inset-0 z-40 bg-gray-100 bg-opacity-10 backdrop-blur" />
        <Drawer.Portal>
          <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 mt-24 rounded-t-lg border-t border-gray-200 bg-white">
            <Command ref={commandRef} className="relative" loop>
              <div
                className={cn(
                  "group relative mb-2 rounded-t-md border-b border-gray-300 bg-white p-1 sm:border sm:py-0 sm:focus-within:border-gray-500 sm:focus-within:ring-1 sm:focus-within:ring-gray-200",
                  className,
                )}
              >
                <div className="absolute inset-y-0 left-0 flex items-center justify-center pl-3 text-gray-400">
                  {selectedItem && selectedItem.image ? (
                    <img
                      src={selectedItem.image}
                      alt={selectedItem.value}
                      className="h-4 w-4 rounded-full"
                    />
                  ) : (
                    icon || <Search className="h-4 w-4 text-gray-400" />
                  )}
                </div>
                <div className="flex h-10 px-8">
                  <CommandInput />
                  {inputValue || selectedItem?.value !== "" ? (
                    <CloseButton />
                  ) : (
                    <ChevronDown className="absolute inset-y-0 right-0 my-auto h-7 w-7 rotate-180 pl-3 text-gray-400 transition-all" />
                  )}
                </div>
              </div>
              {openCommandList && (
                <Command.List className="dub-scrollbar h-[70vh] overflow-y-auto p-2">
                  {items.length === 0 &&
                    inputValue === "" &&
                    (noItemsElement ? (
                      <div>{noItemsElement}</div>
                    ) : (
                      <p className="px-4 py-2 text-sm text-gray-600">
                        No items found.
                      </p>
                    ))}
                  {inputValue !== "" && (
                    <Command.Empty className="px-4 py-2 text-sm text-gray-600">
                      No results found.
                    </Command.Empty>
                  )}
                  <SelectorList />
                </Command.List>
              )}
            </Command>
          </Drawer.Content>
          <Drawer.Overlay />
        </Drawer.Portal>
      </Drawer.Root>
    );
  }

  return (
    <Command ref={commandRef} className="relative" loop>
      <div
        className={cn(
          "group rounded-md border border-gray-200 bg-white px-1 transition-all focus-within:border-gray-500 focus-within:ring-4 focus-within:ring-gray-200",
          className,
        )}
      >
        <div
          onClick={() => setOpenCommandList((prev) => !prev)}
          className="absolute inset-y-0 left-0 flex cursor-pointer items-center justify-center pl-3 text-gray-400"
        >
          {selectedItem && selectedItem.image ? (
            <img
              src={selectedItem.image}
              alt={selectedItem.value}
              className="h-4 w-4 rounded-full"
            />
          ) : (
            icon || <Search className="h-4 w-4 text-gray-400" />
          )}
        </div>
        <div className="flex h-10 px-8">
          <CommandInput />
          {inputValue || selectedItem?.value !== "" ? (
            <CloseButton />
          ) : (
            <ChevronDown
              onClick={() => setOpenCommandList((prev) => !prev)}
              className={`absolute inset-y-0 right-0 my-auto mr-3 h-4 w-4 cursor-pointer text-gray-400 transition-all ${
                openCommandList && "rotate-180"
              }`}
            />
          )}
        </div>
      </div>
      {openCommandList && (
        <Command.List className="dub-scrollbar absolute z-20 mt-2 h-[calc(var(--cmdk-list-height)+17px)] max-h-[300px] w-full min-w-[160px] overflow-auto rounded-md border border-gray-200 bg-white p-2 shadow-md transition-all duration-75">
          {items.length === 0 &&
            inputValue === "" &&
            (noItemsElement ? (
              <div>{noItemsElement}</div>
            ) : (
              <p className="px-4 py-2 text-sm text-gray-600">No items found.</p>
            ))}
          {inputValue !== "" && (
            <Command.Empty className="px-4 py-2 text-sm text-gray-600">
              No results found.
            </Command.Empty>
          )}
          <SelectorList />
        </Command.List>
      )}
    </Command>
  );
}
