import * as React from "react";
import PostsReduxAndAxios from "./components/PostsReduxAndAxios/PostsReduxAndAxios";
import PostReduxAndRTK from "./components/PostsReduxAndRTK/PostsReduxAndRTK";
import Container from "./components/Layouts/Container/Container";

const App = () => {
  return (
    <Container>
      <PostsReduxAndAxios />
      <PostReduxAndRTK />
    </Container>
  );
};

export default App;
