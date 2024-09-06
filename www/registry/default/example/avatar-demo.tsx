import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/registry/default/ui/avatar';

export default function AvatarDemo() {
  return (
    <Avatar>
      <AvatarImage
        src="https://github.com/manfromexistence.png"
        alt="@manfromexistence"
      />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
