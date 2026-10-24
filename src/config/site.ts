export const SITE_CONFIG = {
  name: 'Piyas Ahmed Kheyal',
  shortName: 'Piyas',
  brandName: 'PIYAS AHMED KHEYAL®',
  titleWatermark: 'PIYAS AHMED KHEYAL',
  role: 'Robotics Engineer — Physical AI & Simulation',
  status: 'Active in Physical AI & Bipedal Locomotion Research',
  avatar: '/images/headshot_noBG.png',
  avatarFallback: '/images/profile.png',
  tagline: 'I build physical AI systems & robotic rigs that bridge simulation and reality.',
  extendedBio:
    "Hi, I'm Piyas, a robotics and simulation engineer passionate about embodied AI, high-fidelity kinematics in NVIDIA Isaac Lab, and end-to-end VLA teleoperation on physical manipulators.",
  email: 'piyaskheyal@gmail.com',
  phone: '+880 1700 000000',
  location: 'Rajshahi / Dhaka, Bangladesh (Global Remote)',
  officeHours: '08:00 AM — 10:00 PM: Monday — Saturday',
  socials: {
    github: 'https://github.com/piyaskheyal',
    linkedin: 'https://www.linkedin.com/in/piyas-ahmed-kheyal/',
    youtube: 'https://www.youtube.com/@Mechatr0onicsArchive_RUET',
    x: 'https://x.com/piyaskheyal',
  },

  // Key metrics for animated counters
  metrics: {
    rigsCompleted: '12+',
    yearsExp: '1.5+',
    mechatronicsYears: '3',
    parallelEnvs: '4,096+',
    globalClients: '80',
    successfulProjects: '160',
  },

  education: {
    degree: 'Mechatronics Engineering',
    institution: 'Rajshahi University of Engineering & Technology (RUET)',
  },

  stats: [
    { value: '4,096+', label: 'Isaac Lab Parallel Envs' },
    { value: '6-DoF', label: 'SO-101 Arm Manipulation' },
    { value: '3D/2D', label: 'LiDAR SLAM & Odometry' },
    { value: '< 20ms', label: 'Realtime C++ Control Loop' },
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

  // Toolchain marquee
  toolchains: [
    'Isaaclab',
    'Isaacsim',
    'Gazebo',
    'ROS2',
    'Onshape',
    'Fusion360',
    'STM32',
    'ESP32',
    'AVR Boards',
    'RTOS',
    'Python',
    'C++',
    'Mujoco',
    'Foxglove',
  ],

  // 4 Core Engineering Disciplines (Services)
  services: [
    {
      index: '001',
      title: 'ROBOTICS & SIMULATION',
      subtitle:
        'Massively parallel physics simulation, digital twin kinematics, and domain randomization.',
      tags: [
        'NVIDIA Isaac Lab',
        'URDF & Kinematics',
        'PhysX GPU Clusters',
        'Domain Randomization',
        'MuJoCo Physics',
      ],
      description:
        'High-throughput physics simulations running up to 4,096 parallel instances to validate bipedal gait patterns and manipulator grasp envelopes.',
      imageA: '/images/profile.png',
      imageB: '/images/profile.png',
    },
    {
      index: '002',
      title: 'PHYSICAL AI & VLA',
      subtitle:
        'Vision-Language-Action manipulation policies and imitation learning pipelines.',
      tags: [
        'LeRobot Teleoperation',
        'Diffusion Policy',
        'SO-101 6-DoF Arm',
        'Multimodal Tokens',
        'PyTorch 2.4',
      ],
      description:
        'Training end-to-end neural policies from human demonstration data, enabling real-world robotic arms to execute complex dynamic pick-and-place tasks.',
      imageA: '/images/profile.png',
      imageB: '/images/profile.png',
    },
    {
      index: '003',
      title: 'EMBEDDED & REAL-TIME FIRMWARE',
      subtitle:
        'Sub-millisecond motor controller loops, CAN bus architectures, and RTOS threads.',
      tags: [
        'STM32F4/G4 MCUs',
        'FreeRTOS Multitasking',
        'CAN & Serial Bus',
        'Deterministic C++20',
        'Hardware-in-the-Loop',
      ],
      description:
        'Low-level firmware architecture driving serial servos and actuators with microsecond determinism and hardware safety interlocks.',
      imageA: '/images/profile.png',
      imageB: '/images/profile.png',
    },
    {
      index: '004',
      title: 'AUTONOMOUS SLAM & AMR',
      subtitle:
        'Spatial perception, 2D/3D LiDAR point-cloud registration, and Nav2 path planners.',
      tags: [
        'ROS 2 Nav2',
        'Cartographer SLAM',
        'RGB-D Sensor Fusion',
        'Costmap Optimization',
        'Foxglove Telemetry',
      ],
      description:
        'Autonomous mobile robot navigation stacks equipped with multi-sensor fusion, obstacle avoidance, and global path tracking.',
      imageA: '/images/profile.png',
      imageB: '/images/profile.png',
    },
  ],

  // 4-Step Engineering Process (Dark Cards)
  process: [
    {
      step: '01',
      title: 'KINEMATICS & URDF',
      icon: '✦',
      desc: 'Precision CAD modeling in SolidWorks, defining mass moments of inertia, joint collision limits, and rigid body URDF tree structures.',
    },
    {
      step: '02',
      title: 'PHYSICS SIMULATION',
      icon: '✴',
      desc: 'Deploying URDF assets into NVIDIA Isaac Sim & Isaac Lab with GPU PhysX engines and rigorous domain randomization bounds.',
    },
    {
      step: '03',
      title: 'PHYSICAL AI POLICIES',
      icon: '⚡',
      desc: 'Training reinforcement learning gait networks and teleoperated imitation learning policies with PyTorch and LeRobot frameworks.',
    },
    {
      step: '04',
      title: 'REAL-WORLD DEPLOYMENT',
      icon: '❖',
      desc: 'Deploying control policies, navigation stacks, and ROS 2 nodes to Raspberry Pi (4, 5, 3B+) edge computers with real-time physical validation.',
    },
  ],

  // Testimonials / Recommendations
  testimonials: [
    {
      author: 'Dr. Aris Thorne',
      role: 'Principal Roboticist, SimDynamics',
      quote:
        'Piyas closed the Sim-to-Real gap on our manipulator setup faster than any engineer we have worked with. His Isaac Lab pipelines are pristine.',
      rating: 5,
      avatar: '/images/profile.png',
    },
    {
      author: 'Elena Rostova',
      role: 'Lead Perception Architect, CyberBot',
      quote:
        'The deterministic ROS2 node architecture and LiDAR odometry integration delivered flawless obstacle avoidance in dense warehouse tests.',
      rating: 5,
      avatar: '/images/profile.png',
    },
    {
      author: 'Marcus Vance',
      role: 'Founder, Apex Autonomy',
      quote:
        'From custom URDF rigging to real-time CAN bus telemetry, Piyas approaches every robotic rig with extraordinary rigor and aesthetic clarity.',
      rating: 5,
      avatar: '/images/profile.png',
    },
    {
      author: 'Sophia Chen',
      role: 'AI Research Director, Bipedal Labs',
      quote:
        'Deep mastery of both physical hardware constraints and modern embodied AI foundation models. A rare full-stack physical AI engineer.',
      rating: 5,
      avatar: '/images/profile.png',
    },
  ],

  // FAQ Items
  faqs: [
    {
      q: 'What is your core specialization in Physical AI?',
      a: 'My core specialization sits at the intersection of simulated physics (NVIDIA Isaac Sim / Isaac Lab) and real-world hardware actuation (SO-101 robotic arms, bipedal platforms, and AMR chassis). I build end-to-end teleoperation pipelines, reinforcement learning policies, and real-time C++ nodes.',
    },
    {
      q: 'How do you handle the Sim-to-Real gap?',
      a: 'Through aggressive domain randomization (mass, friction, actuator lag, sensor noise) during massively parallel GPU simulation, combined with system identification experiments on physical hardware to establish tightly calibrated physics parameters.',
    },
    {
      q: 'Are your simulation workflows open-source?',
      a: 'Yes, select research rigs and Isaac Lab training scripts are published on my GitHub, accompanied by video documentation on my YouTube channel Mechatr0nicsArchive_RUET.',
    },
    {
      q: 'What compute hardware do you deploy models to?',
      a: 'For simulation and training: High-performance GPU workstations with Isaac Sim and Gazebo. For edge robot deployment: Raspberry Pi (5, 4, 3B+) single-board computers, and STM32 / ESP32 MCUs for deterministic hardware timing.',
    },
    {
      q: 'Are you available for contract or full-time roles?',
      a: 'Yes. I am available for full-time engineering roles, research fellowships, and high-impact advisory consultations in Physical AI, robotics simulation, and autonomous systems.',
    },
  ],

  // Articles / Design & Robotics Insights
  articles: [
    {
      slug: 'sim-to-real-invariance',
      title: 'THE SIM-TO-REAL GAP: WHY PHYSICS INVARIANCE BEATS RAW EPOCHS',
      category: 'SIMULATION',
      date: 'OCT 2026',
      readTime: '6 MIN READ',
      author: 'Piyas Ahmed Kheyal',
      summary:
        'How domain randomization across actuator dynamics and restitution coefficients prevents policy collapse during physical transfer.',
      image: '/images/profile.png',
    },
    {
      slug: 'so101-vla-imitation',
      title: 'VISION-LANGUAGE-ACTION TELEOP ON THE SO-101 6-DOF ARM',
      category: 'PHYSICAL AI',
      date: 'SEP 2026',
      readTime: '8 MIN READ',
      author: 'Piyas Ahmed Kheyal',
      summary:
        'Implementing dual-camera tokenization and diffusion policies for sub-centimeter pick-and-place precision on consumer servo hardware.',
      image: '/images/profile.png',
    },
    {
      slug: 'deterministic-cpp-ros2',
      title: 'DESIGNING DETERMINISTIC C++20 REAL-TIME NODES IN ROS2',
      category: 'EMBEDDED',
      date: 'AUG 2026',
      readTime: '5 MIN READ',
      author: 'Piyas Ahmed Kheyal',
      summary:
        'Zero-allocation memory pools and lock-free ring buffers for 1000Hz motor control loops over CAN bus.',
      image: '/images/profile.png',
    },
    {
      slug: 'lidar-slam-nav2',
      title: 'POINT CLOUD REGISTRATION IN DENSE UNSTRUCTURED ENVIRONMENTS',
      category: 'AUTONOMOUS',
      date: 'JUL 2026',
      readTime: '7 MIN READ',
      author: 'Piyas Ahmed Kheyal',
      summary:
        'Fusing 2D LiDAR with depth visual odometry for sub-50ms global relocalization under aggressive dynamic occlusions.',
      image: '/images/profile.png',
    },
    {
      slug: 'bipedal-locomotion-isaaclab',
      title: 'ZERO-SHOT BIPEDAL GAIT SYNTHESIS IN NVIDIA ISAAC LAB',
      category: 'ROBOTICS',
      date: 'JUN 2026',
      readTime: '10 MIN READ',
      author: 'Piyas Ahmed Kheyal',
      summary:
        'Curriculum learning strategies for humanoid stabilization across inclined terrains and unexpected external perturbations.',
      image: '/images/profile.png',
    },
    {
      slug: 'micro-firmware-determinism',
      title: 'HARD REAL-TIME INTERRUPT HANDLING ON STM32 MCUS',
      category: 'FIRMWARE',
      date: 'MAY 2026',
      readTime: '6 MIN READ',
      author: 'Piyas Ahmed Kheyal',
      summary:
        'Microsecond-level PWM timing and hardware timer synchronization for multi-axis coordinated robotic joints.',
      image: '/images/profile.png',
    },
  ],

  // Honors & Milestones for About page
  achievements: [
    {
      title: 'OUTSTANDING ROBOTICS INNOVATION',
      org: 'Mechatronics Society RUET',
      year: '2025',
      desc: 'Recognized for pioneering the open bipedal simulation rig in Isaac Lab.',
    },
    {
      title: 'BEST PHYSICAL AI TELEOP DEMONSTRATION',
      org: 'Embodied Intelligence Forum',
      year: '2024',
      desc: 'Master-slave SO-101 teleoperation pipeline running low-latency imitation learning.',
    },
    {
      title: 'EXCELLENCE IN SIM-TO-REAL ENGINEERING',
      org: 'Autonomous Systems Symposium',
      year: '2023',
      desc: 'Demonstrated zero-shot transfer of RL locomotion policies to custom physical robots.',
    },
    {
      title: 'NATIONAL ROBOTICS CHAMPIONSHIP FINALIST',
      org: 'RoboTech National Summit',
      year: '2022',
      desc: 'Lead firmware and perception engineer for autonomous mobile search-and-rescue rover.',
    },
  ],
} as const;
