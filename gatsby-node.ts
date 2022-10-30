import type { Actions, CreatePageArgs, GatsbyNode } from "gatsby"
import path from 'path'

interface CreatePageI {
  graphql:<TData, TVariables = any>(query: string, variables?: TVariables | undefined) => Promise<{
    errors?: any;
    data?: TData | undefined;
}>,
actions:Actions
}
const turnPizzasIntoPages  =async ({actions,graphql}:CreatePageI)=>{
  
  // 1. Get a template for this page
  const pizzaTemplate = path.resolve('./src/templates/Pizza.tsx')
  const {data}:{data?:Queries.CreatePizzaPagesQuery} = await graphql(`
    query CreatePizzaPages{
      pizzas:allSanityPizza{
        nodes{
          name
          slug{
            current
          }
        }
      }
    }
  `)
  console.log(data?.pizzas.nodes.forEach(pizza=>{
    console.log("Creating a page for",pizza.name)
    actions.createPage({
      path:`pizza/${pizza?.slug?.current}`,
      component:pizzaTemplate,
      context:{
        slug:pizza?.slug?.current,
      }
    })
   
  }))
  // 2. Query all pizzas
  // 3. Loop over each pizza and create a page for that pizza
}
export const  createPages:GatsbyNode["createPages"] =async ({actions,graphql})=>{

  //1. pizzas
  await turnPizzasIntoPages({actions,graphql});
  //2. toppings
  //3. slicemasters

}