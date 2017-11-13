import React, { Component } from "react";
import { RadialChart } from "react-vis";
import '../../node_modules/react-vis/dist/style.css';

import BurguerMenu from "./BurguerMenu";

class Plans extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const data = [{ angle: 1, label: "Aprovados", radius: 1.1 }, { angle: 5, label: "Rejeitados", radius: 1.2 }, { angle: 2, label: "Aguardando aprovação" }];

    return (
      <BurguerMenu>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <RadialChart data={data} width={300} height={300} showLabels animation />
        </div>
      </BurguerMenu>
    );
  }
}

export default Plans;
