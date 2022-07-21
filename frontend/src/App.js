import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Recommend from "./Recommend";

const App = () => {
  const [cards, setCards] = useState();
  return (
    <Switch>
      <Route path="/" exact>
        <Home cards={cards} setCards={setCards} />
      </Route>
      <Route path="/cards" component={Recommend}>
        <Recommend cards={cards} setCards={setCards} />
      </Route>
    </Switch>
  );
};

export default App;
