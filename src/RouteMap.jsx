import React from 'react'

/*
  The hero graphic: four project lines travel left to right, share interchange
  stations (tools several projects use) and end at "Production".
  Order top to bottom matches the order at the shared bundle: K, J, T, C.
*/
const LINES = [
  { id: 'k', project: 'kubernetes', letter: 'K', name: 'Kubernetes', y: 50, d: 'M40 50 H250 L350 150 H1050' },
  { id: 'j', project: 'jenkins', letter: 'J', name: 'Jenkins', y: 125, d: 'M40 125 H190 L237 172 H1050' },
  { id: 't', project: 'terraform', letter: 'T', name: 'Terraform', y: 260, d: 'M40 260 H190 L256 194 H1050' },
  { id: 'c', project: 'cloudplay', letter: 'C', name: 'CloudPlay', y: 335, d: 'M40 335 H250 L369 216 H1050' },
]

// Interchange stations on the shared bundle (lines sit at y = 150, 172, 194, 216).
const STATIONS = [
  { x: 480, label: 'GitHub', from: 150, to: 216 },
  { x: 630, label: 'Docker', from: 150, to: 172 },
  { x: 790, label: 'Monitoring', from: 150, to: 194 },
  { x: 950, label: 'AWS', from: 150, to: 216 },
]

const TRAIN_PATH = LINES[0].d

export default function RouteMap() {
  const [hover, setHover] = React.useState(null)
  const [animate] = React.useState(
    () => typeof window === 'undefined' || !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  return (
    <figure className="map">
      <div className="map-scroll" tabIndex={0} role="group" aria-label="Route map, scrollable">
        <svg
          viewBox="0 0 1240 380"
          role="img"
          aria-labelledby="map-title"
          className={animate ? 'route-map is-animated' : 'route-map'}
          data-hover={hover || undefined}
        >
          <title id="map-title">
            Route map. The Kubernetes, Jenkins, Terraform and CloudPlay lines share the GitHub, Docker,
            Monitoring and AWS stations and end at Production.
          </title>

          {/* lines: each line (path + badge + name) is a link to its project */}
          {LINES.map((line, i) => (
            <a
              key={line.id}
              href={`#project-${line.project}`}
              className={`line-link${hover === line.id ? ' is-hover' : ''}`}
              data-cursor="Open project"
              data-cursor-color={`var(--${line.id})`}
              aria-label={`${line.name} line: jump to the ${line.name} project`}
              onMouseEnter={() => setHover(line.id)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(line.id)}
              onBlur={() => setHover(null)}
            >
              <path
                className="route"
                pathLength="1"
                d={line.d}
                style={{ stroke: `var(--${line.id})`, '--i': i }}
              />
              <g className="map-badge">
                <circle cx="40" cy={line.y} r="19" style={{ fill: `var(--${line.id})` }} />
                <text
                  x="40"
                  y={line.y + 7}
                  textAnchor="middle"
                  className="badge-letter"
                  style={{ fill: line.id === 'c' ? 'var(--ink)' : '#fff' }}
                >
                  {line.letter}
                </text>
                <text x="70" y={line.y - 20} className="line-name">
                  {line.name}
                </text>
              </g>
            </a>
          ))}

          {/* interchange stations */}
          {STATIONS.map(s => (
            <g key={s.label} className="station-group">
              <rect
                className="capsule"
                x={s.x - 10}
                y={s.from - 10}
                width="20"
                height={s.to - s.from + 20}
                rx="10"
              />
              <text x={s.x} y={s.from - 24} textAnchor="middle" className="station-name">
                {s.label}
              </text>
            </g>
          ))}

          {/* terminus */}
          <g className="terminus">
            <circle className="arrive-ring" cx="1050" cy="183" r="46" />
            <rect className="capsule capsule-end" x="1038" y="138" width="24" height="90" rx="12" />
            <text x="1084" y="192" className="terminus-name">
              Production
            </text>
          </g>

          {/* data packets keep flowing along every line once the intro has finished */}
          {animate && (
            <g className="packets" pointerEvents="none">
              {LINES.map((line, li) =>
                [0, 1].map(n => (
                  <circle key={`${line.id}-${n}`} r="5.5" className="packet" opacity="0">
                    <set attributeName="opacity" to="1" begin={`${3.5 + li * 1.1 + n * 4.5}s`} fill="freeze" />
                    <animateMotion
                      dur="9s"
                      begin={`${3.5 + li * 1.1 + n * 4.5}s`}
                      repeatCount="indefinite"
                      path={line.d}
                    />
                  </circle>
                ))
              )}
            </g>
          )}

          {/* the deploy train: runs once, from the Kubernetes line to Production */}
          {animate && (
            <g className="train" opacity="0">
              <set attributeName="opacity" to="1" begin="2.6s" fill="freeze" />
              <set attributeName="opacity" to="0" begin="8.7s" fill="freeze" />
              <animateMotion
                dur="6s"
                begin="2.6s"
                rotate="auto"
                fill="freeze"
                calcMode="spline"
                keyTimes="0;1"
                keySplines="0.45 0.05 0.35 1"
                path={TRAIN_PATH}
              />
              <rect x="-30" y="-10" width="60" height="20" rx="10" fill="#0D1A2B" stroke="#E8EEF3" strokeWidth="3" />
              <circle cx="-12" cy="0" r="3" fill="#FFC53D" />
              <circle cx="0" cy="0" r="3" fill="#FFC53D" />
              <circle cx="12" cy="0" r="3" fill="#FFC53D" />
            </g>
          )}
        </svg>
      </div>
      <figcaption className="map-caption">
        <span>Each line is a project. Hover a line to isolate it, click to jump to it. Shared stations are tools several projects use.</span>
        <span className="swipe-hint">Swipe the map sideways to follow the lines.</span>
      </figcaption>
    </figure>
  )
}
