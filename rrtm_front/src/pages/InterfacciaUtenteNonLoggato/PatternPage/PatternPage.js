import useFetch from "../../../hooks/useFetch";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../../../components/Header/Header";
import "./PatternPage.css";

function PatternPage() {
  const { patternId } = useParams();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState({
    strategies: false,
    vulnerabilities: false,
    pbD: false,
    iso: false,
    mvc: false,
    articles: false,
    owasp: false,
  });
  const [maxHeightVulnerabilities, setMaxHeightVulnerabilities] = useState(null);

  const { data: patternData, loading, error } = useFetch(
    `http://localhost:1337/api/findPattern/${patternId}`
  );

  const handleNavigation = (url, id) => {
    navigate(`/${url}/${id}`);
  };

  const toggleExpanded = (type) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [type]: !prevExpanded[type],
    }));
  };

  useEffect(() => {
    if (expanded.vulnerabilities && patternData && !maxHeightVulnerabilities) {
      const maxHeightCalculation = `${patternData.vulnerabilities.length * 14.52 + 7.6}vh`;
      setMaxHeightVulnerabilities(maxHeightCalculation);
    }
  }, [expanded.vulnerabilities, patternData, maxHeightVulnerabilities]);

  const { data: strategiesData, loading: strategiesLoading, error: strategiesError } = useFetch(
    `http://localhost:1337/api/findStratPatt/${patternId}`
  );
  const { data: vulnerabilitiesData, loading: vulnerabilitiesLoading, error: vulnerabilitiesError } = useFetch(
    `http://localhost:1337/api/findVulnPatt/${patternId}`
  );
  const { data: pbDData, loading: pbDLoading, error: pbDError } = useFetch(
    `http://localhost:1337/api/findPbDPatt/${patternId}`
  );
  const { data: isoData, loading: isoLoading, error: isoError } = useFetch(
    `http://localhost:1337/api/findISOPatt/${patternId}`
  );
  const { data: mvcData, loading: mvcLoading, error: mvcError } = useFetch(
    `http://localhost:1337/api/findMVCPatt/${patternId}`
  );
  const { data: articlesData, loading: articlesLoading, error: articlesError } = useFetch(
    `http://localhost:1337/api/findArtPatt/${patternId}`
  );
  const { data: owaspData, loading: owaspLoading, error: owaspError } = useFetch(
    `http://localhost:1337/api/findOWASPPatt/${patternId}`
  );

  if (
    loading ||
    strategiesLoading ||
    vulnerabilitiesLoading ||
    pbDLoading ||
    isoLoading ||
    mvcLoading ||
    articlesLoading ||
    owaspLoading
  ) {
    return (
      <div>
        <Header />
        <div className="spinner">
          <div className="dot1"></div>
          <div className="dot2"></div>
        </div>
      </div>
    );
  }

  if (error || strategiesError || vulnerabilitiesError || pbDError || isoError || mvcError || articlesError || owaspError) {
    return <div>Error: {error && error.message}</div>;
  }

  return (
    <div className="PatternPage">
      <Header />
      <div className="container">
        {patternData && (
          <div className="pattern">
            <div className="pattern-title">
              <h3 key={patternData.Id}>{patternData.titolo}</h3>
            </div>
            <div className="pattern-details">
              <h3>Summary:</h3>
              <p key={patternData.Id}>{patternData.sommario}</p>
            </div>
            <div className="pattern-details">
              <h3>Context:</h3>
              <p key={patternData.Id}>{patternData.contesto}</p>
            </div>
            <div className="pattern-details">
              <h3>Problem:</h3>
              <p key={patternData.Id}>{patternData.problema}</p>
            </div>
            <div className="pattern-details">
              <h3>Solution:</h3>
              <p key={patternData.Id}>{patternData.soluzione}</p>
            </div>
            <div className="pattern-details">
              <h3>Example:</h3>
              <p key={patternData.Id}>{patternData.esempio}</p>
            </div>
          </div>
        )}
        {renderAssociations({
          type: "strategies",
          associations: strategiesData,
          containerClassName: "strategies-associated",
          detailsContainerClassName: "strategies-details",
          navigationHandler: handleNavigation,
          toggleHandler: toggleExpanded,
          isExpanded: expanded.strategies
        })}
        {renderAssociations({
          type: "vulnerabilities",
          associations: vulnerabilitiesData,
          containerClassName: "vulnerabilities-associated",
          detailsContainerClassName: "vulnerabilities-details",
          navigationHandler: handleNavigation,
          toggleHandler: toggleExpanded,
          isExpanded: expanded.vulnerabilities,
          maxHeightVulnerability: maxHeightVulnerabilities
        })}
        {renderAssociations({
          type: "pbD",
          associations: pbDData,
          containerClassName: "pbD-associated",
          detailsContainerClassName: "pbD-details",
          navigationHandler: handleNavigation,
          toggleHandler: toggleExpanded,
          isExpanded: expanded.pbD
        })}
        {renderAssociations({
          type: "mvc",
          associations: mvcData,
          containerClassName: "mvc-associated",
          detailsContainerClassName: "mvc-details",
          navigationHandler: handleNavigation,
          toggleHandler: toggleExpanded,
          isExpanded: expanded.mvc
        })}
        {renderAssociations({
          type: "iso",
          associations: isoData,
          containerClassName: "iso-associated",
          detailsContainerClassName: "iso-details",
          navigationHandler: handleNavigation,
          toggleHandler: toggleExpanded,
          isExpanded: expanded.iso
        })}
        {renderAssociations({
          type: "articles",
          associations: articlesData,
          containerClassName: "articles-associated",
          detailsContainerClassName: "articles-details",
          navigationHandler: handleNavigation,
          toggleHandler: toggleExpanded,
          isExpanded: expanded.articles
        })}
        {renderAssociations({
          type: "owasp",
          associations: owaspData,
          containerClassName: "owasp-associated",
          detailsContainerClassName: "owasp-details",
          navigationHandler: handleNavigation,
          toggleHandler: toggleExpanded,
          isExpanded: expanded.owasp
        })}
      </div>
    </div>
  );
}

function renderAssociations({
  type,
  associations,
  containerClassName,
  detailsContainerClassName,
  navigationHandler,
  toggleHandler,
  isExpanded,
  maxHeightVulnerability = null
}) {
  if (associations.length === 0) {
    return null;
  }
  
  const containerClass = `${containerClassName}${isExpanded ? " open" : " closed"}`;
  const maxHeightVulnerabilityStyle = maxHeightVulnerability ? { "--max-height-vulnerability": maxHeightVulnerability } : undefined;
  
  const handleClick = () => toggleHandler(type);
  const handleKeyDown = event => {
    if (event.key === 'Enter' || event.key === ' ') {
      toggleHandler(type);
    }
  };
  
  const handleAssocClick = id => () => navigationHandler(`${type.toLowerCase()}Page`, id);
  const handleAssocKeyDown = event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      navigationHandler(`${type.toLowerCase()}Page`, event.currentTarget.dataset.id);
    }
  };
  
  return (
    <div //NOSONAR
      className={containerClass}
      style={maxHeightVulnerabilityStyle}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <div //NOSONAR
       className="associate-button" onClick={handleClick}>
        <span>{capitalizeFirstLetter(type)} Associate</span>
      </div>
      <div className={`${type}AssocMap`}>
        {associations.map(association => (
          <div //NOSONAR
            className={detailsContainerClassName}
            key={association.id}
            onClick={handleAssocClick(association.id)}
            onKeyDown={handleAssocKeyDown}
            role="button"
            tabIndex={0}
            data-id={association.id}
          >
            <h4>{association.name || association.title}</h4>
            {type === "vulnerability" && <p>CWE: {association.cwe}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default PatternPage;
