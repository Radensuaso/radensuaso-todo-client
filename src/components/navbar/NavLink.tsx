import React from "react";

interface Props {
  href: string;
  pathName: string;
  label: string;
}

const NavLink: React.FC<Props> = ({ href, pathName, label }) => {
  return (
    <a
      href={href}
      className={`hover-animation rounded-lg hover:bg-dark-lighter inline-block py-2 px-4 font-poppins text-lg text-primary hover:font-extrabold ${
        pathName === href ? "font-extrabold bg-dark-lighter" : ""
      }`}
    >
      {label}
    </a>
  );
};

export default NavLink;
