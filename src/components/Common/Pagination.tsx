interface PaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({ totalPages, currentPage, onPageChange }: PaginationProps) => {
    return (
        <div className="flex flex-wrap gap-2 justify-center mt-6">
        <button
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            className="px-2 py-1 text-sm rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
        >
            ⏮ Inicio
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
            <button
            key={i}
            onClick={() => onPageChange(i + 1)}
            className={`px-3 py-1 rounded-md text-sm ${
                currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            >
            {i + 1}
            </button>
        ))}

        <button
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="px-2 py-1 text-sm rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
        >
            ⏭ Última
        </button>
        </div>
    );
};

export default Pagination;