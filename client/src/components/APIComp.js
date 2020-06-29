import React from "react";
import { Grid } from "@material-ui/core";

class APIComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
    };
  }

  componentDidMount() {
    fetch("https://makeup-api.herokuapp.com/api/v1/products.json?")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(JSON.stringify(result[0]));
          this.setState({
            isLoaded: true,
            items: result,
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      const litag = [];

      for (const [index, value] of items.entries()) {
        litag.push(
          <Grid item xs={3} key={index}>
            <h3>{value.name}</h3>
            <h5> by {value.brand}</h5>
            <img
              src={value.image_link}
              alt="product"
              height="60px"
              width="60px"
            />
            <p>{value.colour_name}</p>
          </Grid>
        );
      }

      return (
        <Grid container xs={9}>
          {litag}
        </Grid>
      );
    }
  }
}

export default APIComponent;
