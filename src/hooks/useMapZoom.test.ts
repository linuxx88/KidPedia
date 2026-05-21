import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useMapZoom } from './useMapZoom'
import { MAP_SVG_CONFIG } from '../constants/geometry'

describe('useMapZoom', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('devrait initialiser avec le zoom x1 à l\'origine 0 0', () => {
    const { result } = renderHook(() => useMapZoom())
    expect(result.current.zoom).toBe(1)
    expect(result.current.origin).toBe('0 0')
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

  it('devrait diminuer le zoom jusqu\'au minimum et garder l\'origine à 0 0', () => {
    const { result } = renderHook(() => useMapZoom())
    
    // Zoomer à x2
    act(() => {
      result.current.handleZoomAt();
    });

    expect(result.current.zoom).toBe(2)
    expect(result.current.origin).toBe('0 0')

    // Dézoomer à x1
    act(() => { result.current.zoomOut() })
    expect(result.current.zoom).toBe(1)
    expect(result.current.origin).toBe('0 0')
  })

  it('devrait réinitialiser totalement l\'état avec resetZoom', () => {
    const { result } = renderHook(() => useMapZoom())
    
    act(() => { result.current.zoomIn() })
    act(() => { result.current.resetZoom() })

    expect(result.current.zoom).toBe(1)
    expect(result.current.origin).toBe('0 0')
  })

  it('devrait forcer l\'origine à 0 0 lors d\'un clic', () => {
    const { result } = renderHook(() => useMapZoom())
    
    act(() => {
      result.current.handleZoomAt();
    });

    expect(result.current.zoom).toBe(2)
    expect(result.current.origin).toBe('0 0')
  })
})
