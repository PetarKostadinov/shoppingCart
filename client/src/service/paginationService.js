import { Link } from 'react-router-dom';

export const generatePaginationLinks = (currentPage, totalPages) => {
    const paginationLinks = [];
    const maxPages = 5;

    if (totalPages <= maxPages) {
        for (let i = 1; i <= totalPages; i++) {
            paginationLinks.push(
                <Link
                    key={i}
                    to={{
                        pathname: '/',
                        search: `?page=${i}`,
                    }}
                    className={`btn btn-light mx-1 ${currentPage === i ? 'active' : ''}`}
                >
                    {i}
                </Link>
            );
        }
    } else {
        let startPage = 1;
        let endPage = totalPages;
        if (currentPage >= maxPages - 2) {
            startPage = currentPage - 2;
        }
        if (currentPage <= totalPages - 3) {
            endPage = currentPage + 2;
        }
        if (startPage > 1) {
            paginationLinks.push(
                <Link
                    key="prevStart"
                    to={{
                        pathname: '/',
                        search: `?page=1`,
                    }}
                    className="btn btn-light mx-1"
                >
                    1...
                </Link>
            );
        }
        for (let i = startPage; i <= endPage; i++) {
            paginationLinks.push(
                <Link
                    key={i}
                    to={{
                        pathname: '/',
                        search: `?page=${i}`,
                    }}
                    className={`btn btn-light mx-1 ${currentPage === i ? 'active' : ''}`}
                >
                    {i}
                </Link>
            );
        }
        if (endPage < totalPages) {
            paginationLinks.push(
                <Link
                    key="nextEnd"
                    to={{
                        pathname: '/',
                        search: `?page=${totalPages}`,
                    }}
                    className="btn btn-light mx-1"
                >
                    ...{totalPages}
                </Link>
            );
        }
    }

    return paginationLinks;
};