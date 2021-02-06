import React from "react";
import { graphql, PageProps } from "gatsby";

import Layout from "../components/layout";
import Seo from "../components/seo";

const NotFoundPage = ({ data }: PageProps<GatsbyTypes.NotFoundQueryQuery>) => {
  const siteTitle = data.site?.siteMetadata?.title!;

  return (
    <Layout title={siteTitle}>
      <Seo title="404: Not Found" />
      <h1>404: Not Found</h1>
      <p>Sorry, this doesn't exist.</p>
    </Layout>
  );
};

export default NotFoundPage;

export const pageQuery = graphql`
  query NotFoundQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
