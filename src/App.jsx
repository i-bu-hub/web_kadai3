import { useEffect, useState } from "react";
import { fetchImages } from "./api";

function Header() {
    return (
      <header className="hero is-info is-bold">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Mario series amiibo image</h1>
            <h2 className="my data" >日本大学文理学部情報科学科 Webプログラミングの演習課題 5421020 坂内武希</h2>
          </div>
        </div>
      </header>
    );
  }
  
  function Image(props) {
    return (
      <div className="card">
        <div className="card-image">
          <figure className="image">
          <img src={props.src} alt="amiibo" />
          </figure>
        </div>
      </div>
    );
  }
  
  function Loading() {
    return <p>Loading...</p>;
  }
  

  function Gallery(props) {
    const { urls } = props;
    if (urls == null) {
      return <Loading />;
    }
    return (
      <div className="columns is-vcentered is-multiline">
        {urls.map((url) => {
        return (
          <div key={url.image} className="column is-3">
            <Image src={url.image} />
          </div>
        );
      })}
      </div>
    );
  }
  
  function Form(props) {
      function handleSubmit(event) {
        event.preventDefault();
        const { breed } = event.target.elements;
        props.onFormSubmit(breed.value);
      }
    return (
      <div>
      <form onSubmit={handleSubmit}>        
          <div className="field has-addons">
            <div className="control is-expanded">
              <div className="select is-fullwidth">
                <select name="breed" defaultValue="mario">
                  <option value="mario">マリオ</option>
                  <option value="Luigi">ルイージ</option>
                  <option value="yoshi">ヨッシー</option>
                  <option value="peach">ピーチ</option>
                  <option value="bowser">クッパ</option>
                  <option value="toad">キノピオ</option>
                  <option value="wario">ワリオ</option>
                  <option value="waluigi">ワルイージ</option>
                  <option value="rosalina">ロゼッタ</option>
                  <option value="donkey kong">ドンキーコング</option>
                  <option value="daisy">デイジー</option>
                  <option value="diddy kong">ディディーコング</option>
                  <option value="boo">テレサ</option>
                  <option value="koopa troopa">ノコノコ</option>
                </select>
              </div>
            </div>
            <div className="control">
              <button type="submit" className="button is-info">
                Reload
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
  

  function Main() {
    const [urls, setUrls] = useState(null);
    useEffect(() => {
      fetchImages("mario").then((urls) => {
        setUrls(urls);
      });
    }, []);

    function reloadImages(breed) {
      fetchImages(breed).then((urls) => {
        setUrls(urls);
      });
    }

    return (
      <main>
        <section className="section">
        <div className="container">
        <Form onFormSubmit={reloadImages} />
        </div>
      </section>
        <section className="section">
          <div className="container">
            <Gallery urls={urls}/>
          </div>
        </section>
      </main>
    );
  }
  
  function Footer() {
    return (
      <footer className="footer">
        <div className="content has-text-centered">
          <p>Amiibo images are retrieved from Amiibo API</p>
          <p>
            <a href="https://amiiboapi.com/">Donate to Amiibo API</a>
          </p>
        </div>
      </footer>
    );
  }
  
  function App() {
    return (
      <div>
        <Header />
        <Main />
        <Footer />
      </div>
    );
  }
  
  export default App;