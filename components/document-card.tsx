import { Doc } from "@/convex/_generated/dataModel";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";

export const DocumentCard = ({ document }: { document: Doc<"documents"> }) => {
  if (!document) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1>No documents found</h1>
      </div>
    );
  } else {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{document.title}</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>

        <CardContent>
          <p>Card content</p>
        </CardContent>
        <CardFooter>
          <Button variant={"secondary"}>View</Button>
        </CardFooter>
      </Card>
    );
  }
};
