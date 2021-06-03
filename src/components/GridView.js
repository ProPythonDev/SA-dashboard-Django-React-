import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Collapsible from "react-collapsible";
import propsMapping from "./propsMapping";
import MetricDetails from "./MetricDetails";
import "../css/GridView.css"

const GridView = ({comparisonFeatures}) => {
  const comparisonFts = comparisonFeatures;

  const renderTable = (section) => {
    return (
      <div className="grid-container">
        {section.content.map((metric) => (
          <div key={metric.id} className="grid-item">
            <div className="grid-item-head">
              <h2>{metric.label}</h2>
            </div>
            <div className="grid-item-body">
              {comparisonFts.map(ft => 
                <MetricDetails key={ft.id} feature={ft} metric={metric} />
              )}
            </div>
          </div>
        ))}
      </div>
    )
  }
  
  return (
    <div className="grid-view">
      {propsMapping.map((section) => (
        <Collapsible trigger={section.title} key={section.title} open={true}>
          {renderTable(section)}
        </Collapsible>
      ))}
    </div>
  )
}

GridView.propTypes = {
  comparisonFeatures: PropTypes.array,
};

function mapStateToProps(state) {
  return {
    comparisonFeatures: state.comparisonFeatures,
  };
}

export default connect(mapStateToProps)(GridView);