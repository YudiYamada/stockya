import Nav from "./nav";

const Sidebar = () => {
  return (
    <div className="bg-background flex w-68 flex-col">
      <h1 className="text-primary pt-6 pl-8 text-2xl font-black">STOCKYA</h1>

      <Nav />
    </div>
  );
};

export default Sidebar;
