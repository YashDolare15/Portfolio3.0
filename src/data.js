export const GITHUB = 'https://github.com/YashDolare15'
export const LINKEDIN = 'https://www.linkedin.com/in/yashdolare22'
export const EMAIL = 'yashdolare9002@gmail.com'
export const RESUME = `${import.meta.env.BASE_URL}cv/YashDolare_Resume.pdf`

// Each project is a "line" on the map. `line` maps to a CSS color token.
export const projects = [
  {
    id: 'terraform',
    line: 't',
    letter: 'T',
    kind: 'Infrastructure as code',
    title: 'Multi-environment AWS infrastructure with Terraform',
    summary:
      'One reusable Terraform codebase that provisions Development, Staging and Production on AWS, with remote state and monitoring.',
    stations: ['Requirements', 'Modules', 'Environment variables', 'Remote state', 'Monitoring'],
    built: [
      'Reusable modules for VPC, subnets, security groups, EC2 and RDS.',
      'Environment-specific .tfvars files for repeatable provisioning.',
      'Remote state in Amazon S3, with DynamoDB locking where the backend supports it.',
      'Datadog dashboards for AWS metrics and resource use across environments.',
    ],
    stack: ['Terraform', 'AWS', 'VPC', 'EC2', 'RDS', 'S3', 'DynamoDB', 'Datadog', 'GitHub'],
    repo: 'https://github.com/YashDolare15/Terraform_multi_environment.git',
  },
  {
    id: 'jenkins',
    line: 'j',
    letter: 'J',
    kind: 'CI/CD automation',
    title: 'Automated deployment and monitoring with Jenkins',
    summary:
      'A Jenkins pipeline that takes a Dockerized web app from GitHub to a load-balanced, auto-scaled AWS deployment backed by MySQL.',
    stations: ['Checkout', 'Build image', 'Push to registry', 'Deploy', 'Monitor'],
    built: [
      'Containerized the web app with Docker so code and dependencies ship as one image.',
      'Connected GitHub to Jenkins to automate checkout, builds and image publishing.',
      'Spread traffic across EC2 instances with Auto Scaling and Elastic Load Balancing.',
      'Added Amazon RDS for MySQL and Datadog, then used Linux, Git, Docker and AWS CLI to troubleshoot connectivity.',
    ],
    stack: ['Jenkins', 'Docker', 'GitHub', 'AWS EC2', 'Auto Scaling', 'ELB', 'RDS MySQL', 'Datadog', 'Linux'],
    repo: '',
  },
  {
    id: 'kubernetes',
    line: 'k',
    letter: 'K',
    kind: 'Containers and orchestration',
    title: 'Kubernetes application deployment',
    summary:
      'A containerized app deployed on Kubernetes, documenting how Deployments, Services, replicas and rollouts keep a release reliable.',
    stations: ['Build image', 'Write YAML', 'Apply manifests', 'Verify rollout', 'Test access'],
    built: [
      'Configured Deployments and Services for a containerized application.',
      'Managed replicas and observed rolling updates.',
      'Documented how rollback works when a release goes wrong.',
      'Tracked workloads with CloudWatch.',
    ],
    stack: ['Docker', 'Kubernetes', 'AWS EKS', 'Terraform', 'CloudWatch'],
    repo: 'https://github.com/YashDolare15/aws-devops-infrastructure-automation.git',
  },
  {
    id: 'cloudplay',
    line: 'c',
    letter: 'C',
    kind: 'Cloud architecture',
    concept: true,
    title: 'CloudPlay: a cloud gaming concept',
    summary:
      'An architecture study of cloud gaming: how a player signs in, starts a remote compute session and ends it, and what that costs.',
    stations: ['User journey', 'Frontend and API', 'Authentication', 'Cloud sessions', 'Trade-offs'],
    built: [
      'Designed the client and cloud architecture.',
      'Planned sign-in with Amazon Cognito.',
      'Modeled the lifecycle of a user compute session.',
      'Wrote down cost and security trade-offs.',
    ],
    stack: ['AWS', 'React', 'Cognito', 'API', 'Cloud architecture'],
    repo: 'https://github.com/YashDolare15/CloudPlay.git',
  },
]

export const skills = [
  { area: 'Cloud platforms', tools: ['AWS', 'Azure', 'GCP'] },
  { area: 'Containers', tools: ['Docker', 'Kubernetes', 'kubectl'] },
  { area: 'Infrastructure as code', tools: ['Terraform', 'AWS CloudFormation'] },
  { area: 'CI/CD and version control', tools: ['Jenkins', 'Git', 'GitHub', 'GitLab'] },
  { area: 'Monitoring', tools: ['CloudWatch', 'Datadog'] },
  { area: 'Systems and scripting', tools: ['Linux (Ubuntu)', 'Windows', 'Bash', 'Shell scripting'] },
  { area: 'Networking', tools: ['TCP/IP', 'DNS', 'SSH'] },
]

export const education = [
  {
    when: 'Jun 2022 to Mar 2023',
    where: 'MIT Jr. College, Pune',
    what: 'Higher Secondary Certificate, Science (PCM)',
  },
  {
    when: 'Aug 2023 to present',
    where: 'MIT World Peace University, Pune',
    what: 'B.Sc. Computer Science (Cloud Computing), pursuing Honours',
    current: true,
  },
]

export const coursework = [
  'Cloud Computing',
  'Operating Systems',
  'Computer Networks',
  'Linux Administration',
  'DevOps and CI/CD',
  'Cloud Infrastructure Management',
  'Infrastructure as Code (Terraform)',
  'Containerization and Orchestration',
  'Computer Security',
]

export const approach = [
  { step: 'Plan', text: 'Sketch the architecture and decide what the infrastructure needs.' },
  { step: 'Automate', text: 'Turn each step into code, containers and pipelines.' },
  { step: 'Verify', text: 'Test the deployment, fix what breaks and write down the result.' },
]
