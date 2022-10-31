import { graphql } from 'gatsby';
import styled from 'styled-components';
import { GatsbyImage } from 'gatsby-plugin-image';
const BeerGridStyles = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

const SingleBeerStyles = styled.div`
  border: 1px solid var(--grey);
  padding: 2rem;
  text-align: center;
  img {
    width: 100%;
    height: 200px;
    object-fit: contain;
    display: block;
    display: grid;
    align-items: center;
    font-size: 10px;
  }
`;

function Beers({ data }: { data: Queries.BeersListQuery }) {

  return <>
    <h2 className='center'>{`we jave ${data.beers.nodes.length} Beers Available.Dine in Only`}</h2>
    <BeerGridStyles>
      {data.beers.nodes.map((beer) => {
        const rating = Math.round(beer.rating.average);
        return (
          <SingleBeerStyles key={beer.id}>
            <img src={beer.image} alt={beer.name} />
            <GatsbyImage alt={beer.name} image={beer.imageAA.childImageSharp.gatsbyImageData} />
            <h3>{beer.name}</h3>
            {beer.price}
            <p title={`${rating} out of 5 stars`}>
              {`⭐`.repeat(rating)}
              <span style={{ filter: `grayscale(100%)` }}>
                {`⭐`.repeat(5 - rating)}
              </span>
              <span>({beer.rating.reviews})</span>
            </p>
          </SingleBeerStyles>
        );
      })}
    </BeerGridStyles>
  </>
}
export default Beers;

export const query = graphql`
  query BeersList{
    beers: allBeer {
    nodes {
      id
      name
      price
      image
      imageAA{
        childImageSharp{
          gatsbyImageData(placeholder: BLURRED)
        }
      }
      rating {
        average
        reviews
      }
    }
  }
  }
`