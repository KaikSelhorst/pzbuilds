import type { useRender } from '@base-ui-components/react'
import { mergeProps } from '@base-ui-components/react'

import React from 'react'

export function mergeElementProps<T extends object, P extends object>(
  asChild: boolean,
  children: React.ReactNode,
  defaultProps: T,
  props: P,
) {
  if (asChild && React.isValidElement(props)) {
    return mergeProps(defaultProps, props)
  }

  return mergeProps(defaultProps, { ...props, children })
}

type Render = useRender.RenderProp | undefined

export function renderElement(
  asChild: boolean,
  children: React.ReactNode,
  fallbackElement: React.JSX.Element | Render,
) {
  if (asChild && React.isValidElement(children)) {
    return children
  }

  return fallbackElement
}
