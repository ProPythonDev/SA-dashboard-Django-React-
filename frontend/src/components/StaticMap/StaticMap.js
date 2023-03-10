import React, { useEffect, useCallback, useMemo, useRef, useState } from 'react'
import { generateSize, getScaleTranslation } from './StaticMap.utils'
import { geoMercator, geoPath } from 'd3-geo'
import { useTheme } from '@mui/system'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import PropTypes from 'prop-types'

const StaticMap = ({ geoJSON, square, height: mapHeight, areaId }) => {
  const theme = useTheme()
  const {
    background,
    selectedBgColor,
    selectedBorderColor,
    selectedBgOpacity,
    otherBgColor,
    otherBorderColor,
    strokeWidth,
  } = theme.components.StaticMap
  const ref = useRef(null)
  const [size, setSize] = useState(generateSize(ref, square, mapHeight))
  const { width, height } = size

  const location = useMemo(
    () =>
      geoJSON?.features?.filter(function (d) {
        return d.id === areaId
      })[0],
    [geoJSON, areaId],
  )

  const handleResize = useCallback(() => setSize(generateSize(ref, square, mapHeight)), [mapHeight, square])

  const getRef = useCallback(
    node => {
      if (node) {
        ref.current = node
        handleResize()
      }
    },
    [handleResize],
  )

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [square, mapHeight, handleResize])

  if (!geoJSON) {
    return null
  }

  if (!geoJSON?.features) {
    return (
      <Box
        sx={{
          overflow: 'hidden',
          background: '#F2F2F2',
          height: square ? 64 : height,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Typography variant="fieldValue">No data</Typography>
      </Box>
    )
  }
  const projection = geoMercator().fitSize([width, height], geoJSON)
  const pathGenerator = geoPath().projection(projection)
  projection.scale(1).translate([0, 0])
  const [s, t] = getScaleTranslation(pathGenerator, location, width, height)
  projection.scale(s).translate(t)
  const shouldRenderMap = width > 0 && height > 0
  return (
    <Box
      ref={getRef}
      sx={{
        overflow: 'hidden',
        background,
        height,
      }}>
      {shouldRenderMap && (
        <svg width={'100%'} height={'100%'}>
          <g fill={otherBgColor} stroke={otherBorderColor} fillOpacity={1} strokeWidth={strokeWidth}>
            {geoJSON?.features?.map((d, idx) =>
              d.id !== areaId ? <path key={'path' + idx} d={pathGenerator(d)} /> : null,
            )}
          </g>
          <g
            fill={selectedBgColor}
            stroke={selectedBorderColor}
            fillOpacity={selectedBgOpacity}
            strokeWidth={strokeWidth}>
            <path d={pathGenerator(geoJSON?.features.find(d => d.id === areaId))} />
          </g>
        </svg>
      )}
    </Box>
  )
}

StaticMap.propTypes = {
  geoJSON: PropTypes.object,
  square: PropTypes.bool,
  height: PropTypes.number,
  areaId: PropTypes.string.isRequired,
}

export default StaticMap
