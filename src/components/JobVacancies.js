import React, { Component } from "react";
import ReactList from "react-list";

import BurguerMenu from "./BurguerMenu";

class JobVacancies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedEmployeeTypes: [],
      employeeTypes: []
    };
  }

  componentDidMount() {
    fetch("https://sige-rh.herokuapp.com/employee/type")
      .then(data => data.json())
      .then(employeeTypes => this.setState({ employeeTypes: employeeTypes }))
      .catch(error =>
        console.log(
          "Ops! Something went wrong while trying to fetch the employee types! Look: " +
            error.message
        )
      );
  }

  sendJobVacancies() {
    const { selectedEmployeeTypes } = this.state;
    fetch("https://sige-rh.herokuapp.com/announcement", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: JSON.stringify({
        employeeTypes: selectedEmployeeTypes
      })
    });
  }

  renderEmployeeTypeItem(index, key) {
    const { employeeTypes } = this.state;
    return (
      <div
        style={{ cursor: "pointer", paddingBottom: 2 }}
        key={key}
        onClick={() => this.selectEmployeeType(employeeTypes[index])}
      >
        {employeeTypes[index].title}
        <a
          style={{
            padding: 15,
            backgroundColor: "transparent",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold"
          }}
          onClick={() => this.unselectEmployeeType(index)}
        >
          x
        </a>
      </div>
    );
  }

  renderSelectedEmployeeTypeItem(index, key) {
    const { selectedEmployeeTypes } = this.state;
    return (
      <div key={key}>
        {selectedEmployeeTypes[index].title}
        <a
          style={{
            padding: 15,
            backgroundColor: "transparent",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold"
          }}
          onClick={() => this.unselectEmployeeType(index)}
        >
          x
        </a>
      </div>
    );
  }

  selectEmployeeType(employeeType) {
    var employeeTypes = this.state.selectedEmployeeTypes;
    employeeTypes.push(employeeType);
    this.setState({
      selectedEmployeeTypes: employeeTypes
    });
  }

  unselectEmployeeType(index) {
    var employeeTypes = this.state.selectedEmployeeTypes;
    employeeTypes.splice(index, 1);
    this.setState({
      selectedEmployeeTypes: employeeTypes
    });
  }

  render() {
    const { employeeTypes, selectedEmployeeTypes } = this.state;

    return (
      <BurguerMenu>
        <h1>Vagas</h1>
        <h2>Requisição de Plano de Divulgação</h2>
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
            <h3>Tipos</h3>
            <ReactList
              itemRenderer={this.renderEmployeeTypeItem.bind(this)}
              length={employeeTypes.length - 1}
              type="uniform"
            />
          </div>
          <div style={{ padding: 10, overflow: "auto", maxHeight: 400 }}>
            <h3>Seleção</h3>
            {selectedEmployeeTypes.length > 0 ? (
              <ReactList
                itemRenderer={this.renderSelectedEmployeeTypeItem.bind(this)}
                length={selectedEmployeeTypes.length - 1}
                type="uniform"
              />
            ) : (
              <p>Tipos ainda não selecionados.</p>
            )}
          </div>
        </div>
        <a className="special-btn" onClick={this.sendJobVacancies.bind(this)}>
          Enviar requisição
        </a>
      </BurguerMenu>
    );
  }
}

export default JobVacancies;
