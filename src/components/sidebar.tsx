/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";

const Sidebar = () => {
  const { allMarkdownRemark } = useStaticQuery<GatsbyTypes.SidebarQueryQuery>(
    graphql`
      query SidebarQuery {
        allMarkdownRemark(
          sort: { fields: [frontmatter___title], order: DESC }
        ) {
          totalCount
          nodes {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
    `,
  );

  return (
    <div>
      {allMarkdownRemark.nodes.map((section) => {
        return (
          <Link
            className="block p-2"
            key={section.fields?.slug}
            to={section.fields?.slug!}
          >
            {section.frontmatter?.title}
          </Link>
        );
      })}
    </div>
  );
};

export default Sidebar;
