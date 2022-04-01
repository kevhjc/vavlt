import NavItem from './NavItem';

export default function Navbar() {
  return (
    <nav className="flex items-start justify-between px-6 pt-4 md:items-center">
      <div className="flex flex-col left-4 gap-y-2 md:flex-row md:gap-x-4">
        <NavItem href="/" text="Vavlt" />
        <NavItem href="/categories/outerwear" text="Outerwear" />
        <NavItem href="/categories/tops" text="Tops" />
        <NavItem href="/categories/footwear" text="Footwear" />
        <NavItem href="/categories/accessories" text="Accessories" />
      </div>
      <div className="flex right-4">
        <NavItem href="/info" text="Info" />
      </div>
    </nav>
  );
}
