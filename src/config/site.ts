export const SITE_CONFIG = {
  name: 'Piyas Ahmed Kheyal',
  role: 'Robotics Engineer — Physical AI & Simulation',
  status: 'Active in Physical AI & Bipedal Locomotion Research',
  tagline:
    'Architecting embodied intelligence across simulation and real hardware. Specialized in bipedal locomotion in NVIDIA Isaac Lab, Vision-Language-Action (VLA) manipulation on the SO-101 arm, and autonomous mobile robots with LiDAR & Depth SLAM.',
  email: 'piyas.robotics@example.com', // Replace with your email
  location: 'Global / Remote',
  socials: {
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername',
    youtube: 'https://youtube.com/@yourusername',
    x: 'https://x.com/yourusername',
  },
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
  stack: [
    { category: 'Simulation & RL', items: ['NVIDIA Isaac Sim', 'Isaac Lab', 'Gazebo', 'PyTorch', 'USD'] },
    { category: 'Middleware & Systems', items: ['ROS 2', 'C++17/20', 'Python', 'CMake', 'Linux RT'] },
    { category: 'Perception & Nav', items: ['3D/2D LiDAR SLAM', 'Depth Cameras (RGB-D)', 'Nav2', 'Foxglove'] },
    { category: 'Hardware & Embodied AI', items: ['SO-101 Robotic Arm', 'VLA Training', 'Bipedal Platforms', 'STM32 / Serial Servos'] },
  ],
} as const;