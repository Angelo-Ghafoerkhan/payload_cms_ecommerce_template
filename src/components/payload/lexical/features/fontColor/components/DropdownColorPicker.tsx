'use client'

import React, { useState } from 'react'
import { ColorPicker } from './ColorPicker'

import { FontColorIcon } from '../icons/FontColorIcon'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { $patchStyleText } from '@lexical/selection'
import { $getSelection, $isRangeSelection, LexicalEditor } from 'lexical'
import { translateColor } from '../utils/translateColor'
import { ToolbarGroupItem } from '@payloadcms/richtext-lexical'

interface DropdownColorPickerProps {
  active?: boolean
  anchorElem: HTMLElement
  editor: LexicalEditor
  enabled?: boolean
  item: ToolbarGroupItem
}

export const DropdownColorPicker: React.FC<DropdownColorPickerProps> = ({ anchorElem, editor }) => {
  const [fontColor, setFontColor] = useState<string | undefined>('')
  const [CSSVariable, setCSSVariable] = useState<string | null>(null)
  const selectionColor = '#B2FFD6'
  function getNodeStyles(node: HTMLElement) {
    const computedStyle = getComputedStyle(node)
    return {
      color: computedStyle.color,
    }
  }
  const setNodesDefaultColor = () => {
    editor.update(() => {
      const selection = $getSelection()
      if (!selection) return
      const nodes = selection.getNodes()
      // Check each node for the default color
      interface NodeWithKey {
        getKey(): string
      }
      const defaultColor = nodes.reduce<string | undefined>(
        (acc: string | undefined, node: NodeWithKey) => {
          const domNode = editor.getElementByKey(node.getKey()) as HTMLElement | null
          if (domNode) {
            const HEXcolor: string = translateColor(getNodeStyles(domNode).color, 'HEX')
            // If its the first node, set the default color
            if (acc === '') {
              acc = HEXcolor
              return acc
              // If its not the first node, check if the color is the same
            } else if (acc === HEXcolor) {
              return acc
              // The color is not the same as the first node, so return the default color
              // Meaning there are multiple nodes with different colors
            } else {
              return undefined
            }
          }
          return acc
        },
        '',
      )
      setFontColor(defaultColor)
    })
  }
  const applyStyleTextToNodes = (styles: Record<string, string | null>) => {
    editor.update(() => {
      const selection = $getSelection()
      if ($isRangeSelection(selection)) {
        $patchStyleText(selection, styles)
      }
    })
  }
  const onModalClose = () => {
    if (fontColor) {
      applyStyleTextToNodes({
        color: CSSVariable ?? fontColor,
        'background-color': null,
        'padding-bottom': null,
      })
      // Replace the nodes with the default ones
    } else {
      applyStyleTextToNodes({
        color: '#000000',
        'background-color': null,
        'padding-bottom': null,
      })
    }
  }
  const onModalOpen = () => {
    setNodesDefaultColor()
    // Apply false styling if focus is lost from Lexcal
    applyStyleTextToNodes({
      'background-color': selectionColor,
      color: '#000000',
      'padding-bottom': '1px',
    })
  }
  const handleOpenChange = (open: boolean) => {
    if (open) onModalOpen()
    else onModalClose()
  }
  const handleFontColorChange = (color: string, cssVariableColor?: string) => {
    if (cssVariableColor) setCSSVariable(cssVariableColor)
    else setCSSVariable(null)
    setFontColor(color)
  }
  return (
    <DropdownMenu onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger className="toolbar-popup__button toolbar-popup__button-bold">
        <FontColorIcon underscoreColor={fontColor} />
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top">
        <ColorPicker
          onApplyStyles={() =>
            applyStyleTextToNodes({
              color: (CSSVariable ?? fontColor) ? (fontColor as string) : null,
              'background-color': null,
              'padding-bottom': null,
            })
          }
          fontColor={fontColor}
          onFontColorChange={handleFontColorChange}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DropdownColorPicker
