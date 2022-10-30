import { graphql, PageProps } from "gatsby";
import Layout from "../components/Layout";
import PizzaList from "../components/PizzaList";
import ToppingsFilter from "../components/ToppingsFilter";

function Pizzas({data}:PageProps<Queries.PizzaQuery>){
  let pizzas = data.pizzas.nodes
  return <>
  <ToppingsFilter/>
  <PizzaList pizzas={pizzas}/></>
}
export default Pizzas;
export const query = graphql`
  query Pizza{
    pizzas:allSanityPizza {
    nodes {
      name
      id
      slug {
        current
      }
      toppings {
        id
        name
      }
      image {
        asset {
          gatsbyImageData(placeholder: BLURRED)
        }
      }
    }
  }
  }
`