import { Card, CardContent } from "@/components/ui/card";

export default function HowItWorks() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold">How It Works</h1>
        <p className="text-xl text-muted-foreground">
          Enter our competitions in three simple steps
        </p>
      </section>

      <div className="grid gap-8">
        <Card>
          <CardContent className="pt-6 flex gap-6 items-center">
            <div className="text-4xl font-bold text-primary">1</div>
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Choose Your Competition
              </h3>
              <p className="text-muted-foreground">
                Browse our active competitions and select the surf gear you'd love
                to win. Each competition features premium equipment from top
                brands.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 flex gap-6 items-center">
            <div className="text-4xl font-bold text-primary">2</div>
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Answer the Question
              </h3>
              <p className="text-muted-foreground">
                Answer a surf-related question correctly to qualify for entry.
                Don't worry - the questions are designed to be fun and
                educational!
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 flex gap-6 items-center">
            <div className="text-4xl font-bold text-primary">3</div>
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Purchase Your Tickets
              </h3>
              <p className="text-muted-foreground">
                Buy as many tickets as you'd like to increase your chances of
                winning. All payments are processed securely through Stripe.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-center">Important Details</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-2">Winner Selection</h3>
              <p className="text-muted-foreground">
                Winners are randomly selected from all valid entries after the
                competition closing date. All winners are contacted directly and
                announced on our website.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-2">Prize Delivery</h3>
              <p className="text-muted-foreground">
                Prizes are shipped directly to winners worldwide. All shipping
                costs are covered by us. Delivery times may vary depending on
                your location.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <div className="relative h-[300px] rounded-lg overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1502680390469-be75c86b636f"
          alt="Surfer on wave"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
