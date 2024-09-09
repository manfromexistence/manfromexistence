
            'use client'

            import {Card,CardHeader,CardTitle,CardDescription,CardFooter} from "@/registry/new-york/ui/card"
import {Button} from "@/registry/new-york/ui/button"

            export default function Component() {
              return (<Card
                className="sm:col-span-2" x-chunk="dashboard-05-chunk-0"
              >
                <CardHeader className="pb-3">
                  <CardTitle>Your Orders</CardTitle>
                  <CardDescription className="text-balance max-w-lg leading-relaxed">
                    Introducing Our Dynamic Orders Dashboard for Seamless
                    Management and Insightful Analysis.
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button>Create New Order</Button>
                </CardFooter>
              </Card>)
            }