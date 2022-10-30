import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import styled from "styled-components";
const PizzaGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
`;
function Pizza({data}:{data:Queries.PizzaDetailQuery}){
  
  return <PizzaGrid>
    {data.pizza?.image?.asset?.gatsbyImageData?<GatsbyImage image={data.pizza?.image?.asset?.gatsbyImageData} alt={data.pizza?.name?data.pizza?.name:""}/>:""}
    <h2>{data.pizza?.name}</h2>
    <ul>
      {data.pizza?.toppings?.map(topping=><li key={topping?.id}>{topping?.name}</li>)}
    </ul>
    

  </PizzaGrid>
}
//this need to be dynamic based on slug passed in context
export const query = graphql`
  query PizzaDetail($slug:String!) {
    pizza:sanityPizza(slug:{current:{eq:$slug}}) {
      name
      id
      image {
        asset {
          gatsbyImageData(placeholder: BLURRED)
        }
      }
      toppings {
        name
        id
        vegetarian
      }
    }
  }
`
export default Pizza;