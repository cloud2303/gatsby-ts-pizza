import type { Actions, CreatePageArgs, GatsbyNode } from "gatsby";
import path from "path";
import fetch from "node-fetch";
import { createRemoteFileNode } from "gatsby-source-filesystem";
interface CreatePageI {
  graphql: <TData, TVariables = any>(
    query: string,
    variables?: TVariables | undefined
  ) => Promise<{
    errors?: any;
    data?: TData | undefined;
  }>;
  actions: Actions;
}
const turnPizzasIntoPages = async ({ actions, graphql }: CreatePageI) => {
  // 1. Get a template for this page
  const pizzaTemplate = path.resolve("./src/templates/Pizza.tsx");
  // 2. Query all pizzas
  const { data }: { data?: Queries.CreatePizzaPagesQuery } = await graphql(`
    query CreatePizzaPages {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);
  // 3. Loop over each pizza and create a page for that pizza
  data?.pizzas.nodes.forEach((pizza) => {
    // console.log("Creating a page for", pizza.name);
    actions.createPage({
      path: `pizza/${pizza?.slug?.current}`,
      component: pizzaTemplate,
      context: {
        slug: pizza?.slug?.current,
      },
    });
  });
};
const turnToppingsIntoPages = async ({ actions, graphql }: CreatePageI) => {
  // 1. Get the template
  const toppingTemplate = path.resolve("./src/pages/pizzas.tsx");
  // 2. Query all the toppings
  const { data }: { data?: Queries.CreateToppingPagesQuery } = await graphql(`
    query CreateToppingPages {
      toppings: allSanityTopping {
        nodes {
          name
          id
        }
      }
    }
  `);
  // console.log(data);

  // 3. Create page for that topping
  data?.toppings.nodes.forEach((topping) => {
    // console.log("Creating a page for", topping.name);
    actions.createPage({
      path: `topping/${topping.name}`,
      component: toppingTemplate,
      context: {
        topping: topping.name,
      },
    });
  });
  // 4. Pass topping data to pizza.js
};

const turnSlicemastersIntoPages = async ({ actions, graphql }: CreatePageI) => {
  // 1. Query all slicemasters
  const { data }: { data?: Queries.CreateSliceMastersPagesQuery } =
    await graphql(`
      query CreateSliceMastersPages {
        sliceMasters: allSanityPerson {
          totalCount
          nodes {
            name
            slug {
              current
            }
            id
          }
        }
      }
    `);
  // 2. Turn each slicemaster into their own page
  data?.sliceMasters.nodes.forEach((slicemaster) => {
    actions.createPage({
      path: `/slicemaster/${slicemaster.slug.current}`,
      component: path.resolve("./src/templates/Slicemaster.tsx"),
      context: {
        slug: slicemaster.slug.current,
      },
    });
  });

  const pageSize = 4;
  const pageCount = Math.ceil(data?.sliceMasters?.totalCount / pageSize);
  // console.log(
  //   `There are ${data?.sliceMasters.totalCount} total people. And we have ${pageCount} pages with ${pageSize} per page`
  // );
  // 3. Pass data to slicemasters.js
  Array.from({ length: pageCount }).forEach((_, i) => {
    // console.log(`Creating page ${i}`);
    actions.createPage({
      path: `/slicemasters/${i + 1}`,
      component: path.resolve("./src/pages/slicemasters.tsx"),
      context: {
        skip: i * pageSize,
        currentPage: i + 1,
        pageSize,
      },
    });
  });
};
export const createPages: GatsbyNode["createPages"] = async ({
  actions,
  graphql,
}) => {
  await Promise.all([
    //1. pizzas
    turnPizzasIntoPages({ actions, graphql }),
    //2. toppings
    turnToppingsIntoPages({ actions, graphql }),
    //3. slicemasters
    turnSlicemastersIntoPages({ actions, graphql }),
  ]);
};

interface SourceNodesI {
  actions: Actions;
  createNodeId: (this: void, input: string) => string;
  createContentDigest: (this: void, input: string | object) => string;
}
interface Beer {
  price: string;
  name: string;
  rating: { average: number; reviews: number };
  image: string;
}
async function fetchBeersAndTurnIntoNodes({
  actions,
  createNodeId,
  createContentDigest,
}: SourceNodesI) {
  // 1. Fetch a list of beers
  const beers: Beer[] = await fetch(
    "https://api.sampleapis.com/beers/ale"
  ).then((res) => res.json());
  //2. Loop over each one
  // console.log(beers);
  beers.forEach((beer) => {
    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      children: [],
      internal: {
        type: "Beer",
        mediaType: "application/json",
        contentDigest: createContentDigest(beer),
      },
    };
    //3. Create a node for that beer
    actions.createNode({
      ...beer,
      // image:
      //   "https://remix-blog-1257325628.cos.ap-hongkong.myqcloud.com/500.jpeg",
      ...nodeMeta,
    });
  });
}
export const sourceNodes: GatsbyNode["sourceNodes"] = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  await Promise.all([
    fetchBeersAndTurnIntoNodes({ actions, createNodeId, createContentDigest }),
  ]);
};

export const createResolvers: GatsbyNode["createResolvers"] = async ({
  actions: { createNode },
  cache,
  createNodeId,
  createResolvers,
}) => {
  const resolvers = {
    Beer: {
      imageAA: {
        type: "File",
        resolve(source: Beer) {
          console.log(
            source,
            "-------------------------------------------------)"
          );
          return createRemoteFileNode({
            url: "https://remix-blog-1257325628.cos.ap-hongkong.myqcloud.com/500.jpeg",
            cache,
            createNode,
            createNodeId,
          });
        },
      },
    },
  };

  createResolvers(resolvers);
};
