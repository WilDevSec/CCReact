import { Card, CardContent } from "@/components/ui/card";

export default function Mission() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Our Mission</h1>
        <p className="text-xl text-muted-foreground">
          Making premium surf gear accessible while supporting ocean conservation
        </p>
      </section>

      <div className="relative h-[400px] rounded-lg overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
          alt="Beautiful beach landscape"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-4">For Surfers</h2>
            <p className="text-muted-foreground">
              We believe that every surfer should have access to high-quality gear.
              Through our competitions, we make premium surfing equipment
              attainable for everyone, from beginners to seasoned pros.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-4">For The Ocean</h2>
            <p className="text-muted-foreground">
              A portion of every ticket sale goes towards ocean conservation
              efforts. We partner with local organizations to protect our beaches
              and marine life for future generations of surfers.
            </p>
          </CardContent>
        </Card>
      </div>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-center">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-2">Accessibility</h3>
              <p className="text-muted-foreground">
                Making high-end surf gear accessible through affordable competition
                entries.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
              <p className="text-muted-foreground">
                Supporting eco-friendly brands and ocean conservation initiatives.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-2">Community</h3>
              <p className="text-muted-foreground">
                Building a global community of surf enthusiasts and ocean lovers.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
