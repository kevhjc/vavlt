import NavItem from './NavItem';

export default function Navbar() {
  return (
    <nav className="flex items-start justify-between px-6 pt-4 md:items-center">
      <div className="flex flex-col left-4 gap-y-2 md:flex-row md:gap-x-4">
        <NavItem href="/" text="Vavlt" />
        <NavItem href="/brands" text="Brands" />
        <NavItem href="/saved" text="Saved" />
      </div>
      <div className="flex right-4">
        <NavItem href="/info" text="Info" />
      </div>
    </nav>
  );
}
