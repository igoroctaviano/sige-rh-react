import React, { Component } from "react";

class EmployeeListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hover: false
    };
  }

  toggleHover() {
    this.setState({ hover: !this.state.hover });
  }

  render() {
    const employee = this.props.employee;

    return (
      <li
        onMouseEnter={this.toggleHover.bind(this)}
        onMouseLeave={this.toggleHover.bind(this)}
        style={{ color: this.state.hover ? "black" : "white" }}
      >
        <img src="" alt=""/>
        {`${employee.name.first} ${employee.name.last}`}
      </li>
    );
  }
}

export default EmployeeListItem;
