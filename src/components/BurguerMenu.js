import React, { Component } from "react";
import { scaleRotate as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";

class BurguerMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: {
        items: [
          <a key="0" href="">
            <i className="fa fa-fw fa-star-o" />
            <Link to={"/"}>
              <span>Home</span>
            </Link>
          </a>,
          <a key="0" href="">
            <i className="fa fa-fw fa-star-o" />
            <Link to={"/talentos"}>
              <span>Talentos</span>
            </Link>
          </a>,
          <a key="1" href="">
            <i className="fa fa-fw fa-bar-chart-o" />
            <Link to={"/planos"}>
              <span>Planos Contratuais</span>
            </Link>
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
        <main id="page-wrap">{this.props.children}</main>
      </div>
    );
  }
}

export default BurguerMenu;
