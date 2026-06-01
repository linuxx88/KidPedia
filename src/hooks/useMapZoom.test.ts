import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useMapZoom } from './useMapZoom'
import { MAP_SVG_CONFIG } from '../constants/geometry'

describe('useMapZoom', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('devrait initialiser avec le zoom x1', () => {
    const { result } = renderHook(() => useMapZoom())
    expect(result.current.zoom).toBe(1)
    expect(result.current.isMin).toBe(true)
  })

  it('devrait augmenter le zoom jusqu\'au maximum', () => {
    const { result } = renderHook(() => useMapZoom())
    
    act(() => { result.current.zoomIn() })
    expect(result.current.zoom).toBe(2)
    
    act(() => { result.current.zoomIn() })
    expect(result.current.zoom).toBe(MAP_SVG_CONFIG.MAX_ZOOM)
    expect(result.current.isMax).toBe(true)

    // Ne doit pas dépasser le max
    act(() => { result.current.zoomIn() })
    expect(result.current.zoom).toBe(MAP_SVG_CONFIG.MAX_ZOOM)
  })

  it('devrait diminuer le zoom jusqu\'au minimum', () => {
    const { result } = renderHook(() => useMapZoom())
    
    // Zoomer à x2
    act(() => { result.current.zoomIn() })
    expect(result.current.zoom).toBe(2)

    // Dézoomer à x1
    act(() => { result.current.zoomOut() })
    expect(result.current.zoom).toBe(1)
    expect(result.current.isMin).toBe(true)
  })

  it('devrait réinitialiser totalement l\'état avec resetZoom', () => {
    const { result } = renderHook(() => useMapZoom())
    
    act(() => { result.current.zoomIn() })
    act(() => { result.current.resetZoom() })

    expect(result.current.zoom).toBe(1)
  })
})

