import React, { Component } from "react";

import BurguerMenu from "./BurguerMenu";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  postEmployees() {
    fetch("https://cc21633f.ngrok.io/vagas", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: {
        id: "teste",
        employees: ["asdadsd", "asdasdasd"]
      }
    }).then(e => console.log(e.json()));
  }

  render() {
    return (
      <BurguerMenu>
        <button onClick={this.postEmployees.bind(this)}>Post employee</button>
        <h1>
          <a href="https://github.com/igoroctaviano/sige-rh">SIGE RH</a>
        </h1>
        <h2 className="description">
          Integração de Recursos Humanos como trabalho prático de Sistemas
          Integrados de Gestão Empresarial
        </h2>
        <nav>
          <a
            className="special-btn"
            target={"_blank"}
            href={"https://github.com/igoroctaviano/sige-rh"}
          >
            API
          </a>
          <a
            className="special-btn"
            target={"_blank"}
            href={"https://github.com/igoroctaviano/sige-rh-react"}
          >
            Versionamento
          </a>
        </nav>
      </BurguerMenu>
    );
  }
}

export default Home;
