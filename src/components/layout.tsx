import React from "react";
import { Link } from "gatsby";
import { ThemeToggler } from "gatsby-plugin-dark-mode";
import Sidebar from "./sidebar";

type Props = {
  children: React.ReactNode;
  title: string;
};
const Layout = ({ title, children }: Props) => {
  return (
    <div className="global-wrapper">
      <aside className="w-80">
        <Sidebar />
      </aside>
      <div>
        <header className="global-header">
          <Link className="header-link-home" to="/">
            {title}
          </Link>
          <ThemeToggler>
            {({ theme, toggleTheme }) => (
              <label>
                <input
                  type="checkbox"
                  onChange={(e) =>
                    toggleTheme(e.target.checked ? "dark" : "light")
                  }
                  checked={theme === "dark"}
                />{" "}
                Dark mode
              </label>
            )}
          </ThemeToggler>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
