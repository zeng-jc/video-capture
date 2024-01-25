export function getCoordinate(leftX: number, TopY: number, width: number, height: number) {
  const position = {
    topLeft: {
      sx: leftX,
      sy: TopY
    },
    topRight: {
      sx: leftX + width,
      sy: TopY
    },
    bottomRight: {
      sx: leftX + width,
      sy: TopY + width
    },
    bottomLeft: {
      sx: leftX,
      sy: TopY + height
    }
  }
  return position
}

export function getTranslate(transform: string) {
  const matrix = new WebKitCSSMatrix(transform)
  return {
    x: matrix.m41 <= 0 ? 0 : Math.round(matrix.m41),
    y: matrix.m42 <= 0 ? 0 : Math.round(matrix.m42)
  }
}
