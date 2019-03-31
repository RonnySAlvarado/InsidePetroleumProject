import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";

const StyledApp = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to bottom right, lightblue, white);
  form {
    border: 1px solid red;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    width: 200px;
  }
`;

const StyledForm = styled.div`
  border: 1px solid lightgray;
  background: white;
  margin: 0 auto;
  height: 500px;
  width: 500px;
`;

class App extends Component {
  state = {
    title: "",
    description: "",
    results: [], //placeholder for later
    curPage: [], //placeholder for later
    perPage: 5, //placeholder for later
    curPage: 1 //placeholder for later
  };

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitHandler = () => {
    //not built yet as I need to figure out how to have this be sent to mongo cloud db
  };

  render() {
    return (
      <StyledApp>
        <StyledForm>
          <form onSubmit={this.submitHandler}>
            <input
              type="text"
              placeholder="Enter a title..."
              onChange={this.changeHandler}
              value={this.state.title}
              name="title"
            />
            <input
              type="text"
              placeholder="Enter a description..."
              onChange={this.changeHandler}
              value={this.state.description}
              name="description"
            />
          </form>
        </StyledForm>
      </StyledApp>
    );
  }
}

export default App;
