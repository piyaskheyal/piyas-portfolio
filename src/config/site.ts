export const SITE_CONFIG = {
  name: 'Piyas Ahmed Kheyal',
  role: 'Robotics Engineer — Physical AI & Simulation',
  status: 'Active in Physical AI & Bipedal Locomotion Research',
  avatar: '/images/profile.png',
  avatarFallback: '/images/profile-placeholder.svg',
  tagline:
    'Architecting embodied intelligence across simulation and real hardware. Specialized in bipedal locomotion in NVIDIA Isaac Lab, Vision-Language-Action (VLA) manipulation on the SO-101 arm, and autonomous mobile robots with LiDAR & Depth SLAM.',
  email: 'piyaskheyal@gmail.com',
  location: 'Global / Remote',
  socials: {
    github: 'https://github.com/piyaskheyal',
    linkedin: 'https://www.linkedin.com/in/piyas-ahmed-kheyal/',
    youtube: 'https://www.youtube.com/@Mechatr0nicsArchive_RUET',
    x: 'https://x.com/piyaskheyal',
  },
  stats: [
    { value: '4,096+', label: 'Isaac Lab Parallel Envs' },
    { value: '6-DoF', label: 'SO-101 Arm Manipulation' },
    { value: '3D/2D', label: 'LiDAR SLAM & Odometry' },
    { value: '< 20ms', label: 'Realtime C++ Control Loop' },
  ],
  corePillars: [
    {
      id: 'physical-ai',
      label: 'Physical AI & VLA',
      detail: 'End-to-end policies, SO-101 teleop & imitation learning, vision-language conditioning',
      metrics: 'SO-101 / VLA / PyTorch',
    },
    {
      id: 'simulation',
      label: 'Sim-to-Real & Bipedal RL',
      detail: 'Massively parallel reinforcement learning in NVIDIA Isaac Lab, Isaac Sim & Gazebo',
      metrics: '4,096+ Parallel Envs',
    },
    {
      id: 'autonomy',
      label: 'AMR, SLAM & Perception',
      detail: '2D/3D LiDAR mapping, RGB-D visual-inertial odometry, Nav2 & deterministic C++ control',
      metrics: 'ROS 2 Humble/Jazzy • C++',
    },
  ],
  experience: [
    {
      period: '2023 — Present',
      role: 'Embodied AI & Sim-to-Real Researcher',
      lab: 'Autonomous Robotics & Physical AI Lab',
      description:
        'Leading bipedal locomotion policy training in NVIDIA Isaac Lab and transfer to physical hardware. Deploying imitation learning and VLA models on custom teleoperation setups.',
      technologies: ['Isaac Lab', 'PyTorch', 'ROS 2', 'Omniverse', 'Sim-to-Real'],
    },
    {
      period: '2022 — 2023',
      role: 'Robotics Software Engineer',
      lab: 'Mobile Autonomy & Perception Systems',
      description:
        'Engineered multi-sensor autonomous navigation stacks for mobile robots using 2D/3D LiDAR, RGB-D depth perception, and Nav2. Built low-latency C++ motor drivers and state estimators.',
      technologies: ['C++20', 'ROS 2 Humble', 'Nav2', 'Cartographer', 'SLAM'],
    },
    {
      period: '2021 — 2022',
      role: 'Embedded Robotics Systems Engineer',
      lab: 'Hardware Prototyping & Mechatronics',
      description:
        'Designed custom mechatronics, motor controller firmware on STM32, and master-slave teleoperation arms with serial bus feedback.',
      technologies: ['STM32', 'FreeRTOS', 'CAN Bus', 'Kinematics', 'Mechatronics'],
    },
  ],
  labGear: [
    {
      name: 'SO-101 6-DoF Robotic Arm',
      category: 'Physical Manipulation Rig',
      specs: 'Bi-directional teleoperation master-slave setup, serial bus servos, custom 3D-printed end-effectors',
    },
    {
      name: 'NVIDIA Simulation Workstation',
      category: 'Sim-to-Real RL Compute',
      specs: 'RTX GPU cluster running Isaac Sim & Isaac Lab with 4,096+ parallel PhysX environments',
    },
    {
      name: 'Perception & Sensor Array',
      category: 'Spatial Perception',
      specs: 'Intel RealSense D435i RGB-D, 2D/3D LiDAR, 9-Axis IMU fusion for spatial SLAM',
    },
    {
      name: 'Embedded & Edge Compute',
      category: 'Realtime Hardware',
      specs: 'NVIDIA Jetson Orin Nano, STM32F4/G4 series, CAN/UART bus interfaces with Linux RT kernel',
    },
  ],
  stack: [
    { category: 'Simulation & RL', items: ['NVIDIA Isaac Sim', 'Isaac Lab', 'Gazebo', 'PyTorch', 'USD'] },
    { category: 'Middleware & Systems', items: ['ROS 2', 'C++17/20', 'Python', 'CMake', 'Linux RT'] },
    { category: 'Perception & Nav', items: ['3D/2D LiDAR SLAM', 'Depth Cameras (RGB-D)', 'Nav2', 'Foxglove'] },
    { category: 'Hardware & Embodied AI', items: ['SO-101 Robotic Arm', 'VLA Training', 'Bipedal Platforms', 'STM32 / Serial Servos'] },
  ],
} as const;