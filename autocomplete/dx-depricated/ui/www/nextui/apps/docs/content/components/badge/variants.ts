const App = `import {Badge, Avatar} from "@nextui-org/react";

export default function App() {
  return (
    <div className="flex gap-3 items-center">
      <Badge content="5" color="warning" variant="solid">
        <Avatar
          radius="md"
          src="https://i.pravatar.cc/150?u=a042f81f4e29026024d"
        />
      </Badge>
      <Badge content="5" color="warning" variant="flat">
        <Avatar
          radius="md"
          src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
        />
      </Badge>
      <Badge content="5" color="warning" variant="faded">
        <Avatar
          radius="md"
          src="https://i.pravatar.cc/150?u=a04258114e29026708c"
        />
      </Badge>
      <Badge content="5" color="warning" variant="shadow">
        <Avatar
          radius="md"
          src="https://i.pravatar.cc/150?u=a04258114e29026302d"
        />
      </Badge>
    </div>
  );
}`;

const react = {
  "/App.jsx": App,
};

export default {
  ...react,
};
