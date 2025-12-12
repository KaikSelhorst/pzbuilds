export const traitTypeEnum = ['POSITIVE', 'NEGATIVE'] as const

export type TraitTypeEnumInterface = (typeof traitTypeEnum)[number]
