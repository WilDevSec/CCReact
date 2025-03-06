import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold text-primary">
          Win Premium Surf Gear
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Enter our surf-themed competitions for a chance to win high-end surfboards, wetsuits, and more!
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/competitions">View Competitions</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/how-it-works">How It Works</Link>
          </Button>
        </div>
      </section>

      {/* Featured Image */}
      <div className="relative h-[400px] rounded-lg overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1502680390469-be75c86b636f"
          alt="Surfer riding wave"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* How It Works Preview */}
      <section className="grid md:grid-cols-3 gap-8">
        <Card>
          <CardContent className="pt-6 text-center">
            <h3 className="text-xl font-semibold mb-2">1. Choose Competition</h3>
            <p className="text-muted-foreground">
              Browse our active competitions and pick your favorite surf gear to win.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <h3 className="text-xl font-semibold mb-2">2. Answer & Enter</h3>
            <p className="text-muted-foreground">
              Answer a surf-related question correctly to qualify for entry.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <h3 className="text-xl font-semibold mb-2">3. Get Lucky</h3>
            <p className="text-muted-foreground">
              Winners are randomly selected from all correct entries.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Featured Prizes */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-center">Featured Prizes</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative h-[300px] rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1486869801134-25b6bc85fc0d"
              alt="Surfboard"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="relative h-[300px] rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1502933691298-84fc14542831"
              alt="Wetsuit"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
