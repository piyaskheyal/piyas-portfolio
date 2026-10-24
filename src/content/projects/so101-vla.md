---
title: "SO-101 Arm Manipulation via Vision-Language-Action (VLA)"
subtitle: "End-to-end physical AI pipeline from leader-follower teleoperation to multi-modal policy execution."
date: "2026"
category: "VLA & Manipulation"
featured: true
order: 2
simEngine: "Isaac Sim + LeRobot / Real Hardware"
middleware: "ROS 2 / PyTorch"
hardware: "SO-101 6-DoF Arm + RGB-D Wrist/Overhead Cameras"
tags: ["SO-101 Arm", "VLA Training", "Physical AI", "Depth Camera", "Python", "Feetech STS"]
metrics:
  - label: "Manipulator"
    value: "SO-101 6-DoF"
  - label: "Action Space"
    value: "Joint Position + Gripper"
  - label: "Inference"
    value: "30 Hz Closed-Loop"
repoUrl: "https://github.com/yourusername/so101-vla-manipulation"
quickCommand: "ros2 launch so101_vla_bringup evaluate_policy.launch.py checkpoint:=vla_so101_pick_place.pt"
architectureSteps:
  - "High-Frequency Leader-Follower Teleop & RGB-D Dataset Collection"
  - "Vision-Language-Action (VLA) Policy Fine-Tuning with Action Chunking"
  - "Sim-in-the-Loop Validation inside Isaac Sim Digital Twin"
  - "Real-Time Closed-Loop Execution over Serial Bus Servos"
---

### Engineering Overview
Developed an embodied manipulation pipeline on the open-source **SO-101 robotic arm**, enabling language-conditioned tabletop tasks such as sorting, pick-and-place, and workspace cleanup under varying lighting and object poses.

### Key Technical Contributions
- **Hardware Calibration & Teleop Pipeline:** Configured low-latency serial bus communication with Feetech STS servos and synchronized multi-view RGB-D camera streams for clean demonstration trajectories.
- **VLA Fine-Tuning & Action Chunking:** Trained visuomotor policies utilizing temporal action chunking to suppress compounding errors during delicate grasp phases.
- **Digital Twin Parity:** Aligned joint limits, camera intrinsics, and URDF/USD kinematics in Isaac Sim to benchmark policy generalization before real-world rollout.