import React, { Component } from "react";
import { RadialChart } from "react-vis";
import ReactList from "react-list";

import "../../node_modules/react-vis/dist/style.css";

import BurguerMenu from "./BurguerMenu";

class Employees extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chartData: [
        { angle: 1, label: "Alocados", subLabel: "Quantidade", radius: 1.1 },
        { angle: 5, label: "Não alocados", radius: 1.2 },
        { angle: 2, label: "Aguardando alocação" }
      ],
      employees: [],
      selectedEmployees: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:10010/employee")
      .then(response => response.json())
      .then(employees => this.setState({ employees: employees }))
      .catch(error =>
        console.log(
          "Ops! Something went wrong when trying to fetch employees! Look: " +
            error.message
        )
      );
  }

  renderEmployeeItem(index, key) {
    const { employees } = this.state;
    return (
      <div
        style={{ cursor: "pointer", paddingBottom: 2 }}
        key={key}
        onClick={() => this.selectEmployee(employees[index])}
      >
        {employees[index].name.first + " " + employees[index].name.last}
        <a
          style={{
            padding: 15,
            backgroundColor: "transparent",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold"
          }}
          onClick={() => this.unselectEmployee(index)}
        >
          x
        </a>
      </div>
    );
  }

  renderSelectedEmployeeItem(index, key) {
    const { selectedEmployees } = this.state;
    return (
      <div key={key}>
        {selectedEmployees[index].name.first + " " + selectedEmployees[index].name.last}
        <a
          style={{
            padding: 15,
            backgroundColor: "transparent",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold"
          }}
          onClick={() => this.unselectEmployee(index)}
        >
          x
        </a>
      </div>
    );
  }

  selectEmployee(employee) {
    var employees = this.state.selectedEmployees;
    employees.push(employee);
    this.setState({
      selectedEmployees: employees
    });
  }

  unselectEmployee(index) {
    var employees = this.state.selectedEmployees;
    employees.splice(index, 1);
    this.setState({
      selectedEmployees: employees
    });
  }

  render() {
    const { chartData, selectedEmployees, employees } = this.state;

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
            data={chartData}
            width={300}
            height={300}
            showLabels
            animation
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              padding: 10,
              backgroundColor: "rgb(18, 147, 154)",
              borderRadius: 10
            }}
          >
            <div style={{ padding: 10, overflow: "auto", maxHeight: 400 }}>
              <h3>Talentos</h3>
              <ReactList
                itemRenderer={this.renderEmployeeItem.bind(this)}
                length={employees.length}
                type="uniform"
              />
            </div>
            <div style={{ padding: 10, overflow: "auto", maxHeight: 400 }}>
              <h3>Seleção</h3>
              {selectedEmployees.length > 0 ? (
                <ReactList
                  itemRenderer={this.renderSelectedEmployeeItem.bind(this)}
                  length={selectedEmployees.length}
                  type="uniform"
                />
              ) : (
                <p>Talentos ainda não selecionados.</p>
              )}
            </div>
          </div>
          <a className="special-btn" onClick={() => console.log('')}>
            Enviar requisição
          </a>
        </div>
      </BurguerMenu>
    );
  }
}

export default Employees;
