import { AlignJustify } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { isLoggedIn } from "@/services/auth";

const Navigation = () => {
  const pathname = window.location.pathname;
  const isAuthPage = pathname === "/auth" || pathname === "/login";

  if (isAuthPage) {
    return null;
  }

  return (
    <div className="w-full px-6">
      <div className="max-w-4xl mx-auto flex items-center justify-between py-4">
        <div className="flex items-center gap-12">
          <a href="/" className="font-semibold text-lg">
            AlloCovoit
          </a>
          <ul className="hidden md:flex md:items-center md:gap-6">
            <li>
              <a href="/">Trajet</a>
            </li>
            <li>
              <a href="/mes-trajets">Mes trajets</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </div>
        <div>
          {isLoggedIn() ? (
            <a
              href="/profil"
              className="hidden md:block md:text-white md:px-4 md:py-2.5 md:bg-black md:text-sm md:rounded-md"
            >
              Profil
            </a>
          ) : (
            <a
              href="/auth"
              className="hidden md:block md:text-white md:px-4 md:py-2.5 md:bg-black md:text-sm md:rounded-md"
            >
              Connexion
            </a>
          )}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>
                  <AlignJustify />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                  <a href="/">
                    <DropdownMenuItem>Trajet</DropdownMenuItem>
                  </a>
                  <a href="/mes-trajets">
                    <DropdownMenuItem>Mes trajets</DropdownMenuItem>
                  </a>
                  <a href="/contact">
                    <DropdownMenuItem>Contact</DropdownMenuItem>
                  </a>
                  <a href="/auth">
                    <DropdownMenuItem>Connexion</DropdownMenuItem>
                  </a>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
