import { LayoutPanelLeft } from "lucide-react";
import { Link, useLocation } from "react-router";
import { cn } from "@/lib/utils";

export function AdminNav() {
  const { pathname } = useLocation();

  const NAV_ITEMS = [
    { href: "/admin", label: "Dashboard", Icon: LayoutPanelLeft },
  ];

  return (
    <nav className="space-y-0.5 w-64 shrink-0 border-r-2 p-8">

      {NAV_ITEMS.map(({ href, label, Icon }) => {
        const active = pathname === href || pathname.startsWith(href);

        return (
          <Link
            key={href}
            to={href}
            className={cn(
              "flex items-center gap-2 px-3 py-2 text-sm rounded-sm transition-colors",
              active
                ? "bg-secondary text-foreground font-medium"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground",
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
