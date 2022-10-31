import { graphql, HeadProps, useStaticQuery } from 'gatsby';
type DataProps = {
  site: {
    siteMetadata: {
      title: string
    }
  }
}
function SEO() {
  return <>hello</>
}
export function Head({ location }: HeadProps) {
  const { site }: Queries.SiteInfoQuery = useStaticQuery(graphql`
    query SiteInfo {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
   ` )
  console.log(site)
  return (
    <>
      <html lang="en" />
      <title>{site?.siteMetadata?.title}</title>
      <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
      <meta name="description" content={site?.siteMetadata?.description} />
      {location && <meta property='og:image' content={"/logo.svg"} />}
      <meta property='og:title' content={site?.siteMetadata?.title} />
      <meta property='og:site_name' content={site?.siteMetadata?.title} />
    </>

  )
}
export default SEO;