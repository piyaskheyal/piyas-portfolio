---
title: "Autonomous Mobile Robot (AMR) with Multi-Sensor SLAM"
subtitle: "Sensor-fused 2D LiDAR and RGB-D Depth perception for autonomous frontier exploration in unknown environments."
date: "2026"
category: "AMR & SLAM"
featured: true
order: 3
simEngine: "Gazebo & Isaac Sim"
middleware: "ROS 2 (C++ / Nav2)"
hardware: "Differential Drive AMR • RPLiDAR • Depth Camera"
tags: ["AMR", "LiDAR", "SLAM", "Depth Camera", "ROS 2", "C++", "Gazebo"]
metrics:
  - label: "Localization"
    value: "< 2.5cm RMSE"
  - label: "Sensor Fusion"
    value: "LiDAR + Depth + IMU"
  - label: "Core Stack"
    value: "C++17 / Nav2"
repoUrl: "https://github.com/yourusername/amr-lidar-depth-slam"
quickCommand: "ros2 launch amr_navigation autonomous_exploration.launch.py use_sim_time:=false"
architectureSteps:
  - "Hardware Bringup & Deterministic Wheel Odometry (STM32 + C++ ROS 2)"
  - "3D Depth Camera PointCloud + 360° 2D LiDAR Costmap Fusion"
  - "Online Graph-SLAM & Loop Closure in Dynamic Environments"
  - "Autonomous Frontier Exploration & SmacPlanner Trajectory Execution"
---

### Engineering Overview
Designed and deployed a full-stack autonomous navigation system for a differential-drive mobile robot capable of mapping unknown indoor structures without human teleoperation.

### Key Technical Contributions
- **Multi-Layer Perception:** Combined planar 360° LiDAR scans with 3D RGB-D depth camera voxel layers in Nav2 so the robot reliably detects overhanging obstacles and Negative/Drop-off hazards that 2D LiDAR misses.
- **Sim-First Verification:** Built faithful Gazebo and Isaac Sim worlds with sensor noise models to stress-test recovery behaviors, dynamic obstacle avoidance, and TF tree integrity prior to field tests.
- **Real-Time Telemetry:** Integrated Foxglove Bridge diagnostics for live inspection of occupancy grids, particle clouds, and velocity command profiles.