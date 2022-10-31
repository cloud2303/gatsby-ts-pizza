import { graphql, PageProps } from "gatsby";
import Layout from "../components/Layout";
import PizzaList from "../components/PizzaList";
import ToppingsFilter from "../components/ToppingsFilter";

function Pizzas({ data, pageContext }: PageProps<Queries.PizzaQuery>) {
  let pizzas = data.pizzas.nodes
  let { topping } = pageContext as unknown as { topping: string }
  return <>
    <ToppingsFilter activeTopping={topping} />
    <PizzaList pizzas={pizzas} /></>
}
export default Pizzas;
export const query = graphql`
  query Pizza($topping:[String]){
    pizzas:allSanityPizza(filter: {toppings:{elemMatch:{name:{in:$topping}}}}) {
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