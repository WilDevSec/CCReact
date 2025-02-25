import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Winner } from "@shared/schema";

export default function Winners() {
  const { data: winners, isLoading } = useQuery<Winner[]>({
    queryKey: ["/api/winners"],
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-center">Recent Winners</h1>
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="pt-6 space-y-2">
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
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Recent Winners</h1>
        <p className="text-xl text-muted-foreground">
          Congratulations to all our lucky winners!
        </p>
      </section>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {winners?.map((winner) => (
          <Card key={winner.id}>
            <CardHeader>
              <CardTitle>Winner #{winner.id}</CardTitle>
              <CardDescription>
                Competition #{winner.competitionId}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Announced on{" "}
                {new Date(winner.announcedAt).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="relative h-[300px] rounded-lg overflow-hidden mt-12">
        <img
          src="https://images.unsplash.com/photo-1499823382510-3990e4b8a04b"
          alt="Surfer celebrating"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
