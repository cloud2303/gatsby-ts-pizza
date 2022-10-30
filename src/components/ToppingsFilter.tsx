import { graphql, Link, useStaticQuery } from "gatsby";
import styled from "styled-components";
const ToppingsStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;
  a {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 0 1rem;
    align-items: center;
    padding: 5px;
    background: var(--grey);
    border-radius: 2px;
    .count {
      background: white;
      padding: 2px 5px;
    }
    .active {
      background: var(--yellow);
    }
  }
`;
function countPizzasInToppings(pizzas:Queries.ToppingsQuery["pizzas"]["nodes"]){
  const counts =  pizzas.map(pizza=>pizza.toppings)
  .flat()
  .reduce((acc,topping)=>{
    if(!topping){
      throw new Error("No topping")
    }
    if(acc[topping.id]){
      acc[topping.id].count +=1;
    }else{
      acc[topping.id] = {
        id:topping.id,
        name:topping.name?topping.name:"",
        count:1
      }
    }
    return acc;
  },{} as {[key:string]:{id:string,name:string,count:number}})
  const sortedToppings = Object.values(counts).sort((a,b)=>b.count-a.count)
  return sortedToppings;
}
function ToppingsFilter() {
  const { pizzas, toppings }: Queries.ToppingsQuery = useStaticQuery(
    graphql`
      query Toppings {
        toppings: allSanityTopping {
          nodes {
            name
            id
            vegetarian
          }
        }
        pizzas: allSanityPizza {
          nodes {
            toppings {
              name
              id
            }
          }
        }
      }
    `
  );
  console.log(pizzas,toppings)
  const toppingsWithCounts  = countPizzasInToppings(pizzas.nodes);
  console.log(toppingsWithCounts)
  return <ToppingsStyles>
  {
    toppingsWithCounts.map(topping=> <Link to={`/topping/${topping.name}`} key={topping.id}>
    <span className="name">{topping.name}</span>
    <span className="count">{topping.count}</span>
  </Link>)
  }
  </ToppingsStyles>;
}
export default ToppingsFilter;
