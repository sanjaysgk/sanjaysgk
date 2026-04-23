import Link from "next/link";
import { DATA } from "@/data/resume";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const NAV_LINKS = [
  { href: "/blog", label: "Blog" },
  { href: "/blog/tags", label: "Tags" },
  { href: "/#projects", label: "Projects" },
];

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 group"
        >
          <Avatar className="size-8 border shadow ring-2 ring-border">
            <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
            <AvatarFallback>{DATA.initials}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
            {DATA.name}
          </span>
        </Link>
        <nav className="flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </header>
      {children}
    </div>
  );
}
