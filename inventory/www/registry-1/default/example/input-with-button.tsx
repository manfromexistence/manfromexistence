import { Button } from '@/registry-1/default/ui/button';
import { Input } from '@/registry-1/default/ui/input';

export default function InputWithButton() {
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="email" placeholder="Email" />
      <Button type="submit">Subscribe</Button>
    </div>
  );
}
