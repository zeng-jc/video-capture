export function getCoordinate(
  leftX: number,
  TopY: number,
  width: number,
  height: number,
  widthScal: number,
  heightScal: number
) {
  const position = {
    topLeft: {
      sx:
        parseInt(leftX * widthScal) > 1080
          ? parseInt(leftX * widthScal) - 1
          : parseInt(leftX * widthScal),
      sy: Math.floor(TopY * heightScal)
    },
    topRight: {
      sx:
        parseInt((leftX + width) * widthScal) > 1080
          ? parseInt((leftX + width) * widthScal) - 1
          : parseInt((leftX + width) * widthScal),
      sy: Math.floor(TopY * heightScal)
    },
    bottomRight: {
      sx:
        parseInt((leftX + width) * widthScal) > 1080
          ? parseInt((leftX + width) * widthScal) - 1
          : parseInt((leftX + width) * widthScal),
      sy: Math.floor((TopY + height) * heightScal)
    },
    bottomLeft: {
      sx:
        parseInt(leftX * widthScal) > 1080
          ? parseInt(leftX * widthScal) - 1
          : parseInt(leftX * widthScal),
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
