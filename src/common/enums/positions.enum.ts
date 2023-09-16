export const PositionsEnum = {
  DESIGNER: 1,
  SECURITY: 2,
  CONTENT_MANGER: 3,
  LAWYER: 4,
} as const;

type TypeExtractor<T> = T[keyof T];

export type PositionsEnum = TypeExtractor<typeof PositionsEnum>;
export const PositionsInfo = {
  DESIGNER: {
    name: 'Designer',
    id: PositionsEnum.DESIGNER,
  },
  SECURITY: {
    name: 'Designer',
    id: PositionsEnum.SECURITY,
  },
  CONTENT_MANGER: {
    name: 'Designer',
    id: PositionsEnum.CONTENT_MANGER,
  },
  LAWYER: {
    name: 'Designer',
    id: PositionsEnum.LAWYER,
  },
};
