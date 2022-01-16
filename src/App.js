import "./App.css";
import React from "react";
import Card from "react-bootstrap/Card";
import LoadingGif from "./Image/Loading.gif";

class App extends React.Component {
  // Constructor
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      photos: [],
      btnvalue: "0",
      status: false,
    };
  }

  componentDidMount() {
    fetch(
      "https://images-api.nasa.gov/search?q=apollo%2011&description=moon%20landing&media_type=image"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            photos: result.collection.items,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  btnchange = (index) => {
    let items = [...this.state.photos];
    items[index].like = !items[index].like;
    this.setState({
      photos: items,
    });
  };

  
  

  render() {
    const { error, isLoaded, photos } = this.state;
    
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
     return (<div>
          <img className="loadingImg" src={LoadingGif} alt="loading-gif" />
        </div>
      )
    } else {
      return (
        <div className="App">
          {photos.map((picture, index) => (
            <div className="container">
              <Card className="card_content  h-100">
                <Card.Body>
                  <div className="head-title">
                    <Card.Title>{picture.data[0].title}</Card.Title>
                    <small className="text-muted">
                      {picture.data[0].location}
                    </small>
                  </div>

                  <Card.Img src={picture.links[0].href} />

                  <div className="d-flex justify-content-between align-pictures-center">
                    <div className="d-md-flex justify-content-md-start">
                      <button
                        className="btn"
                        type="button"
                        onClick={this.btnchange.bind(this, index)}
                      >
                        {picture.like ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="25"
                            fill="currentColor"
                            className="bi bi-heart-fill"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="25"
                            fill="currentColor"
                            className="bi bi-heart"
                            viewBox="0 0 16 16"
                          >
                            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                          </svg>
                        )}
                      </button>
                      
                      <a
                        className="btn"
                        type="button"
                        data-pgaction-redirection="0"
                        target="_blank"
                        rel="noopener noreferrer"
                        href={("https://www.facebook.com/sharer.php?u=").concat(picture.links[0].href)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="25"
                          fill="currentColor"
                          className="bi bi-send"
                          viewBox="0 0 16 16"
                        >
                          <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                        </svg>
                      </a>
                    </div>
                    <small className="text-muted dateset">
                      {picture.data[0].date_created.slice(0, 10)}
                    </small>
                  </div>
                  <Card.Text>{picture.data[0].description}.</Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      );
    }
  }
}

export default App;