import { useState } from "react";
import { useParams } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import type { Competition, Question } from "@shared/schema";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

type QuestionResponse = Omit<Question, "correctAnswer">;

function PaymentForm({ clientSecret, competitionId, ticketCount, onSuccess }: { 
  clientSecret: string;
  competitionId: number;
  ticketCount: number;
  onSuccess: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);

    try {
      const { error: paymentError, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
      });

      if (paymentError) {
        toast({
          title: "Payment Failed",
          description: paymentError.message,
          variant: "destructive",
        });
        return;
      }

      if (paymentIntent.status === "succeeded") {
        // Create entry
        await fetch(`/api/competitions/${competitionId}/enter`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            competitionId,
            userId: "temp-user-id", // In a real app, this would come from auth
            ticketCount,
            paymentIntentId: paymentIntent.id,
          }),
        });

        toast({
          title: "Success!",
          description: "Your tickets have been purchased.",
        });

        onSuccess();
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <Button 
        type="submit" 
        className="w-full mt-4" 
        disabled={!stripe || isProcessing}
      >
        {isProcessing ? "Processing..." : "Pay Now"}
      </Button>
    </form>
  );
}

export default function Competition() {
  const { id } = useParams();
  const { toast } = useToast();
  const [answer, setAnswer] = useState("");
  const [ticketCount, setTicketCount] = useState(1);
  const [showPayment, setShowPayment] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const { data: competition } = useQuery<Competition>({
    queryKey: [`/api/competitions/${id}`],
  });

  const { data: question } = useQuery<QuestionResponse>({
    queryKey: [`/api/competitions/${id}/question`],
  });

  const verifyMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/competitions/${id}/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answer }),
      });
      if (!res.ok) throw new Error("Failed to verify answer");
      return res.json();
    },
    onSuccess: (data) => {
      if (data.isCorrect) {
        setShowPayment(true);
        handleInitiatePayment();
        toast({
          title: "Correct Answer!",
          description: "You can now purchase tickets for the competition.",
        });
      } else {
        toast({
          title: "Incorrect Answer",
          description: "Please try again.",
          variant: "destructive",
        });
      }
    },
  });

  const handleInitiatePayment = async () => {
    if (!competition) return;

    const response = await fetch(`/api/competitions/${id}/payment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ticketCount }),
    });

    const { clientSecret } = await response.json();
    setClientSecret(clientSecret);
  };

  const handleTicketCountChange = async (newCount: number) => {
    setTicketCount(newCount);
    if (showPayment) {
      await handleInitiatePayment();
    }
  };

  if (!competition || !question) return null;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <Card>
        <div className="relative h-64">
          <img
            src={competition.imageUrl}
            alt={competition.prize}
            className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
          />
        </div>
        <CardHeader>
          <CardTitle>{competition.title}</CardTitle>
          <CardDescription>{competition.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Prize:</h3>
            <p>{competition.prize}</p>
          </div>

          {!showPayment ? (
            <div className="space-y-4">
              <h3 className="font-semibold">Answer this question to enter:</h3>
              <p>{question.question}</p>
              <div className="space-y-2">
                {question.options.map((option) => (
                  <Button
                    key={option}
                    variant={answer === option ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => setAnswer(option)}
                  >
                    {option}
                  </Button>
                ))}
              </div>
              <Button
                className="w-full"
                onClick={() => verifyMutation.mutate()}
                disabled={!answer || verifyMutation.isPending}
              >
                Submit Answer
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="font-semibold">Purchase Tickets:</h3>
              <div className="flex items-center gap-4">
                <Input
                  type="number"
                  min="1"
                  value={ticketCount}
                  onChange={(e) => handleTicketCountChange(Number(e.target.value))}
                />
                <span>
                  Total: ${(ticketCount * competition.ticketPrice).toFixed(2)}
                </span>
              </div>

              {clientSecret && (
                <Elements 
                  stripe={stripePromise} 
                  options={{ 
                    clientSecret,
                    appearance: { theme: 'stripe' }
                  }}
                >
                  <PaymentForm 
                    clientSecret={clientSecret}
                    competitionId={competition.id}
                    ticketCount={ticketCount}
                    onSuccess={() => setShowPayment(false)}
                  />
                </Elements>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}