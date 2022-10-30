import { Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import styled from "styled-components";

const PizzaGridStyles = styled.div`
  display:grid;
  grid-template-columns:repeat(auto-fill,minmax(300px,1fr));
  gap:4rem;
  grid-auto-rows:auto auto 500px;

`
const PizzaStyles = styled.div`
  display:grid;
  @supports not (grid-template-rows: subgrid) {
    --rows: auto auto 1fr;
  }
  grid-template-rows: var(--rows, subgrid);
  grid-row:span 3;
  grid-gap:1rem;
  h2,p {
    margin:0;
  }


`
function SinglePizza({pizza}:{pizza:Queries.PizzaQuery["pizzas"]["nodes"][0]}){
  return <PizzaStyles>
    <Link to={`/pizza/${pizza.slug?.current}`}>
      <h2>
        <span className="mark"> {pizza.name}</span>
      </h2>
      </Link>
      <p>{pizza.toppings?.map(topping=>topping?.name
      ).join(",")}</p>
     
    {pizza?.image?.asset?.gatsbyImageData? <GatsbyImage   image={pizza.image.asset.gatsbyImageData} alt={pizza?.name?pizza.name:""}/>:"" }
     </PizzaStyles>

}


function PizzaList({pizzas}:{pizzas:Queries.PizzaQuery["pizzas"]["nodes"]}) {
  
  return <PizzaGridStyles>{pizzas.map((pizza)=>{
    return <SinglePizza key={pizza.id} pizza={pizza}/>
  })}</PizzaGridStyles>
}
export default PizzaList;