'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/registry/new-york/ui/card';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/registry/new-york/ui/table';
import { Label } from '@/registry/new-york/ui/label';
import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/registry/new-york/ui/toggle-group';
import { Button } from '@/registry/new-york/ui/button';
import { Input } from '@/registry/new-york/ui/input';
import { PlusCircle } from 'lucide-react';

export default function Component() {
  return (
    <Card x-chunk="dashboard-07-chunk-1">
      <CardHeader>
        <CardTitle>Stock</CardTitle>
        <CardDescription>
          Lipsum dolor sit amet, consectetur adipiscing elit
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">SKU</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="w-[100px]">Size</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-semibold">GGPC-001</TableCell>
              <TableCell>
                <Label htmlFor="stock-1" className="sr-only">
                  Stock
                </Label>
                <Input id="stock-1" type="number" defaultValue="100" />
              </TableCell>
              <TableCell>
                <Label htmlFor="price-1" className="sr-only">
                  Price
                </Label>
                <Input id="price-1" type="number" defaultValue="99.99" />
              </TableCell>
              <TableCell>
                <ToggleGroup type="single" defaultValue="s" variant="outline">
                  <ToggleGroupItem value="s">S</ToggleGroupItem>
                  <ToggleGroupItem value="m">M</ToggleGroupItem>
                  <ToggleGroupItem value="l">L</ToggleGroupItem>
                </ToggleGroup>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold">GGPC-002</TableCell>
              <TableCell>
                <Label htmlFor="stock-2" className="sr-only">
                  Stock
                </Label>
                <Input id="stock-2" type="number" defaultValue="143" />
              </TableCell>
              <TableCell>
                <Label htmlFor="price-2" className="sr-only">
                  Price
                </Label>
                <Input id="price-2" type="number" defaultValue="99.99" />
              </TableCell>
              <TableCell>
                <ToggleGroup type="single" defaultValue="m" variant="outline">
                  <ToggleGroupItem value="s">S</ToggleGroupItem>
                  <ToggleGroupItem value="m">M</ToggleGroupItem>
                  <ToggleGroupItem value="l">L</ToggleGroupItem>
                </ToggleGroup>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold">GGPC-003</TableCell>
              <TableCell>
                <Label htmlFor="stock-3" className="sr-only">
                  Stock
                </Label>
                <Input id="stock-3" type="number" defaultValue="32" />
              </TableCell>
              <TableCell>
                <Label htmlFor="price-3" className="sr-only">
                  Stock
                </Label>
                <Input id="price-3" type="number" defaultValue="99.99" />
              </TableCell>
              <TableCell>
                <ToggleGroup type="single" defaultValue="s" variant="outline">
                  <ToggleGroupItem value="s">S</ToggleGroupItem>
                  <ToggleGroupItem value="m">M</ToggleGroupItem>
                  <ToggleGroupItem value="l">L</ToggleGroupItem>
                </ToggleGroup>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="justify-center border-t p-4">
        <Button size="sm" variant="ghost" className="gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          Add Variant
        </Button>
      </CardFooter>
    </Card>
  );
}
