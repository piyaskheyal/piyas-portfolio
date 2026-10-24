---
title: "Bipedal Locomotion RL in NVIDIA Isaac Lab"
subtitle: "Massively parallel PPO policy training with domain randomization for robust uneven-terrain walking."
date: "2026"
category: "Bipedal & Isaac Lab"
featured: true
order: 1
simEngine: "Isaac Lab / Isaac Sim"
middleware: "ROS 2 + PyTorch"
hardware: "Bipedal Humanoid Lower-Body"
tags: ["Isaac Lab", "Isaac Sim", "Bipedal RL", "Python", "C++", "Sim-to-Real"]
metrics:
  - label: "Parallel Envs"
    value: "4,096 GPU"
  - label: "Control Rate"
    value: "50 Hz Policy / 200 Hz PD"
  - label: "Terrain Grade"
    value: "±18° Rough"
repoUrl: "https://github.com/yourusername/bipedal-isaaclab-locomotion"
quickCommand: "python scripts/rsl_rl/train.py --task Isaac-Velocity-Rough-Biped-v0 --num_envs 4096 --headless"
architectureSteps:
  - "USD Articulation & Contact Sensor Setup in Isaac Sim"
  - "4,096 Parallel GPU Environments in Isaac Lab (PPO)"
  - "Domain Randomization (Friction, Mass, Push Disturbances)"
  - "ONNX / TorchScript Policy Export to C++ ROS 2 Control Node"
---

### Engineering Overview
Trained a robust proprioceptive locomotion controller for a bipedal robot capable of traversing stairs, slopes, and randomized terrain profiles without external heightmaps.

### Key Technical Contributions
- **Reward Shaping & Gait Regularization:** Formulated a multi-objective reward balancing linear/angular velocity tracking, foot-air-time symmetry, action smoothness, and joint torque penalties to eliminate high-frequency jitter.
- **Sim-to-Real Conditioning:** Injected actuator delay models, randomized link payloads, and ground restitution variance during training in Isaac Lab to bridge the reality gap.
- **Deterministic Deployment:** Exported the trained actor network to ONNX and wrapped it inside a low-latency C++ ROS 2 lifecycle node communicating with joint-level PD controllers at 200 Hz.