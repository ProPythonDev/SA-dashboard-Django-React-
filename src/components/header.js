import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { setHeaderOption } from "../redux/action-creators";

const Header = class Header extends Component {
  static propTypes = {
    path: PropTypes.string.isRequired,
  };

  render() {
    const { path } = this.props;

    const container = {
      width: "100%",
      height: "60px",
      background: "white",
      position: "fixed",
      zIndex: 3, // 2 for detail pane, 1 for footer logos
      top: 0,
    };
    const headerBox = {
      display: "flex",
      margin: "0 20px",
      alignItems: "center",
      height: "100%",
      justifyContent: "space-between",
    };
    const optionsBox = {
      display: "flex",
      height: "100%",
      flexDirection: "row",
    };
    const options = {
      display: "flex",
      alignItems: "center",
      margin: 0,
      padding: "0 15px",
      color: "black",
      fontSize: "1.3rem",
      fontWeight: "bold",
      cursor: "pointer",
      height: "100%",
    };
    const clicked = {
      display: "flex",
      alignItems: "center",
      fontSize: "1.3rem",
      fontWeight: "bold",
      margin: 0,
      padding: "0 15px",
      cursor: "pointer",
      height: "100%",
      color: "#f79640",
      borderBottom: "#f79640 solid 5px",
    };

    return (
      <div style={container}>
        <div style={headerBox}>
          <div
            className="toggle txt-m py3 toggle--active-white bg-orange"
            style={{ color: "white" }}
          >
            Atlas of Opportunity
          </div>
          <div style={optionsBox}>
            <Link
              to="/"
              style={path === "/" ? clicked : options}
              onClick={() => setHeaderOption("/")}
            >
              Map
            </Link>
            <Link
              to="/methods"
              style={path === "/methods" ? clicked : options}
              onClick={() => setHeaderOption("/methods")}
            >
              Methods
            </Link>
            <Link
              to="/research"
              style={path === "/research" ? clicked : options}
              onClick={() => setHeaderOption("/research")}
            >
              Research
            </Link>
            <Link
              to="/about"
              style={path === "/about" ? clicked : options}
              onClick={() => setHeaderOption("/about")}
            >
              About
            </Link>
            <Link
              to="/faq"
              style={path === "/faq" ? clicked : options}
              onClick={() => setHeaderOption("/faq")}
            >
              FAQ
            </Link>
          </div>
        </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    path: state.path,
  };
}

export default connect(mapStateToProps)(Header);