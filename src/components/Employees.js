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
    fetch("https://sige-rh.herokuapp.com/employee")
      .then(response => response.json())
      .then(employees =>
        this.setState({
          employees: employees,
          chartData: [
            {
              angle: employees.reduce(
                (last, curr) => last + (curr.isAllocated ? 1 : 0),
                0
              ),
              label: "Alocados",
              subLabel: "Quantidade",
              radius: 1.1
            },
            {
              angle: employees.reduce(
                (last, curr) => last + (!curr.isAllocated ? 1 : 0),
                0
              ),
              label: "Não alocados",
              radius: 1.2
            }
          ]
        })
      )
      .catch(error =>
        console.log(
          "Ops! Something went wrong when trying to fetch employees! Look: " +
            error.message
        )
      );
  }

  renderEmployeeFullItem(index, key) {
    console.log(index);
    const { employees } = this.state;
    return (
      <div style={{ cursor: "pointer", padding: 5, borderRadius: 15, backgroundColor: `${ index % 2 == 0 ? 'rgb(195, 200, 221)' : '' }` }} key={key}>
        <p style={{ fontWeight: "bold" }}>
          {employees[index].name.first + " " + employees[index].name.last}
        </p>
        <p>{employees[index].salary}</p>
        <p>{employees[index].registered}</p>
        <p>{employees[index].phone}</p>
        <p>{employees[index].type}</p>
      </div>
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
      </div>
    );
  }

  renderSelectedEmployeeItem(index, key) {
    const { selectedEmployees } = this.state;
    return (
      <div key={key}>
        {selectedEmployees[index].name.first +
          " " +
          selectedEmployees[index].name.last}
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

    console.log(employees);

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
                length={employees.length - 1}
                type="uniform"
              />
            </div>
            <div style={{ padding: 10, overflow: "auto", maxHeight: 400 }}>
              <h3>Seleção</h3>
              {selectedEmployees.length > 0 ? (
                <ReactList
                  itemRenderer={this.renderSelectedEmployeeItem.bind(this)}
                  length={selectedEmployees.length - 1}
                  type="uniform"
                />
              ) : (
                <p>Talentos ainda não selecionados.</p>
              )}
            </div>
          </div>
          <a className="special-btn" onClick={() => console.log("")}>
            Enviar requisição
          </a>
          <div style={{ padding: 20 }}>
            <h2>Talentos</h2>
          </div>
          <div style={{ padding: 10, overflow: "auto", height: '100%', maxHeight: 400, width: '100%' }}>
            <ReactList
              itemRenderer={this.renderEmployeeFullItem.bind(this)}
              length={employees.length - 1}
              type="uniform"
            />
          </div>
        </div>
      </BurguerMenu>
    );
  }
}

export default Employees;
