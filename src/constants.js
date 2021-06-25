export const SET_ACTIVE_OPTION = "SET_ACTIVE_OPTION";
export const SET_SELECT = "SET_SELECT";
export const HIDE_SIDEBAR_DIALOG = "HIDE_SIDEBAR_DIALOG";
export const SET_FLOW_DIRECTION = "SET_FLOW_DIRECTION";
export const SET_SEARCH_BAR_INFO = "SET_SEARCH_BAR_INFO";
export const SET_SIDEBAR = "SET_SIDEBAR";
export const CLICKEDSA2 = "CLICKEDSA2";
export const CLICKEDFEATURES = "CLICKEDFEATURES";
export const GEOCODER = "GEOCODER";
export const SET_SELECTED_FEATURE = "SET_SELECTED_FEATURE";
export const SET_HIGHLIGHTED_FEATURE = "SET_HIGHLIGHTED_FEATURE";
export const ADD_COMPARISON_FEATURE = "ADD_COMPARISON_FEATURE";
export const REMOVE_COMPARISON_FEATURE = "REMOVE_COMPARISON_FEATURE";
export const UPDATE_COLLAPSIBLE_STATE = "UPDATE_COLLAPSIBLE_STATE";
export const SET_HAMBURGER_MENU_OPEN = "SET_HAMBURGER_MENU_OPEN";
export const SET_COMPARISON_TYPE = "SET_COMPARISON_TYPE";
export const SET_SAVED_MAP_POSITION = "SET_SAVED_MAP_POSITION";

export const MAP_TYPE = {
  GROWTH: "growth",
  TRANSACTIONS: "transactions",
  SEGREGATION: "segregation",
};

export const COMPARISON_TYPE = {
  TABLE: "table",
  GRID: "grid",
};

export const FLOW_IN = "inflow";
export const FLOW_OUT = "outflow";
export const FLOW_BI = "bidirectional";
export const RECOMMENDATION_DUMMY_DATA = [
  {
    title: "Your Business",
    description: "We will ask you a few questions about your business needs, and then provide location recommendations based on your answers.",
    questions: [
    {
      type: "multiple_choice",
      question: "What type of business is it?",
      key: "type",
      answers: ["B2B", "B2C", "Both"]
    },
    {
      type: "select",
      question: "What kind of business are you looking to open?",
      placeholder: "Select Business Category",
      key: "business_category",
      answers: ["Category 1", "Category 2", "Category 3"]
    },
    {
      type: "select",
      question: "",
      placeholder: "Select Business Subcategory",
      key: "business_subcategory",
      answers: ["Category 1", "Category 2", "Category 3"]
    },
    {
      type: "select",
      question: "What type of location do you have in mind?",
      placeholder: "Select Location Type",
      key: "location_type",
      answers: ["Location 1", "Location 2", "Location 3"]
    },
    {
    type:"slider",
    question: "What is the value of this slider",
    key: "slider_test",
    answers: ["0", "20", "40", "60", "80", "100"]
    }
  ]
  },
  {
    title: "Your Customers",
    description: "",
    questions: [
      {
      type: "checkbox",
      question: "What characteristics describe your typical customers?",
      hint: "Select all that apply",
      key: "characteristics",
      answers: ["Tourists", "Locals", "One-off Purchases", "Repeat Customers", "Culturally Diverse"]
    },
    {
      type: "checkbox",
      question: "What's their typical household income?",
      hint: "Select all that apply",
      key: "household_income",
      answers: ["Low", "Medium", "High", "Not Sure"]
    }
  ]
  },
  {
    title: "Premises",
    description: "",
    questions: [
      {
        type: "multiple_choice",
        question: "What about commercial premises leasing expenses?",
        key: "commercial_premises",
        answers: ["I have a limited budget", "Willing to look at locations that can justify the rent with profitable business returns.", "Leasing a premises is not a concern for me."]
      }
    ]
  }
]