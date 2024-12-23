import { useLocation } from "react-router-dom";

const useQueryParam = () => {
    const location = useLocation();
    return new URLSearchParams(location.search);
}

export { useQueryParam };