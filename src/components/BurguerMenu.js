import React, { Component } from "react";
import { scaleRotate as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";

class BurguerMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: {
        items: [
          <Link key={"home"} to={"/"}>
            <i className="fa fa-fw fa-star-o" />
            <span>Home</span>
          </Link>,
          <Link key={"analise"} to={"/vagas"}>
            <i className="fa fa-fw fa-bar-chart-o" />
            <span>Vagas</span>
          </Link>,
          <Link key={"talentos"} to={"/talentos"}>
            <i className="fa fa-fw fa-star-o" />
            <span>Talentos</span>
          </Link>,
          <Link key={"planos"} to={"/planos"}>
            <i className="fa fa-fw fa-bar-chart-o" />
            <span>Planos Contratuais</span>
          </Link>,
          <Link key={"analise"} to={"/planos"}>
            <i className="fa fa-fw fa-bar-chart-o" />
            <span>Análise</span>
          </Link>
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
        <main id="page-wrap">{this.props.children}</main>
      </div>
    );
  }
}

export default BurguerMenu;
