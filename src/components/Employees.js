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
      chartDataPlans: [
        {
          angle: 1,
          label: "Alocados",
          subLabel: "Quantidade",
          radius: 1.1
        },
        { angle: 5, label: "Não alocados", radius: 1.2 },
        { angle: 2, label: "Aguardando alocação" }
      ],
      employees: [],
      plans: [],
      selectedEmployees: []
    };
  }

  getPlans() {
    fetch("https://sige-rh.herokuapp.com/plan")
      .then(response => response.json())
      .then(plans =>
        this.setState({
          plans: plans,
          chartDataPlans: [
            {
              angle: plans.reduce(
                (last, curr) => last + (curr.isApproved ? 1 : 0),
                0
              ),
              label: "Aprovados",
              subLabel: "Quantidade*",
              radius: 1.1,
              style: { fill: 'green', fillOpacity: 0.533, stroke: 0 }
            },
            {
              angle: plans.reduce(
                (last, curr) => last + (!curr.isApproved ? 1 : 0),
                0
              ),
              label: "Não aprovados",
              radius: 1.2,
              style: { fill: 'red', fillOpacity: 0.533, stroke: 0 }
            }
          ]
        })
      );
  }

  getEmployees() {
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
              subLabel: "Quantidade*",
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

  renderPlanFullItem(index, key) {
    console.log(index);
    const { plans } = this.state;
    return (
      <div
        style={{
          cursor: "pointer",
          padding: 5,
          borderRadius: 15,
          backgroundColor: `${index % 2 === 0 ? "rgb(195, 200, 221)" : ""}`
        }}
        key={key}
      >
        <p style={{ fontWeight: "bold" }}>
          {"Cliente: " + plans[index].client}
        </p>
        <p>
          {plans[index].isApproved ? "Está aprovado." : "Não está aprovado."}
        </p>
        <p>{"Salário: " + plans[index].salary}</p>
        <p>{"Registrado no banco em " + plans[index].registered}</p>
      </div>
    );
  }

  renderEmployeeFullItem(index, key) {
    console.log(index);
    const { employees } = this.state;
    return (
      <div
        style={{
          cursor: "pointer",
          padding: 5,
          borderRadius: 15,
          backgroundColor: `${index % 2 === 0 ? "rgb(195, 200, 221)" : ""}`
        }}
        key={key}
      >
        <p style={{ fontWeight: "bold" }}>
          {employees[index].name.first + " " + employees[index].name.last}
        </p>
        <p>
          {employees[index].isAllocated ? "Está alocado." : "Não está alocado."}
        </p>
        <p>{"Salário: " + employees[index].salary}</p>
        <p>{"Registrado no banco em " + employees[index].registered}</p>
        <p>{"Telefone: " + employees[index].phone}</p>
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

  componentDidMount() {
    this.getPlans();
    this.getEmployees();
  }

  render() {
    const {
      chartData,
      chartDataPlans,
      selectedEmployees,
      employees,
      plans
    } = this.state;

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
          <div style={{ display: "flex", flexDirection: "row", padding: 20 }}>
            <div>
              <h3>Talentos</h3>
              <RadialChart
                data={chartData}
                width={300}
                height={300}
                showLabels
                animation
              />
            </div>
            <div>
              <h3>Planos Contratuais</h3>
              <RadialChart
                data={chartDataPlans}
                width={300}
                height={300}
                showLabels
                animation
              />
            </div>
          </div>
          <h2>Requisição de Plano Contratual</h2>
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
          <div style={{ padding: 20, display: "flex", flexDirection: "row" }}>
            <div
              style={{
                padding: 10,
                overflow: "auto",
                height: "100%",
                maxHeight: 400,
                width: "100%"
              }}
            >
              <h2>Planos Contratuais</h2>
              <ReactList
                itemRenderer={this.renderPlanFullItem.bind(this)}
                length={plans.length - 1}
                type="uniform"
              />
            </div>
            <div
              style={{
                padding: 10,
                overflow: "auto",
                height: "100%",
                maxHeight: 400,
                width: "100%"
              }}
            >
              <h2>Talentos</h2>
              <ReactList
                itemRenderer={this.renderEmployeeFullItem.bind(this)}
                length={employees.length - 1}
                type="uniform"
              />
            </div>
          </div>
        </div>
      </BurguerMenu>
    );
  }
}

export default Employees;
