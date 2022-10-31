import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
function Slicemaster({ data }: { data: Queries.SliceMasterSingleQuery }) {
  return <div className='center'>
    <GatsbyImage image={data.person?.image?.asset?.gatsbyImageData} alt={data.person?.name}></GatsbyImage>
    <h2><span className='mark'>{data.person.name}</span></h2>
    <p>{data.person.description}</p>
  </div>
}
export default Slicemaster;
export const query = graphql`
  query SliceMasterSingle($slug: String!) {
    person: sanityPerson(slug: { current: { eq: $slug } }) {
      name
      id
      desciption
      image {
        asset {
          gatsbyImageData
        }
      }
    }
  }
`