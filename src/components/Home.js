import React, { Component } from "react";
import { scaleRotate as Menu } from "react-burger-menu";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: {
        items: [
          <a key="0" href="">
            <i className="fa fa-fw fa-star-o" />
            <span>Talentos</span>
          </a>,
          <a key="1" href="">
            <i className="fa fa-fw fa-bell-o" />
            <span>Planos Contratuais</span>
          </a>,
          <a key="2" href="">
            <i className="fa fa-fw fa-bar-chart-o" />
            <span>Análise</span>
          </a>
        ]
      }
    };
  }

  render() {
    return (
      <div id="outer-container" style={{ height: "100%" }}>
        <Menu
          pageWrapId={"page-wrap"}
          outerContainerId={"outer-container"}
          left
        >
          {this.state.menu.items}
        </Menu>

        <main id="page-wrap">
          <h1>
            <a href="https://github.com/igoroctaviano/sige-rh">SIGE RH</a>
          </h1>
          <h2 className="description">
            Integração de Recursos Humanos como trabalho prático de Sistemas
            Integrados de Gestão Empresarial
          </h2>
          <nav>
            <a className="special-btn">API</a>
            <a className="special-btn">Respositório</a>
          </nav>
        </main>
      </div>
    );
  }
}

export default Home;
