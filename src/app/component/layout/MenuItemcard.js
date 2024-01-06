// components/MenuItem.js
import Image from "next/image";
import Link from "next/link";

const MenuItemcard = ({ id, name, image }) => {
  return (
    <div key={id} className="max-w-xl mx-auto pl-10 pr-10 border rounded-lg">
      <Link href={`/menu-items/edit/${id}`} className="w-full text-white py-2 px-4 rounded focus:outline-none transition duration-300">
        <div className="relative w-24 h-24">
          <Image src={image} alt={`Image of ${name}`} height={100} width={100} loading="lazy" />
        </div>
        <div>{name}</div>
      </Link>
    </div>
  );
};

export default MenuItemcard;
