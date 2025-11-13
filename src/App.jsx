import { useState, useEffect } from "react"; 
import "./App.css";

export default function App() {
  const [catUrl, setCatUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); 

  // Função que busca a imagem da API
  const fetchCat = async () => {
    setError("");
    setCatUrl(""); 
    setLoading(true); 
    
    try {
     
      const response = await fetch("https://api.thecatapi.com/v1/images/search");
      
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      
    
      if (data && data.length > 0) {
        setCatUrl(data[0].url);
      } else {
        setError("Nenhuma imagem de gato encontrada.");
      }
      
    } catch (e) {
      console.error("Erro na busca da API:", e);
      setError("Falha ao carregar a imagem. Verifique sua conexão.");
    } finally {
        setLoading(false);
    }
  };

  
  useEffect(() => {
    fetchCat();
  }, []); 

  return (
    <div className="app-container">
      <h1>Imagens Aleatórias de Gatos </h1>
      
      
      <button onClick={fetchCat} disabled={loading}>
        {loading ? "Carregando..." : "Próxima imagem"}
      </button>
      
     
      {error && <p className="error-text">{error}</p>}
      
     
      {loading && <p>Carregando gatinho...</p>}
      
     
      {catUrl && !loading && (
        <img
          src={catUrl}
          alt="Gato aleatório"
          style={{
            width: "400px",
            marginTop: "20px",
            borderRadius: "10px",
          }}
        />
      )}
    </div>
  );
}
