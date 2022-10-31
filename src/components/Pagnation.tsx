import { Link } from "gatsby";
import styled from "styled-components";

interface PaginationProps {
  pageSize: number;
  totalCount: number;
  currentPage: number;
  skip: number;
  base: string
}
const PaginationStyles = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  justify-items: center;
  border: 1px solid var(--grey);
  margin: 2rem 0;
  border-radius: 5px;
  text-align: center;
  & > * {
    padding: 1rem;
    flex: 1;
    border-right: 1px solid var(--grey);
    text-decoration: none;
    &[aria-current],
    &.current {
      color: var(--red);
    }
    &[disabled] {
      pointer-events: none;
      color: var(--grey);
    }
  }
`;
export default function Pagination({ pageSize, totalCount, currentPage, skip, base }: PaginationProps) {
  // make some variables
  const totalPages = Math.ceil(totalCount / pageSize);
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const hasNextPage = nextPage <= totalPages;
  const hasPrevPage = prevPage >= 1;
  return <PaginationStyles>
    {hasPrevPage ? <Link to={`/${base}/${prevPage}`}>⬅Prev</Link> : ""}
    {Array.from({ length: totalPages }).map((_, i) => (
      <Link key={`page${i}`} to={`/${base}/${i + 1}`}>{i + 1}</Link>))}
    {hasNextPage ? <Link to={`/${base}/${nextPage}`}>next→</Link> : ""}
  </PaginationStyles>
}