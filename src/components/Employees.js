import React, { Component } from "react";
import { RadialChart } from "react-vis";
import "../../node_modules/react-vis/dist/style.css";

import BurguerMenu from "./BurguerMenu";
import List from "./List";
import EmployeeListItem from "./EmployeeListItem";

class Employees extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        { angle: 1, label: "Alocados", subLabel: "Quantidade", radius: 1.1 },
        { angle: 5, label: "Não alocados", radius: 1.2 },
        { angle: 2, label: "Aguardando alocação" }
      ],
      employees: null
    };
  }

  componentDidMount() {
    fetch("https://sige-rh.herokuapp.com/employee")
      .then(response => response.json())
      .then(employees => this.setState({ employees: employees }));
  }

  render() {
    const { data, selectedEmployees, employees } = this.state;
    const items = employees
      ? employees.map(employee => <EmployeeListItem employee={employee} />)
      : [];

    return (
      <BurguerMenu>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column"
          }}
        >
          <h1>Talentos Dashboard</h1>
          <RadialChart
            data={data}
            width={300}
            height={300}
            showLabels
            animation
          />
          <List items={items} />
        </div>
      </BurguerMenu>
    );
  }
}

export default Employees;
