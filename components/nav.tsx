"use client";

import { LayoutGrid, Package, ShoppingBasket } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import SidebarMenu from "./sidebar-menu";

const Nav = () => {
  const pathname = usePathname();

  return (
    <nav className="mt-7.5 space-y-5">
      <Link href="/">
        <SidebarMenu
          icon={<LayoutGrid />}
          text="Dashboard"
          isActive={pathname === "/"}
        />
      </Link>
      <Link href="/products">
        <SidebarMenu
          icon={<Package />}
          text="Produtos"
          isActive={pathname.startsWith("/products")}
        />
      </Link>
      <Link href="/sales">
        <SidebarMenu
          icon={<ShoppingBasket />}
          text="Vendas"
          isActive={pathname.startsWith("/sales")}
        />
      </Link>
    </nav>
  );
};

export default Nav;
