import React from 'react'

/* Small building blocks shared by the four architecture sketches. */
function Node({ x, y, w = 110, h = 60, title, sub, tone }) {
  const cy = y + h / 2
  return (
    <g className="dg-node">
      <rect x={x} y={y} width={w} height={h} rx="10" style={tone ? { fill: tone } : undefined} />
      <text x={x + w / 2} y={sub ? cy - 3 : cy + 5} textAnchor="middle" className="dg-title">{title}</text>
      {sub && <text x={x + w / 2} y={cy + 15} textAnchor="middle" className="dg-sub">{sub}</text>}
    </g>
  )
}

function Flow({ d, delay = 0, dashed = false }) {
  return (
    <g>
      <path d={d} className={dashed ? 'dg-pipe is-dashed' : 'dg-pipe'} />
      {!dashed && <path d={d} className="dg-flow" style={{ animationDelay: `${delay}s` }} />}
    </g>
  )
}

function Mini({ x, y, w, h = 34, text }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="8" className="dg-mini" />
      <text x={x + w / 2} y={y + h / 2 + 5} textAnchor="middle" className="dg-mini-text">{text}</text>
    </g>
  )
}

function Terraform() {
  const envs = [
    [10, 'Development'],
    [120, 'Staging'],
    [232, 'Production'],
  ]
  return (
    <svg viewBox="0 0 820 330" role="img" aria-label="Terraform sketch: GitHub code feeds reusable modules, which build Development, Staging and Production, with remote state in S3, locking in DynamoDB and monitoring in Datadog.">
      <Flow d="M140 165 H190" />
      <Flow d="M300 165 H330 V54 H360" delay={0.2} />
      <Flow d="M300 165 H360" delay={0.2} />
      <Flow d="M300 165 H330 V276 H360" delay={0.2} />
      <Flow d="M660 54 H680 V62 H700" delay={0.5} />
      <Flow d="M660 164 H680 V168 H700" delay={0.5} />
      <Flow d="M660 276 H680 V278 H700" delay={0.5} />
      {envs.map(([y, name]) => (
        <g key={name}>
          <rect x="360" y={y} width="300" height="88" rx="12" className="dg-panel" />
          <text x="376" y={y + 24} className="dg-ptitle">{name}</text>
          <Mini x={376} y={y + 40} w={76} text="VPC" />
          <Mini x={468} y={y + 40} w={76} text="EC2" />
          <Mini x={560} y={y + 40} w={76} text="RDS" />
          <path d={`M452 ${y + 57} H468 M544 ${y + 57} H560`} className="dg-link" />
        </g>
      ))}
      <Node x={20} y={135} w={120} title="GitHub" sub="Terraform code" />
      <Node x={190} y={135} title="Modules" sub="reusable" />
      <Node x={700} y={34} h={56} title="S3" sub="remote state" />
      <Node x={700} y={140} h={56} title="DynamoDB" sub="state lock" />
      <Node x={700} y={250} h={56} title="Datadog" sub="monitoring" />
    </svg>
  )
}

function Jenkins() {
  return (
    <svg viewBox="0 24 820 296" role="img" aria-label="Jenkins sketch: GitHub triggers a Jenkins pipeline that builds a Docker image, pushes it to a registry and deploys it behind a load balancer to an Auto Scaling group of EC2 instances, with RDS MySQL and Datadog.">
      <rect x="660" y="40" width="150" height="190" rx="12" className="dg-group" />
      <text x="735" y="63" textAnchor="middle" className="dg-ptitle">Auto Scaling group</text>
      <Flow d="M120 165 H150" />
      <Flow d="M250 165 H280" delay={0.15} />
      <Flow d="M380 165 H410" delay={0.3} />
      <Flow d="M510 165 H540" delay={0.45} />
      <Flow d="M640 165 H660" delay={0.6} />
      <Flow d="M735 230 V260" delay={0.75} />
      <Flow d="M660 205 H590 V260" dashed />
      <Mini x={680} y={80} w={110} text="EC2" />
      <Mini x={680} y={126} w={110} text="EC2" />
      <Mini x={680} y={172} w={110} text="EC2" />
      <Node x={20} y={135} w={100} title="GitHub" sub="source" />
      <Node x={150} y={135} w={100} title="Jenkins" sub="pipeline" />
      <Node x={280} y={135} w={100} title="Docker" sub="build image" />
      <Node x={410} y={135} w={100} title="Registry" sub="push image" />
      <Node x={540} y={135} w={100} title="ELB" sub="spreads traffic" />
      <Node x={660} y={260} w={150} h={50} title="RDS MySQL" />
      <Node x={540} y={260} w={100} h={50} title="Datadog" />
    </svg>
  )
}

function Kubernetes() {
  return (
    <svg viewBox="0 0 820 340" role="img" aria-label="Kubernetes sketch: a Docker image is applied with kubectl to a cluster where a Service routes traffic to three pods in a Deployment, one of them updating, with CloudWatch collecting metrics.">
      <rect x="320" y="16" width="480" height="304" rx="14" className="dg-group" />
      <text x="340" y="42" className="dg-ptitle">Kubernetes cluster</text>
      <text x="340" y="306" className="dg-sub">Deployment: replicas, rolling update, rollback</text>
      <Flow d="M130 165 H170" />
      <Flow d="M280 165 H340" delay={0.2} />
      <Flow d="M440 165 H470 V76 H520" delay={0.4} />
      <Flow d="M440 165 H520" delay={0.4} />
      <Flow d="M440 165 H470 V256 H520" delay={0.4} />
      <Flow d="M640 76 H655 V166 H670" dashed />
      <Flow d="M640 166 H670" dashed />
      <Flow d="M640 256 H655 V166 H670" dashed />
      <Node x={20} y={135} title="Image" sub="Docker" />
      <Node x={170} y={135} title="kubectl" sub="apply YAML" />
      <Node x={340} y={140} w={100} h={50} title="Service" />
      <Node x={520} y={50} w={120} h={52} title="Pod" sub="v1" />
      <Node x={520} y={140} w={120} h={52} title="Pod" sub="v1" />
      <Node x={520} y={230} w={120} h={52} title="Pod" sub="v2 rolling in" tone="#FFE9B0" />
      <Node x={670} y={140} w={120} h={52} title="CloudWatch" sub="metrics" />
    </svg>
  )
}

function CloudPlay() {
  return (
    <svg viewBox="0 56 740 270" role="img" aria-label="CloudPlay sketch: a player's browser runs a React app that calls an API, which checks sign-in with Cognito and starts a session on remote cloud compute that streams video back.">
      <Flow d="M120 120 H160" />
      <Flow d="M260 120 H300" delay={0.2} />
      <Flow d="M400 120 H440" delay={0.4} />
      <Flow d="M540 120 H580" delay={0.6} />
      <Flow d="M350 150 V205" dashed />
      <Flow d="M640 150 V300 H70 V150" delay={0.8} />
      <text x="355" y="290" textAnchor="middle" className="dg-sub">video stream back to the player</text>
      <Node x={20} y={90} w={100} title="Player" sub="browser" />
      <Node x={160} y={90} w={100} title="React app" sub="client" />
      <Node x={300} y={90} w={100} title="API" sub="requests" />
      <Node x={440} y={90} w={100} title="Sessions" sub="start and stop" />
      <Node x={580} y={90} w={120} title="Remote PC" sub="cloud compute" />
      <Node x={300} y={205} w={100} h={56} title="Cognito" sub="sign-in" />
    </svg>
  )
}

const DIAGRAMS = {
  terraform: [Terraform, 'Sketch: one set of modules builds three environments, with state and monitoring shared.'],
  jenkins: [Jenkins, 'Sketch: a commit flows through Jenkins and Docker into a load-balanced, auto-scaled deployment.'],
  kubernetes: [Kubernetes, 'Sketch: a Service routes traffic to pods while a new version rolls in.'],
  cloudplay: [CloudPlay, 'Concept sketch: how a player signs in and gets a remote compute session.'],
}

export default function Diagram({ id }) {
  const entry = DIAGRAMS[id]
  if (!entry) return null
  const [Art, caption] = entry
  return (
    <figure className="diagram">
      <div className="diagram-scroll" tabIndex={0} role="group" aria-label={`${id} architecture sketch, scrollable`}>
        <Art />
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  )
}
