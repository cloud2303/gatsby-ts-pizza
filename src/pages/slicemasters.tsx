import { graphql, Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import styled from "styled-components";
import Pagination from "../components/Pagnation";
const SlicemasterGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;

const SlicemasterStyles = styled.div`
  a {
    text-decoration: none;
  }
  .gatsby-image-wrapper {
    height: 400px;
  }
  h2 {
    transform: rotate(-2deg);
    text-align: center;
    font-size: 4rem;
    margin-bottom: -2rem;
    position: relative;
    z-index: 2;
  }
  .description {
    background: var(--yellow);
    padding: 1rem;
    margin: 2rem;
    margin-top: -6rem;
    z-index: 2;
    position: relative;
    transform: rotate(1deg);
    text-align: center;
  }
`;

function Slicemasters({ data, pageContext }: { data: Queries.SlicemastersListQuery }) {
  const slicemasters = data.slicemasters.nodes;
  const { pageSize, currentPage = 1, skip }: {
    pageSize: number,

    currentPage: number,
    skip: number
  } = pageContext;
  return <>
    <Pagination pageSize={pageSize} totalCount={data.slicemasters.totalCount}
      currentPage={currentPage} skip={skip} base="slicemasters" />

    <SlicemasterGrid>
      {slicemasters.map((person) => (
        <SlicemasterStyles>
          <Link to={`/slicemaster/${person?.slug.current}`}>
            <h2>
              <span className="mark">{person.name}</span>
            </h2>
          </Link>
          <GatsbyImage image={person.image?.asset?.gatsbyImageData} alt={person.name} />
          <p className="description">{person.desciption}</p>
        </SlicemasterStyles>
      ))}
    </SlicemasterGrid></>
}
export default Slicemasters;

export const query = graphql`
  query SlicemastersList($skip:Int = 0,$pageSize:Int = 4){
    slicemasters:allSanityPerson(skip: $skip,limit: $pageSize) {
      totalCount
      nodes{
        name
        id
        slug {
          current
        }
        desciption
        image{
          asset {
            gatsbyImageData
          }
        }

      }
    }
  }

`