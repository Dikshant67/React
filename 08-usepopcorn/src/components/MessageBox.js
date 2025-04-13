export function MessageBox({ children }) {
    const handleClick = () => {
        const searchElement = document.querySelector(".search");
        searchElement?.focus();
    };

    return (
        <>
            <p onClick={handleClick} className="search-msg">{children}</p>
        </>
    );
}