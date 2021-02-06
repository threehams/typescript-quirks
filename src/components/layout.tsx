import React from "react";
import { Link } from "gatsby";

type Props = {
  children: React.ReactNode;
  title: string;
};
const Layout = ({ title, children }: Props) => {
  return (
    <div className="global-wrapper">
      <header className="global-header">
        <Link className="header-link-home" to="/">
          {title}
        </Link>
      </header>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </div>
  );
};

export default Layout;
