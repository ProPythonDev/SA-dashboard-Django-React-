import React, { useCallback, useEffect, useMemo, useState } from "react"
import PropTypes from "prop-types"
import { useCombobox } from "downshift"
import { usePopper } from "react-popper"
import * as turf from "@turf/turf"

import useGeocoder from "../hooks/useGeocoder"
import { sameWidthModifier } from "../utils/popper-modifiers"
import { ReactComponent as SearchIcon} from "../assets/search-icons/search.svg"
import { ReactComponent as CancelIcon} from "../assets/search-icons/cancel.svg"

// TODO: Lift all of this styling into a separate file.
const containerStyle = {
  marginLeft: "10px",
  width: '305px',
}

const fieldStyle = {
  background: 'white',
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25), 0px -1px 0px rgba(0, 0, 0, 0.1)",
  pointerEvents: "auto",
  borderRadius: "5px",
  display: "flex",
  alignItems: "center",
}

const inputStyle = {
  background: "transparent",
  margin: 0,
  padding: "0px 15px",
  lineHeight: "40px",
  fontFamily: "Roboto, sans-serif",
  fontSize: 15,
  border: "none",
  flexGrow: 1,
}

const buttonStyle = {
  height: "40px",
  padding: "4px 15px 0 0",
}

const menuStyles = {
  maxHeight: "400px",
  overflowY: "auto",
  background: "white",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25), 0px -1px 0px rgba(0, 0, 0, 0.1)",
  borderRadius: "5px",
  marginTop: "10px",
}

const itemStyle = {
  padding: "12px 15px"
}

const primaryStyle = {
  fontSize: 16,
  fontWeight: 500
}

const secondaryStyle = {
  color: "#333333",
  fontSize: 14,
  marginTop: 6,
}

function SearchField({ localItems = [], geocoderConfig = {}, onSelectedItemChange, onHighlightedItemChange }) {
  // Set up popper-js
  const [referenceElement, setReferenceElement] = useState(null)
  const [popperElement, setPopperElement] = useState(null)
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    // Set the popper's width to match the search field
    modifiers: useMemo(
      () => [sameWidthModifier], []
    ),
    placement: "bottom-start"
  })

  // Set up downshift-js combobox / autocomplete
  // Default to showing all of the available options
  const [inputElement, setInputElement] = useState(null)
  const [inputItems, setInputItems] = useState([])
  const [highlightedItem, setHighlightedItem] = useState(null)
  const itemToString = item => (item ? item.primary : '')
  const {
    getComboboxProps,
    getInputProps,
    getItemProps,
    // getLabelProps,
    getMenuProps,
    getToggleButtonProps,
    highlightedIndex,
    inputValue,
    isOpen,
    openMenu,
    selectItem,
    // selectedItem,
  } = useCombobox({
    defaultHighlightedIndex: 0,
    items: inputItems,
    itemToString,
    onIsOpenChange: ({isOpen}) => {
      // Anything that would close the suggestion menu should cause the input
      // to lose focus too.
      if (!isOpen) {
        inputElement.blur()
        setHighlightedItem(null)
      } else {
        setHighlightedItem(inputItems[highlightedIndex])
      }
    },
    onSelectedItemChange,
    onHighlightedIndexChange: ({highlightedIndex, type}) => {
      switch (type) {
        // Ignore the hidden highlight change which occurs when selecting an
        // item and the menu closes.
        case useCombobox.stateChangeTypes.ItemClick:
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.FunctionSelectItem:
          break
        default:
          setHighlightedItem(inputItems[highlightedIndex])
      }
    }
  })

  useEffect(() => {
    if (typeof onHighlightedItemChange === "function") {
      onHighlightedItemChange({highlightedItem})
    }
  }, [highlightedItem, onHighlightedItemChange])

  // Set up geocoder
  const geocodedItems = useGeocoder({
    inputValue,
    config: geocoderConfig,
    onNewFeatures: useCallback((features) => (
      features.map((f) => {
        const localFeature = localItems.find(
          (item) => turf.booleanPointInPolygon(f.center, item)
        )
        return {
          ...localFeature,
          secondary: f.place_name,
        }
      })
    ), [localItems])
  })

  useEffect(() => {
    const query = inputValue.toLowerCase().replace(/\s+/g, ' ').replace(/(^\s+|\s+$)/g, '')
    if (query === '') {
      setInputItems(localItems.sort((a, b) => {a.primary.localeCompare(b.primary)}))
    } else {
      setInputItems([
          // Case-insensitive substring match
        ...localItems
          .filter(item => item.primary.toLowerCase().indexOf(query.toLowerCase()) !== -1)
          .sort((a, b) => {a.primary.localeCompare(b.primary)}),
        ...geocodedItems.sort((a, b) => {
          (b.relevance ?? 1.0) - (a.relevance ?? 1.0) ||
          a.primary.localeCompare(b.primary)
        })
      ])
    }
  }, [localItems, geocodedItems, inputValue])

  return (
    <div className="searchContainer" ref={setReferenceElement} style={containerStyle}>
      <div {...getComboboxProps()} className="searchField" style={fieldStyle}>
        {/* <label {...getLabelProps()}>Choose an element:</label> */}
        <input {...getInputProps({
          onFocus: () => {
                  if (!isOpen) {
                    openMenu()
                  }
                },
          placeholder: "Search by suburb or region",
          spellCheck: "disable",
          ref: setInputElement,
          })}
          style={inputStyle}
        />
        { inputValue === '' ?
          <button
            tabIndex={-1}
            {...getToggleButtonProps()}
            aria-label="toggle menu"
            style={buttonStyle}
          >
            <SearchIcon />
          </button>
          :
          <button
            tabIndex={-1}
            onClick={() => {
              selectItem(null)
            }}
            aria-label="clear selection"
            style={buttonStyle}
          >
            <CancelIcon />
          </button>
        }
        <div ref={setPopperElement} style={styles.popper} {...attributes.popper}>
          <ul {...getMenuProps()} hidden={!isOpen} style={menuStyles}>
            {isOpen &&
              inputItems.map((item, index) => (
                <li
                  style={{...itemStyle, 
                    ...(highlightedIndex === index
                      ? { backgroundColor: '#f2f2f2' }
                      : {})}
                  }
                  key={`${item}${index}`}
                  {...getItemProps({ item, index })}
                >
                  <div className="primary" style={primaryStyle}>{item.primary}</div>
                  <div className="secondary" style={secondaryStyle}>{item.secondary ?? "SA2 Region"}</div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

SearchField.propTypes = {
  geocoderConfig: PropTypes.object,
  localItems: PropTypes.arrayOf(PropTypes.object),
  onSelectedItemChange: PropTypes.func,
  onHighlightedItemChange: PropTypes.func,
}

export default SearchField;
