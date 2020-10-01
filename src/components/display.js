import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import * as Constants from "../constants";
import { setFlowDirection, setDisplayDefault } from "../redux/action-creators";

let Display = class Display extends React.Component {
  static propTypes = {
    active: PropTypes.object.isRequired,
    select: PropTypes.object.isRequired,
    mapType: PropTypes.string.isRequired, // one of { growth,segregation}
    flowDirection: PropTypes.string.isRequired,
  };

  onFlowChange = (e) => {
    console.log("Flow changed:", e);
    let direction = e.target.value;
    this.flowDirection = direction;
    console.log(direction);
    setFlowDirection(direction);
  };

  componentDidUpdate(prevProps) {
    // return display to default settings if we've changed map types
    if (this.props.mapType !== prevProps.mapType) {
      setDisplayDefault();
    }
  }

  render() {
    // const { name, description } = this.props.active;
    const {
      sa2_name,
      population,
      income,
      ggp,
      jr,
      bgi,
      sa1_codes,
      isDefault,
    } = this.props.select;
    const { flowDirection, mapType } = this.props;
    const PanelContainer = (props) => (
      <div className="flex-parent flex-parent--column flex-parent--space-between-main absolute top right w240 h-full pt60 pb36 mr12 z2">
        {props.children}
      </div>
    );
    const TopPanel = () => (
      <div
        style={{ overflowY: "auto" }}
        className="bg-white flex-child flex-child--grow mt30 mb24 shadow-darken10 w240"
      >
        <div className="py12 px12">
          <div className="mb6">
            <h2 className="txt-bold txt-l txt-uppercase block">{sa2_name}</h2>
          </div>
        </div>
        <div className="py12 px12 bg-orange-faint">
          <div className="mb6">
            <h2 className="txt-bold txt-m color-orange block">Population</h2>
            <p className="txt-s">{population}</p>
          </div>
          <div className="mb6">
            <h2 className="txt-bold txt-m color-orange block">Median Income</h2>
            <p className="txt-s">{income}</p>
          </div>
        </div>
        <div className="py12 px12">
          <div className="mb6">
            <h2 className="txt-bold txt-m block">GDP Growth Potential</h2>
            <p className="txt-s">{ggp}</p>
          </div>
          <div className="mb6">
            <h2 className="txt-bold txt-m block">Job Resilience</h2>
            <p className="txt-s">{jr}</p>
          </div>
          <div className="mb6">
            <h2 className="txt-bold txt-m block">Business Growth Index</h2>
            <p className="txt-s">{bgi}</p>
          </div>
          <div className="mb6">
            <h2 className="txt-bold txt-m block">Included SA1 Regions</h2>
            <p className="txt-s">{sa1_codes}</p>
          </div>
        </div>
      </div>
    );

    const BottomPanel = () => (
      <div className="bg-white flex-child flex-child--no-shrink shadow-darken10 w240">
        <div id="options" className="pb12 px12 bg-orange-faint">
          <form>
            <p className="pt6 txt-m txt-bold">Change flow direction</p>
            <div>
              <label className="p12 txt-s block">
                <input
                  type="radio"
                  name="flow"
                  value={Constants.FLOW_OUT}
                  checked={flowDirection === Constants.FLOW_OUT}
                  onChange={this.onFlowChange}
                />
                &nbsp;Outflow
              </label>
            </div>
            <div>
              <label className="p12 txt-s block">
                <input
                  type="radio"
                  name="flow"
                  value={Constants.FLOW_IN}
                  checked={flowDirection === Constants.FLOW_IN}
                  onChange={this.onFlowChange}
                />
                &nbsp;Inflow
              </label>
            </div>
            <div>
              <label className="p12 txt-s block">
                <input
                  type="radio"
                  name="flow"
                  value={Constants.FLOW_BI}
                  checked={flowDirection === Constants.FLOW_BI}
                  onChange={this.onFlowChange}
                />
                &nbsp;Bi-directional
              </label>
            </div>
          </form>
        </div>
        <div className="py12 px12">
          <p className="txt-s">
            Select a community to learn more about opportunity in that area.
          </p>
        </div>
      </div>
    );

    if (isDefault) {
      return (
        <div className="bg-white absolute bottom right mr12 mb36 shadow-darken10 z2 wmax240">
          <div className="py12 px12">
            <p className="txt-s">
              Select a community to learn more about opportunity in that area.
            </p>
          </div>
        </div>
      );
    }

    if (mapType === "growth") {
      console.log("returning panelcontainer");
      return (
        <PanelContainer>
          <TopPanel />
          <BottomPanel />
        </PanelContainer>
      );
    } else {
      return (
        <PanelContainer>
          <TopPanel />
        </PanelContainer>
      );
    }
  }
};

function mapStateToProps(state) {
  return {
    active: state.active,
    select: state.select,
    flowDirection: state.flowDirection,
    mapType: state.mapType,
  };
}

Display = connect(mapStateToProps)(Display);

export default Display;
