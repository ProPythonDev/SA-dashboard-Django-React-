import React, {  Component } from "react";
import { connect } from "react-redux";

import Map from "../components/map";
import Sidebar from "../components/sidebar";
import Legend from "../components/legend";

const Main = class Main extends Component {
  render() {
    const mapStyler = {
      zindex: 0,
      width: "100%",
      height: "100%"
    };
    const screenFlexStyle = {
      display: "flex",
      flexDirection: 'row',
      width: "100%",
      height: "100%"
    };

    return (
      <div style={mapStyler}>
        <div style={screenFlexStyle}>     
          <Sidebar />
          <Map />
        </div>
        <Legend />
      </div>
    );
  }
};

export default connect()(Main);
