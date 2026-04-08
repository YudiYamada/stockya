interface SidebarMenuProps {
  icon: React.ReactNode;
  text: string;
  isActive?: boolean;
}

const SidebarMenu = ({ icon, text, isActive }: SidebarMenuProps) => {
  return (
    <div
      className={`flex h-11 w-63.5 items-center gap-2 rounded-lg pl-6 hover:cursor-pointer ${isActive ? "bg-primary/55" : "bg-transparent"}`}
    >
      <span
        className={`${isActive ? "text-primary" : "text-muted-foreground"}`}
      >
        {icon}
      </span>
      <p className={`${isActive ? "text-primary" : "text-muted-foreground"}`}>
        {text}
      </p>
    </div>
  );
};

export default SidebarMenu;
