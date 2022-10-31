import type { GatsbyConfig } from "gatsby";
const config: GatsbyConfig = {
  siteMetadata: {
    title: `pizza-front`,
    description: "测试描述啊啊啊bbb",
    siteUrl: `https://www.yourdomain.tld`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  jsxRuntime: "automatic",
  plugins: [
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-source-sanity`,
      options: {
        projectId: `jst9xmv5`,
        dataset: `production`,
        // a token with read permissions is required
        // if you have a private dataset
        token: process.env.SANITY_TOKEN,
        watchMode: true,
        // If the Sanity GraphQL API was deployed using `--tag <name>`,
        // use `graphqlTag` to specify the tag name. Defaults to `default`.
        graphqlTag: "default",
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
  ],
};

export default config;
