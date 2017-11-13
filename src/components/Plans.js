import React, { Component } from "react";
import { RadialChart } from "react-vis";

import BurguerMenu from "./BurguerMenu";

class Plans extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const data = [{ angle: 1, label: "Alocados" }, { angle: 5, label: "Não alocados" }, { angle: 2, label: "Aguardando alocação" }];

    return (
      <BurguerMenu>
        <RadialChart data={data} width={300} height={300} />
      </BurguerMenu>
    );
  }
}

export default Plans;
