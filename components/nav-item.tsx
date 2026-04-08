interface NavItemProps {
  icon: React.ReactNode;
  text: string;
  isActive?: boolean;
}

const NavItem = ({ icon, text, isActive }: NavItemProps) => {
  return (
    <li
      className={`flex h-11 w-full items-center gap-2 rounded-lg pl-6 hover:cursor-pointer ${isActive ? "bg-primary/50" : "bg-transparent"}`}
    >
      <span
        className={`${isActive ? "text-primary" : "text-muted-foreground"}`}
      >
        {icon}
      </span>
      <p className={`${isActive ? "text-primary" : "text-muted-foreground"}`}>
        {text}
      </p>
    </li>
  );
};

export default NavItem;
