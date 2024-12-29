import { Doc } from "@/convex/_generated/dataModel";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Button } from "./ui/button";
import { useState } from "react";

const PREVIEW_LENGTH = 10;

export const NotesCard = ({ notes }: { notes: Doc<"notes"> }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!notes) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1>No documents found</h1>
      </div>
    );
  }

  const shouldShowViewMore = notes.text.length > PREVIEW_LENGTH;
  const displayText = isExpanded
    ? notes.text
    : `${notes.text.slice(0, PREVIEW_LENGTH)}${shouldShowViewMore ? "..." : ""}`;

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Note</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col justify-between">
          <div className="overflow-y-auto">
            <p className="text-sm text-gray-600 whitespace-pre-wrap">
              {displayText}
            </p>
          </div>
          {shouldShowViewMore && (
            <div className="pt-2">
              <Button
                variant="ghost"
                className="text-blue-600 hover:text-blue-800 p-0 h-auto font-medium"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? "Show less" : "View more"}
              </Button>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        Created at: {new Date(notes._creationTime).toLocaleString()}
      </CardFooter>
    </Card>
  );
};
