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
import { Eye } from "lucide-react";
import Link from "next/link";

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
          <CardDescription>{document.description}</CardDescription>
        </CardHeader>
        <CardFooter>
          <Link href={`/dashboard/documents/${document._id}`}>
            <Button variant={"secondary"}>
              <Eye size={16} className="mr-2" />
              View
            </Button>
          </Link>
        </CardFooter>
      </Card>
    );
  }
};
