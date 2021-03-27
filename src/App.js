import Row from "./components/Row";
import requests from "./requests";
import './css/App.css';
import Banner from "./components/Banner";
import Nav from "./components/Nav";

function App() {
  return (
    <div className="App">
        {/* Navbar */}
        <Nav />
        {/* Hero Banner */}
        <Banner />
        {/* Rows */}
        {/*<Row isLargeRow title={"Netflix Originals"} fetchUrl={requests.fetchNetflixOriginals} />*/}
        <Row isLargeRow title={"Trending Now"} fetchUrl={requests.fetchTrending} />
        <Row isLargeRow title={"Top Rated"} fetchUrl={requests.fetchTopRated} />
        <Row isLargeRow title={"Action Movies"} fetchUrl={requests.fetchActionMovies} />
        <Row isLargeRow title={"Comedy Movies"} fetchUrl={requests.fetchComedyMovies} />
        <Row isLargeRow title={"Horror Movies"} fetchUrl={requests.fetchHorrorMovies} />
        <Row isLargeRow title={"Romance Movies"} fetchUrl={requests.fetchRomanceMovies} />
        <Row isLargeRow title={"Documentaries"} fetchUrl={requests.fetchDocumentaries} />
    </div>
  );
}

export default App;
