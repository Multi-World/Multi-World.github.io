# MultiWorld Project Page

This is the official project page for **MultiWorld: Scalable Multi-Agent Multi-View Video World Models**.

## Overview

MultiWorld is a unified framework for multi-agent multi-view world modeling that enables accurate control of multiple agents while maintaining multi-view consistency.

## Key Features

- **Multi-Agent Condition Module (MACM)**: Achieves precise multi-agent controllability through Agent Identity Embedding (AIE) and Adaptive Action Weighting (AAW)
- **Global State Encoder (GSE)**: Ensures coherent observations across different views using VGGT backbone
- **Scalable Architecture**: Supports flexible number of agents and views with parallel generation

## Project Structure

```
Multi-World.github.io/
├── index.html          # Main project page
├── css/
│   └── styles.css     # Custom styles
├── js/
│   └── main.js        # JavaScript interactions
├── media/
│   ├── videos/        # Video assets (to be added)
│   └── images/        # Image assets (to be added)
└── README.md          # This file
```

## Local Development

To view the project page locally:

```bash
# Using Python
python -m http.server 8000

# Or using Node.js
npx serve
```

Then open `http://localhost:8000` in your browser.

## Deployment

This is a GitHub Pages repository. Push changes to the main branch to deploy automatically.

## Citation

```bibtex
@article{wu2025multiworld,
  title={MultiWorld: Scalable Multi-Agent Multi-View Video World Models},
  author={Wu, Haoyu and Yu, Jiwen and Zou, Yingtian and Liu, Xihui},
  journal={arXiv preprint arXiv:XXXX.XXXXX},
  year={2025}
}
```

## Contact

For questions or issues, please open an issue on GitHub or contact the authors.
