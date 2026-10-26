import React from 'react'

/*
  Custom cursor for mouse users: a dot plus a trailing ring.
  - Over links/buttons the ring grows.
  - Elements with data-cursor="Label" also show a small label.
  - Elements with data-cursor-color="var(--k)" fill the ring with that colour.
  Touch devices and reduced-motion users keep the normal cursor / get no trailing.
*/
export default function Cursor() {
  const dot = React.useRef(null)
  const ring = React.useRef(null)
  const label = React.useRef(null)

  React.useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const root = document.documentElement
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    root.classList.add('has-cursor')

    let x = -100, y = -100, rx = -100, ry = -100, raf = 0, seen = false

    const paint = () => {
      dot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
      label.current.style.transform = `translate3d(${x + 22}px, ${y + 24}px, 0)`
      ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`
    }
    const tick = () => {
      raf = 0
      const k = reduce ? 1 : 0.2
      rx += (x - rx) * k
      ry += (y - ry) * k
      paint()
      if (Math.abs(x - rx) > 0.1 || Math.abs(y - ry) > 0.1) raf = requestAnimationFrame(tick)
    }

    const onMove = e => {
      x = e.clientX
      y = e.clientY
      if (!seen) {
        seen = true
        rx = x
        ry = y
        root.classList.add('cursor-on')
      }
      if (!raf) raf = requestAnimationFrame(tick)
      dot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
      label.current.style.transform = `translate3d(${x + 22}px, ${y + 24}px, 0)`
    }

    const onOver = e => {
      const el = e.target instanceof Element
        ? e.target.closest('[data-cursor], a, button, [role="button"]')
        : null
      const r = ring.current
      const l = label.current
      if (!el) {
        r.dataset.state = ''
        r.style.removeProperty('--cur')
        l.textContent = ''
        l.classList.remove('show')
        return
      }
      const text = el.getAttribute('data-cursor')
      const color = el.getAttribute('data-cursor-color')
      r.dataset.state = color ? 'color' : 'link'
      if (color) r.style.setProperty('--cur', color)
      else r.style.removeProperty('--cur')
      l.textContent = text || ''
      l.classList.toggle('show', Boolean(text))
    }

    const onLeave = () => { seen = false; root.classList.remove('cursor-on') }
    const onDown = () => ring.current?.classList.add('is-down')
    const onUp = () => ring.current?.classList.remove('is-down')

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      if (raf) cancelAnimationFrame(raf)
      root.classList.remove('has-cursor', 'cursor-on')
    }
  }, [])

  return (
    <>
      <div className="cursor-ring" ref={ring} aria-hidden="true"><i /></div>
      <div className="cursor-dot" ref={dot} aria-hidden="true"><i /></div>
      <div className="cursor-label" ref={label} aria-hidden="true" />
    </>
  )
}
