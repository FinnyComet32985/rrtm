import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
function VulnerabilitaPage() {
    let { vulnerabilitaId } = useParams();
    const navigate = useNavigate();
    const { data, loading, error } = useFetch(
        `http://localhost:1337/api/findVulnerabilita/${vulnerabilitaId}`
    );
    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }
    return (
        <div>
            <Header />
            {data && 
                <h3>{data.titolo}</h3>
            }
        </div>
    )
}
export default VulnerabilitaPage;