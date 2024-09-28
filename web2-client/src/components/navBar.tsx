"use client";
import {
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Lock, Menu } from "lucide-react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Patient", href: "/patient" },
  { name: "Doctor", href: "/doctor" },
  { name: "Lab Assistant", href: "/lab" },
  { name: "ECG", href: "/simulation" },
  { name: "About", href: "/about" },
];

export function NavigationBar() {
  const { isSignedIn } = useUser();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-1">
            {isSignedIn ? <UserButton /> : ""}
            {!isSignedIn ? (
              <div className="flex gap-3">
                <Button variant="ghost" className="text-foreground" asChild>
                  <SignUpButton />
                </Button>
                <Button  asChild>
                  <SignInButton />
                </Button>
              </div>
            ) : (
              ""
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

function MainNav() {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden p-4 md:flex justify-between w-full">
      <Link href="/" className="flex items-center space-x-2">
        <Lock className="h-6 w-6 text-primary" />
        <span className="ml-2 text-2xl font-bold text-primary">
          HealthChain
        </span>
      </Link>
      <nav className="flex items-center space-x-6 text-center text-sm font-medium justify-center mx-auto">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname === item.href ? "text-foreground" : "text-foreground/60",
            )}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}


function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <MobileLink
          href="/"
          className="flex items-center"
          onOpenChange={setOpen}
        >
          <span className="font-bold">HealthChain</span>
        </MobileLink>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <MobileLink
                key={item.href}
                href={item.href}
                onOpenChange={setOpen}
                className={cn(
                  "text-foreground/70 transition-colors hover:text-foreground",
                  pathname === item.href && "text-foreground",
                )}
              >
                {item.name}
              </MobileLink>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps extends React.ComponentPropsWithoutRef<typeof Link> {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  // const pathname = usePathname();
  return (
    <Link
      href={href}
      onClick={() => {
        onOpenChange?.(false);
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  );
}

export default NavigationBar;
