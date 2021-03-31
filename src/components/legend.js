import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Dropdown } from "semantic-ui-react";
import * as Constants from "../constants";
import { setMapType } from "../redux/action-creators";

let Legend = class Legend extends React.Component {
  static propTypes = {
    active: PropTypes.object.isRequired,
    mapType: PropTypes.string.isRequired,
  };

  render() {
    const { description, stops } = this.props.active;

    const mapTypes = [
      {
        value: Constants.MAP_TYPE.GROWTH,
        text: "Mobility - GDP Growth Potential",
      },
      {
        value: Constants.MAP_TYPE.SEGREGATION,
        text: "Economic Segregation - Inequality Index",
      },
      {
        value: Constants.MAP_TYPE.TRANSACTIONS,
        text: "Financial Interactions - Growth Potential",
      },
    ];

    const renderLegendKeys = (stops) => {
      return (
        <div className="txt-m">
          <span
            className="h24 inline-block align-middle"
            style={{
              background: `linear-gradient(90deg, ${stops.map(
                (stop) => stop[1]
              )})`,
              width: "100%",
              borderRadius: "2px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {stops.map((stop, i) => {
                if (i !== 0 && i !== stops.length - 1) {
                  return (
                    <span
                      key={i}
                      style={{
                        borderLeft: "2px solid white",
                        height: "24px",
                        borderStyle: "dotted",
                      }}
                    />
                  );
                } else {
                  return (
                    <span
                      key={i}
                      style={{
                        borderLeft: "2px solid transparent",
                        height: "24px",
                      }}
                    />
                  );
                }
              })}
            </div>
          </span>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {stops.map((stop, i) => (
              <span key={i}> {stop[0].toLocaleString()} </span>
            ))}
          </div>
        </div>
      );
    };

    const mapTypeEvent = (e, { value }) => {
      setMapType(value);
    };

    return (
      <div className="bg-white absolute bottom left ml12 mb36 py12 px12 shadow-darken10 round z1 wmax220">
        <div className="mt6 mb12">
          <Dropdown
            defaultValue={mapTypes[0].value}
            selection
            options={mapTypes}
            onChange={mapTypeEvent}
          />
        </div>
        <div className="mb6">
          <p className="txt-s color-gray">{description}</p>
        </div>
        {renderLegendKeys(stops)}
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    active: state.active,
    mapType: state.mapType,
  };
}

Legend = connect(mapStateToProps)(Legend);

export default Legend;
