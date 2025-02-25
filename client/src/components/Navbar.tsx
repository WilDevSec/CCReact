import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Competitions", href: "/competitions" },
  { name: "Our Mission", href: "/mission" },
  { name: "Winners", href: "/winners" },
  { name: "How It Works", href: "/how-it-works" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [location] = useLocation();

  return (
    <nav className="bg-primary">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/">
              <a className="text-white font-bold text-xl">Coastal Competitions</a>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {navigation.map((item) => (
                <Link key={item.href} href={item.href}>
                  <a
                    className={cn(
                      "px-3 py-2 rounded-md text-sm font-medium",
                      location === item.href
                        ? "bg-primary-foreground text-primary"
                        : "text-white hover:bg-primary-foreground/10"
                    )}
                  >
                    {item.name}
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
