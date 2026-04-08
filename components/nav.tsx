"use client";

import { LayoutGrid, Package, ShoppingBasket } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import NavItem from "./nav-item";

const Nav = () => {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="mt-7.5 space-y-5">
        <Link href="/">
          <NavItem
            icon={<LayoutGrid />}
            text="Dashboard"
            isActive={pathname === "/"}
          />
        </Link>
        <Link href="/products">
          <NavItem
            icon={<Package />}
            text="Produtos"
            isActive={pathname.startsWith("/products")}
          />
        </Link>
        <Link href="/sales">
          <NavItem
            icon={<ShoppingBasket />}
            text="Vendas"
            isActive={pathname.startsWith("/sales")}
          />
        </Link>
      </ul>
    </nav>
  );
};

export default Nav;
