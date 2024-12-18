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



export const DocumentCard = ({document}:{document:Doc<"documents">}) => {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{document.title}</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>

      <CardContent>
        <p>Card content</p>
      </CardContent>
      <CardFooter>
        <Button>View</Button>
      </CardFooter>
    </Card>
  );
};
