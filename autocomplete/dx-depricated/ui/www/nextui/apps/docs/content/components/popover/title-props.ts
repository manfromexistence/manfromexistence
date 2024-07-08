const App = `import {Popover, PopoverTrigger, PopoverContent, Button} from "@nextui-org/react";

export default function App() {
  return (
    <Popover placement="right">
      <PopoverTrigger>
        <Button>Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        {(titleProps) => (
          <div className="px-1 py-2">
            <h3 className="text-small font-bold" {...titleProps}>
              Popover Content
            </h3>
            <div className="text-tiny">This is the popover content</div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
