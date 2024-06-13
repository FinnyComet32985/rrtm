import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import "./VulnerabilitaPage.css"

function VulnerabilitaPage() {
    let { vulnerabilitaId } = useParams();
    const navigate = useNavigate();
    const { data, loading, error } = useFetch(
        `http://localhost:1337/api/findVulnerabilita/${vulnerabilitaId}`
    );
    if (loading) {
        return (
            <div>
                <Header></Header>
                <div>Loading...</div>;
            </div>
        );
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }
    return (
        <div className="VulnerabilitaPage">
            <Header />
            {data && 
                <h3>{data.titolo}</h3>
            }
        </div>
    )
}
export default VulnerabilitaPage;