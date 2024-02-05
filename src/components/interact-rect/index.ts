export function getCoordinate(
  leftX: number,
  TopY: number,
  width: number,
  height: number,
  widthScal: number,
  heightScal: number,
  videoWidth: number,
  videoHeight: number
) {
  const position = {
    topLeft: {
      sx: leftX * widthScal,
      sy: Math.floor(TopY * heightScal)
    },
    topRight: {
      sx:
        (leftX + width) * widthScal > videoWidth
          ? videoWidth
          : Math.floor((leftX + width) * widthScal),
      sy: Math.floor(TopY * heightScal)
    },
    bottomRight: {
      sx: (leftX + width) * widthScal,
      sy: Math.floor((TopY + height) * heightScal)
    },
    bottomLeft: {
      sx: leftX * widthScal > videoWidth ? videoWidth : Math.floor(leftX * widthScal),
      sy: Math.floor((TopY + height) * heightScal)
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
