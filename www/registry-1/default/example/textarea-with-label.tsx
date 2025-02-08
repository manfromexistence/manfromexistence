import { Label } from '@/registry-1/default/ui/label';
import { Textarea } from '@/registry-1/default/ui/textarea';

export default function TextareaWithLabel() {
  return (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="message">Your message</Label>
      <Textarea placeholder="Type your message here." id="message" />
    </div>
  );
}
