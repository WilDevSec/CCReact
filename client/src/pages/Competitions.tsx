import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Competition } from "@shared/schema";

export default function Competitions() {
  const { data: competitions, isLoading } = useQuery<Competition[]>({
    queryKey: ["/api/competitions"],
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Current Competitions</h1>
        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <div className="h-48 bg-muted rounded-t-lg" />
              <CardContent className="space-y-2">
                <div className="h-6 bg-muted rounded" />
                <div className="h-4 bg-muted rounded w-3/4" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Current Competitions</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Enter any of our active competitions below for your chance to win amazing surf gear!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {competitions?.map((competition) => (
          <Card key={competition.id} className="overflow-hidden">
            <div className="relative h-48">
              <img
                src={competition.imageUrl}
                alt={competition.prize}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle>{competition.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{competition.description}</p>
              <div className="flex items-center justify-between">
                <span className="font-semibold">
                  ${competition.ticketPrice} per ticket
                </span>
                <Button asChild>
                  <Link href={`/competitions/${competition.id}`}>Enter Now</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
